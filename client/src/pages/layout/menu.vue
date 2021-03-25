<template>
<div>
  <el-menu
      :default-active="cur"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#01a3a4"
      text-color="#576574"
      :collapse="isCollapse"
      :unique-opened="true">
    <sub-menu :menu="menu" :isCollapse="isCollapse" :fold="fold"></sub-menu>
  </el-menu>
</div>
</template>

<script>
import subMenu from './sub-menu'
import { mapState } from "vuex"
export default {
  components: { subMenu },
  data() {
    return {
      currentPath: '',
      refs: []
    }
  },
  props: {
    menu: {
      type: Array,
      default: () => {
        return []
      }
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    fold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      cur: state => state.menu.cur
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    addTag(path, title) {
      this.$store.dispatch('addTag', {
        path,
        title
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
