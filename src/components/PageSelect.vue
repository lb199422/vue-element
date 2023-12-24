<template>
  <div>
    <CommonSelect v-model="selectValue" v-bind="$attrs" v-on="$listeners">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </CommonSelect>
  </div>
</template>

<script>
import CommonSelect from '@/components/CommonSelect';
export default {
  components: {
    CommonSelect,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Array, Number, String, Boolean],
      required: true,
    },
    request: {
      type: Function,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped></style>
