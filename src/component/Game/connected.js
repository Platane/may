import { Game as Component } from './index'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'

import { fold, call, raise } from '../../action/game'

const mapStateToProps = state => ({
    game: state.game,
    end_turn_at: state.game.end_turn_at,
    meTurn:
        state.game &&
        state.game.speaker ===
            state.game.players.findIndex(player => player.id === state.me.id),
})

const mapDispatchToProps = dispatch => {
    fold, call, raise
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
    stateProps.myTurn
        ? { ...stateProps, ...dispatchProps, ...ownProps }
        : { ...stateProps, ...ownProps }

export const Game = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    Component
)
