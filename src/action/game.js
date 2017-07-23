type Action_GameRaiseTemp = { type: 'game:raise:temp', value: number }
export const raiseTemp = (value: number) => ({
    type: 'game:raise:temp',
    value,
})

type Action_GameRaise = { type: 'game:raise', value: number }
export const raise = (value: number) => ({
    type: 'game:raise',
    value,
})

type Action_GameCall = { type: 'game:call' }
export const call = (value: number) => ({ type: 'game:call' })

type Action_GameFold = { type: 'game:fold' }
export const fold = (value: number) => ({ type: 'game:fold' })

export type Action =
    | Action_GameRaiseTemp
    | Action_GameRaise
    | Action_GameCall
    | Action_GameFold
