import React from 'react'
import { Text } from '../../Text'
import { ImageInput } from '../../ImageInput'

import style from './style.css'

export type Props = {
    dataUrl: string,
    minimized: boolean,
}

export const Step2 = ({ pic, minimized, setHappyFace, setStep }: Props) =>
    <div className={style.container}>
        {!minimized && <Text>Show your face</Text>}
        {!minimized &&
            <div className={style.imageW}>
                <ImageInput onChange={setHappyFace}>
                    <div
                        className={style.image}
                        style={{
                            backgroundImage: `url(${pic.happy})`,
                        }}
                    />
                </ImageInput>
            </div>}

        {minimized &&
            <div className={style.imageW}>
                <div
                    className={style.image}
                    style={{
                        backgroundImage: `url(${pic.happy})`,
                    }}
                />
            </div>}
    </div>
