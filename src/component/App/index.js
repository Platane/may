import React from 'react'
import { Gate } from '../Gate/connected'
import { WaitingRoom } from '../WaitingRoom/connected'

import style from './style.css'

export const App = ({ page }) =>
    ('gate' === page && <Gate />) ||
    ('table' === page && <div>table</div>) ||
    ('waitingRoom' === page && <WaitingRoom />) ||
    null
