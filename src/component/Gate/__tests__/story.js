import React from 'react'
import { storiesOf } from '@storybook/react'
import { Gate, SimpleGate } from '../index'

storiesOf('Gate', module)
  .add('step 1', () => (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
      <SimpleGate step={0} name={'timmy'} pic={{}} />
    </div>
  ))
  .add('step 2', () => (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
      <SimpleGate step={1} name={'timmy'} pic={{}} />
    </div>
  ))
  .add('step 3', () => (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
      <SimpleGate step={2} name={'timmy'} pic={{}} />
    </div>
  ))
  .add('with state', () => (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Gate />
    </div>
  ))
