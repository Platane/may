import React from 'react'
import { Hand } from './Hand'
import { UserCard } from './UserCard'
import { BetStash } from './BetStash'
import { Bank } from './Bank'
import style from './style.css'

import type { Player as Player_type } from '../../../type'

export type Props = {
    player: Player_type,
    phy: number,
    angle: number,
    length: number,
}

export const Player = ({ player, angle, length, phy }: Props) =>
    <div className={style.container}>
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

        <UserCard player={player} length={length} angle={angle} phy={phy} />

        <Bank
            bank={player.bank}
            length={length}
            angle={angle}
            phy={phy}
            seed={Math.floor(angle * 37.91283)}
        />

        <BetStash
            bet={player.bet}
            length={length}
            angle={angle}
            phy={phy}
            seed={Math.floor(angle * 17.37131)}
        />

        {Array.from({ length: 10 }).map((_, i, arr) =>
            <div
                className={style.probe}
                key={i}
                style={{
                    transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${i /
                        arr.length *
                        length}px,0,0)`,
                }}
            >
                <div className={style.center} />
            </div>
        )}
    </div>
