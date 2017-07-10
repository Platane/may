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

    ctx.save()
    ctx.scale(size / 800, size / 800)

    const dollarImg = imageLoader.syncGet(DOLLAR_URL)

    dollarImg && ctx.drawImage(dollarImg, 0, 0, 800, 336)

    ctx.save()
    ctx.beginPath()
    ctx.ellipse(355, 165, 124, 145, 0.1, 0, Math.PI * 2, false)
    ctx.clip()

    if (img) {
        ctx.beginPath()
        ctx.rect(0, 0, 999, 999)
        ctx.fillStyle = '#fcfee6'
        ctx.fill()

        const w = img.naturalWidth
        const h = img.naturalHeight

        const xw = 252
        const xh = 290

        const r = Math.min(w / xw, h / xh)

        const fw = r * xw
        const fh = r * xh

        ctx.globalCompositeOperation = 'luminosity'
        ctx.drawImage(img, (w - fw) / 2, (h - fh) / 2, fw, fh, 228, 20, xw, xh)

        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.rect(0, 0, 999, 999)
        ctx.fillStyle = 'hsl(64, 42%, 20%)'
        ctx.fill()

        ctx.globalCompositeOperation = 'soft-light'
        ctx.beginPath()
        ctx.rect(0, 0, 999, 999)
        ctx.fillStyle = 'hsl(64, 42%, 94%)'
        ctx.fill()
    }

    ctx.restore()
    ctx.restore()
}
