import axios from '@/axios'

const dict = {
  state: {
		dict: JSON.parse(sessionStorage.getItem('dict')) || []
  },
  actions: {
    // upload ({commit}, data) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('/api/file/upload', data)
    //       .then(res => {
    //         commit('SET_TOKEN1', data)
    //         resolve(res.data)
    //       })
    //       .catch(err => {
    //         reject(err)
    //       })
    //   })
    // },
    getDict ({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/dict/list', {params: data})
          .then(res => {
            commit('SET_DICT', res.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteUser ({state}, data) {
      console.log(state, data)
      return new Promise((resolve, reject) => {
        axios.post('/api/user/delete', data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    queryDict ({state}, data) {
      return new Promise((resolve) => {
        resolve(state.dict[data])
      })
    }
  },
  mutations: {
		SET_DICT: (state, value) => {
      sessionStorage.setItem('dict', JSON.stringify(value.data))
			state.dict = value.data
    }
  }
}

export default dict