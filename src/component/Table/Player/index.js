import React from 'react'
import { Hand } from './Hand'
import style from './style.css'

import type {
    User,
    PlayerMood,
    Card as Card_type,
    Card_hidden,
} from '../../../type'

export type Props = {
    player: {
        ...User,
        bet: number,
        folded: boolean,
        mood: PlayerMood,
        hand: [Card_type | Card_hidden, Card_type | Card_hidden],
    },
    angle: number,
    length: number,
}

const l = {
    player: 0.8,
    hand: 0.65,
}

export const Player = ({ player, angle, length }: Props) =>
    <div className={style.container}>
        <Hand
            card={player.hand[0]}
            dir={1}
            length={length}
            angle={angle}
            folded={player.folded}
        />

        <Hand
            card={player.hand[1]}
            dir={-1}
            length={length}
            angle={angle}
            folded={player.folded}
        />

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
                    style={{
                        backgroundImage: `url(${player.pic[player.mood]})`,
                        border: `solid 3px ${player.folded ? '#fff' : '#aaa'}`,
                    }}
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
