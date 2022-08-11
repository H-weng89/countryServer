<template>
  <div
    v-if="user.status == '5'"
    class="footer"
  >
    <van-button
      round
      type="info"
      @click="isShow = true"
    >
      取消申请
    </van-button>
    <van-dialog
      v-model="isShow"
      title="原因"
      show-cancel-button
      @confirm="deleteApply(user.applyId, reason)"
    >
      <van-field
        v-model="reason"
        rows="5"
        autosize
        type="textarea"
        placeholder="请输入原因"
      />
    </van-dialog>
  </div>
</template>

<script>
import { deleteApply } from '@/api'
import { Notify, Toast } from 'vant'
export default {
  name: 'PaperworkManageApplicationFooter',
  props: ['user'],

  data () {
    return {
      isShow: false, // 弹窗显示
      reason: '' // 原因
    }
  },

  mounted () {},

  methods: {
    /**
     * 取消申请
     * @param {number} id 申请id
     * @param {string} reason 取消申请原因
     * @event:click
     */
    async deleteApply (id, reason) {
      if (!reason) {
        Toast.fail('请输入原因')
        return
      }
      const result = await deleteApply(id, reason)
      if (result.msgCode === 0) {
        Notify('取消成功')
        this.$emit('refresh')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 8vh;
    text-align: center;
    background-color: white;
  }

  .footer::v-deep .van-button--round {
    width: 80%;
    height: 80%;
    background-color: #b13a3d;
    border: 0;
  }
</style>
