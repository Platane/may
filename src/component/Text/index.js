import React from 'react'

import style from './style.css'

export type Props = {
    children: string,
}

export const Text = ({ children }: Props) =>
    <div className={style.container}>
        {children}
    </div>
