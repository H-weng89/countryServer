<template>
  <div class="message_wra">
    <van-pull-refresh
      v-model="isRefresh"
      @refresh="onRefresh"
    >
      <van-list
        v-model="isLoading"
        :finished="isFinish"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="main">
          <div
            v-for="(item, key) in list"
            :key="key"
            :class="{'content_item item is-read':!item.isShow,'content_item item is-read view':item.isShow}"
            style="pointer-events: auto;"
            @click="read(item)"
          >
            <div class="item_header">
              <p class="item_header_title">
                过期提醒
              </p>
              <p

                class="item_header_time is-read"
              >
                {{ item.isShow ? item.createDate:item.mark }}
              </p>
            </div>
            <div
              v-if="!item.isShow"
              class="item_time"
            >
              {{ item.createDate }}
            </div>
            <div

              class="item_content"
            >
              {{ item.message }}
            </div>
            <div

              class="item_btn"
            >
              收起
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getMessage, readMessage } from '@api'

export default {
  name: 'PaperworkManageMyMessage',

  data () {
    return {
      list: [], // 消息列表
      isLoading: false, // 下拉刷新
      page: {
        pageSize: 10,
        pageNo: 1
      },
      isRefresh: false,
      isFinish: false

    }
  },

  async beforeMount () {
    // 获取消息列表
    const { list } = await this.getMessage()
    this.list = list
  },

  methods: {
    /**
     * 获取信息列表
     *
     */
    async getMessage () {
      const res = await getMessage(null, this.page)
      const count = res.page.count

      return {
        list: (res.page?.list || []).map((item) => {
          return {
            ...item,
            mark: item.mark === 0 ? '未读' : '已读',
            isShow: false
          }
        }),
        count
      }
    },

    /**
     * 刷新
     * @event:scroll
     */
    async onRefresh () {
      this.list = []
      this.isRefresh = true
      const { list } = await this.getMessage()
      console.log(list)
      this.list = list
      this.isRefresh = false
    },

    /**
     * 加载
     */
    async onLoad () {
      this.isLoading = true
      this.page.pageNo++
      const { list, count } = await this.getMessage()

      if (this.list.length !== count) {
        this.list = [...this.list, ...list]
      } else {
        this.isFinish = true
      }
      this.isLoading = false
    },

    /**
     * 消息已读
     * @param {Objcet} message 信息数据对象
     * @param {number} message.mark  是否已读标识
     * @event::click
     */
    async read (message) {
      if (message.mark === 0) {
        await readMessage(message.id)
        this.getMessage()
      }
      message.isShow = !message.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.message_wra {
  width: 100vw;
  height: 94vh;
  background-color: #f4f4f4;

  .main {
    width: 100vw;
    margin-top: 20px;
    overflow: auto;

    /*
        *修改折叠面板样式
         */

    .view {
      height: auto !important;
    }

    .content_item {
      width: 93vw;
      height: 60px;
      padding: 2px;
      padding-bottom: 10px;
      margin: auto;
      margin-top: 15px;
      overflow: hidden;
      background-color: white;
      border-radius: 5px;

      .item_header_time {
        margin-top: 0;
        font-size: 10px;
        color: #868686;
      }

      .item_content {
        margin: 0 30px 0 10px;
        margin-top: 5px;
        font-size: 12px;
        line-height: 25px;
        text-align: justify;
        text-indent: 2em;
      }

      .item_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 95%;
        padding-top: 10px;
        margin-top: 10px;
        margin-left: 10px;
        font-size: 13px;
        color: #868686;
        border-top: 1px solid #868686;
      }

      .item_time {
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
        font-size: 10px;
        color: #868686;
      }

      .item_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 10px 0 10px;

        .item_header_title {
          display: block;
          margin: 10px 0;
          font-size: 16px;
          font-weight: bold;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0;
          margin-inline-end: 0;
        }

        .item_time {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
