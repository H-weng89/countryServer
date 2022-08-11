<template>
  <div class="title_wra">
    <div

      class="title"
    >
      <div class="title_name">
        {{ item.title }}
      </div>
      <div class="title_id">
        {{ item.id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageTitle',
  props: ['item']

}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 17px;

  .title_id {
    font-size: 12px;
    color: #868686;
  }
}

</style>
