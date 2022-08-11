<template>
  <div class="view_wra">
    <TitleHeader :title="title" />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TitleHeader from '../components/BaseHeader.vue'

export default {
  name: 'PaperworkManageViewWra',
  components: { TitleHeader },

  data () {
    return {
      title: this.$route.meta.title // header的title
    }
  },
  mounted () {
    this.changeList()
  },

  methods: {
    ...mapActions(['changeList'])
  }
}
</script>

<style lang="scss" scoped>
.view_wra {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .main {
    height: 94vh;
    margin-top: 6vh;
    overflow: auto;
  }
}

</style>
