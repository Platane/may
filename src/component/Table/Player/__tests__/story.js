import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Player } from '../index'

import { users } from '../../../../__fixtures__/users'
import { cards } from '../../../../__fixtures__/cards'

class Container extends React.Component {
    state = { angle: 45 }

    setAngle = angle => this.setState({ angle })

    render() {
        return (
            <div>
                <input
                    value={this.state.angle}
                    type="range"
                    min={0}
                    max={360 * 4}
                    step={0.01}
                    onChange={e => this.setAngle(+e.target.value)}
                    style={{ width: '100%' }}
                />
                <div style={{ transform: 'translate3d(300px,300px,0)' }}>
                    <Player
                        hand={[cards[0], cards[13]]}
                        user={users[0]}
                        mood="happy"
                        bet={10}
                        state="inGame"
                        angle={this.state.angle}
                        length={300}
                    />
                </div>
            </div>
        )
    }
}

storiesOf('Player', module)
    .add('default', () =>
        <div style={{ transform: 'translate3d(0,300px,0)' }}>
            <Player
                hand={null}
                user={users[0]}
                mood="happy"
                angle={0}
                length={300}
                bet={10}
                state="inGame"
            />
        </div>
    )
    .add('rotate', () =>
        <div style={{ transform: 'translate3d(0,300px,0)' }}>
            <Player
                hand={null}
                user={users[0]}
                mood="happy"
                angle={-45}
                length={300}
                bet={10}
                state="inGame"
            />
        </div>
    )
    .add('dynamic rotate', () => <Container />)
