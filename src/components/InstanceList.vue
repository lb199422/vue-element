<template>
  <div class="instance-list">
    <div class="arrow-left arrow" v-if="this.instanceList.length > 7">
      <div class="arrow-content" @click="arrowClick('backward')">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <div class="instance-container" ref="instance-container">
      <div class="instance-wrap" ref="instance-items" v-for="(item, index) in instanceList" :key="item.id" @click="instanceChange(item, index)">
        <div class="instance-item" :class="{ active: currentIndex === index }">
          <div class="title">
            {{ item.channelName }}
          </div>
          <div class="content">
            状态：
            <span :style="{ color: statusStyle(item.status) }">
              <!-- {{ transformDictByValue("report_status", item.state ? item.state + "" : item.status + "") }} -->
              {{ item.state }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="arrow-right arrow" v-if="this.instanceList.length > 7">
      <div class="arrow-content" @click="arrowClick('forward')">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- <div class="toggle" @click="toggleClick" v-if="showToggle">
            <i class="el-icon-arrow-down"></i>
        </div> -->
  </div>
</template>

<script>
// import { transformDictByValue } from "common-app-components/packages/es/utils";
export default {
  props: {
    instanceList: {
      type: Array,
      default: () => [],
    },
    showToggle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentInstanceId: null,
      currentIndex: 0,
      totalWidth: null,
      itemWidth: null,
      //   transformDictByValue,
    };
  },
  computed: {
    statusStyle() {
      return function formatColor(val) {
        switch (val) {
          case 0:
            return "#1890FF";
          case 1:
            return "#52C41A";
          case 2:
            return "#FAAD14";
          case 3:
            return "#FF4D4F";
        }
      };
    },
  },
  methods: {
    instanceChange(item, index) {
      this.currentInstanceId = item.id;
      this.currentIndex = index;
      this.$emit("change", { item, index });
    },
    arrowClick(type) {
      this.totalWidth = this.$refs["instance-container"].offsetWidth;
      this.itemWidth = this.$refs["instance-items"][0].offsetWidth;
      if (type === "backward") {
        if (this.currentIndex == 0) return;
        this.currentIndex--;
        this.$refs["instance-container"].scrollLeft = this.$refs["instance-container"].scrollLeft - this.itemWidth;
        this.$emit("change", {
          item: this.instanceList[this.currentIndex],
          index: this.currentIndex,
        });
      } else {
        if (this.currentIndex === this.instanceList.length - 1) return;
        this.currentIndex++;
        this.$refs["instance-container"].scrollLeft += this.itemWidth;
        this.$emit("change", {
          item: this.instanceList[this.currentIndex],
          index: this.currentIndex,
        });
      }
    },
    toggleClick() {
      this.$emit("toggle", "expand");
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.instance-list {
  font-size: 12px;
  color: #474747;
  line-height: 20px;
  box-sizing: border-box;
  background-color: #fff;
  padding-top: 10px;
  font-weight: 500;
  position: relative;
  .arrow {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    width: 30px;
    padding: 0 5px;
    vertical-align: top;
    &:hover {
      cursor: pointer;
    }
    .arrow-content {
      display: inline-block;
      background-color: #f5f5f5;
      border-radius: 5px;
      width: 100%;
      line-height: 50px;
      vertical-align: top;
    }
  }
  .instance-container {
    // padding: 0 5px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    width: calc(100% - 60px);
    &::-webkit-scrollbar {
      display: none;
    }
    display: inline-block;
    .instance-wrap {
      box-sizing: border-box;
      display: inline-block;
      padding: 0 5px;
      width: calc(100% / 7);
      .instance-item {
        border-radius: 5px;
        background-color: #f5f5f5;
        border: 1px solid #eee;
        padding: 5px 10px;
        text-overflow: hidden;
        box-sizing: border-box;
        &:hover {
          cursor: pointer;
        }
        .title {
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .content {
          text-align: center;
        }
      }
      .instance-item.active {
        background-color: #f5e8ea;
      }
    }
  }
  .toggle {
    position: absolute;
    right: 10px;
    bottom: -10px;
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
