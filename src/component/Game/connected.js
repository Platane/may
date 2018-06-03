import { Game as Component } from './fit'
import { connect } from 'react-redux'
import { registerUser } from '../../action/thunk/registerUser'
import * as PARAM from '../../sideEffect/com/param'
import { fold, call, raise, raiseTemp } from '../../action/game'

const mapStateToProps = state => {
  if (state.game.state === 'playing') {
    const mePlayer =
      state.me &&
      state.game &&
      state.game.players.find(player => player.id === state.me.id)

    return {
      game: state.game,
      end_turn_at: state.game.end_turn_at,
      turn_duration: PARAM.TURN_DURATION,

      mePlayer,

      meTurn:
        state.game &&
        state.game.speaker ===
          state.game.players.findIndex(player => player === mePlayer),
    }
  } else if (state.previousGame) {
    const mePlayer =
      state.me &&
      state.previousGame.players.find(player => player.id === state.me.id)

    return {
      game: state.previousGame,
      turn_duration: PARAM.WINNING_DURATION,
      mePlayer,
      meTurn: false,
    }
  } else return {}
}

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

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component)
