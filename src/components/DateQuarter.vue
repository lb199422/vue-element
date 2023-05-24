<template>
  <!--  基于el-select 扩展季度选择器 -->
  <div>
    <el-select v-model="date" placeholder="">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
    };
  },
};
</script>

<style lang="scss" scoped></style>
