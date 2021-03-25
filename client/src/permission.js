import router from './router'
// import store from './store'

router.beforeEach((to, from, next) => {
  //let meta = to.meta
  if (to.meta.isAuth === false) {
    next()
  } else {
    if (sessionStorage.getItem('th-token')) {
      next()
    } else {
      router.push('/login')
    }
  }
})

export default router