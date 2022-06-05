<template>
  <div class="tab-title">
    {{ title }}
    <span class="el-icon-arrow-right"></span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.tab-title {
  font-size: 20px;
  color: #2c3e50;
  font-weight: 800;
}
</style>
