<template>
  <div class="login_wra">
    <div class="login_logo" />
    <div class="login_form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
        />
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginRequest } from '@api'
import { Notify } from 'vant'

/**
 * @const
 *  登录的特殊编码，直接从原网页复制
 */
const KEY = 'T90040' // 提交的账号密码有特殊编码，用这个模拟正确的账号密码
const USERNAME =
  '04283dd797fd7b9d3e74478b3c65abd08244f032aa8e8da0eb7d40b34424dc24e28eb256f51c8cc1001a4bf7a538d06961f1a2723112e698aad21a153ad0d28b34437ebdc7d81ed20ab7c61c27b62c1126edbb812ecee7c2ca184832cf57906adda460b296e7bc'
const PASSWORD =
  '0410ff8979646de7f1360443bfbf1613261c6b6caaeaca1fe92756c207cf2a357b1c1ee8b1bb8e849d0658a7f63eefb08037b5da2d1d1a234b28cccc73b20495dcbdb9db25ae84b5504188d8a97b7bf521fb33c1d46f3caa83076d90c76ada8d0cdcd0aaa7c1a8'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    /**
     * 登录方法
     * @param {Object} values
     * @param {string} values.uername 用户名
     * @param {string} values.password 密码
     * @event:click
     */
    async onSubmit ({ username, password }) {
      if (username === KEY && password === KEY) {
        // 如果账号密码和默认相同，就用编码后的数据提交
        const result = await loginRequest({
          username: USERNAME,
          password: PASSWORD
        })
        localStorage.setItem('token', result.item.token.access_token)
        localStorage.setItem('refresh_token', result.item.token.refresh_token)

        // 登录成功，进入下个页面

        this.$router.push('/main')

        return result
      }
      await loginRequest({ username, password }).catch((err) => {
        Notify(err.errMsg)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.login_wra {
  /*
  *整体容器设置
 */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("../../assets/images/login-bg.png");
  background-size: 100% 100%;

  .login_logo {
    /*
  *logo容器
   */
    width: 66.4vw;
    height: 19.2vw;
    margin: auto;
    margin-top: 20vh;
    background-image: url("../../assets/images/logo.png");
    background-size: cover;
  }

  .login_form {
    /*
  *表单容器
   */
    width: 70vw;
    height: 50vh;
    margin: auto;
    margin-top: 20vh;

    /*
   *button组件样式修改
    */
    ::v-deep.van-button--round {
      margin-top: 40px;
      background-color: #b13a3d;
      border: none;
    }
  }
}
</style>
