import React from 'react'
import { storiesOf } from '@storybook/react'
import { Timer } from '../index'

storiesOf('Timer', module).add('default', () => (
  <div style={{ width: 200, height: 200 }}>
    <Timer total={10000} date={Date.now() + 7000} color="tomato" />
  </div>
))
