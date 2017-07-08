import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '../index'
import { Text } from '../../Text'

storiesOf('Button', module).add('default', () =>
    <Button>
        <Text>Hello</Text>
    </Button>
)
