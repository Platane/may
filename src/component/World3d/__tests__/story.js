import React from 'react'
import { storiesOf } from '@storybook/react'
import { World3d } from '../index'

class World3dParam extends React.Component {
    state = { phy: 0, theta: 0 }

    render() {
        return (
            <div>
                <input
                    value={this.state.phy}
                    type="range"
                    min={0}
                    max={Math.PI * 2 * 3}
                    step={0.001}
                    onChange={e => this.setState({ phy: +e.target.value })}
                    style={{ width: '100%' }}
                />
                <input
                    value={this.state.theta}
                    type="range"
                    min={0}
                    max={Math.PI * 2 * 3}
                    step={0.001}
                    onChange={e => this.setState({ theta: +e.target.value })}
                    style={{ width: '100%' }}
                />
                <World3d phy={this.state.phy} theta={this.state.theta}>
                    {this.props.children}
                </World3d>
            </div>
        )
    }
}

storiesOf('World3d', module).add('default', () =>
    <World3dParam>
        <div
            data-leaf3d
            style={{
                width: 50,
                height: 50,
                position: 'absolute',
                backgroundColor: 'tomato',
                transform: 'translate3d(100px,0,0) rotate3d(0,0,1,45deg)',
            }}
        >
            10
        </div>

        <div
            style={{
                transform: 'translate3d(150px,0px,0)',
            }}
        >
            <div
                data-leaf3d
                style={{
                    width: 50,
                    height: 50,
                    position: 'absolute',
                    backgroundColor: 'yellow',
                    transform: 'translate3d(10px,40px,0) rotate3d(0,1,0,45deg)',
                }}
            />
        </div>
    </World3dParam>
)
