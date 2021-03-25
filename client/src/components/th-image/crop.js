/**
 * @param {number} weight 原图显示宽度
 * @param {number} height 原图显示高度
 * @param {number} sx 裁剪起点x
 * @param {number} sy 裁剪起点y
 * @param {number} ctxWeight 裁剪高度
 * @param {number} ctxHeight 裁剪高度
 * @param {number} naturalWidth 原图宽度
 */

class THImages {
  constructor (weight, height, sx, sy, ctxWeight, ctxHeight) {
    this.weight = weight
    this.height = height
    this.sx = sx
    this.sy = sy
    this.ctxWeight = ctxWeight
    this.ctxHeight = ctxHeight
    this.scale = 1
    this.ctxScale = 1
  }
  handleCrop (canvas, imgSrc) {
    let image = new Image()
    let context = canvas.getContext('2d')
    let base64 = ''
    let oriImageW = 0
    // let oriImageH = 0
    image.src = imgSrc
    return new Promise((resolve, reject) => {
      image.onload = () => {
        oriImageW = image.naturalWidth
        // oriImageH = image.naturalHeight
        this.scale = (oriImageW / this.weight).toFixed(3)
        this.ctxScale = (oriImageW / this.ctxWeight).toFixed(3)
        canvas.width = this.ctxWeight
        canvas.height = this.ctxHeight
        console.log(this.ctxWeight * this.scale, this.ctxHeight * this.scale, oriImageW, this.weight, this.scale)
        context.drawImage(image, this.sx * this.scale, this.sy * this.scale, this.ctxWeight * this.scale, this.ctxHeight * this.scale, 0, 0, this.ctxWeight, this.ctxHeight)
        base64 = canvas.toDataURL('image/png', 0.92)
        resolve(base64)
      }
      image.onerror = (err) => {
        reject(err)
      }
      image.onabort = (err) => {
        reject(err)
      }
    })
  }

  getCss (o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, null)[key]
  }
}

export default THImages
