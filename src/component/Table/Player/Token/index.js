import React from 'react'

export type Props = {
    length: number,
    seed: number,
    stack: boolean,
    stash: boolean,
}

const pos = Array.from({ length: 30 }).map(() => {
    const a = Math.random() * Math.PI * 2
    const r = Math.random()
    return { x: r * Math.cos(a), y: r * Math.sin(a), z: 1 - r }
})

const transformStash = (i, length) =>
    `translate3d(` +
    `${pos[i % pos.length].x * length * 0.07}px,` +
    `${pos[i % pos.length].y * length * 0.07}px,` +
    `0px)`

const stackHeight = 6
const transformStack = i =>
    `translate3d(` +
    `${0}px,` +
    `${Math.floor(i / stackHeight) * 11}px,` +
    `${i % stackHeight * 5}px)`

const colorToken = i => `hsl(197, 37%, ${12 + 20 * (i * 17 % 31) / 31}%)`

const tokenStyle = {
    backgroundColor: '#264653',
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: -5,
    left: -5,
}

export const Token = ({ length = 0, seed = 0, stack, stash }: Props) =>
    <div
        style={{
            ...tokenStyle,
            transform:
                (stash && transformStash(seed, length)) ||
                (stack && transformStack(seed, length)) ||
                null,
            backgroundColor: colorToken(seed),
        }}
    />
