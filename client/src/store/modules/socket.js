import axios from '@/axios'

const socket = {
  state: {
		socket: ''
  },
  actions: {
    connect ({commit, state}, data) {
      return new Promise((resolve) => {
        commit('CONNECT', data)
        resolve(state.socket)
      })
    },
    getChatRecord ({state}, data) {
      console.log(state.socket)
      return new Promise((resolve, reject) => {
        axios.get('/api/chat/record/list', {params: data})
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getAllRecord ({state}) {
      console.log(state.socket)
      return new Promise((resolve, reject) => {
        axios.get('/api/chat/record/allList')
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
		CONNECT: (state, value) => {
			state.socket = value.io.connect('ws://tchat.vaiwan.com')
    }
  }
}

export default socket