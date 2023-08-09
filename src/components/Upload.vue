<template>
  <div class="common-upload" ref="common-upload">
    <el-upload
      action=""
      :http-request="handleUpload"
      :show-file-list="false"
      multiple
      :disabled="buttonDisabled"
    >
      <el-popover
        v-if="showLimitTip"
        placement="top-start"
        title="提示"
        width="200"
        trigger="hover"
        :content="tipContent"
      >
        <el-button
          slot="reference"
          :size="size"
          type="primary"
          :disabled="buttonDisabled"
          :icon="icon ? icon : ''"
        >
          {{ buttonName }}
        </el-button>
      </el-popover>

      <el-button
        v-else
        :size="size"
        type="primary"
        :disabled="buttonDisabled"
        :icon="icon ? icon : ''"
      >
        {{ buttonName }}
      </el-button>
    </el-upload>
    <div
      v-if="uploadFileList && uploadFileList.length > 0"
      class="file-list-container"
    >
      <div
        v-for="(file, index) in uploadFileList"
        :key="file.id"
        class="file-item"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="file.fileName"
          placement="top-start"
          :manual="true"
          v-model="showToolTipList[index]"
        >
          <span
            class="name-container"
            :style="nameContainerStyle"
            @mouseenter="
              (e) => {
                mouseenter(e, index);
              }
            "
            @mouseleave="
              (e) => {
                mouseleave(e, index);
              }
            "
          >
            {{ file.fileName }}
          </span>
        </el-tooltip>

        <div class="icon-container">
          <i
            v-if="!buttonDisabled"
            class="el-icon-download"
            @click="downloadFile(file.filePath, file.fileName)"
          >
          </i>
          <i
            v-if="!buttonDisabled"
            class="el-icon-delete"
            @click="removeFile(file.id)"
          >
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appCode } from '@/common';
import { commonUploadFile } from '@/utils/commonFile.js';
import { commonDownLoadFile } from '@/utils/commonFile.js';
import { responeHandler } from 'common-app-components/packages/es/utils/responeHandler';
import { downLoadHandler } from 'common-app-components/packages/es/utils';
import { getFileData } from '@/Api/commonUpload.api';
export default {
  props: {
    buttonName: {
      type: String,
      default: '上传文件',
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
    uploadTotal: {
      //用作限制只允许上传1个，后者覆盖
      type: Number,
      default: () => {},
    },
    size: {
      type: String,
      default: 'small',
    },
    showLimitTip: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'fileList',
    event: 'change',
  },
  data() {
    return {
      tipContent: '',
      showToolTipList: [],
      nameContainerStyle: {},
    };
  },
  computed: {
    uploadFileList: {
      get() {
        return this.fileList;
      },
      set(val) {
        this.$emit('change', val);
        this.showToolTipList = val.map(() => {
          return false;
        });
      },
    },
    // 动态获取设置name-container宽度避免溢出
    // nameContainerStyle() {
    //     if (this.$refs['common-upload']) {
    //         let width = this.$refs['common-upload'].offsetWidth - 50;
    //         return {
    //             width: width + 'px',
    //         };
    //     } else {
    //         return {};
    //     }
    // },
  },
  methods: {
    handleUpload(data) {
      commonUploadFile(data.file, appCode).then((res) => {
        responeHandler({
          res,
          desc: '上传文件',
          showMessage: true,
          successCallback: (data) => {
            if (this.uploadTotal === 1) {
              this.uploadFileList = [...data];
            } else {
              this.uploadFileList = [...this.uploadFileList, ...data];
            }
            this.showToolTipList = this.uploadFileList.map(() => {
              return false;
            });
          },
        });
      });
    },
    removeFile(id) {
      this.uploadFileList = this.uploadFileList.filter(
        (item) => item.id !== id
      );
    },
    downloadFile(path, fileName) {
      commonDownLoadFile(path).then((res) => {
        downLoadHandler(res, fileName);
      });
    },
    getFileLimitInfo() {
      let config = {
        configCode: 'SYS_FILE_UPLOAD_NOTES',
      };
      getFileData(config).then((res) => {
        this.tipContent = res?.data[0]?.usedValue || '';
      });
    },
    mouseenter(e, index) {
      let scrollWidth = e.target.scrollWidth;
      let offsetWidth = e.target.offsetWidth;
      let data = scrollWidth > offsetWidth ? true : false;
      this.$set(this.showToolTipList, index, data);
    },
    mouseleave(e, index) {
      this.$set(this.showToolTipList, index, false);
    },
  },
  created() {
    this.showLimitTip && this.getFileLimitInfo();
  },
  mounted() {
    if (this.$refs['common-upload']) {
      let width = this.$refs['common-upload'].offsetWidth - 50;
      this.nameContainerStyle = {
        width: width + 'px',
      };
    } else {
      this.nameContainerStyle = {};
    }
  },
};
</script>

<style lang="scss" scoped>
.common-upload {
  max-width: 100%;
}
.file-list-container {
  margin: 10px 0 0;
  max-width: 100%;
  .file-item {
    max-width: 100%;
    line-height: 1.5;
    overflow: hidden;
    .name-container {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: #ffff;
      &:hover {
        cursor: pointer;
      }
    }
    .icon-container {
      width: 50px;
      text-align: center;
      display: inline-block;
      vertical-align: text-bottom;
      &i:last-child {
        margin-left: 10px;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .el-icon-delete {
      color: #ae3a20;
      margin-left: 10px;
    }
    .el-icon-download {
      color: #347efc;
    }
  }
}
</style>
