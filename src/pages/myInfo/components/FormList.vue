<template>
  <div class="form_list_wra">
    <ul class="basic_ul">
      <li
        v-for="(item,key) in list"
        :key="key"
      >
        <div class="first">
          {{ item.label }}
        </div>
        <div class="second">
          {{ user[item.key]?user[item.key]:'暂无' }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageFormList',
  props: ['user', 'list'],

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
.form_list_wra {
  ul {
    margin-right: 20px;
    margin-left: 20px;

    li {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      .first {
        display: flex;
        font-size: 12px;
      }

      .second {
        display: flex;
        padding-bottom: 7px;
        margin-top: 5px;
        color: #868686;
        text-align: justify;
        border-bottom: 0.1px solid #ebedf0;
      }
    }
  }
}

</style>
