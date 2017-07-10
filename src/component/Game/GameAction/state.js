import React from 'react'
import { GameAction as SimpleGameAction } from './index'
import * as point from '../../../util/math/point'
import { merge, set } from '../../../util/redux'

import type { Point } from '../../../util/math/point'

export type Props = {
    n: number,
    width: number,
    height: number,
}

const acc = (
    k: number,
    b: number,
    x: number,
    v: number,
    target: number = 0
): number => -k * (x - target) - b * v

const LEG = 200

const getAnchor = (width, height): Point => ({
    x: width / 2,
    y: height + LEG - 60,
    z: 0,
})

const getWorldPoint = (event: MouseEvent | TouchEvent): Point => ({
    x: event.clientX,
    y: event.clientY,
    z: 0,
})

const initStash = (length, width, height) => {
    const c = getAnchor(width, height)

    return Array.from({ length }).map(() => ({
        position: point.addScal(
            c,
            point.normalize({ x: Math.random() - 0.5, y: -1, z: 0 }),
            LEG + 20
        ),
        normal: { x: 0, y: 0, z: 1 },
        direction: { x: 0, y: 1, z: 0 },
        size: {
            width: 200,
            height: 110,
        },
        motion: {
            type: 'elastic_deck',
            vL: 0,
            vTheta: 0,
        },
    }))
}

export class GameAction extends React.Component {
    state = { stash: [] }

    constructor(props: Props) {
        super(props)

        this.state = {
            stash: initStash(this.props.n, this.props.width, this.props.height),
        }
    }

    onStartSwipe = (i: number, event: MouseEvent) => {
        const grabPoint = { x: 55, y: 100 }
        const worldStartPoint = getWorldPoint(event)

        const anchor = getAnchor(this.props.width, this.props.height)

        const stash = set(this.state.stash, [i, 'motion'], {
            type: 'dragged',
            v: { x: 0, y: 0, z: 0 },
        })

        const { position } = this.state.stash[i]

        const sl =
            point.distance(position, anchor) -
            point.distance(worldStartPoint, anchor)

        this.setState({ worldStartPoint, i, stash, sl })
    }

    onMouseMove = (event: MouseEvent) => {
        const anchor = getAnchor(this.props.width, this.props.height)

        const worldPoint = getWorldPoint(event)

        const { i, worldStartPoint, sl } = this.state

        if (!worldStartPoint) return

        const { motion } = this.state.stash[i]

        const u = point.sub(worldPoint, anchor)

        const l = point.length(u)
        const direction = point.normalize(u)

        const position = point.addScal(anchor, direction, l)

        const v = point.lerp(
            point.sub(position, this.state.stash[i].position),
            motion.v,
            0.8
        )

        const stash = merge(this.state.stash, [i], {
            position,
            direction,
            motion: { ...motion, v },
        })

        this.setState({ stash })
    }

    onMouseUp = (event: MouseEvent) => {
        const { i, worldStartPoint } = this.state

        if (!worldStartPoint) return

        const anchor = getAnchor(this.props.width, this.props.height)

        const { position, motion } = this.state.stash[i]

        const u = point.sub(position, anchor)

        const l = point.length(u)

        let nextMotion = null

        const k = point.scalar(point.normalize(u), motion.v)

        if (l - LEG > this.props.height / 4 && k > 1) {
            const vl = point.length(motion.v)
            let v = motion.v

            const VMAX = 25
            const VMIN = 15

            if (vl > VMAX) v = point.scal(v, VMAX / vl)

            if (vl < VMIN) v = point.scal(v, VMIN / vl)

            nextMotion = {
                type: 'launch',
                v,
            }
        } else {
            nextMotion = {
                type: 'elastic_deck',
                vL: 0,
                vTheta: 0,
            }
        }

        const stash = set(this.state.stash, [i, 'motion'], nextMotion)

        this.setState({ worldStartPoint: null, stash })
    }

    loop = () => {
        const anchor = getAnchor(this.props.width, this.props.height)

        const stash = this.state.stash.map(x => {
            switch (x.motion && x.motion.type) {
                case 'elastic_deck': {
                    const u = point.sub(x.position, anchor)

                    // compute new heta
                    let oldTheta = Math.atan2(u.x, -u.y) % (Math.PI * 2)

                    if (oldTheta > Math.PI) oldTheta = oldTheta - Math.PI * 2

                    const aTheta = acc(0.1, 0.16, oldTheta, x.motion.vTheta, 0)

                    const vTheta = x.motion.vTheta + aTheta

                    const theta = oldTheta + vTheta

                    // compute new l
                    const oldL = point.length(u)

                    const aL = acc(0.1, 0.3, oldL, x.motion.vL, LEG)

                    const vL = x.motion.vL + aL

                    const l = oldL + vL

                    // compute new state

                    const direction = {
                        x: Math.sin(theta),
                        y: -Math.cos(theta),
                        z: 0,
                    }

                    const position = point.addScal(anchor, direction, l)

                    x = {
                        ...x,
                        direction,
                        position,
                        motion: {
                            ...x.motion,
                            vTheta,
                            vL,
                        },
                    }

                    break
                }

                case 'dragged': {
                    // fade velocity
                    x = set(x, ['motion', 'v'], point.scal(x.motion.v, 0.8))

                    break
                }

                case 'launch': {
                    const a = { x: 0, y: -0.2, z: -0.1 }
                    const v = point.scal(point.add(x.motion.v, a), 0.95)

                    const position = point.add(x.position, v)

                    const direction = point.lerp(x.direction, v, 0.8)

                    x = {
                        ...x,
                        position,
                        direction,
                        motion: {
                            ...x.motion,
                            v,
                        },
                    }

                    break
                }
            }

            return x
        })

        this.setState({ stash })

        if (typeof requestAnimationFrame !== 'undefined')
            this._timeout = requestAnimationFrame(this.loop)
    }

    componentDidMount() {
        this.loop()

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', this.onMouseMove)
            window.addEventListener('touchmove', this.onMouseMove)
            window.addEventListener('mouseup', this.onMouseUp)
            window.addEventListener('touchup', this.onMouseUp)
        }
    }

    componentWillUnmount() {
        if (typeof cancelAnimationFrame !== 'undefined')
            cancelAnimationFrame(this._timeout)

        if (typeof window !== 'undefined') {
            window.removeEventListener('mouvemove', this.onMouseMove)
            window.removeEventListener('touchmove', this.onMouseMove)
            window.removeEventListener('mouveup', this.onMouseUp)
            window.removeEventListener('touchup', this.onMouseUp)
        }
    }

    render() {
        return (
            <SimpleGameAction
                stash={this.state.stash}
                onStartSwipe={this.onStartSwipe}
            />
        )
    }
}
