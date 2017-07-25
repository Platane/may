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
    width: number,
    height: number,
    speaker: number | null,
}

const blankCard = { color: 'diamond', value: '1' }

const angleOffset = 147

const cardWidth = 60

const phy = 0
const theta = 0

const worldTransform = (width, height) =>
    `translate3d(${width / 2}px,${height / 2 +
        Math.max(
            0,
            0.5 *
                (height - width) *
                Math.max(0, Math.min(1, (800 - width) / 100)) *
                Math.max(0, Math.min(1, 1 - (height - 550) / 200))
        )}px,0)` +
    `rotateX(${phy}deg)` +
    `rotateZ(${theta}deg)`

const cardTransform = i =>
    `translate3d(${(i - 2.5) * cardWidth * 1.1}px,${-cardWidth * 0.7}px,1px)`

const cardTransformBottom = (i, width, height, phy) =>
    `rotateX(${-phy}deg)` +
    `translate3d(` +
    `${(i - 2.5) * cardWidth * 1.1}px,` +
    `${(width < height
        ? (height - width) *
              Math.max(0, Math.min(1, 1 - (height - 550) / 200)) +
          height
        : height) *
        -0.5 +
        10}px,` +
    `0)`

export const Table = ({ players, cards, speaker, width, height }: Props) =>
    <div
        className={style.container}
        style={{
            width,
            height,
            perspective: '1000px',
        }}
    >
        <div
            className={style.world}
            style={{
                transform: worldTransform(width, height),
            }}
        >
            <Carpet
                offset={angleOffset / 180 * Math.PI}
                n={players.length}
                length={Math.min(width, height)}
            />

            {speaker !== null &&
                <SpeakerArrow
                    angle={speaker / players.length * 360 + angleOffset}
                    length={Math.min(width, height)}
                />}

            {cards.map((card, i) =>
                <div
                    key={i}
                    className={style.card}
                    style={{
                        transform:
                            Math.min(width, height) < 700
                                ? cardTransformBottom(i, width, height, phy)
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
                        seed={i}
                        speaking={speaker === i}
                        length={Math.min(width, height) / 2}
                        phy={phy}
                        player={player}
                    />
                </div>
            )}
        </div>
    </div>
