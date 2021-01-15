import Vue from 'vue'
import axios from 'axios'
import merge from 'lodash/merge'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 50000, // request timeout
})
service.interceptors.request.use(config => {
  // 请求头带上token
  config.headers.token = localStorage.getItem('token');
  const type = config.method
  const defaults = {}
  const arrayFormat = config.headers.arrayFormat || 'indices'
  if (type === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=utf-8') {
    // post请求参数处理
    config.data = qs.stringify(config.data, { allowDots: true, arrayFormat: arrayFormat })
  } else if (type === 'get') {
    // get请求参数处理
    config.params = qs.stringify(config.params, { allowDots: true, arrayFormat: arrayFormat })
    config.params = qs.parse(config.params)
    config.params = merge(defaults, config.params)
  }
  return config
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(
    response => {
      const res = response.data
      if (response.status !== 200) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }else{
        return res
      }
    },
    error => {
      
      if (error.response.status === 401) { // 超时自动刷新
        axios({
          url: '/refreshToken',
          method: 'get',
          params: { refreshToken:localStorage.getItem('refreshToken')}
        }).then(({ data }) => {
          if (data && data.success) {
            localStorage.setItem('token',data.token)
            localStorage.setItem('refreshToken',data.refreshToken)
            localStorage.setItem('userNamesa',data.userName)
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userNamesa')
            router.push({ path: "/login" })
          }
        })
      } else if (
        error.response.status === 402 ||
        error.response.status === 403) { // 402 未登录或者refresh token过时， 403 账号在其他地方登录
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userNamesa')
        router.push({ path: "/login" })
        Message({
          message: error.response.data.msg || error.response.data.exception,
          type: 'error',
          showClose: true,
          dangerouslyUseHTMLString: true,
          duration: 3000,
          customClass: 'zZindex'
        })
      } else if (error.response.status === 404) { // 路径找不到
        Message({
          message: '404，路径找不到' + ':' + error.response.data.path,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      } else if (error.response.status === 504) {
        Message({
          message: '网络连接错误' + ':' + error.response.data,
          type: 'error',
          showClose: true,
          duration: 3000,
          customClass: 'zZindex'
        })
      } else {
        Message({
          message: error.response.data.msg || error.response.data.exception || error.response.data || error.response || error,
          type: 'error',
          showClose: true,
          duration: 5000,
          customClass: 'zZindex'
        })
      }
      // console.log(error) // for debug
      // Message({
      //   message: error,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(error)
    }
  )
  
  export default service