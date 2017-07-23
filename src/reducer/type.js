import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { User, Card, Game } from '../type'
import type { Action as Action_ } from '../action'

export type Action = Action_

export type Path = null | ['gate'] | ['table', string]

type Game_waiting = {
    waiting: true,
    users: User[],
    start_at: number,
}

type Game_playing = {
    ...Game,

    end_turn_at: number,
}

export type State = {
    appState: {
        path: Path,

        tableToJoin: string | null,
    },

    game: Game_playing | Game_waiting | null,

    me: User | null,
}

// export type Store = ReduxStore<State, Action>
// export type Dispatch = ReduxDispatch<Action>
