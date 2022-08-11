<template>
  <div class="application_detail_wra">
    <div class="scroll">
      <BaseLoading v-if="isLoading" />
      <Title :info="user.info" />

      <div class="main">
        <ul>
          <li
            v-for="(item,index) in formList"
            :key="index"
          >
            <div class="first">
              {{ item.label }}
            </div>
            <div class="second">
              {{ user[item.key] }}
            </div>
          </li>
        </ul>
      </div>

      <Process
        v-if="$route.meta.mark=='application'"
        :list="user.approvalProcessList"
      />
    </div>
  </div>
</template>

<script>

import Process from './components/Process.vue'

import Title from './components/Title.vue'
import BaseLoading from '@components/BaseLoading.vue'

export default {
  name: 'PaperworkManageApplicationDetail',

  components: { Process, Title, BaseLoading },
  props: ['user', 'formList', 'isLoading'],
  data () {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>
.application_detail_wra {
  width: 100vw;
  min-height: 94vh;
  background-color: #f4f4f4;

  .scroll {
    padding-bottom: 2vh;
    overflow: auto;
  }

  .main {
    width: 93vw;
    padding: 2vw;
    margin: auto;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;

    ul {
      li {
        margin-top: 10px;
        margin-right: 10px;
        text-align: justify;

        .first {
          display: flex;
          margin-left: 10px;
          font-size: 13px;
          color: #868686;
        }

        .second {
          display: flex;
          margin-top: 2px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
