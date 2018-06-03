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
  winner: number | null,
  theta: number,
  phy: number,
}

const blankCard = { color: 'diamond', value: '1' }

const cardWidth = 68

const worldTransform = (width, height, phy) =>
  `translate3d(${width / 2}px,${height / 2 +
    Math.max(
      0,
      0.5 *
        (height - width) *
        Math.max(0, Math.min(1, (800 - width) / 100)) *
        Math.max(0, Math.min(1, 1 - (height - 550) / 200))
    )}px,0)` + `rotateX(${phy}deg)`

const cardTransform = i =>
  `translate3d(${(i - 2.5) * cardWidth * 1.1}px,${-cardWidth * 0.7}px,2px)`

const cardTransformBottom = (i, width, height, phy) =>
  `rotateX(${-phy}deg)` +
  `translate3d(` +
  `${(i - 2.5) * cardWidth * 1.1}px,` +
  `${(width < height
    ? (height - width) * Math.max(0, Math.min(1, 1 - (height - 550) / 200)) +
      height
    : height) *
    -0.5 +
    cardWidth * 0.5}px,` +
  `0)`

export const Table = ({
  players,
  cards,
  speaker,
  winner,
  width,
  height,
  theta,
  phy,
}: Props) => (
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
        transform: worldTransform(width, height, phy),
      }}
    >
      <Carpet
        offset={(theta / 180) * Math.PI}
        n={players.length}
        length={Math.min(width, height)}
      />

      {speaker !== null && (
        <SpeakerArrow
          angle={(speaker / players.length) * 360 + theta}
          length={Math.min(width, height)}
        />
      )}

      {cards.map((card, i) => (
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
      ))}

      {players.map((player, i) => (
        <div
          key={player.id}
          style={{
            transform: '',
          }}
        >
          <Player
            angle={(i / players.length) * 360 + theta}
            seed={i}
            speaker={speaker === i}
            winner={winner === i}
            length={Math.min(width, height) / 2}
            phy={phy}
            player={player}
          />
        </div>
      ))}
    </div>
  </div>
)

Table.defaultProps = {
  phy: 0,
  theta: 0,
}
