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
import { getHistory } from '@api'
import List from '../../components/BaseList/List.vue'

export default {
  name: 'PaperworkManageMyApplication',
  components: { List },

  data () {
    return {
      list: [], // 不同类型列表
      isLoading: false, // 数据加载
      active: 0, // /标签标识
      count: 0, // 徽标数量
      tab: [{
        label: '未归还',
        isBrige: true
      }, {
        label: '已归还',
        isBrige: false
      }, {
        label: '全部',
        isBrige: false
      }],
      showInfo: [{
        label: '借出时间',
        key: 'outTime'
      }, {
        label: '归还时间',
        key: 'returnTime'
      }, {
        label: '借出类型',
        key: 'lendType'
      }, {
        label: '地点',
        key: 'destination'
      }, {
        label: '事由',
        key: 'reason'
      }], // 表单展示数据
      isRefresh: false,
      isFnish: false
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
        this.isFinish = true
      }
      this.isLoading = false
    },
    /**
     * 获取申请列表
     * @param {number} status 申请状态 0通过 1拒绝 5等待审批
     */
    async getList ({ active, page }) {
      const result = active === 2 ? await getHistory(null, page) : await getHistory(active, page)
      const { count } = result.page
      if (active === 0) {
        this.count = result.page.count
      }

      return {
        list: (result.page?.list || []).map((item) => {
          return {
            ...item,
            lendType: item.lendType === '1' ? '出国境借出' : '临时借出',
            info: {
              title: `${item.leader}的${item.certificate}`,
              id: item.certificateId

            }
          }
        }),
        count
      }
    },
    /**
     * 详情页
     */
    async detail (user) {
      this.$router.push({ path: '/viewWra/historyDetail', query: { id: user.id, applyId: user.applyId } })
    }
  }
}
</script>
