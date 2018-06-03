import { createDeck } from './deck'

import type { Game_Running } from './type'

export const initGame = (banks: number[], blind: number = 0): Game_Running => {
  const pick = createDeck()

  if (banks.length > 16) throw new Error('too many player')

  return {
    state: 'running',
    turn: 0,
    blind,
    players: banks.map((bank, i) => {
      const bet = (0 === i && blind) || (1 === i && blind * 2) || 0

      return {
        bet,
        bank: bank - bet,
        hand: [pick(), pick()],
        folded: false,
      }
    }),
    river: [pick(), pick(), pick(), pick(), pick()],
    n: 2,
    speaker: 2 % banks.length,
  }
}
