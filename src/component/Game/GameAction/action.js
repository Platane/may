import React from 'react'
import { GameAction as SimpleGameAction } from './motion'
import type { User } from '../../../type'

export type Props = {
    n: number,
    bet: number,
    user: User,
    width: number,
    height: number,

    // set bet ( called at every bet change = do not means the turn is over )
    onSetBet?: (bet: number) => void,

    // when calling this ones , the turn is over
    onRaise?: (bet: number) => void,
    onCall?: () => void,
    onFold?: () => void,
}

export class GameAction extends React.Component {
    _timeout = null

    _shouldValid = false

    state = { lastClick: 0, bet: 0, totalBet: 0 }

    constructor(props: Props) {
        super(props)
        this.state = { lastClick: 0, bet: 0, totalBet: this.props.bet }
    }

    click = () => {
        const lastClick = this.state.lastClick

        this.setState({ lastClick: Date.now() })

        if (Date.now() - lastClick < 300)
            this.props.onCall && this.props.onCall()
    }

    onValidBet = () => {
        clearTimeout(this._timeout)
        if (this.props.onRaise) this.props.onRaise(this.state.totalBet)
    }

    onDragStart = () => {
        clearTimeout(this._timeout)
    }

    onDragEnd = () => {
        clearTimeout(this._timeout)
        if (this._shouldValid) this._timeout = setTimeout(this.onValidBet, 2000)
    }

    onSetBet = (bet: number) => {
        this._shouldValid = bet > 0

        const delta = bet - this.state.bet
        const totalBet = this.state.totalBet + delta

        if (this.props.onSetBet) this.props.onSetBet(totalBet)

        this.setState({ bet, totalBet })
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('click', this.click)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('click', this.click)
        }
    }

    render() {
        return (
            <SimpleGameAction
                {...this.props}
                onSetBet={this.onSetBet}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            />
        )
    }
}
