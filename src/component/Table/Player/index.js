import React from 'react'
import { Hand } from './Hand'
import { UserCard } from './UserCard'
import { BetStash } from './BetStash'
import { Bank } from './Bank'
import style from './style.css'

import type { Player as Player_type } from '../../../type'

export type Props = {
    player: Player_type,
    speaking: boolean,
    phy: number,
    angle: number,
    length: number,
    seed: number,
}

export const Player = ({ player, speaking, angle, length, phy, seed }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `rotate3d(0,0,1,${angle}deg)`,
        }}
    >
        <Hand
            card={player.hand[0]}
            dir={1}
            length={length}
            angle={angle}
            folded={player.folded}
        />

        <Hand
            card={player.hand[1]}
            dir={-1}
            length={length}
            angle={angle}
            folded={player.folded}
        />

        <BetStash
            bet={player.bet}
            length={length}
            angle={angle}
            phy={phy}
            seed={seed * 17 + 33}
        />

        <UserCard
            player={player}
            speaking={speaking}
            length={length}
            angle={angle}
            phy={phy}
        />

        <Bank
            bank={player.bank}
            length={length}
            angle={angle}
            phy={phy}
            seed={seed * 31 + 23}
        />
    </div>
