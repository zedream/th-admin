import Vue from 'vue'
import Router from 'vue-router'
import pagesRouter from './pages'
import viewsRouter from './views'
import store from '@/store'
//import Layout from '@/pages/layout/layout'
import thRouter from './th-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 这个参数当且仅当导航 (通过浏览器的 前进/后退 按钮触发) 时才可用  效果和 router.go() 或 router.back()
    if (savedPosition) {
      // 返回savedPosition 其实就是 当用户点击 返回的话，保持之前游览的高度
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: []
})

thRouter.install(Vue, router, store)
router.$thRouter.createRoutes(store.state.user.routes)
router.addRoutes([...viewsRouter, ...pagesRouter])

export default router