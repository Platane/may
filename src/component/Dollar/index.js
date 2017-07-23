import React from 'react'
import { draw } from './draw'
import { load, ready } from './loading'
import type { User, PlayerMood } from '../../type'

// import style from './style.css'

export type Props = {
    size: number,
    user: User | null,
    mood: 'sad' | 'standard' | 'happy' | 'yolo' | null,
}

export class Dollar extends React.Component {
    state = { ready: false }

    _timeout = null

    shouldComponentUpdate(nextProps: Props, nextState) {
        return (
            this.state.ready !== nextState.ready ||
            this.props.mood !== nextProps.mood ||
            this.props.size !== nextProps.size ||
            this.props.user !== nextProps.user
        )
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            ready: ready(this.props.user, this.props.mood),
        }

        if (!this.state.ready)
            load(this.props.user, this.props.mood).then(() =>
                this.setState({
                    ready: ready(this.props.user, this.props.mood),
                })
            )
    }

    componentWillReceiveProps(nextProps: Props) {
        load(nextProps.user, nextProps.mood).then(() =>
            this.setState({
                ready: ready(this.props.user, this.props.mood),
            })
        )
    }

    componentWillUnmount() {
        if (typeof cancelAnimationFrame !== 'undefined')
            cancelAnimationFrame(this._timeout)
    }

    render() {
        if (this.refs.canvas) {
            draw(
                this.refs.canvas,
                this.props.user,
                this.props.mood,
                this.props.size
            )
        } else if (typeof requestAnimationFrame !== 'undefined') {
            this._timeout = requestAnimationFrame(() => this.forceUpdate())
        }
        return <canvas ref="canvas" />
    }
}
