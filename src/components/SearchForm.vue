<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      labelWidth: '',
      labelPosition: '',
    };
  },
};
</script>

<style lang="scss" scoped></style>
