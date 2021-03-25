<template>
  <div class="th-layout-wrapping">
    <div class="th-layout">
      <div class="th-aside" :style="`width:${asideWidth}`">
        <div class="th-title"><span :class="{ 'hide-title': resizing }">{{ page.title }}</span></div>
        <thMenu v-if="routes.length > 0" class="th-menu-wrapping" :menu="routes" :isCollapse="asideWidth !== this.width" :fold="fold"></thMenu>
        <div v-else class="no-menu-wrapping">
          <div class="no-menu">无可用菜单项</div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="th-header">
            <i @click="asideResize" class="iconfont icon-zhankai"></i>
            <el-dropdown @command="command">
              <div class="th-userinfo">
                <div class="nickname" v-text="userInfo.nickname || userInfo.username || 'not logged in'"></div>
                <img v-if="!userInfo.avatar" src="@/assets/default.png" alt="default">
                <img v-else :src="userInfo.avatar" :alt="userInfo.nickName || userInfo.username">
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">个人中心</el-dropdown-item>
                <el-dropdown-item command="2">修改密码</el-dropdown-item>
                <el-dropdown-item class="logout" command="0" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <tag class="th-nav"></tag>
        </div>
        <div class="th-container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import thMenu from './menu'
import tag from './tag'
import option from '@/utils/options'
export default {
  components: {
    thMenu,
    tag
  },
  data() {
    return {
      fullWidth: document.documentElement.clientWidth,
      resizing: false,
      width: '240px',
      miniWidth: '100px',
      asideWidth: '240px',
      fold: false,
      timer: false,
      page: option.page
    }
  },
  computed: {
    routes: {
      get() {
        return this.$store.state.user.routes
      },
      set() {

      }
    },
    ...mapState({
      userInfo: state => state.user.userInfo,
      socket: state => state.socket.socket
    })
  },
  watch: {
    fullWidth(newVal) {
      if (!this.timer) {
        this.fullWidth = newVal
        this.timer = true
        if (newVal < 1440) {
          this.asideWidth = this.miniWidth
        } else {
          this.asideWidth = this.width
        }
        setTimeout(() => {
          this.timer = false
          this.resizing = false
        }, 300)
      }
    },
    asideWidth() {
      this.resizing = true
    }
  },
  created() {
    this.$store.dispatch('getRouter').then((res) => {
      this.$router.$thRouter.createRoutes(res.data)
    })
        .catch(err => {
          console.log(err)
        })
    this.$store.dispatch('getDict').then(() => {

    })
        .catch(err => {
          console.log(err)
        })
    this.$store.dispatch('connect', {
      io: this.$socketIO
    }).then(res => {
      res.on('connect', function () {
        console.log('connect')
      })
      res.emit('getuserinfo', {
        username: this.userInfo.username,
        password: this.userInfo.password
      })
      res.on('loginsuccess', data => {
        console.log('webSocket登录时间：', data)
      })
      res.on('disconnect', data => {
        console.log('disconnect', data)
      })
    })
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        this.fullWidth = window.fullWidth
      })()
    }
  },
  methods: {
    asideResize() {
      this.fold = !this.fold
      console.log(this.fold)
      if (this.asideWidth === this.width) {
        this.asideWidth = this.miniWidth
      } else {
        this.asideWidth = this.width
      }
      setTimeout(() => {
        this.resizing = false
      }, 300)
    },
    command(e) {
      if (e === '0') {
        this.socket.emit('logout', {
          username: this.userInfo.username
        })
        this.$store.dispatch('logOut').then(() => {
          this.$router.push('/login')
          this.socket.close()
          console.log('log out...')
        })
      } else if (e === '1') {
        this.$router.push('/mine')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
$bg: #10ac84;

.th-layout-wrapping {
  width: 100vw;
  height: 100vh;
  background: #f1f2f6;
  overflow-y: auto;
  .th-layout {
    width: 100%;
    height: 100%;
    display: flex;
    .th-aside {
      width: 240px;
      background: white;
      box-shadow: 0 0 10px #d6d6d6;
      z-index: 1;
      transition: width 0.4s;
      display: flex;
      flex-direction: column;
      .th-title {
        height: 80px;
        line-height: 80px;
        color: white;
        font-weight: 600;
        text-align: center;
        font-size: 20px;
        padding: 0 12px;
        background: $bg;
        span {
          transition: all 0.3s;
        }
      }
      .hide-title {
        opacity: 0;
      }
      .th-menu-wrapping {
        width: 100%;
        flex: 1;
        overflow-y: auto;
      }
      .no-menu-wrapping {
        width: 100%;
        height: 160px;
        padding: 20px;
        box-sizing: border-box;
        .no-menu {
          background: #cad9e2;
          text-align: center;
          line-height: 160px;
          color: #002235;
          font-size: 18px;
          border-radius: 6px;
        }
      }
    }
    .th-mini-aside {
      width: 120px;
    }
    .right {
      overflow-x: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      .top {
        height: 120px;
        .th-header {
          background: white;
          height: 80px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          background: $bg;
          justify-content: space-between;
          .icon-zhankai {
            font-size: 24px;
            color: white;
            cursor: pointer;
          }
          .th-userinfo {
            padding: 0 0 0 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: white;
            font-size: 18px;
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin-left: 12px;
            }
          }
        }
        .th-nav {
          background: white;
          height: 40px;
          padding: 8px 12px;
          box-sizing: border-box;
        }
      }
      .th-container {
        flex: 1;
        box-sizing: border-box;
        padding: 12px;
        overflow: auto;
      }
    }
  }
}
</style>
