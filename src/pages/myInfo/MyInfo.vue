<template>
  <div class="my_info_wra">
    <base-loading v-if="isLoading" />
    <div class="main">
      <h2 class="basic">
        基础信息
      </h2>
      <form-list
        :user="user"
        :list="basic"
      />
      <h2 class="usually">
        常用信息
      </h2>
      <form-list
        :user="user"
        :list="usually"
      />
    </div>
  </div>
</template>

<script>
import { getUser } from '@api'
import FormList from './components/FormList.vue'
import BaseLoading from '@components/BaseLoading.vue'
import { mapState } from 'vuex'

export default {
  name: 'PaperworkManageMyInfo',
  components: { FormList, BaseLoading },
  data () {
    return {
      user: {}, // 用户信息
      basic: [
        { label: '姓名', key: 'xm' },
        { label: '性别', key: 'xbm' },
        { label: '出生日期', key: 'csrq' },
        { label: '国际', key: 'gjm' },
        { label: '联系电话', key: 'phone' }
      ], // 基础信息
      usually: [
        { label: '籍贯', key: 'jgm' },
        { label: '民族', key: 'mzm' },
        { label: '政治面貌', key: 'zzmmm' },
        { label: '身份证号码', key: 'zjhm' },
        { label: '文化程度', key: 'xwm' },
        { label: '工作部门', key: 'ssdwm' },
        { label: '职务', key: 'przyjszwm' },
        { label: '家庭住址', key: 'jtzz' },
        { label: '应急联系人', key: 'yjlxr' },
        { label: '联系电话', key: 'yjlxrdh' }
      ], // 常用信息
      isLoading: true
    }
  },
  computed: {
    ...mapState(['educationList'])
  },
  async mounted () {
    // 获取用户信息
    const result = await getUser()

    this.user = {
      ...result.item?.user,
      xbm: result.item.user.xbm === '0' ? '男' : '女',
      xwm: this.educationList.page?.list.find(item => +item.sort === +result.item.user.xwm).label
    }

    this.isLoading = false
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.my_info_wra {
  .main {
    overflow: auto;
  }

  .basic,
  .usually {
    display: flex;
    margin-right: 20px;
    margin-left: 20px;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-end: 0;
    font-weight: bold;
  }
}
</style>
