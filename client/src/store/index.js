import Vue from 'vue'
import Vuex from 'vuex'
import file from './modules/file'
import user from './modules/user'
import system from './modules/system'
import dict from './modules/dict'
import socket from './modules/socket'
import menu from './modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    file,
    user,
    system,
    dict,
    socket,
    menu
  }
})

export default store