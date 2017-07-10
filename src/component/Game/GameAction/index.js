import React from 'react'

import style from './style.css'

export type Props = { stash: Object[] }

const bakeTransform = ({ size, position, direction, normal }) => ({
    transform: [
        `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
        `rotate3d(0,0,1,${Math.atan2(direction.x, -direction.y)}rad)`,
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
                style={bakeTransform(dollarBill)}
            />
        )}
    </div>
