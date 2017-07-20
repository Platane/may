import firebase from '../../util/firebase'
import { updateGame, updateWaitingRoom } from '../../action/index'
import { createQueue, createScheduler } from '../../util/schedule'
import { loop } from './loop'
import { roomToGame, roomToWaitingRoom, cleanRoom } from './parse'

import type { Room } from './type'

export const init = (store: Store) => {
    let listeningTo = null

    let room: Room | null = null
    let ref = null

    const setRoom = room => ref && ref.set(room)
    const update = createQueue(() =>
        loop(store.getState(), room, setRoom, scheduleNextUpdate)
    )
    const scheduleNextUpdate = createScheduler(update)

    const dispatch = () => {
        switch (room && room.state) {
            case 'playing':
                const meId = store.getState().me && store.getState().me.id
                const game = roomToGame(meId, room)

                store.dispatch(updateGame(game))
                break
            case 'waiting':
                const { users, start_at } = roomToWaitingRoom(room) || {
                    users: [],
                    start_at: 0,
                }
                store.dispatch(updateWaitingRoom(users, start_at))
                break
        }
    }

    const whenStoreChange = () => {
        const roomId = store.getState().appState.tableToJoin

        if (roomId && listeningTo !== roomId) {
            listeningTo = roomId

            ref = firebase.database().ref(`/room/${roomId}`)

            ref.on('value', snapshot => {
                room = cleanRoom(snapshot.val())

                dispatch()

                update()
            })
        }
    }

    whenStoreChange()

    store.subscribe(whenStoreChange)
}
