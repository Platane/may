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

export type PlayerState = 'out' | 'inGame'

export type PlayerMood = 'happy' | 'sad' | 'idle'

export type Game = {
    river: [Card, Card, Card | null, Card | null, Card | null],

    bets: number[],

    playerStates: playerState[],

    playerMoods: PlayerMood[],

    hands: Array<[Card, Card]>,
}

export type Table = {
    id: string,

    users: User[],

    waitingList: User[],

    game: Game | null,
}
