import React from 'react'
import { storiesOf } from '@storybook/react'
import { users } from '../../../__fixtures__/users'
import { WaitingRoom } from '../index'

storiesOf('WaitingRoom', module).add('default', () =>
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <WaitingRoom users={users} start_at={0} />
    </div>
)
