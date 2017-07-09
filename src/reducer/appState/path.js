import { set } from '../../util/redux'

import type { Action, State } from '../type'

export const reduce = (state: State, action: Action): State => {
    if (action.type === 'register:success')
        state = set(state, ['appState', 'path'], ['table', action.tableId])

    if (!state.me) state = set(state, ['appState', 'path'], ['gate'])

    return state
}
