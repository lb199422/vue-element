<template>
  <div class="pop-iframe">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <!-- 富文本框 -->
      <div class="container">
        <vue-editor id="editor" v-model="content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </div>

      <!-- 上传文件 -->
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :on-change="handleChange" :file-list="fileList">
        <el-button size="small" type="primary">上传附件</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      dialogVisible: false,
      content: "test",
      fileList: [{ name: "food.jpeg", url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" }],
      text: "",
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSave() {
      console.log(this.content, this.fileList);
      // 获取数据处理 数据
    },
    handleImageAdded(file, Editor, cursorLocation) {
      console.log(file, "this is editor", Editor, cursorLocation);
      let url = "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
      Editor.insertEmbed(cursorLocation, "image", url);
    },
    handleChange(file, fileList) {
      console.log(file, fileList);
    },
  },
};
</script>

<style scoped lang="scss">
.pop-iframe {
  .container {
    max-height: 300px;
    overflow: auto;
  }
}
</style>
