import { WaitingRoom as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'

const mapStateToProps = state => {
    return {
        users: (state.game && state.game.users) || [],
        start_at: state.game.start_at || 0,
    }
}

export const WaitingRoom = connect(mapStateToProps)(Component)
