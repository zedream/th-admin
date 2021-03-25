import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import permission from './permission'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import axios from './axios'
import io from 'socket.io-client'
import '../src/assets/scss/element-variables.scss'

Vue.config.productionTip = false

Vue.prototype.$socketIO = io

Vue.use(router)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  axios,
  permission,
  render: h => h(App)
}).$mount('#app')
