import React from 'react'
import { Motion, spring } from 'react-motion'
import { Token } from '../Token'
import style from './style.css'

export type Props = {
    bet: number,
    angle: number,
    length: number,
    phy: number,
    seed: number,
}

const stashLength = 0.5

export const BetStash = ({ bet, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `translate3d(${length * stashLength}px,0,0)`,
        }}
    >
        {Array.from({ length: bet }).map((_, i) =>
            <div key={i} className={style.token}>
                <Token seed={i + seed} length={length} stash />
            </div>
        )}

        <div className={style.labelBar} />
        <div
            className={style.label}
            style={{
                transform: `rotateZ(${angle}deg)`,
            }}
        >
            {bet}
        </div>
    </div>
