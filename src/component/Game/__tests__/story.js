import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Game } from '../index'
import { reduce } from '../../../service/gameSolver/solver'
import { initGame } from '../../../service/gameSolver/initGame'
import { toHiddenGame } from '../../../service/gameSolver/toHiddenGame'
import { users } from '../../../__fixtures__/users'
import { cards } from '../../../__fixtures__/cards'

import type { Game_Running } from '../../../service/gameSolver/type'

const game0: Game_Running = initGame([20, 24, 26], 1)

game0.river = [cards[0], cards[14], cards[17], cards[27], cards[34]]
game0.players[0].hand = [cards[2], cards[5]]
game0.players[1].hand = [cards[22], cards[35]]
game0.players[2].hand = [cards[51], cards[45]]

const actions = [
    { type: 'raise', player: 2, value: 4 },
    { type: 'call', player: 0 },
    { type: 'call', player: 1 },

    { type: 'raise', player: 0, value: 4 },
    { type: 'raise', player: 1, value: 6 },
    { type: 'raise', player: 2, value: 7 },
    { type: 'fold', player: 0 },
    { type: 'raise', player: 1, value: 8 },
    { type: 'call', player: 2 },

    { type: 'raise', player: 1, value: 10 },
    { type: 'call', player: 2 },

    { type: 'call', player: 1 },
    { type: 'call', player: 2 },
]

class Container extends React.Component {
    state = { k: 0 }

    setK = k =>
        this.setState({
            k: Math.max(0, Math.min(this.props.actions.length, k)),
        })

    render() {
        const gl = this.props.actions
            .slice(0, this.state.k)
            .reduce((game, action) => reduce(game, action), this.props.game0)

        const game = toHiddenGame('a', users, gl)

        if (!game) return null

        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Game game={game} size={800} end_turn_at={Date.now() + 40000} />
                <input
                    type="range"
                    value={this.state.k}
                    min={0}
                    max={this.props.actions.length}
                    step={1}
                    onChange={e => this.setK(+e.target.value)}
                    style={{
                        position: 'fixed',
                        top: 10,
                        left: 10,
                        right: 10,
                        width: 'calc( 100% - 20px )',
                    }}
                />
                <button
                    onClick={() => this.setK(0)}
                    style={{
                        position: 'fixed',
                        top: 35,
                        left: 10,
                        width: 30,
                    }}
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => this.setK(this.state.k + 1)}
                    style={{
                        position: 'fixed',
                        top: 35,
                        left: 50,
                        width: 30,
                    }}
                >
                    {'>'}
                </button>
            </div>
        )
    }
}

storiesOf('Game', module).add('default', () =>
    <Container actions={actions} game0={game0} />
)
