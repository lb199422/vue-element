<template>
  <div class="page-home">
    <BaseNav :nav-info="navInfo"></BaseNav>
    <div class="home-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BaseNav from "@/components/BaseNav.vue";
import { getSwiperInfo } from "@/services/homeService.js";
export default {
  components: {
    BaseNav,
  },
  data() {
    return {
      navInfo: [
        { title: "个性推荐", path: "/home/recommend" },
        { title: "歌单", path: "/home/musiclist" },
        { title: "排行榜", path: "/home/ranklist" },
        { title: "歌手", path: "/home/singerlist" },
        { title: "最新音乐", path: "/home/newmusic" },
      ],
    };
  },
  created() {
    this.getSwiperData();
  },
  methods: {
    getSwiperData() {
      getSwiperInfo()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: error,
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.page-home {
  padding: 20px;
  .home-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
