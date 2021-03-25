import Layout from '@/pages/layout/layout'

let asyncRoutes = function () {
  this.$router = null
  this.$store = null
}

asyncRoutes.install = function(vue, router, store) {
  this.$router = router
  this.$store = store
  this.$vue = new vue()

  this.$router.$thRouter = {
    self: this,
    $asyncRoutes: [],
    createRoutes: function (routes = []) {
      this.formatRoutes(routes)
      this.self.$router.addRoutes(this.$asyncRoutes)
    },
    formatRoutes: function (permission) {
      for (let i = 0; i < permission.length; i++) {
        if (!permission[i].children) {
          this.$asyncRoutes.push({
            path: permission[i].path,
            component: Layout,
            children: [{
              path: permission[i].path,
              component: () => import(`@/views${permission[i].path}.vue`),
              meta: permission[i].meta
            }]
          })
        } else {
          // asyncRoutes.push(permission[i])
          this.formatRoutes(permission[i].children)
        }
      }
      return this.$asyncRoutes
    }
  }
}

export default asyncRoutes