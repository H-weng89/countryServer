<template>
  <div class="header">
    <van-icon
      v-if="title != '我的'"
      name="arrow-left"
      size="25px"
      @click="back"
    />
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageHeader',
  props: ['title'],

  data () {
    return {}
  },

  mounted () {},

  methods: {
    // 返回上一级路由
    back () {
      if (this.title !== '选择地区') {
        this.$router.go(-1)
      } else {
        this.$emit('choose', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 6vh;
  font-size: 20px;
  color: white;
  background-color: #b13a3d;

  .title {
    position: absolute;
    left: 50%;
    margin: auto;
    font-size: 15px;
    transform: translate(-50%);
  }
}
</style>
