import { reduce } from '../solver'
import { initGame } from '../initGame'
import { users } from '../../../__fixtures__/users'

const game0 = initGame([10, 10, 10], 1)

const apply = (state0, ...actions) =>
    actions.reduce((state, action) => reduce(state, action), state0)

describe('init', () => {
    it('new game should be running', () => {
        expect(game0.state).toBe('running')
    })
    it('should apply the blind, and allows the third person to speak', () => {
        expect(game0.players.map(x => x.bet)).toEqual([1, 2, 0])
        expect(game0.speaker).toEqual(2)
    })
})
describe('play action', () => {
    it('should ignore if wrong player', () => {
        const game = apply(game0, { type: 'fold', player: 0 })

        expect(game.players.map(x => x.folded)).toEqual([false, false, false])
        expect(game.players.map(x => x.bet)).toEqual([1, 2, 0])
    })

    it('should do "fold"', () => {
        const game = apply(game0, { type: 'fold', player: 2 })

        expect(game.players.map(x => x.folded)).toEqual([false, false, true])
        expect(game.players.map(x => x.bet)).toEqual([1, 2, 0])
    })

    it('should do "raise"', () => {
        const game = apply(game0, { type: 'raise', player: 2, value: 3 })

        expect(game.players.map(x => x.folded)).toEqual([false, false, false])
        expect(game.players.map(x => x.bet)).toEqual([1, 2, 3])
    })

    it('should do "call"', () => {
        const game = apply(
            game0,
            { type: 'raise', player: 2, value: 4 },
            { type: 'call', player: 0 }
        )

        expect(game.players.map(x => x.folded)).toEqual([false, false, false])
        expect(game.players.map(x => x.bet)).toEqual([4, 2, 4])
    })

    it("should raise at the minimum ( last bet + blind ) at least ( else it's a call )", () => {
        const game = apply(game0, { type: 'raise', player: 2, value: 1 })

        expect(game.players.map(x => x.folded)).toEqual([false, false, false])
        expect(game.players.map(x => x.bet)).toEqual([1, 2, 2])
    })
})

describe('turn', () => {
    it('should not end turn until every bet is equal', () => {
        const game = apply(
            game0,
            { type: 'raise', player: 2, value: 4 },
            { type: 'raise', player: 0, value: 4 },
            { type: 'raise', player: 1, value: 6 },
            { type: 'raise', player: 2, value: 9 },
            { type: 'raise', player: 0, value: 9 },
            { type: 'raise', player: 1, value: 19 },
            { type: 'raise', player: 2, value: 19 }
        )
        expect(game.turn).toBe(0)
    })
    it('should not end turn until every player spoke at least once', () => {
        const game1 = apply(
            game0,
            { type: 'call', player: 2 },
            { type: 'call', player: 0 }
        )
        const game2 = apply(
            game1,
            { type: 'call', player: 0 },
            { type: 'call', player: 1 }
        )
        const game3 = apply(
            game2,
            { type: 'call', player: 0 },
            { type: 'call', player: 1 },
            { type: 'call', player: 2 }
        )
        expect(game1.turn).toBe(1)
        expect(game2.turn).toBe(1)
        expect(game3.turn).toBe(2)
    })
    it('should end turn once every bet is equal', () => {
        const game = apply(
            game0,
            { type: 'fold', player: 2 },
            { type: 'raise', player: 0, value: 2 },
            { type: 'raise', player: 1, value: 3 },
            { type: 'raise', player: 0, value: 5 },
            { type: 'raise', player: 1, value: 6 },
            { type: 'raise', player: 0, value: 7 }
        )
        expect(game.turn).toBe(1)
    })
    it('should start the new turn with the first player', () => {
        const game = apply(
            game0,
            { type: 'raise', player: 2, value: 2 },
            { type: 'raise', player: 0, value: 2 }
        )
        expect(game.turn).toBe(1)
        expect(game.speaker).toBe(0)
    })
    it('should start the new turn with the second player if the first one is folded', () => {
        const game = apply(
            game0,
            { type: 'raise', player: 2, value: 2 },
            { type: 'fold', player: 0 }
        )
        expect(game.turn).toBe(1)
        expect(game.speaker).toBe(1)
    })
})

describe('win condition', () => {
    it('should win when every body else fold', () => {
        const game = apply(
            game0,
            { type: 'raise', player: 2, value: 4 },
            { type: 'fold', player: 0 },
            { type: 'fold', player: 1 }
        )
        expect(game.state).toBe('over')
        expect(game.winner).toBe(2)
    })
    it('should win at the end of the river', () => {
        const game = apply(
            game0,
            // preflop
            { type: 'call', player: 2 },
            { type: 'call', player: 0 },
            // flop
            { type: 'call', player: 0 },
            { type: 'call', player: 1 },
            { type: 'call', player: 2 },
            // turn
            { type: 'call', player: 0 },
            { type: 'call', player: 1 },
            { type: 'call', player: 2 },
            // river
            { type: 'call', player: 0 },
            { type: 'call', player: 1 },
            { type: 'call', player: 2 }
        )
        expect(game.state).toBe('over')
        expect([0, 1, 2]).toContain(game.winner)
    })
})

describe('bank', () => {
    it("should take money from the player' bank when he places a bet", () => {
        const game = apply(game0, { type: 'raise', player: 2, value: 4 })
        expect(game0.players.map(x => x.bank)).toEqual([9, 8, 10])
        expect(game.players.map(x => x.bank)).toEqual([9, 8, 6])
    })
    it('should limit a bet by the sum in bank', () => {
        const game = apply(game0, { type: 'raise', player: 2, value: 20 })
        expect(game.players.map(x => x.bank)).toEqual([9, 8, 0])
        expect(game.players.map(x => x.bet)).toEqual([1, 2, 10])
    })
    it('should give the pot to the winner at the end', () => {
        const game = apply(
            game0,
            { type: 'fold', player: 2 },
            { type: 'fold', player: 0 }
        )
        expect(game.players.map(x => x.bank)).toEqual([9, 11, 10])
    })
})
