import React from 'react'
import { MoneyRain as SimpleMoneyRain } from './index'

import type { Point } from '../../../../util/math/point'

const MAX_ENTITIES = 8
const Y_VELOCITY = 0.04
const DURATION = 12000

const aPhy = 0.003
const aRho = 0.00056

type Particule = {
    pos0: Point,
    t: number,
    phy: number,
    rho: number,
    r: number,

    pos: Point,
    opacity: number,
    tint: number,
    rz: number,
    ry: number,
}

export class MoneyRain extends React.Component {
    state = { particules: [], lastTic: Date.now() }

    _timeout = null

    loop = () => {
        const delta = Date.now() - this.state.lastTic
        let particules = this.state.particules

        while (
            particules.length < MAX_ENTITIES &&
            (!particules[0] || particules[0].t > DURATION / MAX_ENTITIES)
        )
            particules = [
                {
                    t: Math.random() * DURATION * 0.001,
                    pos0: {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        z: Y_VELOCITY * DURATION * 0.9,
                    },
                    phy: Math.random() * Math.PI * 2,
                    rho: Math.random() * Math.PI * 2,
                    r: Math.random() * 30 + 30,

                    pos: { x: 0, y: 0, z: 10 },
                    opacity: 0,
                    tint: Math.random(),
                    rz: 0,
                    ry: 0,
                },
                ...particules,
            ]

        particules = particules
            .map(particule => {
                const { t, phy, rho, r, pos0 } = particule

                if (particule.pos.z > 3) {
                    // position
                    particule.pos.x =
                        pos0.x +
                        Math.sin(t * aRho + rho) * Math.sin(t * aPhy + phy) * r

                    particule.pos.y =
                        pos0.y +
                        Math.cos(t * aRho + rho) * Math.sin(t * aPhy + phy) * r

                    particule.pos.z =
                        pos0.z -
                        Y_VELOCITY * t +
                        -Math.abs(
                            Math.cos(t * aPhy + phy) * Math.cos(t * aPhy + phy)
                        ) *
                            20

                    particule.pos.z = Math.max(particule.pos.z, 3)

                    // rotation
                    particule.rz = -(t * aRho + rho) + Math.PI / 2
                    particule.ry = -Math.sin(t * aPhy + phy) * 0.4
                    particule.ry =
                        particule.ry *
                        Math.max(
                            0,
                            Math.min(
                                1,
                                1 -
                                    (particule.t - DURATION * 0.75) /
                                        (DURATION * 0.08)
                            )
                        )
                }

                // incr t
                particule.t = particule.t + delta

                // opacity
                if (particule.t > DURATION * 0.95)
                    particule.opacity =
                        (DURATION - particule.t) / (DURATION * 0.05)
                else if (particule.t < DURATION * 0.05)
                    particule.opacity = particule.t / (DURATION * 0.05)
                else particule.opacity = 1

                // remove at end of life
                if (particule.t > DURATION) return null
                else return particule
            })
            .filter(Boolean)

        this.setState({ particules, lastTic: Date.now() })

        if (typeof requestAnimationFrame !== 'undefined')
            this._timeout = requestAnimationFrame(this.loop)
    }

    componentDidMount() {
        if (typeof requestAnimationFrame !== 'undefined')
            this._timeout = requestAnimationFrame(this.loop)
    }

    componentWillUnmount() {
        if (typeof cancelAnimationFrame !== 'undefined')
            cancelAnimationFrame(this._timeout)
    }

    render() {
        return (
            <SimpleMoneyRain
                particules={this.state.particules}
                {...this.props}
            />
        )
    }
}
