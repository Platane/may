import type { Game_Running, Game_Over } from './type'
import type { Game as HiddenGame, User } from '../../type'

const hiddenCard = { hidden: true }

const hideCards = (river, turn) =>
  (turn === 0 && [
    hiddenCard,
    hiddenCard,
    hiddenCard,
    hiddenCard,
    hiddenCard,
  ]) ||
  (turn === 1 && [river[0], river[1], river[2], hiddenCard, hiddenCard]) ||
  (turn === 2 && [river[0], river[1], river[2], river[3], hiddenCard]) ||
  river

export const toHiddenGame = (
  meId: string | null,
  users: User[],
  game: Game_Running | Game_Over
): HiddenGame => ({
  speaker: game.state === 'running' ? game.speaker || 0 : null,

  cards: hideCards(game.river, game.state === 'running' ? game.turn : 4),

  players: game.players.map(({ bet, bank, folded, hand }, i) => ({
    ...users[i],

    mood: 'happy',

    bank,

    hand:
      users[i].id === meId || game.state === 'over'
        ? hand
        : [hiddenCard, hiddenCard],

    bet,

    folded,
  })),
})
