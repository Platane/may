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

const shuffle = arr =>
    arr
        .map((_, i) => ({ value: Math.random(), i }))
        .sort((a, b) => (a.value < b.value ? 1 : -1))
        .map(({ i }) => arr[i])

export const createDeck = () => {
    const deck = shuffle(cards)

    return (): Card => deck.shift()
}
