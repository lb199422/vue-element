<template>
  <div class="test">
    <span>this is test</span>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请输入性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="2" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
          <el-form-item
            :label="'域名' + index + 1"
            label-width="auto"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- slot -->
    <h4>----------------------------------------------------</h4>
    <BaseSlot :slot-data="slotList">
      <template v-slot:header="{ label, age }">
        <div>
          <h2>this is header</h2>
          {{ (label, age) }}
        </div>
      </template>
      <template v-slot:main>
        <div>this is main</div>
      </template>
      <template v-slot:footer>
        <div>this is footer</div>
      </template>
    </BaseSlot>
  </div>
</template>

<script>
import BaseSlot from "@/components/BaseSlot.vue";
export default {
  components: {
    BaseSlot,
  },
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
        email: "",
      },
      form: {},
      slotList: { label: "tom", age: 18 },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((res) => {
        console.log(res, this.form.name);
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    submitForm() {},
  },
};
</script>

<style>
.test .el-form-item__label-wrap {
  width: 100%;
  text-align: center;
}
</style>
