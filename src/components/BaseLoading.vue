<template>
  <div class="loading">
    <van-loading>加载中...</van-loading>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageLoading',

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
