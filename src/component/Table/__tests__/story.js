import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from '../index'

import { users } from '../../../__fixtures__/users'
import { cards } from '../../../__fixtures__/cards'

const players = Array.from({ length: 16 }).map((_, i) => ({
    ...users[i % users.length],
    id: i,
    hand: [cards[i * 3 % cards.length], cards[(i * 3 + 17) % cards.length]],
    mood: 'happy',
    bank: i,
    bet: i,
    folded: i % 4 === 2,
}))
;[2, 3, 4, 8].forEach(n =>
    storiesOf('Table', module).add(`${n} players`, () =>
        <div style={{ backgroundColor: '#c1d37f' }}>
            <Table
                size={800}
                cards={cards.slice(0, 5)}
                players={players.slice(0, n)}
            />
        </div>
    )
)
