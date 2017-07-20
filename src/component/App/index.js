import React from 'react'
import { Gate } from '../Gate/connected'
import { WaitingRoom } from '../WaitingRoom/connected'
import { Game } from '../Game/connected'

import style from './style.css'

export const App = ({ page }) =>
    ('gate' === page && <Gate />) ||
    ('table' === page && <Game size={600} />) ||
    ('waitingRoom' === page && <WaitingRoom />) ||
    null
