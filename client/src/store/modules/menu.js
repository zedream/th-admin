import axios from '@/axios'
import router from '@/router'

const menu = {
  state: {
    tag: JSON.parse(sessionStorage.getItem('tag')) || [{path: '/', title: '首页'}],
    cur: sessionStorage.getItem('currentpath') || '/'
  },
  actions: {
    addTag ({commit}, data) {
      return new Promise(() => {
        commit('ADD_TAG', data)
      })
    },
    register ({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/register', data)
          .then(res => {
            commit('REGISTER', res.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getRouter ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/auth/routes')
          .then(res => {
            commit('REGISTER', res.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    ADD_TAG: (state, value) => {
      if (state.tag.findIndex(val => val.path === value.path) === -1) {
        state.tag.push(value)
      }
      if (state.cur !== value.path) {
        router.push(value.path)
      }
      sessionStorage.setItem('currentpath', value.path)
      sessionStorage.setItem('tag', JSON.stringify(state.tag))
      state.cur = value.path
    },
    DEL_TAG: (state, value) => {
      let pos = state.tag.findIndex(val => val.path === value.path)
      state.tag.splice(pos, 1)
      let cur = sessionStorage.getItem('currentpath')
      if (cur === value.path) {
        state.cur = state.tag[pos - 1].path
        sessionStorage.setItem('currentpath', state.cur)
        router.push(state.cur)
      } else {
        sessionStorage.setItem('tag', JSON.stringify(state.tag))
      }
    },
    SET_TAG: () => {

    },
    SET_ROUTES: (state, value) => {
      sessionStorage.setItem('routes', JSON.stringify(value))
      state.routes = value
    }
  }
}

export default menu
