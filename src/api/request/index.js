import { BASE_URL } from '@/config/index.js'
class Request {
  defaultUrl = BASE_URL
  defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  }
  token = null

  constructor() {
    try {
      const token = uni.getStorageSync('TOKEN')
      if (token) {
        this.token = token
      }
    } catch (e) {
      console.warn('获取token失败', e)
    }
  }
  // 请求拦截
  reqInterceptor = (config) => {
    if (this.token) {
      config = Object.assign({}, config.header, {
        Authorization: `Bearer ${this.token}`,
      })
    }
    return config
  }

  // 响应拦截
  resInterceptor = (response) => {
    const { data, errMsg, header, statusCode } = response
    if (statusCode === 200) {
      return data
    } else {
      throw { data, errMsg, header, statusCode }
    }
  }

  // 错误处理
  errorHandler = (error) => {
    throw error
  }

  request(config) {
    const { url, params = {}, isThirdParty = false, ...restConfig } = config
    let requestUrl
    if (
      isThirdParty ||
      url?.indexOf('http://') > -1 ||
      url?.indexOf('https://') > -1
    ) {
      requestUrl = url
    } else {
      requestUrl = this.defaultUrl + url
    }
    return new Promise((resolve, reject) => {
      uni.request({
        ...restConfig,
        header: Object.assign({}, this.defaultHeader, restConfig.header),
        url: requestUrl,
        success: (res) => {
          try {
            const data = this.resInterceptor(res)
            resolve(data)
          } catch (error) {
            reject(error)
          }
        },
        fai: (res) => {
          reject(res)
        },
        complete: () => {},
      })
    })
  }

  get(url, params = {}, header = {}, options = {}) {
    return this.request({
      url,
      method: 'GET',
      data: params,
      header: this.reqInterceptor(header),
      ...options,
    })
  }

  post(url, data = {}, header = {}, options = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
      header: this.reqInterceptor(header),
      ...options,
    })
  }

  put(url, data = {}, header = {}, options = {}) {
    return this.request({
      url,
      method: 'PUT',
      data,
      header: this.reqInterceptor(header),
      ...options,
    })
  }

  delete(url, params = {}, header = {}, options = {}) {
    return this.request({
      url,
      method: 'DELETE',
      data: params,
      header: this.reqInterceptor(header),
      ...options,
    })
  }

  postForm(url, data = {}, header = {}, options = {}) {
    const queryStr = Object.keys(data)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      })
      .join('&')
    return this.request({
      url,
      method: 'POST',
      data: queryStr,
      header: this.reqInterceptor(
        Object.assign(
          {},
          { 'Content-Type': 'application/x-www-form-urlencoded' },
          header
        )
      ),
      ...options,
    })
  }

  useReqInterceptor(reqInterceptor) {
    this.reqInterceptor = reqInterceptor
  }

  useResInterceptor(resInterceptor) {
    this.resInterceptor = resInterceptor
  }

  useErrorHandler(errorHandler) {
    this.errorHandler = errorHandler
  }

  transformParamsToUrl(params) {
    const paramString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    return paramString ? `?${paramString}` : ''
  }
}

export default new Request()
