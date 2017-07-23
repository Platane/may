import React from 'react'
import { Transition } from 'react-propstransition'
import { Timer } from '../Timer'
import { Text } from '../Text'
import { Table } from '../Table'
import type { User, Game as Game_type } from '../../type'

import style from './style.css'

export type Props = {
    game: Game_type,
    end_turn_at: number,
    size: number,
}

export const Game = ({ game, size, end_turn_at }: Props) =>
    <div className={style.container}>
        <div className={style.timer}>
            <Timer date={end_turn_at} total={40000} color="#fff" />
        </div>
        <Table
            players={game.players}
            cards={game.cards}
            size={size}
            speaker={game.speaker}
        />
    </div>
