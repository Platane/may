import React from 'react'
import style from './style.css'

import type { Card } from '../../../type'

export type Props = {
    card: Card,
    size: number | 'auto',
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

export const Recto = ({ card, size }: Props) =>
    <div
        className={style.container}
        style={{
            color: color[card.color],
            fontSize: size === 'auto' ? 18 : size / 10,
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
    </div>
