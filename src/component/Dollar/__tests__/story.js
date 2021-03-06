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

storiesOf('Dollar', module).add('default', () => (
  <div>
    {[user, ...users, null].map((user, i) =>
      ['happy', 'sad', 'standard', 'yolo'].map((mood, j) => (
        <div key={((user && user.id) || 'x') + mood} style={{ margin: 10 }}>
          <Dollar
            user={user}
            mood={mood}
            size={800 * Math.pow(0.9, i * 4 + j)}
          />
        </div>
      ))
    )}
  </div>
))
