import { chainReducer } from '../util/redux'
import { reduce as reducePath } from './appState/path'
import { reduce as reduceMe } from './me'
import { reduce as reduceGame } from './game'
import { reduce as reduceNextMove } from './nextMove'

import type { State } from './type'

export const defaultState: State = {
    appState: {
        path: null,

        tableToJoin: 'laTableDesBoss',
    },

    me: null,

    game: null,

    nextMove: null,
}

export const reduce = chainReducer(
    reduceMe,
    reducePath,
    reduceGame,
    reduceNextMove
)
