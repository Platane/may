import { WaitingRoom as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'
import * as PARAM from '../../sideEffect/com/param'

const mapStateToProps = state => {
  return {
    users: (state.game && state.game.users) || [],
    start_at: state.game.start_at || 0,
    duration: PARAM.WAITING_DURATION,
  }
}

export const WaitingRoom = connect(mapStateToProps)(Component)
