import type { Action as Action_Game } from './game'
import type { Action as Action_RegisterUser } from './thunk/registerUser'
import type { User, Game } from '../type'

type Action_LocalStorageRead = { type: 'localStorage:read', user: User | null }
export const localStorageRead = (user: User | null) => ({
    type: 'localStorage:read',
    user,
})

//
type Action_UpdateGame = {
    type: 'game:update',
    game: Game,
    end_turn_at: number,
}
export const updateGame = (game, end_turn_at) => ({
    type: 'game:update',
    game,
    end_turn_at,
})

//
type Action_WaitingRoom = {
    type: 'waitingRoom:update',
    users: User[],
    start_at: number,
    lastGame: Game,
}
export const updateWaitingRoom = (users, start_at, lastGame) => ({
    type: 'waitingRoom:update',
    users,
    start_at,
    lastGame,
})

export type Action =
    | Action_Game
    | Action_RegisterUser
    | Action_LocalStorageRead
    | Action_UpdateGame
    | Action_WaitingRoom
