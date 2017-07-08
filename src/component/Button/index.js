import React from 'react'

import style from './style.css'

export type Props = {
    children: string,
}

export const Button = ({ children }: Props) =>
    <div className={style.container}>
        {children}
    </div>
