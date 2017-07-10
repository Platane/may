import React from 'react'
import { storiesOf } from '@storybook/react'
import { GameAction } from '../state'

storiesOf('GameAction', module).add('default', () =>
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <GameAction n={1} width={500} height={500} />
    </div>
)
