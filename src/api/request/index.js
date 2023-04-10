class Request {
  defaultUrl = null
  defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  }
  constructor(config) {
    this.defaultUrl = config.baseURL
  }
  // 修改的方法
  interceptors = {
    request: null,
    response: null,
  }

  // 请求拦截
  reqInterceptor = (config) => {
    if (this.interceptors.request) {
      return this.interceptors.request(config)
    }
    return config
  }

  // 响应成功拦截
  resInterceptor = (response) => {
    const { data, errMsg, header, statusCode } = response
    if (this.interceptors.response) {
      return this.interceptors.response(data, errMsg, header, statusCode)
    }
    if (statusCode === 200) {
      return data
    } else {
      throw { data, errMsg, header, statusCode }
    }
  }

  // 响应失败拦截
  resInterceptorFai = (response) => {
    return response
  }
  // 响应结束拦截
  resInterceptorComplete = () => {
    console.log('111')
  }

  // 错误处理
  errorHandler = (error) => {
    throw error
  }

  request(config) {
    try {
      this.reqInterceptor(config)
    } catch (error) {
      console.warn(error)
    }
    const { url, params = {}, isThirdParty = false, ...restConfig } = config
    let requestUrl
    if (
      isThirdParty ||
      url.startsWith('http://') ||
      url.startsWith('https://')
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
          const data = this.resInterceptorComplete(res)
          reject(data)
        },
        complete: () => {
          this.resInterceptorComplete()
        },
      })
    })
  }

  get(url, params = {}, options = {}) {
    return this.request({
      url: url,
      data: params,
      method: 'GET',
      ...options,
    })
  }

  post(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
      ...options,
    })
  }

  put(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'PUT',
      data,
      ...options,
    })
  }

  delete(url, data = {}, options = {}) {
    return this.request({
      url,
      method: 'DELETE',
      data,
      ...options,
    })
  }

  postForm(url, data = {}, options = {}) {
    // const queryStr = Object.keys(data)
    //   .map((key) => {
    //     return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    //   })
    //   .join('&')
    return this.request({
      url,
      method: 'POST',
      data,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      ...options,
    })
  }
  // 添加的方法
  useReqInterceptor(reqInterceptor) {
    this.interceptors.request = reqInterceptor
  }

  useResInterceptor(resInterceptor) {
    this.interceptors.response = resInterceptor
  }
  useResInterceptorComplete(resInterceptorComplete) {
    this.resInterceptorComplete = resInterceptorComplete
  }
  useResInterceptorFai(resInterceptorFai) {
    this.resInterceptorFai = resInterceptorFai
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

export default Request
