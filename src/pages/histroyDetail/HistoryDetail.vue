<template>
  <detail
    :form-list="formList"
    :user="user"
  />
</template>

<script>
import Detail from '../../components/BaseDetail/Detail.vue'
import { getHistory } from '@api'

export default {
  name: 'PaperworkManageApplicationDetail',
  components: { Detail },

  data () {
    return {
      user: {}, // 用户信息

      formList: []
    }
  },
  async beforeMount () {
    // 获取路由传递的数据
    const id = this.$route.query.id
    const applyId = this.$route.applyId
    const result = await getHistory(null, { pageNo: 1, pageSize: 1000 }, applyId)
    const detail = result.page?.list.find(item => item.id === id) || {}

    this.user = {
      ...detail,
      lendType: detail.lendType === '1' ? '出国境借出' : '临时借出',
      info: {
        type: 'title_history',
        title: `${detail.leader}的${detail.certificate}`,
        status: +detail.status === +1 ? '已归还' : '未归还',
        id: detail.certificateId
      }

    }

    // 展示数据s

    this.formList = [
      { label: '借出时间', key: 'startTime' },
      { label: '归还时间', key: 'returnTime' },
      { label: '时长', key: 'returnTime' },
      { label: '借出类型', key: 'lendType' },
      { label: '地点', key: 'destination' },
      { label: '原因', key: 'reason' }
    ]
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.application_detail_wra {
  .footer {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 8vh;
    margin: auto;
    text-align: center;
    background-color: white;

    ::v-deep.van-button--round {
      width: 80%;
      height: 80%;
      background-color: #b13a3d;
      border: 0;
    }
  }
}
</style>
