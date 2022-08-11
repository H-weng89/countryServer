<template>
  <div class="application_detail_wra">
    <detail
      :form-list="formList"
      :user="user"
      :is-loading="isLoading"
    />
    <application-footer
      :user="user"
      @refresh="getDetail"
    />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

import Detail from '@components/BaseDetail/Detail.vue'
import ApplicationFooter from './components/ApplicationFooter.vue'
// eslint-disable-next-line no-unused-vars
import { getProcess } from '@api'
import { mapState } from 'vuex'

export default {
  name: 'PaperworkManageApplicationDetail',
  components: { Detail, ApplicationFooter },

  data () {
    return {
      user: {}, // 用户信息
      info: {},
      formList: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['educationList'])
  },
  async beforeMount () {
  // 获取详情数据
    await this.getDetail()
    // 展示数据

    this.formList = [
      { label: '姓名', key: 'leader' },
      { label: '性别', key: 'sex' },
      { label: '出生日期', key: 'birthDate' },
      { label: '籍贯', key: 'birthplace' },
      { label: '民族', key: 'nation' },
      { label: '政治面貌', key: 'politicsStatus' },
      { label: '身份证号码', key: 'idCard' },
      { label: '文化程度', key: 'education' },
      { label: '工作部门', key: 'department' },
      { label: '职务', key: 'job' },
      { label: '家庭住址', key: 'birthPlace' },
      { label: '联系电话', key: 'tellphone' },
      { label: '应急联系人', key: 'emergencyContact' },
      { label: '联系电话', key: 'emergencyPhone' },
      { label: '证件名称', key: 'certificate' },
      { label: '证件号码', key: 'certificateId' },
      { label: '出发时间', key: 'startTime' },
      { label: '回程时间', key: 'endTime' },
      { label: '目的地', key: 'destination' },
      { label: '原因', key: 'reason' }
    ]
  },
  methods: {
    /**
     * 获取详情
     */
    async getDetail () {
      // 获取路由传递的数据
      this.isLoading = true
      const id = this.$route.query.id
      // 获取审批流程
      const result = await getProcess(id)
      this.handleUser(result)
      this.isLoading = false
    },
    handleUser (result) {
      // 添加自己发起申请的流程
      if (Object.keys(result.item).length > 0) {
        const { ApprovalFormList } = result.item
        ApprovalFormList.approvalProcessList.unshift({
          updateDate: ApprovalFormList.createDate,
          currentOrganization: '发起申请',
          approval: '我'
        })

        this.user = {
          ...ApprovalFormList,
          sex: ApprovalFormList.sex === '0' ? '男' : '女',
          mark: this.$route.query.mark,
          education: ApprovalFormList.education,
          info: {
            title: `${ApprovalFormList.leader}提交的用证申请`,
            status: this.$route.query.mark,
            id: '',
            type: 'title_application'

          }
        }
      } else {
        this.$toast.fail('该数据异常')
      }
    }

    /**
     * 审批相关api，没有等待审批的数据，无法测试
     *  TODO
     */
  }
}
</script>
