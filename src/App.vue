<script>
import {
  accountLoginRequest,
  getUserInfoRequest,
  getMajorListRequest,
} from '@/api/login/index'
// import { BASE_URL } from '@/config/index.js'

export default {
  onLaunch: function () {
    console.log('App Launch')
    // console.log(BASE_URL)
    accountLoginRequest()
      .then((result) => {
        // console.log(result)
        const {
          data: { token },
        } = result
        // console.log(token)
        uni.setStorageSync('TOKEN', token)
      })
      .catch((err) => {
        console.log(err)
      })
    getUserInfoRequest().then((res) => {
      console.log(res)
    })
    getMajorListRequest().then((res) => {
      console.log(res)
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>
