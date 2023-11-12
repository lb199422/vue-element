<template>
  <el-drawer
    :title="title"
    :visible.sync="drawerVisible"
    :size="size"
    :wrapperClosable="wrapperClosable"
    :destroy-on-close="destroyOnClose"
    :modal-append-to-body="false"
    @closed="handleClosed"
    @close="handleClose"
    @open="handleOpen"
    @opened="handleOpened"
    :append-to-body="true"
    class="common-drawer"
  >
    <div class="drawer-content" id="yb-drawer-content">
      <slot></slot>
    </div>
    <div v-if="showBtn" class="action-wrapper">
      <el-button
        v-if="showSave"
        type="primary"
        @click="handleSave"
        :loading="loading"
      >
        {{ submitText || '保存' }}
      </el-button>
      <el-button v-if="temporaryBtn" type="primary" @click="temporarySave">
        {{ temporaryText || '临时保存' }}
      </el-button>
      <el-button @click="handleCancel" type="default">
        {{ cancelText || '取消' }}
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'CommonDrawer',
  props: {
    title: {
      type: String,
    },
    size: {
      type: String,
      default: '80%',
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
    temporaryBtn: {
      type: Boolean,
      default: false,
    },
    showSave: {
      type: Boolean,
      default: true,
    },
    submitText: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    wrapperClosable: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '',
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
    handleClosed() {
      this.$emit('closed');
    },
    handleClose() {
      this.$emit('close');
    },
    handleOpen() {
      this.$emit('open');
    },
    handleOpened() {
      this.$emit('opened');
    },
    handleSave() {
      this.$emit('save');
    },
    temporarySave() {
      this.$emit('temporary');
    },
    handleCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
.action-wrapper {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
.drawer-content {
  padding: 8px;
  height: calc(100% - 48px);
  overflow: auto;
}
::v-deep .el-select {
  width: 100%;
}
.common-drawer {
  :deep .el-drawer__header {
    margin-bottom: 0;
    padding: 10px 10px 10px 20px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    z-index: 9;
  }
}
</style>
