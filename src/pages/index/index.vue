<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import {
  getIpInfoRequest,
  getReleasesLatestRequest,
  getHitokotoRequest,
  postTestRequest,
} from '@/api/index/index.js'
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {
    getIpInfoRequest()
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {})
    getReleasesLatestRequest()
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {})
    getHitokotoRequest()
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {})
    postTestRequest()
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {})
  },
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
