import type { Game, Card, User } from '../../type'

export type Action =
    | { type: 'raise', player: number, value: number }
    | { type: 'call', player: number }
    | { type: 'fold', player: number }
    | { type: 'start' }

export type Game_Running = {
    state: 'running',

    // 0 preflop
    // 2 flop
    // 2 turn
    // 3 river
    // 4 end ( not a stable state )
    turn: number,

    // used internaly
    // n % n_player = player to speak
    // n / n_player = number of turn of table for this turn
    n: number,

    // next player to do an action
    speaker: number,

    river: [Card, Card, Card, Card, Card],

    // for every player, the bet for this game
    bets: number[],

    // for every player, the two cards,
    // or folded if the player have fold
    hands: Array<[Card, Card] | 'folded'>,
}

export type Game_Over = {
    state: 'over',

    river: [Card, Card, Card, Card, Card],

    bets: number[],

    hands: Array<[Card, Card] | 'folded'>,

    winner: number,
}

export type Table = {
    users: User[],

    banks: number[],

    blind: number,

    game: Game_Over | Game_Running | null,
}
