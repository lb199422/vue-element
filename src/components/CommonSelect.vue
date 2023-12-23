<template>
  <div>
    <el-select
      v-model="selectValue"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="$listeners"
      :multiple="multiple"
    >
      <template v-if="isShowCheckBox && multiple">
        <el-checkbox-group v-model="selectValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <el-checkbox style="pointer-events: none" :label="item.value">
              {{ item.label }}
            </el-checkbox>
          </el-option>
        </el-checkbox-group>
      </template>
      <template v-else>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    propsMap: {
      type: Object,
      default: () => ({}),
    },
    isShowCheckBox: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {};
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
  methods: {},
};
</script>

<style lang="scss" scoped></style>
