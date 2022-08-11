<template>
  <div class="home_wra">
    <div class="home_top">
      <div class="title">
        因私出国服务平台
      </div>
      <div class="home_user">
        <div class="left">
          <div class="icon">
            <van-icon
              name="user-o"
              size="30px"
            />
          </div>
          <div class="username">
            {{ user.xm }}
          </div>
        </div>
        <div
          class="right"
          @click="routeChange('/main/my')"
        >
          <van-icon
            name="arrow"
            size="25px"
          />
        </div>
      </div>
    </div>
    <div class="home_main">
      <div class="title">
        证照服务
      </div>
      <div class="image">
        <img
          src="@assets/images/banner.png"
          alt=""
        >
      </div>
      <div class="bottom">
        <div
          class="left"
          @click="routeChange('/viewWra/apply')"
        >
          <div class="icon">
            <img
              src="@assets/images/left-icon.png"
              alt=""
            >
          </div>
          <div class="text">
            <div>用证申请</div>
            <div>证照使用申请</div>
          </div>
        </div>
        <div
          class="right"
          @click="routeChange('/viewWra/historyList')"
        >
          <div class="icon">
            <img
              src="@assets/images/right-icon.png"
              alt=""
            >
          </div>
          <div class="text">
            <div>用证记录</div>
            <div>用在哪何时在用</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PaperworkManageHome',
  props: ['user'],

  data () {
    return {}
  },

  async mounted () {},

  methods: {
    // 路由跳转
    routeChange (path) {
      this.$emit('routeChange', path)
    }

  }
}
</script>

<style lang="scss" scoped>
.home_wra {
  .home_top {
    position: relative;
    z-index: 1;
    width: 100vw;
    height: 40vh;
    background-image: url('../../../assets/images/header-bg.png');
    background-size: 100% 100%;

    .title {
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
      margin-left: 20px;
      font-size: 20px;
      color: white;
    }

    .home_user {
      position: absolute;
      right: 4.66667vw;
      bottom: 0;
      left: 4.66667vw;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 85vw;
      height: 40px;
      padding: 2.66667vw;
      background-color: rgba(245, 245, 245, 0.99);
      border-radius: 1.6vw;
      box-shadow: 0 10vw 10vw rgb(0 0 0 / 10%);

      .left {
        display: flex;
        align-items: center;
      }
    }
  }

  .home_main {
    .title {
      display: flex;
      justify-content: flex-start;
      margin-top: 20px;
      margin-left: 20px;
      font-size: 20px;
    }

    .image {
      width: 95vw;
      height: 150px;
      margin: auto;
      margin-top: 20px;
      background-color: #39a9ed;
      border-radius: 20px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }

    .bottom {
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin-top: 10px;
      margin-left: 10px;

      .left,
      .right {
        display: flex;
        align-items: center;
        width: 39.33333vw;
        padding: 2.66667vw;
        margin-right: 2.66667vw;
        margin-bottom: 2.66667vw;
        background-color: #f4f4f4;
        border-radius: 2.66667vw;

        .icon {
          width: 9vw;
          height: 8vw;
        }

        .icon img {
          width: 100%;
          height: 100%;
        }

        .text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          margin-left: 10px;
        }

        .text div:nth-child(2) {
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
  }
}

</style>
