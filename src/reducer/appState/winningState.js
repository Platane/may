import { set } from '../../util/redux'

import type { Action, State } from '../type'

export const reduce = (state: State, action: Action): State => {
    return set(state, ['appState', 'winningState'], true)
}
