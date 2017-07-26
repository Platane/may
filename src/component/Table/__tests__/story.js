import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from '../index'

import { users } from '../../../__fixtures__/users'
import { cards } from '../../../__fixtures__/cards'

const players = Array.from({ length: 16 }).map((_, i) => ({
    ...users[i % users.length],
    id: i,
    hand: [cards[i * 3 % cards.length], cards[(i * 3 + 17) % cards.length]],
    mood: 'happy',
    bank: 10 + i * 4,
    bet: i,
    folded: i % 4 === 2,
}))

class Container extends React.Component {
    state = { phy: 40, theta: 0 }

    render() {
        return (
            <div style={{ backgroundColor: '#c1d37f' }}>
                <input
                    value={this.state.phy}
                    type="range"
                    min={-180}
                    max={180}
                    step={0.001}
                    onChange={e => this.setState({ phy: +e.target.value })}
                    style={{ width: '100%' }}
                />
                <input
                    value={this.state.theta}
                    type="range"
                    min={-180}
                    max={180}
                    step={0.001}
                    onChange={e => this.setState({ theta: +e.target.value })}
                    style={{ width: '100%' }}
                />
                <Table
                    {...this.props}
                    phy={this.state.phy}
                    theta={this.state.theta}
                    speaker={null}
                    width={600}
                    height={600}
                />
            </div>
        )
    }
}

;[2, 3, 4, 7, 8].forEach(n =>
    storiesOf('Table', module).add(`${n} players`, () =>
        <Container
            cards={cards.slice(0, 5)}
            players={players.slice(0, n)}
            winner={1}
        />
    )
)
