import { toHiddenGame } from '../../service/gameSolver/toHiddenGame'
import * as PARAM from './param'
import { reduce } from '../../service/gameSolver/solver'

import type { Game } from '../../type'
import type { Game_Running, Game_Over } from '../../service/gameSolver/type'
import type { Room, Archived_Game } from './type'

/**
 * add properties that may be missing ( ie empty array / object )
 */
export const cleanRoom = (room: Room | null): Room | null => {
    switch (room && room.state) {
        case 'waiting':
            return {
                archive: [],
                pending_players: {},
                ...room,
            }
        case 'playing':
            return {
                archive: [],
                actions: [],
                ...room,
            }
        default:
            return null
    }
}

export const roomToGame = (meId: string | null, room: Room): Game | null => {
    if (room.state === 'playing')
        return toHiddenGame(meId, room.users, room.game)

    return null
}

export const roomToWaitingRoom = (room: Room) => {
    if (room.state === 'waiting')
        return {
            users: Object.keys(room.pending_players)
                .filter(
                    id =>
                        room.pending_players[id].tic >
                        Date.now() - PARAM.WAITING_PING_DELAY * 2
                )
                .map(id => room.pending_players[id].user),
            start_at: room.start_at,
        }

    return null
}

export const roomToEndTurnDate = (room: Room) =>
    room.state === 'playing' ? room.actions[0].date + PARAM.TURN_DURATION : null

export const archivedGameToGame = (
    archivedGame: Archived_Game
): Game | null => {
    const game = archivedGame.actions.reduce(
        (game, action) => reduce(game, action),
        archivedGame.game0
    )

    if (game.state !== 'over') return null

    return {
        ...toHiddenGame(null, archivedGame.users, game),
        winner: game.winner,
    }
}
