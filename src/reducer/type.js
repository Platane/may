import type { User, Card } from '../type'

export type Path = null | ['gate'] | ['table', string]

export type State = {
    appState: {
        path: Path,
    },

    me: User | null,

    table: Table,
}
