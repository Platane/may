import React from 'react'

import style from './style.css'

export type Props = {
    date: number,
    total: number,
    color: string,
}

const round = x => Math.round(x * 10) / 10

const arcPath = angle =>
    angle >= Math.PI * 1.99
        ? ['M 0 -100', `A 100 100 0 1 1 0 100`, `A 100 100 0 1 1 0 -100`].join(
              ''
          )
        : [
              'M 0 -100',
              `A 100 100 0 ${angle < Math.PI ? 0 : 1} 1 `,
              `${round(Math.sin(angle) * 100)} ${round(
                  -Math.cos(angle) * 100
              )}`,
          ].join('')

export const TimerSimple = ({ total, duration, color }) =>
    <div className={style.container}>
        <svg className={style.svg} viewBox="-110 -110 220 220">
            <path
                className={style.path}
                stroke={color}
                d={arcPath(
                    Math.min(1, 1 - duration / (total || 1)) * Math.PI * 2
                )}
            />
        </svg>
    </div>

export class Timer extends React.Component {
    static defaultProps: {
        color: '#fff',
    }

    state = { duration: 0 }

    _timeout = null

    loop = () => {
        const duration = Math.max(0, this.props.date - Date.now())

        this.setState({ duration })

        if ('undefined' !== typeof cancelAnimationFrame)
            cancelAnimationFrame(this._timeout)

        if ('undefined' !== typeof requestAnimationFrame)
            this._timeout = requestAnimationFrame(this.loop)
    }

    componentDidMount() {
        this.loop()
    }

    componentWillUnmount() {
        cancelAnimationFrame(this._timeout)
    }

    render() {
        return <TimerSimple {...this.props} duration={this.state.duration} />
    }
}
