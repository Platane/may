import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { User, Card, Table } from '../type'
import type { Action as Action_ } from '../action'

export type Action = Action_

export type Path = null | ['gate'] | ['table', string]

export type State = {
    appState: {
        path: Path,
    },

    me: User | null,

    table: Table | null,
}

// export type Store = ReduxStore<State, Action>
// export type Dispatch = ReduxDispatch<Action>
