import React from 'react'
import { Gate } from '../Gate/connected'
import { WaitingRoom } from '../WaitingRoom/connected'
import { Game } from '../Game/connected'

import style from './style.css'

export type Props = { page: 'gate' | 'table' | 'waitingRoom' | null }

export const App = ({ page }: Props) =>
    <div className={style.container}>
        {('gate' === page && <Gate />) ||
            ('table' === page && <Game />) ||
            ('waitingRoom' === page && <WaitingRoom />) ||
            null}
    </div>
