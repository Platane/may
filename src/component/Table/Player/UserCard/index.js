import React from 'react'
import { Motion, spring } from 'react-motion'
import style from './style.css'

import type { Player } from '../../../../type'

export type Props = {
    player: Player,
    angle: number,
    length: number,
    phy: number,
}

const userCardLength = 0.8
const stashLength = 1

export const UserCard = ({ player, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${length *
                userCardLength}px,0,0) rotate3d(0,0,1,${angle}deg)`,
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
