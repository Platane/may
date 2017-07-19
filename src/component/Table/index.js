import React from 'react'
import { Player } from './Player'
import { Card } from '../Card'
import style from './style.css'

import type { User, Card as Card_type } from '../../type'
import type { Player as Player_type } from '../../service/gameSolver/type'

export type Props = {
    players: Player_type[],
    users: User[],
    cards: Array<Card_type | null>,
    size: number,
}

const blankCard = { color: 'diamond', value: '1' }

export const Table = ({ users, players, cards, size }: Props) =>
    <div
        className={style.container}
        style={{
            width: size,
            height: size,
        }}
    >
        <div className={style.cards}>
            {cards.map((card, i) =>
                <div
                    key={i}
                    className={style.card}
                    style={{
                        transform: `translate3d(${(i - 2.5) * 45}px,0,0)`,
                    }}
                >
                    <Card card={card || blankCard} size={50} hidden={!card} />
                </div>
            )}
        </div>

        <div className={style.players}>
            {players.map(({ bank, folded, hand, bet }, i) =>
                <div
                    key={users[i].id}
                    style={{
                        transform: `translate3d(${size / 2}px,${size / 2}px,0)`,
                    }}
                >
                    <Player
                        angle={i / users.length * 360 + 77}
                        length={size / 2.6}
                        user={users[i]}
                        bet={bet}
                        mood={'happy'}
                        hand={hand}
                        folded={folded}
                    />
                </div>
            )}
        </div>
    </div>
