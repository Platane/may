import React from 'react'
import { draw } from './draw'
import { load, ready } from './loading'
import type { User } from '../../type'

// import style from './style.css'

export type Props = { size: number, user: User | null }

export class Dollar extends React.Component {
    state = { ready: false }

    _timeout = null

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.ready !== nextState.ready ||
            this.props.state !== nextProps.state ||
            this.props.size !== nextProps.size ||
            this.props.user !== nextProps.user
        )
    }

    constructor(props) {
        super(props)

        this.state = {
            ready: ready(this.props.user, this.props.state),
        }

        if (!this.state.ready)
            load(this.props.user, this.props.state).then(() =>
                this.setState({
                    ready: ready(this.props.user, this.props.state),
                })
            )
    }

    componentWillReceiveProps(nextProps) {
        load(nextProps.user, nextProps.state).then(() =>
            this.setState({
                ready: ready(this.props.user, this.props.state),
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
                this.props.state,
                this.props.size
            )
        } else if (typeof requestAnimationFrame !== 'undefined') {
            this._timeout = requestAnimationFrame(() => this.forceUpdate())
        }
        return <canvas ref="canvas" />
    }
}
