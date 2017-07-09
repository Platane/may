import React from 'react'
import { Text } from '../../Text'

import style from './style.css'

export type Props = {
    name: string,
    minimized: boolean,
    setName: (name: string) => void,
    setStep: (_: any) => void,
}

export const Step1 = ({ name, minimized, setName, setStep }: Props) =>
    <div className={style.container}>
        {!minimized &&
            <div className={style.main}>
                <Text>Hi, what's your name ?</Text>
                <input
                    value={name}
                    className={style.input}
                    type="text"
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setStep(1)}
                />
            </div>}

        {minimized &&
            <Text>
                {name}
            </Text>}
    </div>
