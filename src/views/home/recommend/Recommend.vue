<template>
  <div class="page-recommend">
    <Swiper :swiper-info-list="swiperInfo"></Swiper>
    <!-- 热门推荐 -->
    <TabTitle title="热门推荐"></TabTitle>
    <SongList :song-list="recommendSongList"></SongList>
  </div>
</template>

<script>
import Swiper from "@/components/Swiper";
import SongList from "@/components/SongList";
import TabTitle from "@/components/TabTitle";

import { getSwiperInfo, getPersonRecommendList } from "@/services/homeService.js";
export default {
  components: {
    Swiper,
    SongList,
    TabTitle,
  },
  data() {
    return {
      swiperInfo: [],
      recommendSongList: [],
    };
  },
  methods: {
    getSwiperData() {
      getSwiperInfo()
        .then((res) => {
          this.swiperInfo = res.banners;
        })
        .catch((error) => {});
    },
    getRecommendData() {
      getPersonRecommendList()
        .then((res) => {
          console.log(res);
          this.recommendSongList = res.result;
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error,
          });
        });
    },
  },
  created() {
    this.getSwiperData();
    this.getRecommendData();
  },
};
</script>

<style scoped lang="scss">
.page-recommend {
  width: 100%;
}
</style>
