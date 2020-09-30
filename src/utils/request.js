import axios from 'axios'
import merge from 'lodash/merge'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
console.log()
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 50000, // request timeout
})
service.interceptors.request.use(config => {
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
      console.log(error) // for debug
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  
  export default service