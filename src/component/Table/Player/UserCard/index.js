import React from 'react'
import style from './style.css'

import type { Player } from '../../../../type'

export type Props = {
    player: Player,
    angle: number,
    length: number,
    phy: number,
    speaking: boolean,
}

const userCardLength = 0.8

const transform = (angle, length, phy) =>
    `translate3d(${length * userCardLength}px,0,0)` +
    `rotate3d(0,0,1,${-angle}deg)` +
    `rotate3d(1,0,0,${-phy}deg)`

export const UserCard = ({ player, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: transform(angle, length, phy),
        }}
    >
        <div className={style.userCard}>
            <div className={style.userBar} />

            <div
                className={style.userCardPic}
                style={{
                    backgroundImage: `url(${player.pic[player.mood]})`,
                }}
            />
        </div>
    </div>
