import React from 'react'

import style from './style.css'

export type Props = {
  children: string,
  color: 'light' | 'dark',
}

const s = (...args) => args.filter(Boolean).join(' ')

export const Text = ({ children, color }: Props) => (
  <div className={s(style.container, style['color-' + color])}>{children}</div>
)

Text.defaultProps = {
  color: 'dark',
}
