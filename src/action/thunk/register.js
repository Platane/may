/* global firebase */
import { firebase as config } from '../../config'
import { genUid } from '../../util/uid'

type Action_Success = { type: 'register:success', user: User }
type Action_Failure = { type: 'register:failure' }

export const register = dispatch => async (
    u: { pic: Object, name: string },
    tableId: string
): RegisterAction => {
    firebase.initializeApp(config)

    const ref = firebase.database().ref(`/table/${tableId}`)

    let table = (await ref.once('value')).val()

    // push the table if it does not already exists
    if (!table) {
        table = {
            users: {},
            game: null,
        }

        await ref.set(table)
    }

    // acquire use key
    var userId = ref.child('users').push().key

    const user = {
        name: u.name,
        id: userId,
    }

    await ref.update({ [`/users/${userId}`]: user })

    dispatch({ type: 'register:success', user })
}

export type Action = Action_Success | Action_Failure
