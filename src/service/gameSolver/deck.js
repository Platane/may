import type { Card } from '../../type'

const colors = ['diamond', 'club', 'heart', 'spade']
const values = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
]

export const cards: Card[] = [].concat(
    ...colors.map(color => values.map(value => ({ color, value })))
)

export const createDeck = () => {
    const deck = cards.slice().sort((a, b) => (Math.random() > 0.5 ? 1 : -1))

    return (): Card => deck.shift()
}
