import React from 'react'
import { Transition } from 'react-propstransition'
import { Timer } from '../Timer'
import { Text } from '../Text'
import { Table } from '../Table'
import type { User, Game as Game_type } from '../../type'

import style from './style.css'

export type Props = {
    game: Game_type,
    size: number,
}

export const Game = ({ game, size }: Props) =>
    <div className={style.container}>
        <Table players={game.players} cards={game.cards} size={size} />
    </div>
