<template>
  <div class="base-swiper" ref="base-swiper">
    <el-carousel :interval="4000" type="card" height="200px" width="1080px">
      <el-carousel-item v-for="(item, index) in swiperInfoList" :key="index">
        <img :src="item.pic" alt="" class="thumb" @click="handleClick(item.bannerId)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    swiperInfoList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped lang="scss">
.base-swiper {
  .el-carousel {
    .el-carousel-item {
      height: 100%;
      width: 100%;
    }
  }
  .thumb {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
