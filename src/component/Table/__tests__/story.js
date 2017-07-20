import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from '../index'

import { users } from '../../../__fixtures__/users'
import { cards } from '../../../__fixtures__/cards'

storiesOf('Table', module).add('default', () =>
    <div>
        <Table
            size={800}
            cards={cards.slice(0, 5)}
            players={users.slice(0, 3).map((user, i) => ({
                ...user,
                hand: [cards[i * 3], cards[i * 3 + 1]],
                mood: 'happy',
                bank: 10,
                bet: 10,
                folded: false,
            }))}
        />
    </div>
)
