import { set } from '../util/redux'

// import type { Action, State } from './type'

import type { Action } from '../action/thunk/register'

const action: Action = { type: 'a ' }

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'register:success':
            return set(state, ['me'], action.user)

        default:
            return state
    }
}
