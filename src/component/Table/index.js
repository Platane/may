import React from 'react'
import { Player } from './Player'
import style from './style.css'

import type {
    User,
    PlayerState,
    PlayerMood,
    Card as Card_type,
} from '../../type'

export type Props = {
    users: User[],
    bets: number[],
    states: PlayerState[],
    moods: PlayerMood[],
    hands: Array<[Card_type, Card_type] | null>,
    size: number,
}

export const Table = ({ users, bets, states, moods, hands, size }: Props) =>
    <div
        className={style.container}
        style={{
            width: size,
            height: size,
        }}
    >
        {users.map((user, i) =>
            <div
                key={user.id}
                style={{
                    transform: `translate3d(${size / 2}px,${size / 2}px,0)`,
                }}
            >
                <Player
                    angle={i / users.length * 360 + 77}
                    key={user.id}
                    length={size / 2.6}
                    user={user}
                    bet={bets[i]}
                    mood={moods[i]}
                    hand={hands[i]}
                    state={states[i]}
                />
            </div>
        )}
    </div>
