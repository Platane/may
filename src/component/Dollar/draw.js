import { imageLoader } from '../../util/imageLoader'

import type { User } from '../../type'

const DOLLAR_URL = require('../../asset/image/100dollar.jpg')

imageLoader.load(DOLLAR_URL)

const selectPic = (
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

export const draw = (
    canvas,
    user: User | null,
    state: 'sad' | 'standard' | 'happy' | 'yolo' = 'standard',
    size: number = 800
) => {
    const url = user && selectPic(user, state)

    const img = (url && imageLoader.syncGet(url)) || null

    canvas.width = size
    canvas.height = canvas.width * 336 / 800

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const dollarImg = imageLoader.syncGet(DOLLAR_URL)

    dollarImg && ctx.drawImage(dollarImg, 0, 0, 800, 336)

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(355, 165, 124, 145, 0.1, 0, Math.PI * 2, false)
    ctx.clip()

    ctx.beginPath()
    ctx.rect(0, 0, 999, 999)
    ctx.fillStyle = '#fcfee6'
    ctx.fill()

    if (img) {
        const w = img.naturalWidth
        const h = img.naturalHeight

        const xw = 250
        const xh = 290

        const r = Math.max(w / xw, h / xh)

        const fw = r * w
        const fh = h * w

        ctx.globalAlpha = 0.7
        ctx.drawImage(img, 230, 20, xw, xh)
    }

    ctx.restore()
}
