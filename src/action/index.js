import type { Action as Action_RegisterUser } from './thunk/registerUser'
import type { User } from '../type'

type Action_LocalStorageRead = { type: 'localStorage:read', user: User | null }
export const localStorageRead = (user: User | null) => ({
    type: 'localStorage:read',
    user,
})

type Action_TableUpdate = { type: 'table:update', table: any }
export const tableUpdate = table => ({
    type: 'table:update',
    table,
})

export type Action =
    | Action_RegisterUser
    | Action_LocalStorageRead
    | Action_TableUpdate
