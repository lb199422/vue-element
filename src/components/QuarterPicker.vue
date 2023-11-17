<template>
    <el-select
        ref="quarterSelect"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <el-option :label="value" :value="value" class="hide" />
        <div class="quarter-picker-wrapper">
            <div class="quarter-picker-header">
                <button
                    type="button"
                    aria-label="前一年"
                    class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
                    @click="prev"
                ></button>
                <span role="button" class="el-date-picker__header-label"
                    >{{ year }}年</span
                >
                <button
                    type="button"
                    aria-label="后一年"
                    @click="next"
                    class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
                ></button>
            </div>
            <div class="quarter-picker-content">
                <div
                    v-for="item in quarters"
                    :key="item"
                    class="quarter-picker-content-item"
                    :class="item === quarter ? 'active-quarter' : ''"
                    @click="quarterChange(item)"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </el-select>
</template>

<script>
export default {
    name: 'QuarterPicker',
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: {
            default: '',
        },
        label: {
            default: '',
        },
    },
    data() {
        return {
            quarters: ['1季度', '2季度', '3季度', '4季度'],
        };
    },
    computed: {
        year: {
            get() {
                if (!this.value) {
                    return new Date().getFullYear();
                }
                return this.value.split('年')[0];
            },
            set(val) {
                this.unVisiable();
                this.$emit('change', val + '年' + this.quarter);
            },
        },
        quarter: {
            get() {
                if (!this.value) {
                    return new Date().getFullYear();
                }
                return this.value.split('年')[1];
            },
            set(val) {
                this.unVisiable();
                this.$emit('change', this.year + '年' + val);
            },
        },
    },
    methods: {
        next() {
            this.year = this.year - 0 + 1;
        },
        prev() {
            this.year = this.year - 1;
        },
        quarterChange(val) {
            this.quarter = val;
        },
        unVisiable() {
            this.$refs.quarterSelect.blur();
        },
    },
};
</script>
<style lang="scss" scoped>
.quarter-picker-wrapper {
    margin: 12px;
}
.quarter-picker-header {
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e5e5;
}

.el-picker-panel__icon-btn {
    margin-top: 0;
}
.quarter-picker-content {
    display: flex;
    flex-wrap: wrap;
}
.quarter-picker-content-item {
    width: 50%;
    height: 48px;
    padding-top: 8px;

    line-height: 48px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    color: #474747;
    &:hover {
        color: #508ffe;
    }
}
.active-quarter {
    color: #508ffe;
}
</style>
