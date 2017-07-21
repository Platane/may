import React from 'react'
import style from './style.css'

import type { Player } from '../../../../type'

export type Props = {
    n: number,
    offset: number,
    length: number,
}

const computePath = (i, n, offset) => {
    const a = (i + 0.5) / n * Math.PI * 2 + offset
    const b = (i + 1.5) / n * Math.PI * 2 + offset

    return [
        'M 0 0',
        `L ${Math.cos(a)} ${Math.sin(a)}`,
        `A 1 1 0 0 1 ${Math.cos(b)} ${Math.sin(b)}`,
        'z',
    ].join('')
}

const color = (n, i) => {
    const k = n % 2 === 0 ? 2 : 3

    return `rgba(0,0,0,${i % k * 0.02})`
}

export const Carpet = ({ n, offset, length }: Props) =>
    <div className={style.container}>
        <svg
            viewBox="-1 -1 2 2"
            className={style.svg}
            style={{ transform: `scale(${length / 100},${length / 100})` }}
        >
            {Array.from({ length: n }).map((_, i) =>
                <path
                    key={i}
                    fill={color(n, i)}
                    d={computePath(i, n, offset)}
                />
            )}
        </svg>
    </div>
