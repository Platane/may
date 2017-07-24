import React from 'react'
import { Player } from './Player'
import { SpeakerArrow } from './SpeakerArrow'
import { Carpet } from './Carpet'
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
    speaker: number | null,
}

const blankCard = { color: 'diamond', value: '1' }

const angleOffset = 147

const cardWidth = 60

const phy = 40

const worldTransform = size =>
    `translate3d(${size / 2}px,${size / 2}px,0) rotateX(${phy}deg)`

const cardTransform = i =>
    `translate3d(${(i - 2.5) * cardWidth * 1.1}px,${-cardWidth * 0.7}px,1px)`

const cardTransformBottom = (i, size, phy) =>
    `rotateX(${-phy}deg)` +
    `translate3d(${(i - 2.5) * cardWidth * 1.1}px,${-size / 1.6 -
        cardWidth * 0.7}px,0)`

export const Table = ({ players, cards, speaker, size }: Props) =>
    <div
        className={style.container}
        style={{
            width: size,
            height: size,
            perspective: '1000px',
        }}
    >
        <div
            className={style.world}
            style={{
                transform: worldTransform(size),
            }}
        >
            <Carpet
                offset={angleOffset / 180 * Math.PI}
                n={players.length}
                length={size}
            />

            {speaker !== null &&
                <SpeakerArrow
                    angle={speaker / players.length * 360 + angleOffset}
                    length={size / 3}
                />}

            {cards.map((card, i) =>
                <div
                    key={i}
                    className={style.card}
                    style={{
                        transform:
                            size < 700
                                ? cardTransformBottom(i, size, phy)
                                : cardTransform(i),
                    }}
                >
                    <Card
                        card={card.hidden ? blankCard : card}
                        size={cardWidth * 1.4}
                        hidden={card.hidden}
                    />
                </div>
            )}

            {players.map((player, i) =>
                <div
                    key={player.id}
                    style={{
                        transform: '',
                    }}
                >
                    <Player
                        angle={i / players.length * 360 + angleOffset}
                        speaking={speaker === i}
                        length={size / 2}
                        phy={phy}
                        player={player}
                    />
                </div>
            )}
        </div>
    </div>
