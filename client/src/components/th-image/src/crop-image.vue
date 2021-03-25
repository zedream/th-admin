<template>
  <div class="container">
    <div class="actions">
      <el-button type="danger" @click="cancel" icon="el-icon-close" circle></el-button>
      <el-button type="success" @click="confirm" icon="el-icon-check" circle></el-button>
    </div>
    <img v-if="base64" :src="base64">
    <div v-show="!base64" class="origin-image-box">
<!--      <div class="image-mask"></div>-->
      <div class="dynamic-cropping-box" @mousedown="cropMousedown" :style="{...croppingBoxStyle}">
        <div class="ne-resize"></div>
        <div class="se-resize"></div>
        <div class="sw-resize"></div>
        <div class="nw-resize"></div>
      </div>
    </div>
    <canvas style="display: none" class="img" id="canvas"></canvas>
  </div>
</template>

<script>
import THImages from '../crop'
import throttle from 'lodash/throttle'
// import debounce from 'lodash/debounce'
export default {
  data () {
    return {
      thImages: '',
      base64: '',
      binaryString: '',
      dataURL: '',
      fileName: '',
      container: '',
      cursor: '',
      croppingBox: {
        width: 360,
        height: 360,
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        containerWidth: 0,
        containerHeight: 0,
        originalX: 0,
        originalY: 0,
        clickX: 0,
        clickY: 0,
        borderT: 0,
        borderL: 0,
        borderR: 0,
        borderB: 0,
        offsetX: 0,
        offsetY: 0
      }
    }
  },
  computed: {
    croppingBoxStyle () {
      let temp = Object.create(null)
      Object.assign(temp, this.croppingBox)
      console.log(temp)
      for (let key in temp) {
        temp[key] = temp[key] + 'px'
      }
      return temp
    }
  },
  props: {
    file: {
      type: Blob,
      default () {
        return null
      }
    }
  },
  mounted () {
    let that = this
    this.container = document.querySelector('.origin-image-box')
    this.fileName = this.file.name
    this.fileChange()
    document.addEventListener('mouseup', function () {
      that.container.removeEventListener('mousemove', that.imgMouseMove)
    }, false)
  },
  methods: {
    cropMousedown (e) {
      this.cursor = window.getComputedStyle(e.target, null).cursor
      this.croppingBox.clickX = e.clientX
      this.croppingBox.clickY = e.clientY
      this.croppingBox.originalX = e.clientX - e.offsetX
      this.croppingBox.originalY = e.clientY - e.offsetY
      this.croppingBox.offsetX = e.offsetX
      this.croppingBox.offsetY = e.offsetY
      if (this.cursor === 'ne-resize') {
        console.log('ne', e.clientX, e.clientY)
      } else if (this.cursor === 'se-resize') {
        console.log('se', e.clientX, e.clientY)
      } else if (this.cursor === 'sw-resize') {
        console.log('sw', e.clientX, e.clientY)
      } else if (this.cursor === 'nw-resize') {
        console.log('nw', e.clientX, e.clientY)
      } else if (this.cursor === 'move') {
        console.log('move', e.clientX, e.clientY)
      }
      this.container.addEventListener('mousemove', this.imgMouseMove, false)
      console.log('原点', this.croppingBox.originalX, this.croppingBox.originalY)
    },
    imgMouseMove: throttle(function (e) {
      if (e.clientX > this.croppingBox.clickX && this.croppingBox.borderR - 0.1 >= 0) { // 右移
        this.croppingBox.borderL += e.clientX - this.croppingBox.clickX
        this.croppingBox.borderR -= e.clientX - this.croppingBox.clickX
        console.log('右移...', 'borderL', this.croppingBox.borderL, 'borderR', this.croppingBox.borderR)
      } else if (e.clientX < this.croppingBox.clickX && this.croppingBox.borderL - 0.1 >= 0) {
        this.croppingBox.borderR += this.croppingBox.clickX - e.clientX
        this.croppingBox.borderL -= this.croppingBox.clickX - e.clientX
        console.log('左移...', 'borderL', this.croppingBox.borderL, 'borderR', this.croppingBox.borderR)
      }
      if (e.clientY > this.croppingBox.clickY && this.croppingBox.borderB - 0.1 >= 0) { // 下移
        this.croppingBox.borderT += e.clientY - this.croppingBox.clickY
        this.croppingBox.borderB -= e.clientY - this.croppingBox.clickY
        console.log('下移...', 'borderT', this.croppingBox.borderT, 'borderB', this.croppingBox.borderB)
      } else if (e.clientY < this.croppingBox.clickY && this.croppingBox.borderT - 0.1 >= 0) {
        this.croppingBox.borderB += this.croppingBox.clickY - e.clientY
        this.croppingBox.borderT -= this.croppingBox.clickY - e.clientY
        console.log('上移...', 'borderT', this.croppingBox.borderT, 'borderB', this.croppingBox.borderB)
      }
      // this.croppingBox.top += e.clientY - this.croppingBox.clickY
      // this.croppingBox.left += e.clientX - this.croppingBox.clickX
      this.croppingBox.clickX = e.clientX
      this.croppingBox.clickY = e.clientY
      this.changeDynamicCroppingBox()
    }, 10, { 'leading': false, 'trailing': true }),
    fileChange () {
      let that = this
      let reader = new FileReader()
      this.container.contains(document.querySelector('.oriImg')) && this.container.removeChild(document.querySelector('.oriImg'))
      reader.readAsDataURL(this.file)
      reader.onload = function () {
        that.dataURL = this.result
        let imgDom = document.createElement('img')
        imgDom.setAttribute('src', that.dataURL)
        imgDom.classList = 'oriImg'
        imgDom.style.maxWidth = '100%'
        that.container.append(imgDom)
        imgDom.onload = function () {
          that.containerWidth = that.container.clientWidth
          that.containerHeight = that.container.clientHeight
          that.croppingBox.borderL = +((that.containerWidth - that.croppingBox.width) / 2).toFixed(3)
          that.croppingBox.borderR = +((that.containerWidth - that.croppingBox.width) / 2).toFixed(3)
          that.croppingBox.borderT = +((that.containerHeight - that.croppingBox.height) / 2).toFixed(3)
          that.croppingBox.borderB = +((that.containerHeight - that.croppingBox.height) / 2).toFixed(3)
          that.changeDynamicCroppingBox()
        }
      }
    },
    canvasCrop () {
      this.thImages = new THImages(this.containerWidth, this.containerHeight, this.croppingBox.borderL, this.croppingBox.borderT, this.croppingBox.width, this.croppingBox.height)
      let canvas = document.querySelector('#canvas')
      this.thImages.handleCrop(canvas, this.dataURL).then(res => {
        this.base64 = res
        let file = this.dataURLtoFile(res)
        this.$emit('cropDone', file)
      })
    },
    changeDynamicCroppingBox () {
      document.querySelector('.dynamic-cropping-box').style.borderWidth = `${this.croppingBox.borderT}px ${this.croppingBox.borderR}px ${this.croppingBox.borderB}px ${this.croppingBox.borderL}px`
    },
    dataURLtoFile (dataURL) {
      let arr = dataURL.split(',')
      let type = arr[0].match(/:(.*?);/)[1]
      let bStr = atob(arr[1])
      let n = bStr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bStr.charCodeAt(n)
      }
      let file = new File([u8arr], `${this.fileName}`, { type })
      return file
    },
    cancel () {
      this.base64 = ''
      document.querySelector('.oriImg').style.display = 'block'
      this.$emit('cropCancel')
    },
    confirm () {
      this.canvasCrop()
      document.querySelector('.oriImg').style.display = 'none'
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  user-select: none;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .actions {
    margin-bottom: 16px;
  }
  .origin-image-box {
    position: relative;
    //.image-mask {
    //  width: 100%;
    //  height: 100%;
    //  position: absolute;
    //  top: 0;
    //  left: 0;
    //  background: rgba(0, 0, 0, .3);
    //}
    .dynamic-cropping-box {
      position: absolute;
      // box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 100vw;
      cursor: move;
      z-index: 1;
      border-color: rgba(0, 0, 0, .6);
      border-style: solid;
      box-sizing: content-box;
      &>div {
        position: absolute;
        width: 6px;
        height: 6px;
      }
      .ne-resize {
        top: -3px;
        right: -3px;
        cursor: ne-resize;
      }
      .se-resize {
        right: -3px;
        bottom: -3px;
        cursor: se-resize;
      }
      .sw-resize {
        bottom: -3px;
        left: -3px;
        cursor: sw-resize;
      }
      .nw-resize {
        top: -3px;
        left: -3px;
        cursor: nw-resize;
      }
    }
  }
}
</style>
