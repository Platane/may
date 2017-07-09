export const chainReducer = (...reducers) => (state0, action) =>
    reducers.reduce((state, reducer) => reducer(state, action, state0), state0)

const isObject = a => !!(a && typeof a === 'object' && !Array.isArray(a))

export const set = (
    source: Object,
    path: (string | number)[],
    value: any
): Object => {
    const [key, ...rest] = path

    if (!key)
        return isObject(source) && isObject(value)
            ? { ...source, ...value }
            : value

    if (typeof key === 'number') {
        // array
        const copy = Array.isArray(source) ? source.slice() : []

        copy[key] = set(copy[key], rest, value)

        return copy
    } else {
        // object

        source = isObject(source) ? source : {}

        return {
            ...source,
            [key]: set(source[key], rest, value),
        }
    }
}
