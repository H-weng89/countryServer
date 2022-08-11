<template>
  <div class="title_wra">
    <div
      :class="{[info.type]:true}"
    >
      <div class="first">
        <div class="name">
          {{ info.title }}
        </div>
        <div class="status">
          {{ info.status }}
        </div>
      </div>
      <div class="second">
        {{ info.id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageHistoryTitle',
  props: ['info'],

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.title_history {
  width: 100vw;
  height: 10vh;
  overflow: hidden;
  background-color: white;

  .first {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 10px;

    .name {
      font-size: 20px;
    }

    .status {
      padding: 2px;
      margin-left: 10px;
      font-size: 12px;
      color: rgb(177, 58, 61);
      border: 1px solid rgb(177, 58, 61);
      border-radius: 999px;
    }
  }

  .second {
    display: flex;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 12px;
    color: #868686;
  }
}

.title_application {
  width: 100vw;
  height: 10vh;
  overflow: hidden;
  background-color: white;

  .name {
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 18px;
  }

  .status {
    display: flex;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 13px;
    color: #ff976a;
  }
}
</style>
