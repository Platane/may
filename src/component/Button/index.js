import React from 'react'

import style from './style.css'

export type Props = {
    children: any,
    onClick?: () => void,
}

export const Button = ({ children, onClick }: Props) =>
    <div className={style.container} onClick={onClick}>
        {children}
    </div>
