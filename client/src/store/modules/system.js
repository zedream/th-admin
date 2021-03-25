import axios from '@/axios'

const system = {
  state: {
		
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
    getUsers ({state}, data) {
      console.log(state, data)
      return new Promise((resolve, reject) => {
        axios.get('/api/user/list', {params: data})
          .then(res => {
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
    }
  },
  mutations: {
		SET_TOKEN1: (state, value) => {
			console.log(value)
		}
  }
}

export default system