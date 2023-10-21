import axios from 'axios'
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
  }
}

export const http = new Http().instance
