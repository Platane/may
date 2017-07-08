import firebase from '../../util/firebase'
import { genUid } from '../../util/uid'
import { extname } from 'path'

type Action_Success = { type: 'register:success', user: User }
type Action_Failure = { type: 'register:failure' }

const savePic = async (userId: string, picFile: Object) => {
    const ref = firebase.storage().ref(`user_pics/${userId}`)

    const updload = async (file, name) =>
        file &&
        (await ref.child(`${name}${extname(file.name)}`).put(file)).downloadURL

    const sad = await updload(picFile.sad, 'sad')
    const idle = await updload(picFile.idle, 'idle')
    const happy = await updload(picFile.happy, 'happy')

    const base = idle || happy || sad || 'default.jpg'

    return {
        happy: happy || base,
        sad: sad || base,
        idle: idle || base,
    }
}

export const register = dispatch => async (
    { picFile, name },
    tableId: string
): RegisterAction => {
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

    // create the user
    const user = {
        name,
        id: userId,
        pic: await savePic(userId, picFile),
    }

    await ref.update({ [`/users/${userId}`]: user })

    dispatch({ type: 'register:success', user })
}

export type Action = Action_Success | Action_Failure
