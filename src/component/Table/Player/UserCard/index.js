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
    `translate3d(${length * userCardLength}px,0,0) rotateX(${-90}deg)`

export const UserCard = ({ player, angle, length, phy, speaking }: Props) =>
    <div
        className={style.container}
        style={{
            transform: transform(angle, length, phy),
        }}
    >
        <div
            className={
                style.userCard + ' ' + (speaking ? style.userSpeaking : '')
            }
        >
            <div className={style.userBar} />
            <div className={style.userBar2} />

            <div
                className={style.userCardPic}
                style={{
                    backgroundImage: `url(${player.pic[player.mood]})`,
                    transform: ` rotateY(${angle}deg)  rotateX(${90 - phy}deg)`,
                }}
            />
        </div>
    </div>
