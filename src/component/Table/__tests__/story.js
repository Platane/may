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
            players={users.map(_ => ({
                hand: [cards[0], cards[0]],
                bank: 10,
                bet: 10,
                folded: false,
            }))}
            users={users}
        />
    </div>
)
