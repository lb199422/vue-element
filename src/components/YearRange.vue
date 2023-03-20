<template>
  <el-date-picker :value.sync="value" type="year" placeholder="选择年份范围" :picker-options="pickerOptions" :disabled="disabled" :clearable="clearable" :readonly="readonly" :editable="editable" :size="size" />
</template>

<script>
export default {
  name: "YearRangePicker",
  props: {
    value: {
      type: [String, Date],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          const year = time.getFullYear();
          return year < 1900 || year > new Date().getFullYear();
        },
        shortcuts: [
          {
            text: "最近十年",
            onClick(picker) {
              const end = new Date();
              const start = new Date(end.getFullYear() - 10, 0, 1);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
};
</script>
