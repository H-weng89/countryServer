<template>
  <List
    :list="list"
    :is-loading="isLoading"
    :count="count"
    :tab="tab"
    :show-info="showInfo"
    :is-refresh="isRefresh"
    :is-finish="isFinish"
    @detail="detail"
    @refresh="onRefresh"
    @load="onLoad"
  />
</template>

<script>
import { getCheck } from '@api'

import List from '../../components/BaseList/List.vue'

export default {
  name: 'PaperworkManageMyCheck',
  components: { List },

  data () {
    return {
      list: [], // 数据列表
      isLoading: false, // 上拉加载
      active: 0, // /标签标识
      count: 0, // 徽标数量
      tab: [{
        label: '等待审批',
        isBrige: true
      }, {
        label: '通过',
        isBrige: false
      }, {
        label: '拒绝',
        isBrige: false
      }, {
        label: '全部',
        isBrige: false
      }], // 标签导航

      showInfo: [{
        label: '联系电话',
        key: 'tellphone'
      }, {
        label: '工作部门',
        key: 'department'
      }, {
        label: '当前审批节点',
        key: 'check'
      }], // 表单展示数据
      isRefresh: false,
      isFinish: false
    }
  },

  methods: {
    /**
     * 刷新
     * @param {Object} obj 子组件传回

     * @param {number} obj.active 数据类型
     * @param {Object} obj.page 分页设置
     */
    async onRefresh (obj) {
      this.list = []
      this.isRefresh = true
      this.isFinish = false
      const { list } = await this.getList(obj)

      this.list = list

      this.isRefresh = false
    },
    /**
 *
 * @param {Object} obj 子组件传回

 * @param {number} obj.active 数据类型
     * @param {Object} obj.page 分页设置
 */
    async onLoad (obj) {
      this.isLoading = true
      const { list, count } = await this.getList(obj)

      if (this.list.length !== count) {
        this.list = [...this.list, ...list]
      } else {
        this.isLoading = false
        this.isFinish = true
      }
    },

    /**
     * 获取申请列表
     * @param {number} active 申请状态 0通过 1拒绝 5等待审批
     * @param {Object} page 分页设置
     */
    async getList ({ active, page }) {
      const obj = {
        0: 5,
        3: null,
        1: 0,
        2: 1,
        4: 3
      } // 标签页索引转换成数据类型

      const result = await getCheck(obj[active], page)
      const { count } = result.page

      const statusObj = {
        0: '通过',
        1: '拒绝',
        2: '转发',
        3: '结束',
        4: '撤回',
        5: '等待审批'
      }

      if (active === 0) {
        this.count = result.page.count
      }

      const list = result.page?.list.filter(item => item.approvalProcessList) || []
      return {
        list: list.map((item) => {
          const num = item.approvalProcessList.length - 1
          return {
            ...item,
            mark: statusObj[item.status],
            check: `${item.approvalProcessList[num].currentOrganization} ${item.approvalProcessList[num].approval}`,
            info: {
              title: `${item.leader}提交的的用证申请`,
              id: item.createDate
            }

          }
        }),
        count
      }
    },
    /**
     * 详情页
     * @param {Object} user 子组件传来的数据
     */
    async detail (user) {
      this.$router.push({
        path: '/viewWra/checkDetail',
        query: { id: user.applyId, mark: user.mark }
      })
    }
  }
}
</script>
