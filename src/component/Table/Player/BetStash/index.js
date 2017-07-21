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

const stashLength = 0.4

const transformLabel = (angle, length, phy) =>
    `rotate3d(0,0,1,${-angle}deg)` +
    `translate3d(${length * stashLength}px,0,0)`
// `rotate3d(0,0,1,${angle}deg)` +
// `rotate3d(0,0,1,${0}deg)`

export const BetStash = ({ bet, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${length *
                stashLength}px,0,0)`,
        }}
    >
        {Array.from({ length: bet }).map((_, i) =>
            <div key={i} className={style.tokenWrapper}>
                <Token seed={i + seed} length={length} stash />
            </div>
        )}

        <div
            className={style.label}
            style={{
                transform: `rotate3d(0,0,1,${angle}deg) rotate3d(1,0,0,${-phy}deg)`,
            }}
        >
            <div className={style.labelBar} />
            <div className={style.labelValue}>
                {bet}
            </div>
        </div>

        <div
            className={style.floorLabel}
            style={{
                transform: `rotateZ(${angle}deg)`,
            }}
        >
            {bet}
        </div>
    </div>
