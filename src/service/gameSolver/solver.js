import { initGame } from './initGame'
import { chainReducer } from '../../util/redux'

import type { Action, Game_Running, Game_Over, Table } from './type'

/**
 * handle play action
 * fold / raise / call
 *
 */
const reducePlay = (game: Game_Running, action: Action): Game_Running => {
    const { speaker, hands, bets, turn } = game

    switch (action.type) {
        case 'fold':
        case 'raise':
        case 'call':
            // not your turn
            if (action.player != speaker) return game

            // next speaker
            let n = game.n
            do {
                n++
            } while (hands[n % bets.length] === 'folded')

            const nextGame = {
                ...game,
                n,
                speaker: n % bets.length,
            }

            const callValue = Math.max(...game.bets)

            if (action.type === 'fold')
                return {
                    ...nextGame,
                    hands: game.hands.map(
                        (hand, i) => (i === speaker ? 'folded' : hand)
                    ),
                }
            else if (action.type === 'raise' && action.value >= callValue)
                return {
                    ...nextGame,
                    bets: bets.map(
                        (bet, i) => (i === speaker ? action.value : bet)
                    ),
                }
            else
                return {
                    ...nextGame,
                    bets: bets.map(
                        (bet, i) => (i === speaker ? callValue : bet)
                    ),
                }

        default:
            return game
    }
}

/**
 * handle start action
 *
 */
const reduceStart = (table: Table, action: Action): Table => {
    switch (action.type) {
        case 'start':
            if (
                (!table.game || table.game.state === 'over') &&
                table.users.length > 0
            )
                return {
                    ...table,
                    game: initGame(table.users.length, table.blind),
                }
        default:
            return table
    }
}

/**
 * handle start action
 *
 */
const reduceEndTurn = (game: Game_Running): Game_Running => {
    if (
        game.n >= game.bets.length &&
        // for eavery player not folded, every bet are equals
        game.bets
            .filter((_, i) => game.hands[i] !== 'folded')
            .every((x, i, arr) => x === arr[0])
    ) {
        return {
            ...game,
            n: 0,
            speaker: 0,
            turn: game.turn + 1,
        }
    }

    return game
}

/**
 * check for end conditions
 *
 */
const reduceEndGame = (game: Game_Running): Game_Running | Game_Over => {
    let winner = -1

    if (game.hands.filter(x => x !== 'folded').length <= 1)
        winner = game.hands.findIndex(x => x !== 'folded')

    if (game.turn > 3) winner = 0

    if (winner !== -1)
        return {
            state: 'over',
            winner,
            river: game.river,
            bets: game.bets,
            hands: game.hands,
        }

    return game
}

const reduceGame = reducer => (table: Table, action: Action): Table => {
    if (!table.game || table.game.state === 'over') return table

    const newGame = reducer(table.game, action)

    return newGame == table.game ? table : { ...table, game: newGame }
}

/**
 * place the money from the bet into the winner bank once the game is over
 *
 */
const createWinRewardReducer = reducer => (
    table: Table,
    action: Action
): Table => {
    const newTable = reducer(table, action)

    const winningRound =
        newTable.game &&
        table.game &&
        newTable.game.state === 'over' &&
        table.game.state === 'running'

    if (winningRound)
        return {
            ...newTable,
            banks: newTable.banks.map(
                (bank, i) =>
                    i === newTable.game.winner
                        ? bank +
                          newTable.game.bets.reduce((sum, x) => sum + x, 0)
                        : bank
            ),
        }

    return newTable
}

/**
 * take money from the bank to match the bet
 *
 */
const createBankReducer = reducer => (table: Table, action: Action): Table => {
    const newTable = reducer(table, action)

    const newBanks = table.banks.map((bank, i) => {
        const previousBet =
            (table.game &&
                table.game.state === 'running' &&
                table.game.bets[i]) ||
            0
        const newBet = (newTable.game && newTable.game.bets[i]) || 0

        const delta = newBet - previousBet

        if (bank < delta) {
            newTable.game.bets[i] = bank

            return 0
        }

        return bank - delta
    })

    return { ...newTable, banks: newBanks }
}

export const reduce = createWinRewardReducer(
    createBankReducer(
        chainReducer(
            reduceStart,
            reduceGame(chainReducer(reducePlay, reduceEndTurn, reduceEndGame))
        )
    )
)
