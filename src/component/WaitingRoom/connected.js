import { WaitingRoom as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'

const mapStateToProps = state => {
    const users = Object.keys(state.table.pending_players)
        .map(id => state.table.pending_players[id])
        .filter(x => Date.now() - x.tic < 10000)
        .map(({ user }) => user)

    return { users, start_at: state.table.start_at }
}

export const WaitingRoom = connect(mapStateToProps)(Component)
