import { set } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'game:update':
            return set(state, ['game'], {
                ...action.game,
                end_turn_at: action.end_turn_at,
            })

        case 'game:raise:temp':
            if (!state.game || !state.game.players || !state.me) break

            const playerIndex = state.game.players.findIndex(
                player => player.id === state.me.id
            )

            return set(
                state,
                ['game', 'players', playerIndex, 'bet'],
                action.value
            )

        case 'waitingRoom:update':
            return set(state, ['game'], {
                waiting: true,
                users: action.users,
                start_at: action.start_at,
            })
    }
    return state
}
