import { reduce as reduceGame } from '../../service/gameSolver/solver'
import { initGame } from '../../service/gameSolver/initGame'
import type { State } from '../../reducer/type'
import type { Room, Room_Waiting, Room_Playing } from './type'

const initWaitingRoom = (): Room_Waiting => ({
    state: 'waiting',
    start_at: Date.now() + 30000,
    pending_players: {},
    archive: [],
})

const initPlayingRoom = (players): Room_Playing => {
    const game0 = initGame(players.map(player => player.bank), 1)

    const playingRoom = {
        tic: Date.now(),
        state: 'playing',
        game: game0,
        game0,
        actions: [],
        users: players.map(player => player.user),
        archive: [],
    }

    return playingRoom
}

export const loop = async (
    state: State,
    room: Room | null,
    setRoom: (room: Room) => Promise<*>,
    scheduleNextUpdate: (delay: number) => void
) => {
    const me = state.me

    if (!me) return

    // no room
    // create it
    if (!room) return await setRoom(initWaitingRoom())

    switch (room.state) {
        case 'waiting':
            // start the game if possible
            {
                // player that are ready
                const playersReady = Object.keys(room.pending_players)
                    .map(key => room.pending_players[key])
                    .filter(player => player.bank > 10)
                    .filter(player => player.tic > Date.now() - 10000)
                    .sort((a, b) => (a.tic > b.tic ? 1 : -1))

                // delay is ok
                let shouldStartIn = room.start_at - Date.now()

                if (
                    shouldStartIn < 0 &&
                    playersReady.length > 1 &&
                    playersReady[0].user.id === me.id
                ) {
                    // should start the game
                    return await setRoom(initPlayingRoom(playersReady))
                } else if (shouldStartIn > 0) {
                    // schedule to start
                    scheduleNextUpdate(shouldStartIn)
                }
            }

            // should tic every X second to notify that I am ready
            {
                const player = room.pending_players[me.id]

                let shouldReportReadyIn = !player
                    ? -1
                    : player.tic + 5000 - Date.now()

                if (shouldReportReadyIn < 0) {
                    shouldReportReadyIn = 5000

                    await setRoom({
                        ...room,
                        pending_players: {
                            ...room.pending_players,
                            [me.id]: { user: me, tic: Date.now(), bank: 100 },
                        },
                    })
                }

                scheduleNextUpdate(shouldReportReadyIn)
            }
            break

        case 'playing':
            let action = null

            // fold players if it did not play in time
            {
                const DELAY = 40000
                let shouldPlayIn = room.tic + DELAY - Date.now()

                if (shouldPlayIn < 0) {
                    action = { type: 'fold', player: room.game.speaker }

                    shouldPlayIn = DELAY
                }

                scheduleNextUpdate(shouldPlayIn)
            }

            // play instructed action
            // TODO

            // an action should be made
            if (action) {
                const newRoom = {
                    game: reduceGame(room.game, action),
                    actions: [...room.actions, { date: Date.now(), action }],
                }

                // the action did finish the game
                if (newRoom.game.state === 'over') {
                    return await setRoom(initWaitingRoom())
                } else {
                    return await setRoom({
                        ...room,
                        tic: Date.now(),
                        ...newRoom,
                    })
                }
            }
            break
    }
}
