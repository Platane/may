import { Hand } from 'pokersolver'
import type { Card } from '../../type'

/**
 * wrapper for pokersolver
 */

const cardToString = card =>
    (card.value == '10' ? 'T' : card.value) + card.color[0]

/**
 * return the index of the winner
 * @param  river   the five card in the river
 * @param  hands   the card of each player ( of null if the player is folded )
 */
export const getWinner = (
    river: [Card, Card, Card, Card, Card],
    hands: Array<[Card, Card] | null>
): number => {
    const PSHands = hands
        .map(
            (hand, i) =>
                hand && {
                    hand: Hand.solve([...hand, ...river].map(cardToString)),
                    i,
                }
        )
        .filter(Boolean)

    const winner = Hand.winners(PSHands.map(x => x.hand))[0]

    const x = PSHands.find(x => x.hand === winner)

    return x ? x.i : -1
}
