import { chainReducer } from '../util/redux'
import { reduce as reducePath } from './appState/path'
import { reduce as reduceMe } from './me'

import type { State } from './type'

export const defaultState: State = {
    appState: {
        path: null,

        tableToJoin: 'laTableDesBoss',
    },

    me: null,
}

export const reduce = chainReducer(reduceMe, reducePath)
