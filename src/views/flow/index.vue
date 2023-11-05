<template>
  <div>
    <AddConfig ref="add-config" />
    <el-button type="primary" @click="handleClick">测试</el-button>
  </div>
</template>

<script>
import AddConfig from '@/views/flow/AddConfig.vue';
export default {
  components: {
    AddConfig,
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$refs['add-config'].show({ type: 'add', data: {} });
    },
  },
};
</script>

<style lang="scss" scoped></style>
