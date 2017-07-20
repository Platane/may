import React from 'react'
import { Motion, spring } from 'react-motion'
import { Dollar } from '../../../Dollar'
import style from './style.css'

export type Props = {
    bet: number,
    angle: number,
    length: number,
    seed: number,
}

const stashLength = 0.4

const pos = Array.from({ length: 30 }).map(() => {
    const a = Math.random() * Math.PI * 2
    const r = Math.random()
    return { x: r * Math.cos(a), y: r * Math.sin(a) }
})

const transformToken = (i, length) =>
    `translate3d(` +
    `${pos[i % pos.length].x * length * 0.1}px` +
    `,${pos[i % pos.length].y * length * 0.1}px,0)`

const colorToken = i => `hsl(197, 37%, ${12 + 20 * (i * 17 % 31) / 31}%)`

export const BetStash = ({ bet, angle, length, seed }: Props) =>
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
    </div>
