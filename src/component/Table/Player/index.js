import React from 'react'
import { Card } from '../../Card'
import style from './style.css'

import type { User, PlayerMood, Card as Card_type } from '../../../type'

export type Props = {
    user: User,
    bet: number,
    folded: boolean,
    mood: PlayerMood,
    hand: [Card_type, Card_type] | null,
    angle: number,
    length: number,
}

const l = {
    player: 0.8,
    hand: 0.65,
}

const blankCard: Card_type = {
    color: 'spade',
    value: '1',
}

export const Player = ({ user, mood, angle, hand, length }: Props) =>
    <div className={style.container}>
        <div
            className={style.handZone}
            style={{
                transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${length *
                    l.hand}px,0,0) rotate3d(0,0,1,90deg)`,
            }}
        >
            <div className={style.center} />
            <div className={style.hand}>
                <div className={style.handCard}>
                    <Card
                        hidden={hand === null}
                        card={hand ? hand[0] : blankCard}
                        size={90}
                    />
                </div>
                <div className={style.handCard}>
                    <Card
                        hidden={hand === null}
                        card={hand ? hand[1] : blankCard}
                        size={90}
                    />
                </div>
            </div>
        </div>

        <div
            className={style.userZone}
            style={{
                transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${length *
                    l.player}px,0,0) rotate3d(0,0,1,${angle}deg)`,
            }}
        >
            <div className={style.userBar} />

            <div className={style.center} />

            <div className={style.userCard}>
                <div
                    className={style.userCardPic}
                    style={{ backgroundImage: `url(${user.pic[mood]})` }}
                />
            </div>
        </div>

        {Array.from({ length: 10 }).map((_, i, arr) =>
            <div
                className={style.probe}
                key={i}
                style={{
                    transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${i /
                        arr.length *
                        length}px,0,0)`,
                }}
            >
                <div className={style.center} />
            </div>
        )}
    </div>
