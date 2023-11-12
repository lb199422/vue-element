<template>
  <div>
    <AddConfig ref="add-config" />
    <div>
      <el-button type="default" @click="handleClick('view', {})">
        查看
      </el-button>
      <el-button type="primary" @click="handleClick('edit', {})">
        编辑
      </el-button>
    </div>
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
    handleClick(type, data) {
      this.$refs['add-config'].show({ type, data });
    },
  },
};
</script>

<style lang="scss" scoped></style>
