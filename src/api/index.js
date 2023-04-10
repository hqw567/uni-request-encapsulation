import Request from './request'
import { BASE_URL } from '@/config/index.js'

const request = new Request({
  baseURL: BASE_URL,
})

request.useReqInterceptor(function (config) {
  // 在请求前做一些操作
  try {
    const token = uni.getStorageSync('TOKEN')
    if (token) {
      config.header = Object.assign({}, config.header, {
        Authorization: `Bearer ${token}`,
      })
    }
  } catch (e) {
    console.warn('获取token缓存失败', e)
  }
  return config
})

request.useResInterceptor(function (data, errMsg, header, statusCode) {
  // 在响应后做一些操作
  return data
})

request.useErrorHandler(function (error) {
  // 处理错误
  console.log(error)
})
export default request
