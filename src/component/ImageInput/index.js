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

        const file = files[0]

        const dataUrl = await loadImage(file, 'dataUrl')

        const binary = await loadImage(file, 'binary')

        this.setState({ waiting: false })

        this.props.onChange(dataUrl, binary, file)
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
