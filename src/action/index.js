import type { Action as Action_RegisterUser } from './thunk/registerUser'
import type { User } from '../type'

type Action_LocalStorageRead = { type: 'localStorage:read', user: User | null }
export const localStorageRead = (user: User | null) => ({
    type: 'localStorage:read',
    user,
})

//
type Action_UpdateGame = { type: 'game:update', game: any }
export const updateGame = game => ({
    type: 'game:update',
    game,
})

//
type Action_WaitingRoom = {
    type: 'waitingRoom:update',
    users: User[],
    start_at: number,
}
export const updateWaitingRoom = (users, start_at) => ({
    type: 'waitingRoom:update',
    users,
    start_at,
})

export type Action =
    | Action_RegisterUser
    | Action_LocalStorageRead
    | Action_UpdateGame
    | Action_WaitingRoom
