<template>
  <div>
    <template v-for="item in menu">
      <el-submenu
          v-if="item.hasChildren"
          :index="item.path"
          :key="item.path">
        <template slot="title">
          <i :class="`iconfont ${item.icon}`"></i>
          <span v-if="!fold">{{ item.meta.title }}</span>
        </template>
        <sub-menu :menu="item.children"></sub-menu>
      </el-submenu>
      <el-menu-item
          v-else
          :index="item.path"
          :key="item.path"
          @click.native="addTag(item.path, item.meta.title)">
        <i :class="`iconfont ${item.icon}`"></i>
        <span v-if="!fold">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "sub-menu",
  data () {
    return {}
  },
  created() {
    console.log(this.menu)
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
  methods: {
    addTag(path, title) {
      this.$store.dispatch('addTag', {
        path,
        title
      })
    }
  }
}
</script>

<style scoped lang="scss">
.menu_link_title {
  width: 100%;
  color: red;
  text-decoration: none;
}
</style>
