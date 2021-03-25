<template>
<div class="container">
  <th-image
      class="image"
      :url="uploadUrl"
      :img-url="imageUrls"
      :limt="1"
      :crop="false"
      :accept="'image/*'"
      @imgRemove="handleRemove"
      @uploadSuccess="handleUploadSuccess">
  </th-image>
  <input type="text" @input="inputChange">
</div>
</template>

<script>
import ThImage from '@/components/th-image/src/image'
import {
  mapState
} from 'vuex'
import { debounce } from '@/utils/util'
export default {
  components: { ThImage },
  data () {
    return {
      uploadUrl: '/api/file/upload',
      imageUrls: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      socket: state => state.socket.socket
    })
  },
  methods: {
    handleUploadSuccess (res) {
      this.imageUrls = [res.data.url]
    },
    handleRemove (index) {
      this.imageUrls.splice(index, 1)
    },
    inputChange: debounce(function (e) {
      console.log(e)
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/ .image {
  height: 150px;
  width: 150px;
  position: relative;
  .upload_box {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .thumbnail_box {
    border-radius: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    .thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &>img, .el-image__error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100%;
    object-fit: cover;
  }
  &::after {
    content: "";
    display: block;
    padding-top: 100%;
  }
}
</style>
