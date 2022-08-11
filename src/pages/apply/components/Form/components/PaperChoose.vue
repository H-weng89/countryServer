<template>
  <div class="paper_choose_wra">
    <van-form @submit="submit">
      <van-field
        readonly
        clickable
        closeable
        name="zj"
        :value="zj.map(item=>item.label).join()"
        label="选择证件"
        placeholder="点击选择证件"
        :rules="[{ required: true, }]"
        @click="zjshowPicker = true"
      />
      <van-popup
        v-model="zjshowPicker"
        position="bottom"
        closeable
      >
        <van-checkbox-group
          v-model="zj"
        >
          <van-checkbox
            v-for="(item, key) in columns"
            :key="key"
            :name="item"
          >
            {{
              item.label
            }}
          </van-checkbox>
        </van-checkbox-group>
        <div
          class="confirm"
          @click="zjonConfirm"
        >
          确定
        </div>
      </van-popup>
      <div
        v-for="(item, key) in formList"
        :key="key"
        class="second_form"
      >
        <div

          class="form_item"
        >
          <van-field
            v-model="item.certificate"
            name="name"
            label="申领证照名称"
            placeholder="申领证照名称"
            disabled
          />
          <van-field
            v-model="item.certificateId"
            name="name"
            label="证照号码"
            placeholder="证照号码 "
            disabled
          />
          <van-field
            v-model="item.isNew"
            name="isNew"
            label="是否新证"
            placeholder="是否新证"
            disabled
          />
          <van-field
            readonly
            clickable
            name="calendar"
            :value="item.startTime"
            label="开始日期"
            placeholder="点击选择日期"
            :rules="[{ required: true, }]"
            @click="showPicker(0,key)"
          />
          <van-field
            readonly
            clickable
            name="calendar"
            :value="item.endTime"
            label="结束日期"
            placeholder="点击选择日期"
            :rules="[{ required: true, }]"
            @click="showPicker(1,key)"
          />

          <van-field
            readonly
            clickable
            name="area"
            :value="item.destination"
            label="地区选择"
            placeholder="点击选择地点"
            :rules="[{ required: true, }]"
            @click="showPicker(2,key)"
          />

          <van-field
            v-model="item.detail"
            name="name"
            label="具体地点"
            placeholder="具体地点"
            :rules="[{ required: true, }]"
          />
          <van-field
            v-model="item.reason"
            name="name"
            label="使用事由"
            placeholder="使用事由"
            :rules="[{ required: true,}]"
          />
        </div>
      </div>
      <van-popup
        v-if="isCity"
        v-model="isCity"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
        <CountryList
          :type="formList[index].type"
          @choose="choose($event)"
        />
      </van-popup>
      <van-popup
        v-model="isStartShowCalendar"
        position="bottom"
      >
        <van-datetime-picker
          type="date"
          title="选择年月日"
          :min-date="minDate"
          cancel-button-text=" "

          @confirm="startonConfirm($event,'startTime')"
        />
      </van-popup>
      <van-popup
        v-model="isEndShowCalendar"
        position="bottom"
      >
        <van-datetime-picker
          type="date"
          title="选择年月日"
          :min-date="minDate"
          cancel-button-text=" "
          @confirm="startonConfirm($event,'endTime')"
        />
      </van-popup>
      <div>
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import CountryList from './CountryList.vue'

import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'PaperworkManagePaperChoose',
  components: { CountryList },
  props: ['paper'],

  data () {
    return {
      zj: [], // 证件
      zjshowPicker: false, // 证件选择器
      columns: [

      ], // 证件列表
      isStartShowCalendar: false, // 开始时间
      isEndShowCalendar: false, // 结束时间
      isCity: false, // 地区选择器
      formList: [], // 证件相关信息
      index: '', // 证件索引
      minDate: new Date(),
      hasPaper: [] // 已存在的证件

    }
  },
  computed: {
    ...mapState(['paperList'])
  },

  mounted () {
    const typeObj = {
      港澳通行证: 2,
      台湾通行证: 3
    }
    // type  1 出国境 2港澳 3台湾
    this.columns = this.paperList.page.list.map(item => {
      return {
        ...item,
        type: typeObj[item.label] || 1
      }
    })
  },

  methods: {
    /**
     * 判断是否新证
     * @param {string} type 证件类型
     */
    isNewPaper (type) {
      return this.paper.page.list.find(item => type === item.label)
    },
    /**
     *  选择证件选择器
     * 确认证件
     * @event:click
     */
    zjonConfirm () {
      this.formList = this.zj.map((item, key) => {
        let formItem
        const index = this.formList.findIndex(item => item.certificate === item.label)
        if (index !== -1) {
          formItem = this.formList[index]
        } else {
          formItem = {
            isNew: this.isNewPaper(item.label) ? '否' : '是',
            certificateId: this.isNewPaper(item.label) ? this.isNewPaper(item.label).id : '无',
            certificate: item.label,
            type: item.type,
            startTime: '',
            endTime: '',
            destination: ''
          }
        }
        return formItem
      })
      this.zjshowPicker = false
    },

    /**
     * 显示时间选择器
     */
    showPicker (type, key) {
      this.index = key
      const obj = {
        0: 'isStartShowCalendar',
        1: 'isEndShowCalendar',
        2: 'isCity'
      }
      if (type === 1) {
        if (!this.formList[key].startTime) {
          this.$toast.fail('请先选择开始时间')
          return
        }
      }
      this[obj[type]] = true
    },
    /**
     * 确认时间
     * @param {Objcet} Date对象，方法与Date对象相同
     */
    startonConfirm (date, key) {
      this.formList[this.index][key] = moment(date).format('YYYY-MM-DD')
      this.isStartShowCalendar = false
      this.isEndShowCalendar = false
    },
    /**
     * 城市选择器
     *@param {string} name city名称
     */
    choose (name) {
      this.isCity = false
      this.formList[this.index].destination = name
    },

    /**
     * 通知父组件提交表单
     */
    submit () {
      const list = this.formList.map((item) => {
        return {
          ...item,
          destination: `${item.destination} ${item.detail}`
        }
      })
      this.$emit('submit', list)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5.33333vw 0;
}

.confirm {
  box-sizing: border-box;
  display: flex;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #646566;
  text-align: center;
  border-top: 10px solid #f4f4f4;
}

.second_form {
  .form_item {
    margin-top: 20px;
  }

  ::v-deep.van-field__label {
    color: #646566;
  }

  ::v-deep.van-field__control:disabled {
    color: #646566;
    -webkit-text-fill-color: #646566;
  }
}

.van-button--round {
  width: 80vw;
  margin: auto;
  margin-top: 10px;
  background-color: #b13a3d;
  border: 0;
}
</style>
