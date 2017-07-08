import React from 'react'

import { loadImage, isFileAcceptable } from './loadImage'

import style from './style.css'

export type Props = {
    onChange: (dataUrl: string, binary: string) => void,
}

export class ImageInput extends React.Component {
    props: Props

    state = { waiting: false }

    onFile = async files => {
        this.setState({ waiting: true })

        const dataUrl = await loadImage(files[0], 'dataUrl')

        const binary = await loadImage(files[0], 'binary')

        this.setState({ waiting: false })

        this.props.onChange(dataUrl, binary)
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.inputWrapper}>
                    <input
                        key={Math.random().toString(16)}
                        type="file"
                        accept="image/*"
                        className={style.input}
                        onChange={event => this.onFile(event.target.files)}
                    />
                </div>
                {this.props.children}
            </div>
        )
    }
}
