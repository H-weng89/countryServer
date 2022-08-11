<!-- eslint-disable eqeqeq -->
<template>
  <div class="apply_main">
    <van-form>
      <UserInfo :form="form" />

      <PaperChoose
        :paper-list="paperList"
        :paper="paper"
        @submit="submit"
      />
    </van-form>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { getUser, submitApply, getPaper } from '@api'
import UserInfo from './components/UserInfo.vue'

import PaperChoose from './components/PaperChoose.vue'
import { mapState } from 'vuex'

export default {
  name: 'PaperworkManageForm',
  components: { UserInfo, PaperChoose },
  data () {
    return {
      form: {

      }, // 表单数据
      paper: []

    }
  },
  computed: {
    ...mapState(['educationList', 'paperList'])
  },
  async mounted () {
    await this.userInfo()
  },

  methods: {
    /**
     * 将用户信息放到form里
     *
     */
    async userInfo () {
      const info = await getUser()
      const { user } = info.item
      this.form = {
        leader: user.xm,
        sex: user.xbm,
        birthDate: user.csrq,
        birthplace: user.jgm,
        nation: user.mzm,
        politicsStatus: user.zzmmm,
        idCard: user.zjhm,
        department: user.ssdwm,
        job: user.przyjszwm,
        address: user.jtzz,
        tellphone: user.phone,
        emergencyContact: user.yjlxr || '暂无',
        emergencyPhone: user.yjlxrdh || '暂无',
        education: this.educationList.page?.list.find(item => +item.sort === +user.xwm).label || user.eucation,
        approvalFormEntityList: []

      }
      // 获取已有的证件列表
      this.paper = await getPaper(user.id)
    },
    /*
     *
     * 提交申请
     * @event:click
     * @param {Array} list 子组件传来的数据
     */
    submit (list) {
      this.$set(this.form, 'approvalFormEntityList', list)

      submitApply(this.form)

      this.$toast('已提交')
      // this.$router.push('/main')
    }
  }
}
</script>

<style lang="scss" scoped>
/*
  *证件选择器样式
   */

.confirm:hover {
  background-color: #f4f4f4;
}

.van-popup {
  overflow-y: hidden;
}
</style>
