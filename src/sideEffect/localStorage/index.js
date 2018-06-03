import { write, read } from './api'
import { localStorageRead } from '../../action/index'

import type { Store } from '../reducer/type'

const LABEL = 'user'

export const init = store => {
  let prevUser = null

  const update = () => {
    const newUser = store.getState().me

    if (newUser != prevUser) write(LABEL, (prevUser = newUser))
  }

  store.dispatch(localStorageRead(read('user')))

  update()

  return store.subscribe(update)
}
