import { imageLoader } from '../../util/imageLoader'

import type { User } from '../../type'

export const DOLLAR_URL = require('../../asset/image/100dollar.jpg')
export const GLASSES_URL = require('../../asset/image/glasses.png')

const dollarLoaded = imageLoader.load(DOLLAR_URL)
const glassesLoaded = imageLoader.load(GLASSES_URL)

export const selectPic = (
    user: User,
    state: 'sad' | 'standard' | 'happy' | 'yolo' | null = 'standard'
): string | null =>
    (state === 'sad' && user.pic.sad) ||
    (state === 'happy' && user.pic.happy) ||
    (state === 'yolo' && user.pic.happy) ||
    user.pic.idle ||
    null

export const ready = (
    user: User | null,
    state: 'sad' | 'standard' | 'happy' | 'yolo' | null = 'standard'
) => {
    const url = user && selectPic(user, state)
    return !!(
        (!url || imageLoader.syncGet(url)) &&
        imageLoader.syncGet(DOLLAR_URL) &&
        imageLoader.syncGet(GLASSES_URL)
    )
}

export const load = (
    user: User | null,
    state: 'sad' | 'standard' | 'happy' | 'yolo' | null = 'standard'
) => {
    const url = user && selectPic(user, state)
    return Promise.all(
        [dollarLoaded, glassesLoaded, url && imageLoader.load(url)].filter(
            Boolean
        )
    )
}
