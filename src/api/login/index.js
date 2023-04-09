import Request from '@/api/request/index.js'

export function accountLoginRequest(account) {
  return Request.post(
    '/login',
    {
      name: 'coderwhy',
      password: '123456',
    },
    {
      header: {
        test: 'test',
      },
    }
  )
}

export const getUserInfoRequest = () => {
  return Request.get('/users/1')
}

export const getMajorListRequest = () => {
  return Request.get('https://ipapi.co/json', {}, {}, { isThirdParty: true })
}
