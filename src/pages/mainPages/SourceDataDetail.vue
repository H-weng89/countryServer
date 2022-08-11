<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="main_wra">
    <div class="main_view">
      <keep-alive>
        <router-view
          :user="user"
          @routeChange="change"
        />
      </keep-alive>
    </div>

    <van-tabbar v-model="index" active-color="rgb(177, 58, 61)" @change="change">
      <van-tabbar-item
        name="/main"
        icon="home-o"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item

        name="/main/my"
        icon="friends-o"
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { getUser } from '@api'
import { mapActions } from 'vuex'

export default {
  name: 'PaperworkManageSourceDataDetail',

  data () {
    return {
      user: {}, // 用户信息
      index: this.$route.fullPath // 导航栏

    }
  },
  async mounted () {
    const result = await getUser()
    this.user = result.item.user
    this.changeList()
  },
  methods: {
    change (path) {
      this.$router.push(path)
      this.index = path
    },

    ...mapActions(['changeList'])

  }
}
</script>

<style lang="scss" scoped>
.main_view {
  width: 100vw;
  height: 90vh;
}
</style>
