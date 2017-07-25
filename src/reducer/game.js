import { set, merge } from '../util/redux'

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

            const player = state.game.players[playerIndex]

            const delta = Math.min(player.bank, action.value - player.bet)

            return merge(state, ['game', 'players', playerIndex], {
                bet: player.bet + delta,
                bank: player.bank - delta,
            })

        case 'waitingRoom:update':
            return set(state, ['game'], {
                waiting: true,
                users: action.users,
                start_at: action.start_at,
            })
    }
    return state
}
