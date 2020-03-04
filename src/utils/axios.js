import axios from 'axios'
// import store from '@/store'
// import { getToken } from '../libs/util'
// axios.defaults.baseURL='http://ip:port/url'
class HttpRequest {
  // constructor (baseUrl) {
    // this.baseUrl = baseUrl
  // }
  getInsideConfig () {
    let config = {
      // baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        Authorization: '',
        operateAccountId: '',
        ApplicationId: 'BACKGROUND'
      }
    }
    // hander 传参
    // let HeaderStatus = store.state.user.accountId || getToken('accountId')
    // if (HeaderStatus) {
    //   config['headers'] = {
    //     Authorization: `${getToken('tokenType')} ${getToken('X-Ivanka-Token')}`,
    //     operateAccountId: HeaderStatus,
    //     ApplicationId: 'BACKGROUND'
    //   }
    // }
    return config
  }
  interceptors (instance) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (config.responseType === 'blob') {
        config.timeout = 0
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      const { data, status } = res
      return { data, status }
    }, error => {
      // 服务器响应码
      let errorInfo = error.response
      // store.dispatch('responseError', errorInfo || {})
      Promise.reject(error)
      return error
    })
  }
  request (options) {
    const instance = axios.create()
    this.interceptors(instance)
    return new Promise((resolve, reject) => {
      instance(Object.assign(this.getInsideConfig(), options))
        .then(res => {
          if (res.status === 200) {
            // 系统提示反应message
            if (res.data.error) {
              // store.dispatch('messageError', res.data.error)
              reject(new Error(JSON.stringify(res.data.error)))
            }
            resolve(res.data)
          }
        }).catch(reject)
    })
  }
}
export default new HttpRequest()
