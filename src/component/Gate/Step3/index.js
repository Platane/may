import React from 'react'
import { Button } from '../../Button'
import { Text } from '../../Text'

import style from './style.css'

export type Props = {
    minimized: boolean,
    submit: () => void,
}

export const Step3 = ({ submit, minimized }: Props) =>
    minimized
        ? null
        : <Button onClick={submit}>
              <Text>Submit</Text>
          </Button>
