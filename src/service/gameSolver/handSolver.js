import { Hand } from 'pokersolver'
import type { Card } from '../../type'

const cardToString = card =>
    (card.value == '10' ? 'T' : card.value) + card.color[0]

export const getWinner = (
    river: [Card, Card, Card, Card, Card],
    hands: Array<[Card, Card] | 'folded'>
) => {
    const PSHands = hands
        .map(
            (hand, i) =>
                hand === 'folded'
                    ? null
                    : {
                          hand: Hand.solve(
                              [...hand, ...river].map(cardToString)
                          ),
                          i,
                      }
        )
        .filter(Boolean)

    const winner = Hand.winners(PSHands.map(x => x.hand))[0]

    const x = PSHands.find(x => x.hand === winner)

    return x ? x.i : -1
}
