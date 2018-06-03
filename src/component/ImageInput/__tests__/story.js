import React from 'react'
import { storiesOf } from '@storybook/react'
import { ImageInput } from '../index'

class Container extends React.Component {
  state = { dataUrl: null }

  onChange = dataUrl => this.setState({ dataUrl })

  render() {
    return (
      <div
        style={{
          width: 200,
          height: 200,
          boxShadow: '0 0 0 2px tomato',
        }}
      >
        <ImageInput onChange={this.onChange}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${this.state.dataUrl})`,
              backgroundSize: 'cover',
            }}
          />
        </ImageInput>
      </div>
    )
  }
}

storiesOf('ImageInput', module).add('default', () => <Container />)
