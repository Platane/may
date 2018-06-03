import { set } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
  let nextMove = state.nextMove

  const playerIndex =
    state.game &&
    state.game.players &&
    state.game.players.findIndex(player => player.id === state.me.id)

  switch (action.type) {
    case 'game:call':
      nextMove = { type: 'call', player: playerIndex }
      break

    case 'game:fold':
      nextMove = { type: 'fold', player: playerIndex }
      break

    case 'game:raise':
      nextMove = {
        type: 'raise',
        player: playerIndex,
        value: action.value,
      }
      break
  }

  if (
    !state.game ||
    state.game.state !== 'playing' ||
    !state.me ||
    state.game.speaker !== playerIndex
  )
    nextMove = null

  if (nextMove !== state.nextMove) return set(state, ['nextMove'], nextMove)

  return state
}
