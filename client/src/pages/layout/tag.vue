<template>
<div class="tag-container">
  <div class="tag-box" :class="{'tag-active': item.path === cur}" v-for="item in tag" :key="item.path">
    <div class="th-tag" v-text="item.title" @click="tagCli(item.path)"></div>
    <i v-if="item.path !== '/'" class="iconfont icon-notice-close tag-close" @click="delTag(item.path)"></i>
  </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      curPath: '/'
    }
  },
  computed: {
    ...mapState({
      tag: state => state.menu.tag,
      cur: state => state.menu.cur
    })
  },
  created() {
    this.curPath = this.cur
  },
  methods: {
    tagCli(path) {
      this.curPath = path
      this.$store.commit('ADD_TAG', {
        path
      })
    },
    delTag(path) {
      console.log('del', path)
      this.$store.commit('DEL_TAG', {
        path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$act-color: #01a3a4;
.tag-container {
  display: flex;
  align-items: center;
  .tag-box {
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      padding: 0 5px;
      .tag-close {
        width: 17px;
      }
    }
    .th-tag {
      text-decoration: none;
      color: #576574;
      padding: 0 8px;
      position: relative;
      vertical-align: middle;
      display: inline;
    }
    .tag-close {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 17px;
      font-size: 17px !important;
      overflow: hidden;
      transition: width 0.3s;
    }
  }
  .tag-active {
    color: $act-color;
    padding: 0 5px;
    .th-tag {
      color: $act-color;
    }
    .tag-close {
      width: 17px;
    }
    &:after {
      content: "";
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 2px;
      background: $act-color;
      bottom: -9px;
      left: 0;
    }
  }
}
</style>
