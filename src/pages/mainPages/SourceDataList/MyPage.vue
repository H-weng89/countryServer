<template>
  <div class="my_wra">
    <div class="my_top">
      <TitleHeader title="我的" />
      <div class="user">
        <div class="left">
          <van-icon
            name="friends-o"
            size="50px"
          />
          <div class="name">
            {{ user.xm }}
          </div>
        </div>
        <div class="right">
          <van-badge :content="messageCount">
            <van-icon
              name="envelop-o"
              size="20px"
              @click="changeRoute('/viewWra/myMessage')"
            />
          </van-badge>
        </div>
      </div>
      <img
        src="@assets/images/banner1.png"
        alt=""
      >
    </div>
    <div class="my_main">
      <div
        v-for="(item, key) in cell"
        :key="key"
      >
        <van-cell
          :title="item.title"
          is-link
          :to="item.route"
          :icon="item.img"
        />
      </div>
    </div>
    <div
      class="login_out"
      @click="changeRoute('/')"
    >
      <van-cell
        title="退出登录"
        size="large"
      />
    </div>
  </div>
</template>

<script>
import message from '@assets/images/message.png'
import user from '@assets/images/user.png'
import application from '@assets/images/application.png'
import check from '@assets/images/check.png'

import { getUnmessage } from '@api'
import TitleHeader from '@components/BaseHeader.vue'

export default {
  name: 'PaperworkManageMyPage',
  components: { TitleHeader },
  props: ['user'],
  data () {
    return {
      cell: [
        {
          img: message,
          title: '我的消息',
          route: '/viewWra/myMessage'
        },
        {
          img: user,
          title: '个人信息',
          route: '/viewWra/myInfo'
        },
        {
          img: application,
          title: '我的申请',
          route: '/viewWra/applicationList'
        },
        {
          img: check,
          title: '我的审批',
          route: '/viewWra/checkList'
        }
      ],
      messageCount: '' // 消息列表
    }
  },
  async mounted () {
    const result = await getUnmessage()
    this.messageCount = result.item.count
  },
  methods: {
    /**
     * @event:click
     * 路由跳转
     */
    changeRoute (path) {
      if (path === '/') {
        localStorage.clear()
      } // 退出登录
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.my_wra {
  width: 100vw;
  height: 87vh;
  padding-top: 6vh;
  background-color: #f1f3f5;

  .my_top {
    width: 100vw;
    height: 30vh;

    img {
      position: absolute;
      top: 20%;
      left: 50%;
      width: 93vw;
      height: 15vh;
      border-radius: 10px;
      transform: translate(-50%);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 6vh;
      font-size: 20px;
      color: white;
      background-color: #b13a3d;
    }

    .user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100vw;
      height: 20vh;
      background-color: #fff;

      .left {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10vh;
        margin-left: 10px;
      }

      .right {
        margin-right: 20px;
        margin-bottom: 10vh;
      }
    }
  }

  .my_main {
    margin-top: 4vh;

    /*
        * 单元格样式修改
         */
  }

  .login_out {
    margin-top: 10px;
    color: red;

    ::v-deep.van-cell__left-icon {
      display: flex;
      align-items: center;
    }

    ::v-deep.van-cell__title {
      display: flex;
      justify-content: center;
    }
  }
}

</style>
