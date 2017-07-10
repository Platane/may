import firebase from '../../util/firebase'
import { initGame } from '../../service/gameSolver/initGame'
import { reduce as solveGame } from '../../service/gameSolver/solver'
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

    game0: Game_Running,
    actions: Action[],
}
type Table_Playing = {
    state: 'playing',
    users: User[],
    game: Game_Running,

    game0: Game_Running,
    actions: Action[],

    tic: number,

    previous_played_table: Table_Played[],
}
type Table_Waiting = {
    state: 'waiting',
    start_at: number,
    pending_players: { [string]: { user: User, bank: number, tic: number } },
    previous_played_table: Table_Played[],
}
type Table = Table_Waiting | Table_Playing

const initWaitingTable = (): Table_Waiting => ({
    state: 'waiting',
    start_at: Date.now() + 10000,
    pending_players: {},
    previous_played_table: [],
})

const parseTable = (table: any): Table | null =>
    (table &&
    table.state === 'waiting' && { ...initWaitingTable(), ...table }) ||
    (table &&
    table.state === 'playing' && {
        actions: [],
        previous_played_table: [],
        tic: 0,
        ...table,
    }) ||
    null

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
            // start the game if possible
            {
                // player that are ready
                const playersReady = Object.keys(table.pending_players)
                    .map(key => table.pending_players[key])
                    .filter(player => player.bank > 10)
                    .filter(player => player.tic > Date.now() - 10000)
                    .sort((a, b) => (a.tic > b.tic ? 1 : -1))

                // delay is ok
                let shouldStartIn = table.start_at - Date.now()

                if (
                    shouldStartIn < 0 &&
                    playersReady.length > 1 &&
                    playersReady[0].user.id === me.id
                ) {
                    // should start the game

                    const game0 = initGame(
                        playersReady.map(player => player.bank),
                        1
                    )
                    return await ref.set({
                        tic: Date.now(),
                        state: 'playing',
                        game: game0,
                        game0,
                        action: [],
                        users: playersReady.map(player => player.user),
                        previous_played_table: table.previous_played_table,
                    })
                } else {
                    update(shouldStartIn)
                }
            }

            // should tic every X second to notify that I am ready
            {
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

                update(shouldReportReadyIn)
            }

        case 'playing':
            let action = null

            // fold players if it did not play in time
            {
                const DELAY = 40000
                let shouldPlayIn = table.tic + DELAY - Date.now()

                if (shouldPlayIn < 0) {
                    action = { type: 'fold', player: table.game.speaker }

                    shouldPlayIn = DELAY
                }

                update(shouldPlayIn)
            }

            if (action) {
                const newTable = {
                    game: solveGame(table.game, action),
                    actions: [...table.actions, action],
                }

                if (newTable.game.state === 'over') {
                    await ref.set({
                        ...initWaitingTable(),
                        previous_played_table: [
                            { ...newTable, users: table.users },
                            ...table.previous_played_table,
                        ],
                    })
                } else {
                    await ref.update({
                        tic: Date.now(),
                        ...newTable,
                    })
                }
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

const callAfter = fn => {
    let timeout = null
    let date = Infinity

    const call = () => {
        date = Infinity
        fn()
    }

    return (delay = 0) => {
        const nextDate = Date.now() + delay

        if (nextDate < date) {
            date = nextDate

            clearTimeout(timeout)
            timeout = setTimeout(call, delay)
        }
    }
}

export const init = (store: Store) => {
    let listeningTo = null

    let table = null
    let ref = null
    const update = createQueue(() => onUpdate(store, ref, updateAfter, table))
    const updateAfter = callAfter(update)

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
