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

const isReady = props => ready(props.user, props.mood)

export class Dollar extends React.Component {
    state = { ready: false }

    _timeout = null

    _mounted = false

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
            ready: isReady(this.props),
        }

        if (!this.state.ready)
            load(this.props.user, this.props.mood).then(
                () =>
                    this._mounted &&
                    this.setState({ ready: isReady(this.props) })
            )
    }

    componentWillReceiveProps(nextProps: Props) {
        const ready = isReady(nextProps)

        if (!ready)
            load(nextProps.user, nextProps.mood).then(
                () =>
                    this._mounted &&
                    this.setState({ ready: isReady(this.props) })
            )

        this.setState({ ready })
    }

    componentDidMount() {
        this._mounted = true
    }

    componentWillUnmount() {
        this._mounted = false

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
