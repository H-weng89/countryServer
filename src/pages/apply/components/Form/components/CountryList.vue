<template>
  <div class="country_list_wra">
    <TitleHeader
      title="选择地区"
      @choose="choose"
    />

    <div class="search">
      <form action="/">
        <van-search
          v-model="search"

          placeholder="请输入搜索关键词"
          @input="onSearch"
        />
      </form>
    </div>
    <Loading v-if="isLoading" />
    <div class="list">
      <div
        v-for="(item, key) in cityList"
        :key="key"
        class="item"
      >
        <van-cell
          :title="item.label"
          @click="choose(item.label)"
        />
      </div>
    </div>
  </div>
</template>

<script>

import TitleHeader from '@components/BaseHeader.vue'
import Loading from '@components/BaseLoading.vue'
import { mapState } from 'vuex'

export default {
  name: 'PaperworkManageCountryList',
  components: { TitleHeader, Loading },
  props: ['type'],
  data () {
    return {
      cityList: [], // 城市列表
      search: '',
      isLoading: false,
      rootList: []
    }
  },

  computed: {
    ...mapState(['countryList'])
  },
  mounted () {
    this.getCountry()
    this.cityList = this.rootList
  },
  methods: {
    /**
     * 搜索国家
     * @param {string} val 搜索字段
     */
    onSearch (val) {
      if (val === '') {
        this.cityList = this.rootList
        return
      }
      this.cityList = this.rootList.filter(item => item.label.includes(val))
    },
    /**
     * 获取国家列表
     */
    getCountry () {
      this.isLoading = true
      // 获取国家列
      this.rootList = this.countryList.page.list

      // 三种通行证类型
      // 1显示所有国家 2 显示港澳 3显示台湾

      if (this.type === 2) {
        this.rootList = this.countryList.page.list.filter(item => item.label.includes('香港') || item.label.includes('澳门')
        )
      } if (this.type === 3) {
        this.rootList = this.countryList.page.list.filter(item => item.label.includes('台湾')
        )
      }

      this.isLoading = false
    },

    /**
     * 选择国家并保存
     * @param {string} name 选择国家的名字
     */
    choose (name) {
      this.$emit('choose', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.country_list_wra {
  width: 100vw;
  background-color: #f4f4f4;

  .search {
    position: fixed;
    top: 6vh;
    z-index: 10;
    width: 100vw;
    height: 7vh;
  }

  .list {
    height: 100%;
    height: 87vh;
    margin-top: 13vh;
    overflow: auto;
  }

  ::v-deep.van-cell__title {
    display: flex;
  }
}
</style>
