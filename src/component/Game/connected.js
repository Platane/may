import { Game as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'

const mapStateToProps = state => ({
    game: state.game,
})

export const Game = connect(mapStateToProps)(Component)
