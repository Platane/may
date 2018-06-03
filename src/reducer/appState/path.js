import { set } from '../../util/redux'

import type { Action, State } from '../type'

export const reduce = (state: State, action: Action): State => {
  // the state can not be gate if the user is connected
  if (state.me && state.appState.path && state.appState.path[0] === 'gate')
    state = set(state, ['appState', 'path'], null)

  // the state must be gate if the user is not connected
  if (!state.me) state = set(state, ['appState', 'path'], ['gate'])

  return state
}
