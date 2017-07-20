import { set } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'game:update':
            return set(state, ['game'], action.game)

        case 'waitingRoom:update':
            return set(state, ['game'], {
                waiting: true,
                users: action.users,
                start_at: action.start_at,
            })
    }
    return state
}
