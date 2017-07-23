import React from 'react'
import { GameAction as SimpleGameAction } from './motion'
import type { User } from '../../../type'

export type Props = {
    n: number,
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

    constructor(props: Props) {
        super(props)
    }

    click() {}

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
        return <SimpleGameAction {...this.props} />
    }
}
