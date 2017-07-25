import React from 'react'
import { Card } from '../../../Card'
import style from './style.css'

import type { Card as Card_type, Card_hidden } from '../../../../type'

export type Props = {
    folded: boolean,
    card: Card_type | Card_hidden,
    angle: number,
    length: number,
    dir: 1 | -1,
}

const blankCard: Card_type = {
    color: 'spade',
    value: '1',
}

const cardLength = 0.63

const cardWidth = 68

const transformCard = (angle, length, dir, folded) =>
    folded
        ? `translate3d(0,${cardWidth * 0.1 * dir}px,0)` +
          `rotate3d(0,0,1,90deg)` +
          `scale(0.5,0.5)`
        : `translate3d(${length * cardLength}px,${cardWidth *
              0.55 *
              dir}px,0)` + `rotate3d(0,0,1,90deg)`

export const Hand = ({ card, folded, angle, length, dir }: Props) =>
    <div
        className={style.container}
        style={{
            left: -cardWidth * 0.5,
            top: -cardWidth * 0.5 * 1.4,
            transform: transformCard(angle, length, dir, folded),
        }}
    >
        <Card
            hidden={card.hidden || folded}
            card={card.hidden ? blankCard : card}
            size={cardWidth * 1.4}
        />
    </div>
