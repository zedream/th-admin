<template>
<div class="login_wrapping">
  <div class="login_container" @keyup.enter="login">
    <div class="login_title">我只是一个登录框</div>
    <el-input class="username" v-model="username">
      <i slot="prefix" class="iconfont icon-user"></i>
    </el-input>
    <el-input class="password" v-model="password" show-password>
      <i slot="prefix" class="iconfont icon-pwd"></i>
    </el-input>
    <el-button class="login" type="primary" plain @click="login">登 录</el-button>
    <div class="register">
      还没有账号？<span @click="toRegister">去注册</span>
    </div>
  </div>
</div>
</template>

<script>
import Alert from '@/document/alert'
import Notification from '@/document/notification'
import {
  mapState
} from 'vuex'
import {
  greet
} from '@/utils/util'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    login() {
      if (this.username === '') {
        Alert('请输入用户名')
        return
      }
      if (this.password === '') {
        Alert('请输入密码')
        return
      }
      this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({
            path: '/'
          }, () => {
            this.notice()
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    toRegister() {
      this.$router.push({
        path: '/register'
      })
    },
    notice() {
      let that = this
      Notification({
        title: greet(new Date()),
        message: `欢迎${that.userInfo.role} ${that.userInfo.nickname} 来到THao的demo系统`,
        autoclose: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_wrapping {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/bg.png') no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .login_container {
    position: relative;
    width: 500px;
    height: 300px;
    border-radius: 8px;
    padding: 36px 24px;
    background: #ffffffd9;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 16px 0 rgba(56, 135, 204, 0.56);
    animation: loginContainer 1.5s ease-in;

    .login_title {
      font-size: 24px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 20px;
      color: #4b4f52;
    }

    .username,
    .password {
      line-height: 40px;
      margin-top: 20px;

      i {
        color: #409eff;
      }

      /deep/ .el-input__prefix {
        width: 20px;
      }
    }

    .login {
      width: 50%;
      font-size: 18px;
      font-weight: 600;
      margin-top: 46px;
    }

    .register {
      position: absolute;
      right: 12px;
      bottom: 20px;
      font-size: 12px;
      color: #616161;

      span {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}

@keyframes loginContainer {
  0% {
    margin-top: -50%;
  }

  20% {
    margin-top: 0;
  }

  40% {
    margin-top: -10px;
  }

  60% {
    margin-top: 0;
  }

  80% {
    margin-top: -10px;
  }

  100% {
    margin-top: 0;
  }
}
</style>
