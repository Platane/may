export const chainReducer = <State, Action>(
    ...reducers: Array<(state: State, action: Action, state0: State) => State>
) => (state0: State, action: Action): State =>
    reducers.reduce((state, reducer) => reducer(state, action, state0), state0)

const isObject = (a: any): boolean =>
    !!(a && typeof a === 'object' && !Array.isArray(a))

export const set = (
    source: any,
    path: (string | number)[],
    value: any
): any => {
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
