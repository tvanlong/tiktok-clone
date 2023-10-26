import axios from 'axios'
import { toast } from 'react-toastify'
import config from '~/constants/config'
import { getAccessToken, removeAccessToken, removeProfile, saveAccessToken, saveProfile } from './auth'

class Http {
  #accessToken // Khai báo private variable ES6
  constructor() {
    this.#accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.#accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.#accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url.includes('login') || url.includes('register')) {
          this.#accessToken = response.data.meta.token
          saveAccessToken(this.#accessToken)
          saveProfile(response.data.data)
        } else if (url.includes('logout')) {
          this.#accessToken = ''
          removeAccessToken()
          removeProfile()
        }
        return response
      },
      (error) => {
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
