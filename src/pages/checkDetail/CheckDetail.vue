<template>
  <div class="application_detail_wra">
    <detail
      :form-list="formList"
      :user="user"
    />
    <check-footer
      v-if="user.status == 5"
      :user="user"
    />
  </div>
</template>

<script>

import Detail from '../../components/BaseDetail/Detail.vue'
import CheckFooter from './components/CheckFooter.vue'
import { getProcess } from '@api'
import { mapState } from 'vuex'

export default {
  name: 'PaperworkManageApplicationDetail',
  components: { Detail, CheckFooter },

  data () {
    return {
      user: {

      }, // 用户信息

      formList: [] // 展示的数据
    }
  },
  computed: {
    ...mapState(['educationList'])
  },
  async beforeMount () {
    // 获取数据
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
      const id = this.$route.query.id

      // 获取审批流程
      const result = await getProcess(id)
      this.handlerUser(result)
    },
    handlerUser (result) {
      if (Object.keys(result.item).length > 0) {
        const { ApprovalFormList } = result.item
        ApprovalFormList.approvalProcessList.unshift({
          updateDate: ApprovalFormList.createDate,
          currentOrganization: '发起申请',
          approval: ApprovalFormList.leader
        })
        this.user = {
          ...ApprovalFormList,
          sex: ApprovalFormList.sex === '0' ? '男' : '女',
          mark: this.$route.query.mark,
          education: this.educationList.page?.list.find(item => +ApprovalFormList.education === +item.sort).label || ApprovalFormList.education,
          info: {
            type: 'title_application',
            title: `${ApprovalFormList.leader}提交的用证申请`,
            status: this.$route.query.mark,
            id: ''

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
