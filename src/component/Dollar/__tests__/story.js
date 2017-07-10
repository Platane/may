import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dollar } from '../index'
import { users } from '../../../__fixtures__/users'

const img = require('../../../asset/image/platane.jpg')

const user = {
    id: 'platane',
    name: 'platane',
    pic: {
        happy: img,
        sad: img,
        idle: img,
    },
}

storiesOf('Dollar', module).add('default', () =>
    <div>
        {[user, ...users].map((user, i) =>
            ['happy', 'sad', 'standard', 'yolo'].map((state, j) =>
                <div key={user.id + state} style={{ margin: 10 }}>
                    <Dollar
                        user={user}
                        state={state}
                        size={800 * Math.pow(0.9, i * 4 + j)}
                    />
                </div>
            )
        )}
    </div>
)
