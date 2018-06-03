import { set } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
  switch (action.type) {
    case 'registerUser:success':
      return set(state, ['me'], action.user)

    case 'localStorage:read':
      return action.user ? set(state, ['me'], action.user) : state

    default:
      return state
  }
}
