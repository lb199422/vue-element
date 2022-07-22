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
      <template v-slot:footer="data">
        <div>
          this is footer
          {{ data }}
        </div>
      </template>
    </BaseSlot>
    <div>this is vueEditor</div>
    <el-button type="primary" @click="handleTest">test</el-button>
    <h2>选择器</h2>
    <div>
      <el-select v-model="value1" multiple placeholder="请选择" @change="selectChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <!-- 树形结构 -->
    <div>
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <!-- 弹出框 -->
    <PopIframe ref="pop-iframe"></PopIframe>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" width="100" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BaseSlot from "@/components/BaseSlot.vue";
import PopIframe from "@/components/PopIframe.vue";
export default {
  components: {
    BaseSlot,
    PopIframe,
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
      VueEditor: "<h1>Some initial content</h1>",
      value1: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
        },
      ],
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
    onBlur(data) {
      console.log(data);
    },
    handleTest() {
      this.$refs["pop-iframe"].show();
    },
    selectChange(val) {
      console.log(val, this.value1);
    },
    handleNodeClick() {},
  },
};
</script>

<style>
.test .el-form-item__label-wrap {
  width: 100%;
  text-align: center;
}
</style>
