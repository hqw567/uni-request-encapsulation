import req from '../index'

export const getHitokotoRequest = () => {
  return req.post('https://v1.hitokoto.cn', {
    c: 'j',
    encode: 'json',
    max_length: 20,
  })
}

export const getReleasesLatestRequest = () => {
  return req.get(
    'https://api.github.com/repos/Fndroid/clash_for_windows_pkg/releases/latest'
  )
}

export const getIpInfoRequest = () => {
  return req.get('https://ipapi.co/json')
}

export const postTestRequest = () => {
  return req.post('/post?q1=v2', {
    d: 'deserunt',
    dd: 'adipisicing enim deserunt Duis',
  })
}
export const deleteTestRequest = () => {
  return req.delete('/delete?q1=v2', {
    b1: 'deserunt',
    b2: 'adipisicing enim deserunt Duis',
  })
}

export const putTestRequest = () => {
  return req.put('/post?q1=v2')
}
