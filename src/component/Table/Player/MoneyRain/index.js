import React from 'react'
import { Dollar } from '../../../Dollar'
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

const getOpacity = (tint, pos) =>
    (tint * 0.5 + 0.5) *
    (0.5 + 0.5 * Math.max(0, Math.min(1, 1 + pos.x / 100))) *
    Math.max(0, Math.min(1, 1 - pos.z / 200))

export const MoneyRain = ({ angle, length, particules, user }: Props) =>
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
                <Dollar size={70} user={user} />

                <div
                    className={style.tint}
                    style={{ opacity: getOpacity(tint, pos) }}
                />
            </div>
        )}
    </div>

// <div
//     key={i}
//     className={style.confetti}
//     style={{ backgroundColor: color(tint, pos) }}
//     />
