import React from 'react'
import { Motion, spring } from 'react-motion'
import { Dollar } from '../../../Dollar'
import style from './style.css'

import type { Player } from '../../../../type'

export type Props = {
    player: Player,
    angle: number,
    length: number,
}

const userCardLength = 0.8
const stashLength = 1

export const UserCard = ({ player, angle, length }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `rotate3d(0,0,1,${-angle}deg) translate3d(${length *
                userCardLength}px,0,0) rotate3d(0,0,1,${angle}deg)`,
        }}
    >
        <div className={style.userCard}>
            <div className={style.userBar} />

            <div
                className={style.userCardPic}
                style={{
                    backgroundImage: `url(${player.pic[player.mood]})`,
                }}
            />

            <div className={style.stash}>
                <div className={style.dollar}>
                    <Dollar size={70} user={player} />
                </div>

                <Motion
                    defaultStyle={{ bank: 0 }}
                    style={{ bank: spring(player.bank) }}
                >
                    {({ bank }) =>
                        <div className={style.stashLabel}>
                            {`x ${Math.round(bank)}`}
                        </div>}
                </Motion>
            </div>
        </div>
    </div>
