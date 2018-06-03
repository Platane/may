import { set, merge } from '../util/redux'
import * as PARAM from '../sideEffect/com/param'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
  switch (action.type) {
    case 'waitingRoom:update':
      if (action.lastGame)
        return set(state, ['previousGame'], {
          state: 'over',
          ...action.lastGame,
        })
  }
  return state
}
