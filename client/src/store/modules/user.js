import axios from '@/axios'

const user = {
  state: {
    thToken: sessionStorage.getItem('th-token') || '',
    userInfo: JSON.parse(sessionStorage.getItem('userinfo')) || {},
    routes: JSON.parse(sessionStorage.getItem('routes')) || []
  },
  actions: {
    login ({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', data)
          .then(res => {
            commit('SET_TOKEN', res.data)
            commit('SET_USERINFO', res.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
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
            commit('SET_MENU', res.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    userDetail ({state}, data) {
      console.log(state, data)
      return new Promise((resolve, reject) => {
        axios.post('/api/user/detail', data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logOut ({commit}) {
      return new Promise((resolve) => {
        commit('CLEARSTORAGE')
        resolve()
      })
    }
  },
  mutations: {
		SET_TOKEN: (state, value) => {
      sessionStorage.setItem('th-token', value.data.token)
      state.thToken = value.data.token
    },
    SET_USERINFO: (state, value) => {
      sessionStorage.setItem('userinfo', JSON.stringify(value.data))
      state.userInfo = value.data
    },
    REGISTER: () => {

    },
    SET_MENU: (state, value) => {
      sessionStorage.setItem('routes', JSON.stringify(value.data))
      state.routes = value.data
    },
    CLEARSTORAGE: (state) => {
      state.thToken = ''
      state.userInfo = ''
      state.routes = ''
      sessionStorage.clear()
    }
  }
}

export default user