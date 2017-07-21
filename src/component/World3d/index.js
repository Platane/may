import React from 'react'

const worldStyle = {
    perspective: '2000px',
    transformStyle: 'preserve-3d',
}

const concatTransform = (parentTransform, node) =>
    parentTransform +
    ((node.props && node.props.style && node.props.style.transform) || '')

const applyTransform = (parentTransform, node) =>
    React.cloneElement(
        node,
        {
            ...(node.props || {}),
            style: {
                ...(node.props.style || {}),
                transform: concatTransform(parentTransform, node),
            },
        },
        node.children
    )

const extract3dObject = (children, parentTransform = '') =>
    [].concat(
        ...React.Children.map(children, node => {
            if (!node || !node.props) return []

            if (node.props['data-leaf3d'])
                return [applyTransform(parentTransform, node)]

            if (node.props.children) {
                return extract3dObject(
                    node.props.children,
                    concatTransform(parentTransform, node)
                )
            }

            return []
        })
    )

export const World3d = ({ phy, theta, children }) =>
    <div style={worldStyle}>
        {extract3dObject(
            children,
            `rotate3d(0,0,1,${phy}rad) rotate3d(0,1,0,${theta}rad)`
        )}
    </div>
