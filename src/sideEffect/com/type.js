import type { User } from '../../type'
import type {
    Action,
    Game_Running,
    Game_Over,
} from '../../service/gameSolver/type'

type Action_ = Action | { type: 'init' }

export type Archived_Game = {
    users: User[],
    game: Game_Over,

    game0: Game_Running,
    actions: Action_[],
}

export type Room_Playing = {
    state: 'playing',

    users: User[],
    game: Game_Running,

    game0: Game_Running,
    actions: Array<{ date: number, action: Action_ }>,

    tic: number,

    achive: Archived_Game[],
}
export type Room_Waiting = {
    state: 'waiting',

    start_at: number,
    pending_players: { [string]: { user: User, bank: number, tic: number } },

    achive: Archived_Game[],
}
export type Room = Room_Playing | Room_Waiting
