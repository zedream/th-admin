<template>
  <div class="file_container">
    <div class="thumbnail_box" v-for="(item, index) in imgUrl" :key="index">
      <img class="thumbnail" :src="item">
      <div class="thumbnail_mask" @click="showPreview(index)">
        <i v-if="!disabled" class="el-icon-picture-outline" @click.stop="$refs.file.click()"></i>
        <i v-if="!disabled" class="el-icon-delete" @click.stop="deleteOne(index)"></i>
      </div>
    </div>
    <div v-if="imgUrl.length < limit" class="upload_box" @click="$refs.file.click()">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <input type="file" @change="fileChange" ref="file" :accept="accept" :multiple="multiple" :disabled="disabled">
    <div class="progress_box" v-if="showProgress">
      <el-progress v-show="showProgress === 'progress'" type="circle" :percentage="progress"></el-progress>
      <el-progress v-show="showProgress === 'exception'" type="circle" :percentage="progress" status="exception"></el-progress>
    </div>
    <!-- <el-button type="primary" @click="upload">上传</el-button> -->
    <el-dialog
        width="840px"
        title=""
        :visible.sync="visible"
        @before-close="visible = false"
        append-to-body>
      <div class="crop-box">
        <Crop v-if="visible" :file="file" @cropCancel="cropCancel" @cropDone="cropDone"></Crop>
      </div>
      <template slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :disabled="isCrop" @click="upload">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { createSinglePreview } from '@/components/th-image/preview'
import axios from 'axios'
import Crop from './crop-image'
export default {
  components: { Crop },
  data () {
    return {
      visible: false,
      isCrop: true,
      fd: '',
      file: null,
      thumbnail: [],
      preview: [],
      progress: 0,
      showProgress: ''
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: Array,
      default () {
        return []
      }
    },
    limit: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    },
    crop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 选择文件结束并上传
    fileChange () {
      if (this.crop) {
        this.file = this.$refs.file.files[0]
        this.$refs.file.value = ''
        this.visible = true
      } else {
        this.fd = new FormData()
        for (let key in this.$refs.file.files) {
          this.fd.append('files', this.$refs.file.files[key])
        }
        this.upload()
        this.$refs.file.value = ''
        this.fd = new FormData()
      }
    },
    toPreview (index) {
      console.log(this.imgUrl)
      return new Promise((resolve) => {
        let preview = createSinglePreview(index, this.imgUrl)
        preview.style.display = 'block'
        setTimeout(() => {
          resolve(preview)
        }, 0)
      })
    },
    async showPreview (index) {
      let preview = await this.toPreview(index)
      preview.querySelector('.preview_wrapping').classList.add('preview_fade')
    },
    deleteOne (index) {
      this.$emit('imgRemove', index)
    },
    upload () {
      this.showProgress = 'progress'
      axios.post(this.url, this.fd, {
        // transformRequest: [function (data) {
        //   return data
        // }],
        onUploadProgress: progressEvent => {
          this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
        }
      }).then((response) => {
        if (response.status === 200 && response.data.errcode === 0) {
          this.$emit('uploadSuccess', response.data)
          this.showProgress = ''
        } else {
          this.showProgress = 'exception'
          setTimeout(() => {
            this.showProgress = ''
          }, 2000)
        }
        this.progress = 0
      }).catch(err => {
        console.log(err)
        this.showProgress = 'exception'
        setTimeout(() => {
          this.showProgress = ''
        }, 2000)
      })
    },
    cropCancel () {
      this.isCrop = true
    },
    cropDone (blob) {
      this.isCrop = false
      this.fd = new FormData()
      this.fd.append('file', blob)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding-top: 10px;
}
.file_container {
  display: inline-flex;
  flex-wrap: wrap;
  .progress_box {
    display: flex;
    align-items: center;
    margin: 0 auto;
    z-index: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    background: grey;
  }
  .upload_box {
    border-radius: 6px;
    background: white;
    border: 1px dashed #e4e4e4;
    cursor: pointer;
    color: #d4d4d4;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    box-sizing: border-box;
    width: 180px;
    height: 180px;
    &:hover {
      border-color: #64c3fd;
    }
  }
  input {
    display: none;
  }
  .thumbnail_box {
    margin: 0 8px 8px 0;
    overflow: hidden;
    position: relative;
    background: white;
    // border: 1px solid #e4e4e4;
    cursor: pointer;
    color: #d4d4d4;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    box-sizing: border-box;
    width: 180px;
    height: 180px;
    .thumbnail_mask {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .5);
      position: absolute;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 24px;
      cursor: default;
      &>i {
        cursor: pointer;
        &:first-child {
          margin-right: 16px;
        }
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
