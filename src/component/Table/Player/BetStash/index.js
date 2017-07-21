import React from 'react'
import { Motion, spring } from 'react-motion'
import { Dollar } from '../../../Dollar'
import style from './style.css'

export type Props = {
    bet: number,
    angle: number,
    length: number,
    phy: number,
    seed: number,
}

const stashLength = 0.4

const pos = Array.from({ length: 30 }).map(() => {
    const a = Math.random() * Math.PI * 2
    const r = Math.random()
    return { x: r * Math.cos(a), y: r * Math.sin(a), z: 1 - r }
})

const transformToken = (i, length) =>
    `translate3d(` +
    `${pos[i % pos.length].x * length * 0.07}px,` +
    `${pos[i % pos.length].y * length * 0.07}px,` +
    `0px)`

const colorToken = i => `hsl(197, 37%, ${12 + 20 * (i * 17 % 31) / 31}%)`

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
                <div
                    className={style.token}
                    style={{
                        backgroundColor: colorToken(i + seed * 2),
                        transform: transformToken(i + seed, length),
                    }}
                />
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
    </div>
