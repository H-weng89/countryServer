<template>
  <div class="user_info_wra">
    <van-field
      v-model="form.leader"
      name="leader"
      label="姓名"
      placeholder="姓名"
      disabled
    />
    <van-field
      name="sex"
      label="性别"
      disabled
    >
      <template #input>
        <van-radio-group
          v-model="form.sex"
          direction="horizontal"
          disabled
        >
          <van-radio name="0">
            男
          </van-radio>
          <van-radio name="1">
            女
          </van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="form.birthDate"
      name="birthDate"
      label="出生日期"
      placeholder="出生日期"
      disabled
    />
    <van-field
      v-model="form.birthplace"
      name="birthplace"
      label="籍贯"
      placeholder="籍贯"
      disabled
    />
    <van-field
      v-model="form.nation"
      name="nation"
      label="民族"
      placeholder="民族"
      disabled
    />
    <van-field
      v-model="form.politicsStatus"
      name="politicsStatus"
      label="政治面貌"
      placeholder="政治面貌"
      disabled
    />
    <van-field
      v-model="form.idCard"
      name="idCard"
      label="身份证号码"
      placeholder="身份证号码"
      disabled
    />
    <van-field
      v-model="form.education"
      name="education"
      label="文化程度"
      placeholder="文化程度"
      disabled
    />
    <van-field
      v-model="form.department"
      name="department"
      label="工作部门"
      placeholder="工作部门"
      disabled
    />
    <van-field
      v-model="form.job"
      name="job"
      label="职务"
      placeholder="职务"
      disabled
    />
    <van-field
      v-model="form.address"
      name="address"
      label="家庭住址"
      placeholder="家庭住址"
      disabled
    />
    <van-field
      v-model="form.tellphone"
      name="tellphone"
      label="联系电话"
      placeholder="联系电话"
      disabled
    />
    <van-field
      v-model="form.emergencyContact"
      name="emergencyContact "
      label="紧急联系人"
      placeholder="紧急联系人"
      disabled
    />
    <van-field
      v-model="form.emergencyPhone"
      name="emergencyPhone"
      label="紧急联系电话"
      placeholder="紧急联系电话"
      disabled
    />
  </div>
</template>

<script>
export default {
  name: 'PaperworkManageUserInfo',
  props: ['form']

}
</script>
<style lang="scss" scoped>
.user_info_wra {
  ::v-deep.van-field__label {
    color: #646566;
  }

  ::v-deep.van-field__control:disabled {
    color: #646566;
    -webkit-text-fill-color: #646566;
  }
}

</style>
