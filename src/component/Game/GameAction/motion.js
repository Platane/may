import React from 'react'
import { GameAction as SimpleGameAction } from './index'
import * as point from '../../../util/math/point'
import { merge, set } from '../../../util/redux'

import type { Point } from '../../../util/math/point'
import type { User } from '../../../type'

export type Props = {
    n: number,
    user: User | null,
    width: number,
    height: number,

    onDragStart?: () => void,
    onDragEnd?: () => void,

    onSetBet?: (bet: number) => void,
    onFold?: () => void,
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
    y: height + LEG - 40,
    z: 0,
})

const getWorldPoint = (event: MouseEvent | TouchEvent): Point => {
    const m = (event.touches && event.touches[0]) || event

    return {
        x: m.clientX,
        y: m.clientY,
        z: 0,
    }
}

const initStash = (length, width, height, user) => {
    const c = getAnchor(width, height)

    return Array.from({ length }).map(() => ({
        position: point.addScal(
            c,
            point.normalize({ x: Math.random() - 0.5, y: -1, z: 0 }),
            LEG + 20
        ),
        tint: Math.random(),
        user,
        normal: { x: 0, y: 0, z: 1 },
        direction: { x: 0, y: 1, z: 0 },
        size: 330,
        motion: {
            type: 'elastic_deck',
            vL: 0,
            vTheta: 0,
        },
    }))
}

export class GameAction extends React.Component {
    state = { stash: [], dragging: null, i: 0, sl: 0 }

    _timeout = null

    constructor(props: Props) {
        super(props)

        this.state = {
            stash: initStash(
                this.props.n,
                this.props.width,
                this.props.height,
                this.props.user
            ),
            dragging: null,
            i: 0,
            sl: 0,
        }
    }

    onStartSwipe = (i: number, event: MouseEvent | TouchEvent) => {
        const dragging = getWorldPoint(event)

        const anchor = getAnchor(this.props.width, this.props.height)

        // set the stash, flag the item motion as dragged
        const stash = set(this.state.stash, [i, 'motion'], {
            type: 'dragged',
            v: { x: 0, y: 0, z: 0 },
        })

        // compute the sl value, which is the l value at start
        const { position } = this.state.stash[i]

        const sl =
            point.distance(position, anchor) - point.distance(dragging, anchor)

        this.setState({ dragging, i, stash, sl })

        this.props.onDragStart && this.props.onDragStart()

        event.preventDefault()
    }

    onMouseMove = (event: MouseEvent | TouchEvent) => {
        const { i, dragging, sl } = this.state

        const { motion } = this.state.stash[i]

        if (!dragging || motion.type !== 'dragged') return

        const anchor = getAnchor(this.props.width, this.props.height)

        const worldPoint = getWorldPoint(event)

        const u = point.sub(worldPoint, anchor)

        const l = point.length(u)
        const direction = point.normalize(u)

        const position = point.addScal(anchor, direction, l)

        const v = point.lerp(
            point.sub(position, this.state.stash[i].position),
            motion.v,
            0.8
        )

        const stash_ = merge(this.state.stash, [i], {
            position,
            direction,
            motion: { ...motion, v },
        })

        // perturb a little the other bill
        const disturb = point.length(v)
        const stash = stash_.map(
            x =>
                x.motion.type === 'elastic_deck'
                    ? {
                          ...x,
                          motion: {
                              ...x.motion,
                              vL: x.motion.vL - disturb * 0.1 * Math.random(),
                              vTheta:
                                  x.motion.vTheta +
                                  disturb * (x.tint - 0.5) * 0.0003,
                          },
                      }
                    : x
        )

        this.setState({ stash })

        // prevent pull to refresh
        event.preventDefault()
    }

    onMouseUp = (event: MouseEvent | TouchEvent) => {
        const { i, dragging } = this.state

        if (!dragging) return

        const anchor = getAnchor(this.props.width, this.props.height)

        const { position, motion } = this.state.stash[i]

        const u = point.sub(position, anchor)

        const l = point.length(u)

        let nextMotion = null

        const k = point.scalar(point.normalize(u), motion.v)

        if (l - LEG > this.props.height / 4 && k > 2) {
            // set initial velocity
            let v = motion.v
            const vl = point.length(v)

            const VMAX = 30
            const VMIN = 15

            if (vl > VMAX) v = point.scal(v, VMAX / vl)

            if (vl < VMIN) v = point.scal(v, VMIN / vl)

            nextMotion = {
                type: 'launch',
                v,
            }
        } else if (position.y > anchor.y - LEG && k < 0) {
            // set initial velocity
            let v = point.scal(motion.v, 1)
            v.y = v.y + 0.1

            const vl = point.length(v)

            const VMAX = 14
            const VMIN = 5

            if (vl > VMAX) v = point.scal(v, VMAX / vl)

            if (vl < VMIN) v = point.scal(v, VMIN / vl)

            nextMotion = {
                type: 'fold',
                v,
            }
        } else {
            nextMotion = {
                type: 'elastic_deck',
                vL: k,
                vTheta: 0,
            }
        }

        let stash = this.state.stash

        if (nextMotion.type === 'fold') {
            stash = stash.map(
                x =>
                    x.motion.type === 'launch'
                        ? x
                        : { ...x, motion: nextMotion }
            )
        } else {
            stash = set(stash, [i, 'motion'], nextMotion)
        }

        this.setState({ dragging: null, stash })

        if (nextMotion.type === 'fold' && this.props.onFold) this.props.onFold()

        if (this.props.onSetBet)
            this.props.onSetBet(
                stash.filter(x => x.motion.type === 'launch').length
            )

        this.props.onDragEnd && this.props.onDragEnd()
    }

    loop = () => {
        const anchor = getAnchor(this.props.width, this.props.height)

        const stash = this.state.stash.map(x => {
            switch (x.motion.type) {
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
                    const v = point.scal(point.add(x.motion.v, a), 0.97)

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
                case 'fold': {
                    const a = { x: 0, y: 0.2, z: -0.1 }
                    const v = point.scal(point.add(x.motion.v, a), 0.95)

                    const position = point.add(x.position, v)

                    // const direction = point.lerp(x.direction, v, 0.8)

                    x = {
                        ...x,
                        position,
                        // direction,
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
            window.addEventListener('mouseup', this.onMouseUp)
            window.addEventListener('touchend', this.onMouseUp)

            // declare active event in order to be able to cancel the "pull to refresh" browser action
            window.addEventListener('touchmove', this.onMouseMove, {
                passive: false,
            })
        }
    }

    componentWillUnmount() {
        if (typeof cancelAnimationFrame !== 'undefined')
            cancelAnimationFrame(this._timeout)

        if (typeof window !== 'undefined') {
            window.removeEventListener('mousemove', this.onMouseMove)
            window.removeEventListener('touchmove', this.onMouseMove)
            window.removeEventListener('mouseup', this.onMouseUp)
            window.removeEventListener('touchend', this.onMouseUp)
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
