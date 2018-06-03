import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { User, Card, Game } from '../type'
import type { Action as Action_ } from '../action'
import type { Action as GameAction } from '../service/gameSolver/type'

export type Action = Action_

export type Path = null | ['gate'] | ['table', string]

type Game_waiting = {
  state: 'waiting',
  users: User[],
  start_at: number,
}

type Game_playing = {
  ...Game,
  state: 'playing',
  end_turn_at: number,
}

type Game_over = {
  ...Game,
  state: 'over',
  winner: number,
}

export type State = {
  appState: {
    path: Path,

    tableToJoin: string | null,

    winningState: false,
  },

  game: Game_playing | Game_waiting | null,

  me: User | null,

  nextMove: GameAction | null,

  previousGame: Game_over | null,
}

// export type Store = ReduxStore<State, Action>
// export type Dispatch = ReduxDispatch<Action>
