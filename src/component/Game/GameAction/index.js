import React from 'react'

import style from './style.css'

export type Props = { stash: Object[] }

const bakeTransform = ({ size, position, direction, normal, tint }, i) => ({
    transform: [
        `translate3d(${position.x + tint * 5 - 2.5}px, ${position.y +
            tint * 5}px, ${position.z + i * 3}px)`,
        `rotate3d(0,0,1,${Math.atan2(direction.x, -direction.y) +
            tint * 0.1}rad)`,
    ].join(' '),
    width: size.height,
    height: size.width,
    left: -size.height / 2,
    top: -size.width / 2,
})

export const GameAction = ({ stash, onStartSwipe }: Props) =>
    <div className={style.container}>
        {stash.map((dollarBill, i) =>
            <div
                key={i}
                className={style.dollarBill}
                onMouseDown={event => onStartSwipe(i, event)}
                style={bakeTransform(dollarBill, i)}
            />
        )}
    </div>
