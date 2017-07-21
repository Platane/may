export type User = {
    id: string,
    name: string,
    pic: {
        sad: string,
        happy: string,
        idle: string,
    },
}

export type Card = {
    color: 'diamond' | 'club' | 'heart' | 'spade',
    value:
        | '1'
        | '2'
        | '3'
        | '4'
        | '5'
        | '6'
        | '7'
        | '8'
        | '9'
        | '10'
        | 'J'
        | 'Q'
        | 'K',
}

export type Card_hidden = { hidden: true }

/// Game

export type PlayerMood = 'happy' | 'sad' | 'idle'

export type Player = {
    ...User,

    mood: PlayerMood,

    bank: number,

    hand: [Card | Card_hidden, Card | Card_hidden],

    bet: number,

    folded: false,
}

export type Game = {
    cards: [
        Card | Card_hidden,
        Card | Card_hidden,
        Card | Card_hidden,
        Card | Card_hidden,
        Card | Card_hidden,
    ],

    speaker: number | null,

    players: Player,
}
