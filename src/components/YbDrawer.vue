<!--
 * @Description: 代码功能内容描述（需求）
 * @Author: zhouxiwen@gz-yibo.com
 * @Date: 2022-03-20 14:35:13
 * @LastEditTime: 2022-05-17 15:03:04
 * @LastEditors: zhouxiwen@gz-yibo.com
 * @remarks: 备注
-->
<template>
    <el-drawer
        :title="title"
        :visible.sync="drawerVisible"
        v-if="drawerVisible"
        :size="size"
        :wrapperClosable="false"
        :destroy-on-close="destroyOnClose"
        @closed="closed"
        :append-to-body="true"
    >
        <div class="drawer-content">
            <slot></slot>
        </div>
        <div v-if="showBtn" class="action-wrapper">
            <el-button type="primary" @click="handleSave" v-if="!showDetail">{{
                temporaryBtn ? submitText : '保存'
            }}</el-button>
            <el-button v-if="temporaryBtn" type="primary" @click="temporarySave"
                >临时保存</el-button
            >
            <el-button @click="handleCancel">{{
                showDetail ? '关闭' : '取消'
            }}</el-button>
        </div>
    </el-drawer>
</template>

<script>
export default {
    name: 'YbDrawer',
    props: {
        title: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: '30%',
        },
        destroyOnClose: {
            type: Boolean,
            default: false,
        },
        showBtn: {
            type: Boolean,
            default: true,
        },
        temporaryBtn: {
            type: Boolean,
            default: false,
        },
        showDetail: {
            type: Boolean,
            default: false,
        },
        submitText: {
            type: String,
            default: '提交',
        },
    },
    data() {
        return {
            drawerVisible: false,
        };
    },
    methods: {
        show() {
            this.drawerVisible = true;
        },
        close() {
            this.drawerVisible = false;
        },
        handleSave() {
            this.$emit('save');
        },
        temporarySave() {
            this.$emit('temporary');
        },
        handleCancel() {
            this.$emit('close');
        },
        closed() {
            console.log('closed');
        },
    },
};
</script>

<style lang="scss" scoped>
.action-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
}
.drawer-content {
    padding: 8px;
    height: calc(100% - 48px);
    overflow: auto;
}
.el-select {
    width: 100% !important;
}
</style>
