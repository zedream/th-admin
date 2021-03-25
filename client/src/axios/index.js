import axios from 'axios'
import router from '@/router'
import Message from '@/document/message'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.timeout = 5000
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500
}
// 跨域请求，允许保存cookie
// axios.defaults.withCredentials = true

// http request拦截
axios.interceptors.request.use(config => {
  NProgress.start()
  // if (getToken()) {
  //   config.headers['TH-Auth'] = `th ${getToken()}`
  // }
  config.headers['th-auth'] = `th ${sessionStorage.getItem('th-token')}`
  return config
}, error => {
  return Promise.reject(error)
})
// http response 拦截
axios.interceptors.response.use(res => {
  // 获取状态码
  const status = res.data.errcode || res.status
  const message = res.data.msg || '未知错误'
  // 如果是401则跳转到登录页面
  if (status === 401) {
    NProgress.done()
    sessionStorage.clear()
    router.push({path: '/login'})
  }
  // 如果请求为非200否者默认统一处理
  if (status !== 200 && status !== 0) {
    if (status === 500) {
      Message({
        type: 'error',
        message: '服务器错误，请联系管理员'
      })
    } else {
      Message({
        type: 'error',
        message: message
      })
    }
    NProgress.done()
    return Promise.reject(new Error(message))
  }
  NProgress.done()
  return res
}, error => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message({
      type: 'error',
      message: '请求超时'
    })
  }
  return Promise.reject(new Error(error))
})

export default axios
