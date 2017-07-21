import React from 'react'
import style from './style.css'

import type { Player } from '../../../../type'

export type Props = {
    angle: number,
    length: number,
}

const SimpleSpeakerArrow = ({ angle, length }: Props) =>
    <div
        className={style.container}
        style={{
            transform: `translateZ(-1px) rotate3d(0,0,1,${angle - 87}deg)`,
        }}
    >
        <svg className={style.tic} viewBox="-16 -44 32 44">
            <path d="M 0 0 L 10 -12 Q 16 -20 16 -28 Q 16 -44 0 -44 Q -16 -44 -16 -28 Q -16 -20 -10 -12 Z M0 0 z" />
        </svg>
    </div>

// ensure that the angle is always positive
export class SpeakerArrow extends React.Component {
    props: Props

    state = { angle: 0 }

    componentWillReceiveProps(nextProps: Props) {
        let angle = nextProps.angle
        while (angle < this.state.angle) angle += 360

        this.setState({ angle })
    }

    render() {
        return <SimpleSpeakerArrow {...this.props} {...this.state} />
    }
}
