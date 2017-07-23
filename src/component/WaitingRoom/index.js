import React from 'react'
import { Transition } from 'react-propstransition'
import { Timer } from '../Timer'
import { Text } from '../Text'
import type { User } from '../../type'

import style from './style.css'

export type Props = { start_at: number, duration: number, users: User[] }

const s = (...args) => args.filter(Boolean).join(' ')

export const WaitingRoom = ({ start_at, duration, users }: Props) =>
    <div className={style.container}>
        <div className={style.timer}>
            <Timer date={start_at} total={duration} color="#fff" />
        </div>

        <div className={style.userList}>
            {users.map(user =>
                <div key={user.id} className={style.user}>
                    <div
                        className={style.userPic}
                        style={{ backgroundImage: `url(${user.pic.idle})` }}
                    />
                    <div className={style.userName}>
                        <Text color="light">
                            {user.name}
                        </Text>
                    </div>
                </div>
            )}
        </div>

        {users.length < 2 &&
            <div className={style.waitingForPlayers}>
                <Text color="light">waiting for players</Text>
            </div>}
    </div>
