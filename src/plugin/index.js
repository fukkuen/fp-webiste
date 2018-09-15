import Vue from 'vue'
import Axios from 'axios'

class Http {
  http = Axios.create({
    baseURL: '/api',
    timeout: 10000
  })

  async get (url) {
    try {
      let res = await this.http.get(url)
      let s = res.data
      if (typeof s === 'string' && s.charAt(0) === '<') {
        s = s.substring(s.indexOf('['))
        s = JSON.parse(s)
      }
      return s
    } catch (e) {
      return this.handleException(e)
    }
  }

  handleException (res) {
    return Promise.reject(res)
  }
}

Vue.prototype.$http = new Http()
