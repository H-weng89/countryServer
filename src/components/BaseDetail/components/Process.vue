<template>
  <div class="process_wra">
    <div class="title">
      流程
    </div>

    <div class="process_item">
      <van-steps
        direction="vertical"
        :active="step"
        :inactive-icon="last_icon"
        finish-icon="checked"
      >
        <van-step
          v-for="(item, key) in list"
          :key="key"
        >
          <div class="first">
            <div class="leader">
              {{ item.currentOrganization }}
            </div>
            <div class="time">
              {{ item.updateDate }}
            </div>
          </div>
          <div class="second">
            {{ item.approval }}
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageProcess',
  props: ['list'],

  data () {
    return {
      step: 0, // 成功的步骤
      last_icon: '' // 最后步骤的icon
    }
  },
  beforeUpdate () {
    // 获取最后一步的审批结果
    const status = this.list[this.list.length - 1].status
    this.step = this.list.length - 2 // 前面n-1步都已通过
    const obj = {
      0: 'passed', // 通过
      1: 'close', // 拒绝
      2: 'question', // 转发
      4: 'warning', // 撤回
      5: 'chat' // 等待审批
    }
    if (status === '0') {
      this.step++ // 步骤条到最后一步
    }
    this.last_icon = obj[status]
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.process_wra {
  width: 93vw;
  padding: 2vw;
  margin: auto;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;

  .title {
    display: flex;
    margin-left: 10px;
    font-size: 18px;
  }

  .process_item {
    .first {
      display: flex;
      justify-content: space-between;
      text-align: justify;

      .time {
        margin-left: 10px;
        font-size: 13px;
        color: #868686;
      }
    }

    .second {
      display: flex;
      margin-top: 5px;
      color: #868686;
    }
  }
}
</style>
