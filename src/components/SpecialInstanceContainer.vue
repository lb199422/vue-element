<template>
  <div class="special-instance-container">
    <div class="container-top" v-if="!isShowSpecial">当前专项：专项XXX 批次号：2022-09-13 专项状态： 待审批</div>
    <div>
      <SpecialList :special-list="specialList"></SpecialList>
      <InstanceList :instance-list="instanceList"></InstanceList>
    </div>
    <div class="button-container">
      <span @click="toggle('expand')" v-if="!isShowSpecial">展开</span>
      <span @click="toggle('retract')" v-if="isShowSpecial">收起</span>
    </div>
  </div>
</template>

<script>
import SpecialList from "@/components/SpecialList.vue";
import InstanceList from "@/components/InstanceList.vue";
export default {
  components: {
    SpecialList,
    InstanceList,
  },
  props: {
    specialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShowSpecial: true,
      specialList: [
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
        {
          topicName: "专项11",
          state: 2,
          batchList: [{ batchCode: 222222 }],
        },
      ],
      instanceList: [],
    };
  },
  methods: {
    toggle(type) {
      this.isShowSpecial = type === "expand" ? true : false;
    },
  },
};
</script>

<style scoped lang="scss">
.special-instance-container {
  background-color: #fff;

  .container-top {
    padding: 10px 10px 0 10px;
    font-size: 12px;
    line-height: 22px;
  }
  .slide-fade-enter-active {
    transition: all 2.8s linear;
  }
  // .slide-fade-leave-active {
  //     transition: all 0.5s ease;
  // }
  .button-container {
    padding: 10px 10px 0 10px;
    font-size: 12px;
    &:hover {
      cursor: pointer;
    }
    line-height: 22px;
  }
}
</style>
