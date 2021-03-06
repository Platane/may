import React from 'react'
import { Transition } from 'react-propstransition'
import { Timer } from '../Timer'
import { Text } from '../Text'
import { Table } from '../Table'
import { GameAction } from './GameAction/action'
import type { User, Game as Game_type, Player } from '../../type'

import style from './style.css'

export type Props = {
  game: Game_type,
  end_turn_at: number,
  turn_duration: number,
  mePlayer: Player,

  width: number,
  height: number,

  fold?: () => void,
  call?: () => void,
  raise?: (value: number) => void,
  onSetBet?: (value: number) => void,
}

export const Game = ({
  game,
  width,
  height,
  end_turn_at,
  turn_duration,
  mePlayer,
  call,
  fold,
  raise,
  onSetBet,
}: Props) => (
  <div className={style.container}>
    <div className={style.timer}>
      <Timer date={end_turn_at} total={turn_duration} color="#fff" />
    </div>

    <div
      className={style.table}
      style={{
        width: Math.min(width, height),
        height: Math.min(width, height),
      }}
    >
      <Table
        players={game.players}
        cards={game.cards}
        width={width}
        height={height}
        speaker={game.speaker}
        winner={game.winner || null}
        theta={30}
        phy={30}
      />
    </div>

    {call && (
      <div className={style.action}>
        <GameAction
          onRaise={raise}
          onCall={call}
          onFold={fold}
          onSetBet={onSetBet}
          user={mePlayer}
          bet={mePlayer.bet}
          n={Math.min(10, mePlayer.bank)}
          width={width}
          height={height}
        />
      </div>
    )}
  </div>
)
