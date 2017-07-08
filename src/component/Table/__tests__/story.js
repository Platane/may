import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from '../index'

import { users } from '../../../__fixtures__/users'
import { cards } from '../../../__fixtures__/cards'

storiesOf('Table', module).add('default', () =>
    <div>
        <Table
            size={800}
            hands={users.map(_ => null)}
            users={users}
            moods={users.map(_ => 'happy')}
            bets={users.map(_ => 10)}
            states={users.map(_ => 'inGame')}
        />
    </div>
)
