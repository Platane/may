import { set } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'table:update':
            return set(state, ['table'], action.table)
    }
    return state
}
