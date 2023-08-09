<template>
  <div>
    <el-popover
      v-model="showPopover"
      trigger="focus"
      placement="bottom"
      @after-leave="afterLeave"
    >
      <div class="year-range-container">
        <div class="title-container">
          <i class="el-icon-d-arrow-left left" @click="clickArrow(-10)"> </i>
          <span>{{ preYear + '年   -   ' + nextYear + '年' }}</span>
          <i class="el-icon-d-arrow-right right" @click="clickArrow(10)"> </i>
        </div>
        <div class="year-container">
          <div
            class="item-container"
            v-for="(item, index) in yearList"
            :key="index"
          >
            <div
              class="year-item"
              :class="[
                { active: showActive(item) },
                { current: currentYear === item },
              ]"
              @click="checkYear(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <el-date-picker
        slot="reference"
        v-model="value"
        type="monthrange"
        :range-separator="rangeSeparator"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        popper-class="quarter-range-picker-date-popper"
        value-format="yyyy"
        format="yyyy年"
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
      default: '开始年份',
    },
    endPlaceholder: {
      type: String,
      default: '结束年份',
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
    let preYear = Math.floor(new Date().getFullYear() / 10) * 10;
    let nextYear = preYear + 9;
    let currentYear = new Date().getFullYear();
    return {
      showPopover: false,
      preYear,
      nextYear,
      currentYear,
    };
  },
  computed: {
    yearList() {
      let res = [];
      for (let i = this.preYear; i <= this.nextYear; i++) {
        res.push(i);
      }
      return res;
    },
    value: {
      get() {
        return this.dateRange || [];
      },
      set(val) {
        if (!val) {
          this.$emit('dateChange', []);
        }
      },
    },
    showActive() {
      return (val) => {
        return this.value.includes(val + '');
      };
    },
  },
  methods: {
    handleFocus() {
      if (this.showPopover === true) return;
      this.showPopover = true;
    },
    handleBlur() {
      // this.showPopover = false;
    },
    afterLeave() {
      if (this.value.length === 0 || this.value.length === 1) {
        this.$emit('dateChange', []);
      }
    },
    clickArrow(value) {
      this.preYear += value;
      this.nextYear += value;
    },
    checkYear(year) {
      year;
      if (this.value.length === 0 || this.value.length === 1) {
        let data = JSON.parse(JSON.stringify(this.value));
        data.push(year);
        data.sort((a, b) => a - b);
        data = data.map((item) => item + '');
        if (data.length === 2) {
          this.showPopover = false;
        }
        this.$emit('dateChange', data);
      } else {
        this.$emit('dateChange', [year + '']);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import 'element-ui/packages/theme-chalk/src/common/var.scss';

.year-range-container {
  width: 300px;
  .title-container {
    text-align: center;
    position: relative;
    line-height: 35px;
  }

  .left {
    position: absolute;
    left: 10px;
    top: 11px;
    &:hover {
      cursor: pointer;
    }
  }
  .right {
    position: absolute;
    right: 10px;
    top: 11px;
    &:hover {
      cursor: pointer;
    }
  }
}
.year-container {
  display: flex;
  flex-wrap: wrap;
  .item-container {
    width: 25%;
    padding: 0 5px;
    box-sizing: border-box;
  }
  .year-item {
    text-align: center;
    padding: 5px 6px;
    margin: 20px 0;
    &:hover {
      cursor: pointer;
      color: $--color-primary;
    }
  }
  .year-item.active {
    color: #fff;
    background-color: $--color-primary;
    border-radius: 20px;
  }
  .year-item.current {
    color: $--color-primary;
    font-weight: 600;
  }
}
</style>
<style lang="scss">
.quarter-range-picker-date-popper {
  display: none;
}
</style>
