import type { Action, State } from '../../type'

export const reduce = (state: State, Action: action): State => {
    if (!state.me)
        return {
            ...state,
            appState: {
                ...state.appState,
                path: ['gate'],
            },
        }
}
