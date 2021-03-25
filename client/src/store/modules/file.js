import axios from '@/axios'

const file = {
    state: {

    },
    actions: {
        getFiles ({state}, data) {
            console.log(state)
            return new Promise((resolve, reject) => {
                axios.get('/api/file/list', {params: data})
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        deleteFile ({state}, data) {
            console.log(state)
            return new Promise((resolve, reject) => {
                axios.post('/api/file/delete', data)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}

export default file
