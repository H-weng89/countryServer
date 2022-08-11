<template>
  <div class="footer">
    <div class="bg_red">
      {{ item.leader.substr(0,1) }}
    </div>
    <div>由 {{ item.leader }} 提交</div>
    <div
      v-if="$route.meta.mark=='application'"
      :class="{
        status:true,
        [styleObj[item.status]]:true

      }"
    >
      {{ item.mark }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageFooter',
  props: ['item'],

  data () {
    return {
      styleObj: {
        0: 'status_green',
        1: 'status_red',
        4: 'status_gray',
        5: 'status_blue'
      }

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;

  .bg_red {
    padding: 1px 5px;
    margin-right: 20px;
    font-size: 14px;
    color: white;
    background-color: #1989fa;
    border-radius: 4px;
  }

  .status {
    position: absolute;
    right: 10px;
    padding-right: 2px;
    padding-left: 2px;
    font-size: 13px;
    color: #1989fa;
    border: 1px solid #1989fa;
    border-radius: 999px;
  }

  .status_red {
    color: #ee0a24;
    border: 1px solid #ee0a24;
  }

  .status_gray {
    color: #969799;
    border: 1px solid #969799;
  }

  .status_green {
    color: #07c160;
    border: 1px solid #07c160;
  }
}
</style>
