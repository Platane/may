import React from 'react'
import { Transition } from 'react-propstransition'
import { ImageInput } from '../ImageInput'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'

import style from './style.css'

export type Props = {
    name: string,
    pic: {},
    step: 0 | 1 | 2 | 3,
}

const s = (...args) => args.filter(Boolean).join(' ')

export const SimpleGate = (props: Props) =>
    <div className={style.container}>
        {[0, 1, 2, 3].map(i => {
            let Step = null

            switch (i) {
                case 0:
                    Step = Step1
                    break
                case 1:
                    Step = Step2
                    break
                case 2:
                    Step = Step3
                    break
            }

            // onClick={props.step > i && (() => props.setStep(i))}
            return (
                <div
                    key={i}
                    className={s(
                        style.step,
                        props.step < i && style.stepClosed,
                        props.step > i && style.stepMinimized
                    )}
                >
                    {props.step >= i &&
                        Step &&
                        <Step minimized={props.step > i} {...props} />}
                </div>
            )
        })}
    </div>

export class Gate extends React.Component {
    state = { step: 0, name: '', pic: { idle: null } }

    setName = name => this.setState({ name })

    setStep = step => this.setState({ step })

    setHappyFace = (dataUrl, binary) => {
        this.setState({ step: 2, pic: { happy: dataUrl } })
    }

    submit = () => 0

    render() {
        return (
            <SimpleGate
                {...this.state}
                setStep={this.setStep}
                setName={this.setName}
                setHappyFace={this.setHappyFace}
                submit={this.submit}
            />
        )
    }
}