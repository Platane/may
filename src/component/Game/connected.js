import { Game as Component } from './fit'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'
import * as PARAM from '../../sideEffect/com/param'
import { fold, call, raise, raiseTemp } from '../../action/game'

const mapStateToProps = state => ({
    game: state.game,
    end_turn_at: state.game.end_turn_at,
    turn_duration: PARAM.TURN_DURATION,

    mePlayer: state.game.players.find(player => player.id === state.me.id),
    meTurn:
        state.game &&
        state.game.speaker ===
            state.game.players.findIndex(player => player.id === state.me.id),
})

const mapDispatchToProps = {
    fold,
    call,
    raise,
    onSetBet: raiseTemp,
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
    stateProps.meTurn
        ? { ...stateProps, ...dispatchProps, ...ownProps }
        : { ...stateProps, ...ownProps }

export const Game = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    Component
)
