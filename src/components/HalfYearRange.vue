<template>
  <div>
    <el-popover
      v-model="showPopover"
      trigger="focus"
      placement="bottom"
      @after-leave="afterLeave"
    >
      <div class="half-range-container">
        <div class="half-range-top">
          <div class="top-left">
            <span class="half-year-arrow">
              <i class="el-icon-d-arrow-left" @click="clickArrow(-10)"> </i>
              <i class="el-icon-arrow-left" @click="clickArrow(-1)"></i>
            </span>
            {{ preYear }}
          </div>
          <div class="top-right">
            {{ nextYear }}
            <span class="half-year-arrow">
              <i class="el-icon-arrow-right" @click="clickArrow(1)"> </i>
              <i class="el-icon-d-arrow-right" @click="clickArrow(10)"> </i>
            </span>
          </div>
        </div>
        <div class="half-year-table">
          <div class="year-table-left">
            <div
              class="half-year-item"
              :class="{
                active: showActive(preYear + '-' + item.value),
              }"
              v-for="item in halfYearList"
              :key="item.value + '_left'"
              @click="checkYear(preYear, item.value)"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="year-table-right">
            <div
              class="half-year-item"
              :class="{
                active: showActive(nextYear + '-' + item.value),
              }"
              v-for="item in halfYearList"
              :key="item.value + '_right'"
              @click="checkYear(nextYear, item.value)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <el-date-picker
        slot="reference"
        ref="date-picker"
        v-model="value"
        type="monthrange"
        :range-separator="rangeSeparator"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        popper-class="half-year-range-picker-date-popper"
        :size="size"
        :editable="false"
        :disabled="disabled"
        :clearable="clearable"
        :placeholder="placeholder"
        :align="align"
        :prefix-icon="prefixIcon"
        :clear-icon="clearIcon"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      </el-date-picker>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    dateRange: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'small',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    startPlaceholder: {
      type: String,
      default: '开始时间',
    },
    endPlaceholder: {
      type: String,
      default: '结束时间',
    },
    rangeSeparator: {
      type: String,
      default: '至',
    },
    align: {
      type: String,
      default: 'left',
    },
    prefixIcon: {
      type: String,
      default: 'el-icon-date',
    },
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close',
    },
  },
  model: {
    prop: 'dateRange',
    event: 'dateChange',
  },
  data() {
    let preYear = new Date().getFullYear();
    let nextYear = preYear + 1;
    return {
      showPopover: false,
      preYear,
      nextYear,
      halfYearList: [
        {
          label: '上半年',
          value: 1,
        },
        {
          label: '下半年',
          value: 2,
        },
      ],
      dateValue: [],
    };
  },
  computed: {
    value: {
      get() {
        if (this.dateRange && this.dateRange.length > 0) {
          let res = [];
          this.dateRange.forEach((item) => {
            let year = item.slice(0, 4) + '年';
            let val = item.slice(-1) === '1' ? '上半年' : '下半年';
            res.push(year + val);
          });
          // 跳过格式化直接赋值input
          this.$nextTick(() => {
            this.$refs['date-picker'].userInput = res;
          });
          return this.dateRange;
        } else {
          this.$nextTick(() => {
            this.$refs['date-picker'].userInput = [];
          });
          return [];
        }
      },
      set(val) {
        if (!val) {
          this.$emit('dateChange', []);
        }
      },
    },
    showActive() {
      return (val) => this.value.includes(val);
    },
  },
  methods: {
    handleFocus() {
      if (this.showPopover === true) return;
      this.showPopover = true;
    },
    handleBlur() {
      this.formatterData();
    },
    afterLeave() {
      this.formatterData();
    },
    formatterData() {
      if (this.value.length === 0 || this.value.length === 1) {
        this.$emit('dateChange', []);
      } else {
        this.$refs['date-picker'].userInput = this.value.map((item) => {
          let year = item.slice(0, 4) + '年';
          let val =
            item.slice(-1) === '1'
              ? '上半年'
              : item.slice(-1) === '2'
              ? '下半年'
              : '';
          return year + val;
        });
      }
    },
    clickArrow(value) {
      this.preYear += value;
      this.nextYear += value;
    },
    checkYear(year, val) {
      let date = year + '-' + val;
      let length = this.value.length;
      if (length === 0) {
        this.$emit('dateChange', [date]);
      } else if (length === 1) {
        let checkYear = Number(this.value[0].slice(0, 4));
        let checkVal = Number(this.value[0].slice(-1));
        if (year === checkYear && checkVal === val) return;
        let copyValue = JSON.parse(JSON.stringify(this.value));
        if (year > checkYear || (year === checkYear && val > checkVal)) {
          copyValue.push(date);
          this.$emit('dateChange', copyValue);
        }
        if (year < checkYear || (year === checkYear && val < checkVal)) {
          copyValue.unshift(date);
          this.$emit('dateChange', copyValue);
        }
        this.showPopover = false;
      } else {
        this.$emit('dateChange', [date]);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import 'element-ui/packages/theme-chalk/src/common/var.scss';
.half-range-container {
  width: 500px;
  .half-range-top {
    display: flex;
    line-height: 35px;
  }
  .top-left,
  .top-right {
    flex: 1;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
  }
  .top-left .half-year-arrow {
    position: absolute;
    left: 5px;
    top: 0;
  }
  .top-right .half-year-arrow {
    position: absolute;
    right: 5px;
    top: 0;
  }
  .half-year-arrow i:hover {
    cursor: pointer;
    color: $--color-primary;
  }
  .top-left {
    border-right: 1px solid #e4dce4;
  }
}
.half-year-table {
  display: flex;
  .year-table-left,
  .year-table-right {
    flex: 1;
    display: flex;
    padding-bottom: 10px;
  }
  .year-table-left {
    border-right: 1px solid #e4dce4;
  }
  .half-year-item {
    flex: 1;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    margin: 0 5px;
    &:hover {
      cursor: pointer;
      color: $--color-primary;
    }
  }
  .half-year-item.active {
    color: #fff;
    background-color: $--color-primary;
  }
}
</style>
<style lang="scss">
.half-year-range-picker-date-popper {
  display: none;
}
</style>
