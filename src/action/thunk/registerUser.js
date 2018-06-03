import firebase from '../../util/firebase'
import { genUid } from '../../util/uid'
import { extname } from 'path'

import type { User } from '../../type'

type Action_Start = { type: 'registerUser:start' }
type Action_Success = {
  type: 'registerUser:success',
  user: User,
}
type Action_Failure = { type: 'registerUser:failure' }

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

export const registerUser = dispatch => async ({ picFile, name }): void => {
  dispatch({ type: 'registerUser:start' })

  // create the user
  const id = genUid()

  const user = {
    name,
    id,
    pic: await savePic(id, picFile),
  }

  dispatch({ type: 'registerUser:success', user })
}

export type Action = Action_Start | Action_Success | Action_Failure
