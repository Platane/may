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

const stashLength = length => length * (length < 350 ? 0.25 : 0.5)

export const BetStash = ({ bet, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `translate3d(${stashLength(length)}px,0,0)`,
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
                transform: `rotateZ(${-angle}deg)`,
            }}
        >
            <Motion
                defaultStyle={{ bet: 0 }}
                style={{ bet: spring(bet, { stiffness: 50, damping: 10 }) }}
            >
                {v => {
                    const d = Math.min(1, Math.abs(v.bet - bet) / 3)
                    const u = Math.abs(0.5 - v.bet % 1) * 2
                    const s = 1 + u * d

                    return (
                        <span style={{ transform: `scale(${s},${s})` }}>
                            {Math.round(v.bet)}
                        </span>
                    )
                }}
            </Motion>
        </div>
    </div>
