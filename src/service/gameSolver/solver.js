import { initGame } from './initGame'
import { chainReducer } from '../../util/redux'
import { set, merge } from '../../util/redux'
import { getWinner } from './handSolver'

import type { Action, Game_Running, Game_Over } from './type'

/**
 * handle play action
 * fold / raise / call
 *
 */
const reducePlay = (game: Game_Running, action: Action): Game_Running => {
    const { speaker, players, turn } = game

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
            } while (players[n % players.length].folded)

            const nextGame = {
                ...game,
                n,
                speaker: n % players.length,
            }

            if (action.type === 'fold')
                return set(nextGame, ['players', speaker, 'folded'], true)

            // minimal value to bet
            const callValue = Math.max(...players.map(({ bet }) => bet))

            // target bet value
            let bet =
                action.type === 'raise' &&
                action.value >= callValue + game.blind
                    ? action.value
                    : callValue

            // new bank value
            let bank = players[speaker].bank - (bet - players[speaker].bet)

            // bank can not be negative
            if (bank < 0) {
                bet = bet + bank
                bank = 0
            }

            return merge(nextGame, ['players', speaker], { bet, bank })

        default:
            return game
    }
}

/**
 * handle start action
 *
 */
const reduceEndTurn = (game: Game_Running): Game_Running => {
    if (
        game.n >= game.players.length &&
        // for eavery player not folded, every bet are equals
        game.players
            .filter(player => !player.folded)
            .every((x, i, arr) => x.bet === arr[0].bet)
    ) {
        let n = 0

        while (game.players[n].folded) n++

        return {
            ...game,
            n,
            speaker: n % game.players.length,
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

    if (game.players.filter(player => !player.folded).length <= 1)
        winner = game.players.findIndex(player => !player.folded)

    if (game.turn > 3)
        winner = getWinner(
            game.river,
            game.players.map(player => (player.folded ? null : player.hand))
        )

    if (winner !== -1) {
        const pot = game.players.reduce((sum, player) => sum + player.bet, 0)

        return {
            blind: game.blind,
            river: game.river,
            state: 'over',
            winner,
            players: set(
                game.players,
                [winner, 'bank'],
                game.players[winner].bank + pot
            ),
        }
    }

    return game
}

export const reduce = chainReducer(reducePlay, reduceEndTurn, reduceEndGame)
