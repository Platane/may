import React from 'react'
import style from './style.css'

import type { Card } from '../../../type'

export type Props = {
    card: Card,
    size: number,
}

const icon = {
    diamond: '♦️',
    heart: '♥️',
    club: '♣️',
    spade: '♠️',
}

const color = {
    diamond: 'red',
    heart: 'red',
    club: 'black',
    spade: 'black',
}

const getColumns = ({ value }: Card): number[][] => {
    switch (value) {
        case '1':
            return [[], [0.5], []]
        case '2':
            return [[], [0, 1], []]
        case '3':
            return [[], [0, 0.5, 1], []]
        case '4':
            return [[0, 1], [], [0, 1]]
        case '5':
            return [[0, 1], [0.5], [0, 1]]
        case '6':
            return [[0, 0.5, 1], [], [0, 0.5, 1]]
        case '7':
            return [[0, 0.5, 1], [0.25], [0, 0.5, 1]]
        case '8':
            return [[0, 0.5, 1], [0.25, 0.75], [0, 0.5, 1]]
        case '9':
            return [[0, 0.333, 0.666, 1], [0.5], [0, 0.333, 0.666, 1]]
        case '10':
            return [
                [0, 0.333, 0.666, 1],
                [0.1665, 0.8325],
                [0, 0.333, 0.666, 1],
            ]
        default:
            return [[], [], []]
    }
}

const transform = (size, x, y) =>
    `translate3d(` +
    `${(0.4 + 0.2 * x / 2) * size / 1.4}px,` +
    `${(0.2 + 0.6 * y) * size}px,` +
    `0)`

export const Recto = ({ card, size }: Props) =>
    <div
        className={style.container}
        style={{
            color: color[card.color],
            fontSize: size / 6,
            borderRadius: size / 16,
        }}
    >
        <div className={style.top}>
            <div className={style.value}>
                {card.value}
            </div>
            <div className={style.color}>
                {icon[card.color]}
            </div>
        </div>
        <div className={style.bottom}>
            <div className={style.value}>
                {card.value}
            </div>
            <div className={style.color}>
                {icon[card.color]}
            </div>
        </div>

        {getColumns(card).map((ys, x) =>
            ys.map(y =>
                <div
                    key={x + '' + y}
                    style={{
                        transform: transform(size, x, y),
                    }}
                    className={style.backgroundColor}
                >
                    {icon[card.color]}
                </div>
            )
        )}
    </div>
