import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { GameAction } from '../state'

storiesOf('GameAction', module).add('default', () =>
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <GameAction
            n={30}
            width={300}
            height={500}
            onSetBet={action('setBet')}
            onFold={action('fold')}
        />
    </div>
)
