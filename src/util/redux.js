export const chainReducer = (...reducers) => (state0, action) =>
    reducers.reduce((state, reducer) => reducer(state, action, state0), state0)
