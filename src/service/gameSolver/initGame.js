import { createDeck } from './deck'

import type { Action, Game_Running, Game_Over, Table } from './type'

export const initGame = (n: number, blind: number = 0): Game_Running => {
    const pick = createDeck()

    if (n > 16) throw new Error('too many player')

    return {
        state: 'running',
        turn: 0,
        bets: Array.from({ length: n }).map((_, i) => {
            switch (i) {
                case 0:
                    return blind
                case 1:
                    return blind * 2
                default:
                    return 0
            }
        }),
        hands: Array.from({ length: n }).map(() => [pick(), pick()]),
        river: [pick(), pick(), pick(), pick(), pick()],
        n: 2,
        speaker: 2 % n,
    }
}
