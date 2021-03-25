import Layout from '../../pages/layout/layout'

export default [
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [{
  //     path: '/',
  //     meta: {
  //       title: '首页',
  //       isAuth: true
  //     },
  //     component: Index
  //   }]
  // },
  {
    path: '/mine',
    component: Layout,
    children: [{
      path: '/mine',
      meta: {
        title: '个人中心',
        isAuth: false
      },
      component: () => import(/* webpackChunkName: "mine" */ '@/views/mine.vue')
    }]
  }
]