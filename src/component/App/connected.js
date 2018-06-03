import { App as Component } from './index'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  let page = null

  if (!state.me) page = 'gate'
  else if (
    state.game &&
    state.game.state === 'waiting' &&
    state.appState.winningState &&
    state.previousGame
  )
    page = 'table'
  else if (state.game && state.game.state === 'waiting') page = 'waitingRoom'
  else if (state.game) page = 'table'

  return { page }
}

export const App = connect(mapStateToProps)(Component)
