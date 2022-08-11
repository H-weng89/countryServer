<template>
  <div class="application_wra">
    <div class="tabbar">
      <van-tabs v-model="active">
        <template v-for="(item, key) in tab">
          <van-tab
            v-if="!item.isBrige"
            :key="key"
            :title="item.label"
          />
          <van-tab
            v-if="item.isBrige"
            :key="key"
            :title="item.label"
            :badge="count"
          />
        </template>
      </van-tabs>
    </div>
    <div class="list">
      <van-pull-refresh
        v-model="isRefresh"
        class="list_main"
        @refresh="refresh"
      >
        <div
          v-if="list.length==0"
          class="null"
        >
          <van-empty description="暂无数据" />
        </div>
        <van-list
          v-model="isLoading"
          :finished="isFinish"
          finished-text="没有更多了"
          offset="100"
          :immediate-check="false"
          @load="onLoad"
        >
          <div
            v-for="(item, key) in list"
            :key="key"
            class="main_item"
            @click="detail(item)"
          >
            <Title :item="item.info" />
            <ul class="detail">
              <li
                v-for="(e, index) in showInfo"
                :key="index"
              >
                {{ e.label }}：{{ item[e.key] }}
              </li>
            </ul>
            <Footer1 :item="item" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Footer1 from './components/Footer.vue'

import Title from './components/Title.vue'

export default {
  name: 'PaperworkManageMyApplication',
  components: { Footer1, Title },
  props: ['list', 'count', 'isLoading', 'tab', 'showInfo', 'isRefresh', 'isFinish'],
  data () {
    return {
      active: 0, // /标签标识
      page: {
        pageSize: 30,
        pageNo: 1
      }

    }
  },
  watch: {
    active (nval) {
      this.$emit('refresh', { active: nval, page: this.page })
    }
  },
  mounted () {
    this.$emit('refresh', { active: this.active, page: this.page })
  },
  methods: {
    /**
     * 跳转到详情页
     * @param {Object} user 对应记录的信息,详情参见后端接口
     */
    async detail (user) {
      this.$emit('detail', user)
    },
    /**
     * 下拉刷新
     */
    refresh () {
      this.page.pageNo = 1
      this.$emit('refresh', { active: this.active, page: this.page }) // 通知父组件更新数据
    },
    /**
     * 上拉加载
     */
    onLoad () {
      this.page.pageNo++
      this.$emit('load', { active: this.active, page: this.page })
    }
  }
}
</script>

<style lang="scss" scoped>
.application_wra {
  .tabbar {
    height: 7vh;
    line-height: 7vh;
    text-align: center;
    border-bottom: 0 solid #b13a3d;
  }

  .null {
    position: absolute;
    z-index: 10;
    width: 100vw;
    height: 85vh;
    background-color: #f4f4f4;
  }

  .list {
    width: 100vw;
    height: 85vh;
    padding-top: 2vh;
    overflow: auto;
    background-color: #f4f4f4;
  }

  /*
* 申请历史记录组件
 */
  .list_main {
    width: 100vw;
    height: 100%;
    overflow: scroll;
    background-color: #f4f4f4;

    ::v-deep .van-list__finished-text {
      padding: 2.66667vw;
      font-size: 2.93333vw;
      color: #b13a3d;
      text-align: center;
    }
  }

  .list_main::-webkit-scrollbar {
    display: none;
  }

  .main_item {
    width: 90vw;
    padding: 2vw;
    padding-bottom: 2vh;
    margin: auto;
    margin-top: 2vh;
    margin-bottom: 2vh;
    background-color: #fff;
    border-radius: 20px;

    .detail {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-top: 10px;

      li {
        display: flex;
        justify-content: flex-start;
        margin-top: 5px;
        margin-right: 10px;
        margin-left: 10px;
        font-size: 13px;
        color: #868686;
        text-align: justify;
      }
    }
  }
}
</style>
