import { imageLoader } from '../../util/imageLoader'

import type { User } from '../../type'

export const selectPic = (
    user: User,
    state: 'sad' | 'standard' | 'happy' | 'yolo' = 'standard'
): string | null =>
    (state === 'sad' && user.pic.sad) ||
    (state === 'happy' && user.pic.happy) ||
    (state === 'yolo' && user.pic.happy) ||
    user.pic.idle ||
    null

export const ready = (
    user: User,
    state: 'sad' | 'standard' | 'happy' | 'yolo' = 'standard'
) => {
    const url = selectPic(user, state)
    return !url || !!imageLoader.syncGet(url)
}

export const load = (
    user: User,
    state: 'sad' | 'standard' | 'happy' | 'yolo' = 'standard'
) => {
    const url = selectPic(user, state)
    return !url ? Promise.resolve() : imageLoader.load(url)
}
