import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card } from '../index'
import { cards } from '../../../__fixtures__/cards'

class Container extends React.Component {
    state = {
        hidden: cards.map(() => false),
    }

    _timeout = 0

    loop = () => {
        this.setState({
            hidden: this.state.hidden.map(x => (Math.random() > 0.8 ? !x : x)),
        })

        clearTimeout(this._timeout)
        this._timeout = setTimeout(this.loop, 1000)
    }

    componentDidMount() {
        this._timeout = setTimeout(this.loop, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this._timeout)
    }

    render() {
        return (
            <div>
                {cards.map((card, i) =>
                    <div
                        key={i}
                        style={{ display: 'inline-block', margin: 20 }}
                    >
                        <Card
                            card={card}
                            hidden={this.state.hidden[i]}
                            size={200}
                        />
                    </div>
                )}
            </div>
        )
    }
}

class ContainerHidden extends React.Component {
    state = { hidden: false }

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    value={this.state.hidden}
                    onChange={e =>
                        this.setState({ hidden: !this.state.hidden })}
                />
                <Card card={cards[19]} hidden={this.state.hidden} size={200} />
            </div>
        )
    }
}

storiesOf('Card', module)
    .add('size', () =>
        <div>
            {[4, 10, 20, 50, 100, 200, 400].map(size =>
                <div
                    key={size}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    {[0, 2, 6, 12, 17, 19, 23, 27, 29, 31, 37].map(i =>
                        <div
                            key={i}
                            style={{ display: 'inline-block', flexShrink: 0 }}
                        >
                            <Card
                                hidden={false}
                                key={size + ' ' + i}
                                size={size}
                                card={cards[i]}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
    .add('all cards', () =>
        <div>
            {cards.map((card, i) =>
                <div key={i} style={{ display: 'inline-block', margin: 20 }}>
                    <Card card={card} size={200} />
                </div>
            )}
        </div>
    )
    .add('all cards swapping', () => <Container />)
    .add('hide', () => <ContainerHidden />)
