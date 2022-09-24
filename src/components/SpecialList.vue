<template>
  <div class="special-list">
    <div class="arrow-left arrow" v-if="this.dataList.length > 7">
      <div class="arrow-content" @click="arrowClick('backward')">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <div class="instance-container" ref="instance-container">
      <div class="instance-wrap" ref="instance-items" v-for="(item, index) in dataList" :key="item.id" @click="instanceChange(item, index)">
        <div class="instance-item" :class="{ active: currentIndex === index }">
          <div class="instance-item-top">
            <div class="instance-item-left"></div>
            <div class="img-container">
              <img :src="item.url" alt="" />
            </div>
            <div class="instance-item-right">
              {{ item.state }}
              <!-- {{ transformDictByValue("special_status", item.state) }} -->
            </div>
          </div>

          <div class="title">
            {{ item.topicName }}
          </div>
          <div class="special-select-container">
            <span>批次号</span>
            <el-select class="special-select" v-model="batchCodeList[index]" placeholder="请选择" @change="selectChange" filterable :disabled="currentIndex !== index">
              <el-option v-for="item in batchList[index]" :key="item.batchCode" :label="item.name" :value="item.batchCode"> </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="arrow-right arrow" v-if="this.dataList.length > 7">
      <div class="arrow-content" @click="arrowClick('forward')">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import { transformDictByValue } from "common-app-components/packages/es/utils";
import report_1 from "@/assets/report_1.png";
import report_2 from "@/assets/report_2.png";
import report_3 from "@/assets/report_3.png";
import report_4 from "@/assets/report_4.png";
import report_5 from "@/assets/report_5.png";
import report_6 from "@/assets/report_6.png";
export default {
  props: {
    specialList: {
      type: Array,
      default: () => [],
    },
    // batchList: {
    //     type: Array,
    //     default: () => [],
    // },
  },
  data() {
    return {
      currentInstanceId: null,
      currentIndex: 0,
      totalWidth: null,
      itemWidth: null,
      //   transformDictByValue,
      imgList: [report_1, report_2, report_3, report_4, report_5, report_6],
    };
  },
  computed: {
    batchList() {
      let res = [];
      res = this.specialList.map((item) => {
        return item.batchList;
      });
      return res;
    },
    batchCodeList() {
      return this.batchList.map((item) => {
        return item[0].batchCode;
      });
    },
    dataList() {
      let res = this.specialList.map((item) => {
        item.url = this.imgList[parseInt(Math.random() * 6)];
        return item;
      });
      return res;
    },
  },
  methods: {
    instanceChange(item, index) {
      this.currentInstanceId = item.id;
      this.currentIndex = index;
      this.$emit("change", {
        item,
        index,
        batchCode: this.specialList[this.currentIndex].batchList[0].batchCode,
      });
    },
    arrowClick(type) {
      this.totalWidth = this.$refs["instance-container"].offsetWidth;
      this.itemWidth = this.$refs["instance-items"][0].offsetWidth;
      if (type === "backward") {
        if (this.currentIndex == 0) return;
        this.currentIndex--;
        this.$refs["instance-container"].scrollLeft = this.$refs["instance-container"].scrollLeft - this.itemWidth;
        this.$emit("change", {
          item: this.specialList[this.currentIndex],
          index: this.currentIndex,
          batchCode: this.specialList[this.currentIndex].batchList[0].batchCode,
        });
      } else {
        if (this.currentIndex === this.specialList.length - 1) return;
        this.currentIndex++;
        this.$refs["instance-container"].scrollLeft += this.itemWidth;
        this.$emit("change", {
          item: this.specialList[this.currentIndex],
          index: this.currentIndex,
          batchCode: this.specialList[this.currentIndex].batchList[0].batchCode,
        });
      }
    },
    selectChange(val) {
      let res = null;
      this.batchList[this.currentIndex].forEach((item) => {
        if (item.batchCode === val) res = item.name;
      });
      this.$emit("selectChange", { name: res, batchCode: val });
    },
  },
};
</script>

<style scoped lang="scss">
.special-list {
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 10px;
  // border: 1px solid red;
  .arrow {
    display: inline-block;
    box-sizing: border-box;
    width: 30px;
    line-height: 12vh;
    padding: 0 5px;
    vertical-align: top;
    &:hover {
      cursor: pointer;
    }
    .arrow-content {
      display: inline-block;
      background-color: #f5f5f5;
      height: 100%;
      border-radius: 5px;
      text-align: center;
      width: 100%;
      border: 1px solid #eee;
    }
  }
  .instance-container {
    white-space: nowrap;
    vertical-align: top;
    overflow-y: hidden;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
      height: 0;
      width: 0;
    }
    display: inline-block;
    width: calc(100% - 60px);
    .instance-wrap {
      box-sizing: border-box;
      display: inline-block;
      width: calc(100% / 7);
      padding: 0 5px;
      // border: 1px solid blue;
      .instance-item {
        min-height: 12vh;
        border-radius: 5px;
        background-color: #f5f5f5;
        border: 1px solid #eee;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        &:hover {
          cursor: pointer;
        }
        .instance-item-top {
          display: flex;
        }
        .title {
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #474747;
          padding-top: 10px;
        }
        .img-container {
          width: 36%;
          & > img {
            display: block;
            height: 100%;
            width: 100%;
          }
        }
        .instance-item-left {
          width: 32%;
        }
        .instance-item-right {
          width: 32%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #52c41a;
        }
      }
      .instance-item.active {
        background-color: #f5e8ea;
      }
    }
  }
  .special-select-container {
    padding-top: 10px;
    display: flex;
    align-items: center;
    > span {
      font-size: 12px;
      padding-right: 5px;
    }
  }
  .special-select {
    flex: 1;
  }
  ::v-deep .special-select .el-input--small .el-input__inner {
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>
