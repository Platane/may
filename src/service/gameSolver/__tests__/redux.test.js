import { reduce } from '../solver'
import { users } from '../../../__fixtures__/users'

import type { Table } from '../type'

const initTable: Table = reduce(
    {
        users,
        banks: users.map(() => 10),
        game: null,
        blind: 1,
    },
    { type: 'start' }
)

const apply = (state0, ...actions) =>
    actions.reduce((state, action) => reduce(state, action), state0)

describe('init', () => {
    it('should stat a new game', () => {
        expect(initTable.game.state).toBe('running')
    })
    it('should apply the blind, and allows the third person to speak', () => {
        expect(initTable.game.bets).toEqual([1, 2, 0])
        expect(initTable.game.speaker).toEqual(2)
    })
})
describe('play action', () => {
    it('should ignore if wrong player', () => {
        const table = apply(initTable, { type: 'fold', player: 0 })

        expect(table.game.hands.map(x => x === 'folded')).toEqual([
            false,
            false,
            false,
        ])
        expect(table.game.bets).toEqual([1, 2, 0])
    })

    it('should do "fold"', () => {
        const table = apply(initTable, { type: 'fold', player: 2 })

        expect(table.game.hands.map(x => x === 'folded')).toEqual([
            false,
            false,
            true,
        ])
        expect(table.game.bets).toEqual([1, 2, 0])
    })

    it('should do "raise"', () => {
        const table = apply(initTable, { type: 'raise', player: 2, value: 3 })

        expect(table.game.hands.map(x => x === 'folded')).toEqual([
            false,
            false,
            false,
        ])
        expect(table.game.bets).toEqual([1, 2, 3])
    })

    it('should do "call"', () => {
        const table = apply(
            initTable,
            { type: 'raise', player: 2, value: 4 },
            { type: 'call', player: 0 }
        )

        expect(table.game.hands.map(x => x === 'folded')).toEqual([
            false,
            false,
            false,
        ])
        expect(table.game.bets).toEqual([4, 2, 4])
    })

    it("should raise at the minimum ( last bet + blind ) at least ( else it's a call )", () => {
        const table = apply(initTable, { type: 'raise', player: 2, value: 1 })

        expect(table.game.hands.map(x => x === 'folded')).toEqual([
            false,
            false,
            false,
        ])
        expect(table.game.bets).toEqual([1, 2, 2])
    })
})

describe('turn', () => {
    it('should not end turn until every bet is equal', () => {
        const table = apply(
            initTable,
            { type: 'raise', player: 2, value: 4 },
            { type: 'raise', player: 0, value: 4 },
            { type: 'raise', player: 1, value: 6 },
            { type: 'raise', player: 2, value: 9 },
            { type: 'raise', player: 0, value: 9 },
            { type: 'raise', player: 1, value: 19 },
            { type: 'raise', player: 2, value: 19 }
        )
        expect(table.game.turn).toBe(0)
    })
    it('should not end turn until every player spoke at least once', () => {
        const table0 = apply(
            initTable,
            { type: 'call', player: 2 },
            { type: 'call', player: 0 }
        )
        const table1 = apply(
            table0,
            { type: 'call', player: 0 },
            { type: 'call', player: 1 }
        )
        const table2 = apply(
            table1,
            { type: 'call', player: 0 },
            { type: 'call', player: 1 },
            { type: 'call', player: 2 }
        )
        expect(table0.game.turn).toBe(1)
        expect(table1.game.turn).toBe(1)
        expect(table2.game.turn).toBe(2)
    })
    it('should end turn once every bet is equal', () => {
        const table = apply(
            initTable,
            { type: 'fold', player: 2 },
            { type: 'raise', player: 0, value: 2 },
            { type: 'raise', player: 1, value: 3 },
            { type: 'raise', player: 0, value: 5 },
            { type: 'raise', player: 1, value: 6 },
            { type: 'raise', player: 0, value: 7 }
        )
        expect(table.game.turn).toBe(1)
    })
    it('should start the new turn with the first player', () => {
        const table = apply(
            initTable,
            { type: 'raise', player: 2, value: 2 },
            { type: 'raise', player: 0, value: 2 }
        )
        expect(table.game.turn).toBe(1)
        expect(table.game.speaker).toBe(0)
    })
})

describe('win condition', () => {
    it('should win when every body else fold', () => {
        const table = apply(
            initTable,
            { type: 'raise', player: 2, value: 4 },
            { type: 'fold', player: 0 },
            { type: 'fold', player: 1 }
        )
        expect(table.game.state).toBe('over')
        expect(table.game.winner).toBe(2)
    })
    it('should win at the end of the river', () => {
        const table = apply(
            initTable,
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
        expect(table.game.state).toBe('over')
        expect([0, 1, 2]).toContain(table.game.winner)
    })
})

describe('bank', () => {
    it("should take money from the player' bank when he places a bet", () => {
        const table = apply(initTable, { type: 'raise', player: 2, value: 4 })
        expect(initTable.banks).toEqual([9, 8, 10])
        expect(table.banks).toEqual([9, 8, 6])
    })
    it('should limit a bet by the sum in bank', () => {
        const table = apply(initTable, { type: 'raise', player: 2, value: 20 })
        expect(table.banks).toEqual([9, 8, 0])
        expect(table.game.bets).toEqual([1, 2, 10])
    })
    it('should give the pot to the winner at the end', () => {
        const table = apply(
            initTable,
            { type: 'fold', player: 2 },
            { type: 'fold', player: 0 }
        )
        expect(table.banks).toEqual([9, 11, 10])
    })
})
