import { chainReducer } from '../util/redux'
import { reduce as reducePath } from './appState/path'
import { reduce as reduceWinningState } from './appState/winningState'
import { reduce as reduceMe } from './me'
import { reduce as reduceGame } from './game'
import { reduce as reduceNextMove } from './nextMove'
import { reduce as reducePreviousGame } from './previousGame'

import type { State } from './type'

export const defaultState: State = {
    appState: {
        path: null,

        tableToJoin: 'laTableDesBoss',

        winningState: false,
    },

    me: null,

    game: null,

    previousGame: null,

    nextMove: null,
}

export const reduce = chainReducer(
    reduceWinningState,
    reduceMe,
    reducePath,
    reduceGame,
    reduceNextMove,
    reducePreviousGame
)
