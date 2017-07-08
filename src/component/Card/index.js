import React from 'react'
import { Recto } from './Recto'
import { Transition } from 'react-propstransition'

import style from './style.css'

import type { Card as Card_type } from '../../type'

export type Props = {
    card: Card_type,
    size: number | 'auto',
    hidden: boolean,
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

const Verso = () => <div className={style.verso} />

export const Card = ({ card, size, hidden }: Props) =>
    <div
        className={style.container}
        style={{
            color: color[card.color],
            width: size === 'auto' ? 'auto' : size / 1.4,
            fontSize: size === 'auto' ? 18 : size / 10,
            borderRadius: size === 'auto' ? 10 : size / 16,
            transform: `rotate3d(0,1,0,${!hidden ? 0 : 180}deg)`,
        }}
    >
        <div className={style.ratio} />

        <Recto card={card} size={size} />

        <div className={!hidden ? style.versoHidden : style.versoVisible}>
            <Verso />
        </div>
    </div>

Card.defaultProps = {
    hidden: false,
    size: 'auto',
}
