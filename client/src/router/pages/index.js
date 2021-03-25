import Login from '../../pages/user/login'
import Layout from '../../pages/layout/layout'
import Index from '../../views/wel'

export default [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      meta: {
        title: '首页',
        isAuth: true
      },
      component: Index
    }]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      isAuth: false
    }
  },
  {
    path: '/register',
    meta: {
      title: '注册',
      isAuth: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '@/pages/user/register.vue')
  },
  {
    path: '*',
    meta: {
      title: 'not found',
      isAuth: false
    },
    component: () => import(/* webpackChunkName: "404" */ '@/pages/error/404.vue')
  }
]