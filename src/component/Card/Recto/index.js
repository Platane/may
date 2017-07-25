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

const getColumns = ({ value }: Card): [number, number, number] => {
    switch (value) {
        case '1':
            return [0, 1, 0]
        case '2':
            return [0, 2, 0]
        case '3':
            return [0, 3, 0]
        case '4':
            return [2, 0, 2]
        case '5':
            return [2, 1, 2]
        case '6':
            return [3, 0, 3]
        case '7':
            return [3, 1, 3]
        case '8':
            return [3, 2, 3]
        case '9':
            return [4, 1, 4]
        case '10':
            return [4, 2, 4]
        default:
            return [0, 0, 0]
    }
}

const transform = (size, x, y, yMax) =>
    `translate3d(` +
    `${(0.35 + 0.3 * x / 2) * size / 1.4}px,` +
    `${(0.2 + 0.6 * (yMax === 1 ? 0.5 : y / (yMax - 1))) * size}px,` +
    `0)`

export const Recto = ({ card, size }: Props) =>
    <div
        className={style.container}
        style={{
            color: color[card.color],
            fontSize: size / 8,
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

        {getColumns(card).map((length, x) =>
            Array.from({ length }).map((_, y, arr) =>
                <div
                    key={x + '' + y}
                    style={{
                        transform: transform(size, x, y, arr.length),
                    }}
                    className={style.backgroundColor}
                >
                    {icon[card.color]}
                </div>
            )
        )}
    </div>
