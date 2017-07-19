import { Game as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'

const mapStateToProps = state => ({
    game: state.table.game,
    users: state.table.users,
})

export const Game = connect(mapStateToProps)(Component)
