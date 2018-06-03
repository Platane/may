import { imageLoader } from '../../util/imageLoader'
import { selectPic, DOLLAR_URL, GLASSES_URL } from './loading'
import type { User } from '../../type'

export const draw = (
  canvas,
  user: User | null,
  state: 'sad' | 'standard' | 'happy' | 'yolo' | null = 'standard',
  size: number = 800
) => {
  const url = user && selectPic(user, state)

  const img = (url && imageLoader.syncGet(url)) || null

  canvas.width = size
  canvas.height = (canvas.width * 336) / 800

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

  const glassesImg = imageLoader.syncGet(GLASSES_URL)

  if (glassesImg && state === 'yolo')
    ctx.drawImage(glassesImg, 258, 110, 364 * 0.6, 59 * 0.6)

  ctx.restore()
}
