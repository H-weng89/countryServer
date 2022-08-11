
<template>
  <div class="apply_wra">
    <Model />

    <Form />
  </div>
</template>

<script>

import Model from './components/model.vue'
import Form from './components/Form/Form.vue'

export default {
  name: 'PaperworkManageApply',

  components: { Model, Form },

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.apply_wra {
  width: 100vw;
}
</style>
