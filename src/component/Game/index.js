import React from 'react'
import { Transition } from 'react-propstransition'
import { Timer } from '../Timer'
import { Text } from '../Text'
import { Table } from '../Table'
import type { User } from '../../type'
import type { Game_Running, Game_Over } from '../../service/gameSolver/type'

import style from './style.css'

export type Props = {
    game: Game_Running | Game_Over,
    users: User[],
}

const hideCards = (river, turn) =>
    (turn === 0 && [null, null, null, null, null]) ||
    (turn === 1 && [...river.slice(0, 2), null, null, null]) ||
    (turn === 2 && [...river.slice(0, 3), null, null]) ||
    (turn === 3 && [...river.slice(0, 4), null])

export const Game = ({ game, users }: Props) =>
    <div className={style.container}>
        <Table
            players={game.players}
            users={users}
            cards={
                game.state === 'running'
                    ? hideCards(game.river, game.turn)
                    : game
            }
            size={800}
        />
    </div>
