import firebase from '../../util/firebase'
import { initGame } from '../../service/gameSolver/initGame'
import { tableUpdate } from '../../action/index'

import type { User } from '../../type'
import type {
    Action,
    Game_Running,
    Game_Over,
} from '../../service/gameSolver/type'

type Table_Played = {
    state: 'played',
    users: User[],
    game: Game_Over,
}
type Table_Playing = {
    state: 'playing',
    users: User[],
    game: Game_Running,
    tic: number,

    previous_played_table: Table_Played[],
}
type Table_Waiting = {
    state: 'waiting',
    pending_players: { [string]: { user: User, bank: number, tic: number } },
    previous_played_table: Table_Played[],
}
type Table = Table_Waiting | Table_Playing

const initWaitingTable = (): Table_Waiting => ({
    state: 'waiting',
    pending_players: {},
    previous_played_table: [],
})

const parseTable = (table: any): Table | null =>
    (table.state === 'waiting' && { ...initWaitingTable(), ...table }) ||
    (table.state === 'playing' && table) ||
    null

let timeout = null
const onUpdate = async (store, ref, update, table) => {
    if (!ref) return

    table = parseTable(table)

    if (!table) return await ref.set(initWaitingTable())

    const me = store.getState().me

    if (!me) return

    // xxx arthur : check equality first ?
    store.dispatch(tableUpdate(table))

    switch (table.state) {
        case 'waiting':
            // player that are ready
            const playersReady = Object.keys(table.pending_players)
                .map(key => table.pending_players[key])
                .filter(player => player.bank > 10)
                .filter(player => player.tic > Date.now() - 10000)
                .sort((a, b) => (a.tic > b.tic ? 1 : -1))

            if (playersReady.length > 1 && playersReady[0].user.id === me.id) {
                // should start the game
                await ref.set({
                    tic: Date.now(),
                    state: 'playing',
                    game: initGame(playersReady.map(player => player.bank), 1),
                    users: playersReady.map(player => player.user),
                })
            } else {
                // should tic every X second to notify that I am ready

                const player = table.pending_players[me.id]

                let shouldReportReadyIn = !player
                    ? -1
                    : player.tic + 5000 - Date.now()

                if (shouldReportReadyIn < 0) {
                    shouldReportReadyIn = 5000

                    await ref
                        .child(`pending_players/${me.id}`)
                        .update({ user: me, tic: Date.now(), bank: 100 })
                }

                clearTimeout(timeout)
                timeout = setTimeout(update, shouldReportReadyIn)
            }
    }
}

/**
 * wrap a function,
 * ensure that function calls are synchronous
 * when calling the function while the previous execution is not over yet,
 * will call once the previous execution is over
 */
const createQueue = fn => {
    let pending = null

    let callAfter = false

    const call = async () => {
        if (!pending) {
            pending = true

            await fn()

            pending = false

            if (callAfter) {
                callAfter = false
                call()
            }
        } else {
            callAfter = true
        }
    }

    return call
}

export const init = (store: Store) => {
    let listeningTo = null

    let table = null
    let ref = null
    const update = createQueue(() => onUpdate(store, ref, update, table))

    const whenStoreChange = () => {
        const tableId = store.getState().appState.tableToJoin

        if (tableId && !listeningTo) {
            listeningTo = tableId

            ref = firebase.database().ref(`/table/${tableId}`)

            ref.on('value', snapshot => {
                table = snapshot.val()
                update()
            })
        }
    }

    whenStoreChange()

    return store.subscribe(whenStoreChange)
}
