import React from 'react'
import { Motion, spring } from 'react-motion'
import { Token } from '../Token'
import style from './style.css'

import type { Player } from '../../../../type'

export type Props = {
    bank: number,
    angle: number,
    length: number,
    phy: number,
    seed: number,
}

const stashLength = 0.86

export const Bank = ({ bank, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${length *
                stashLength}px,0,0)`,
        }}
    >
        {Array.from({ length: Math.min(bank, 24) }).map((_, i) =>
            <div key={i} className={style.tokenWrapper}>
                <Token seed={i} length={length} stack />
            </div>
        )}

        <div
            className={style.label}
            style={{
                transform: `rotateZ(${angle}deg)`,
            }}
        >
            {bank}
        </div>
    </div>
