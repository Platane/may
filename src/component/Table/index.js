import React from 'react'
import { Player } from './Player'
import { Card } from '../Card'
import style from './style.css'

import type {
    User,
    Player as Player_type,
    Card as Card_type,
    Card_hidden,
} from '../../type'

export type Props = {
    players: Player_type[],
    cards: Array<Card_type | Card_hidden>,
    size: number,
}

const blankCard = { color: 'diamond', value: '1' }

export const Table = ({ players, cards, size }: Props) =>
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
                    <Card
                        card={card.hidden ? blankCard : card}
                        size={50}
                        hidden={card.hidden}
                    />
                </div>
            )}
        </div>

        <div className={style.players}>
            {players.map((player, i) =>
                <div
                    key={player.id}
                    style={{
                        transform: `translate3d(${size / 2}px,${size / 2}px,0)`,
                    }}
                >
                    <Player
                        angle={i / players.length * 360 + 77}
                        length={size / 2.6}
                        player={player}
                    />
                </div>
            )}
        </div>
    </div>
