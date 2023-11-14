<template>
  <div :style="cssVar">
    <el-descriptions
      v-if="dataList && dataList.length"
      class="common-description"
      :title="title"
      :column="column"
      :size="size"
      :direction="direction"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item
        v-for="(item, index) in dataList"
        :key="index + '_item'"
      >
        <template slot="label"> {{ item.label }} </template>
        <div>{{ item.valueText }}</div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    descriptionList: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Number,
      default: 4,
    },
    size: {
      type: String,
      default: 'small',
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
  },
  data() {
    return {};
  },
  computed: {
    cssVar() {
      return {
        '--description-column': this.column,
      };
    },
    dataList() {
      return this.descriptionList.filter((item) => item.isShow === 1);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .common-description .el-descriptions-item__cell {
  width: calc((100% / var(--description-column)) / 2) !important;
}
</style>
