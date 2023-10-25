import axios from 'axios'
import { toast } from 'react-toastify'
import config from '~/constants/config'

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        if (error.response.status === 409) {
          const message = error.response.data.message || 'Something went wrong'
          toast.error(message, {
            autoClose: 3000,
            pauseOnHover: true
          })
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
