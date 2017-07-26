import React from 'react'
import style from './style.css'

import type { Player } from '../../../../type'
import type { Point } from '../../../../util/math/point'

export type Props = {
    angle: number,
    length: number,
    particules: Array<{
        pos: Point,
        opacity: number,
        rz: number,
        ry: number,
        tint: number,
    }>,
}

const l = 0.7

const color = (tint, pos) =>
    `hsl(${Math.floor(tint * 3) / 3 * 360},${Math.min(1, pos.z / 100) * 30 +
        40}%,${70}%)`

export const MoneyRain = ({ angle, length, particules }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `translate3d(${length * l}px,0,0)`,
        }}
    >
        {particules.map(({ pos, rz, ry, angle, opacity, tint }, i) =>
            <div
                key={i}
                className={style.confettiWrapper}
                style={{
                    opacity,
                    transform:
                        `translate3d(${pos.x}px,${pos.y}px,${pos.z}px)` +
                        `rotateZ(${rz}rad)` +
                        `rotateY(${ry}rad)`,
                }}
            >
                <div
                    key={i}
                    className={style.confetti}
                    style={{ backgroundColor: color(tint, pos) }}
                />
            </div>
        )}
    </div>
