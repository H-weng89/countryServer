<template>
  <div

    class="footer"
  >
    <van-button
      round
      type="info"
      @click="isShow = true"
    >
      审批
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
export default {
  name: 'PaperworkManageCheckFooter',
  props: ['user'],

  data () {
    return {
      isShow: false, // 弹窗显示
      reason: '' // 原因
    }
  },

  mounted () {

  },

  methods: {
    /**
     * 审批
     * @param {number} id 申请id
     * @param {string} reason 审批原因
     * @event:cick
     */
    async deleteApply (id, reason) {
    //   let result = await delete_apply(id, reason);
    //   if (result.msgCode == 0) {
    //     Notify("取消成功");
    //     this.$router.go(-1);
    //   }

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

</style>
