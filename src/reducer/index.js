import { chainReducer } from '../util/redux'
import { reduce as reducePath } from './appState/path'
import { reduce as reduceMe } from './me'
import { reduce as reduceTable } from './table'

import type { State } from './type'

export const defaultState: State = {
    appState: {
        path: null,

        tableToJoin: 'laTableDesBoss',
    },

    me: null,

    table: null,
}

export const reduce = chainReducer(reduceMe, reducePath, reduceTable)
