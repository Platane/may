import type { Game, Card, User } from '../../type'

export type Action =
    | { type: 'raise', player: number, value: number }
    | { type: 'call', player: number }
    | { type: 'fold', player: number }

export type Player = {
    bet: number,
    banks: number,
    folded: boolean,
    hand: [Card, Card],
}

export type Game_Running = {
    state: 'running',

    river: [Card, Card, Card, Card, Card],

    blind: number,

    players: Player[],

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
}

export type Game_Over = {
    state: 'over',

    river: [Card, Card, Card, Card, Card],

    blind: number,

    players: Player[],

    winner: number,
}
