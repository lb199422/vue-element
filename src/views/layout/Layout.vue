<template>
  <div class="layout">
    <!-- 头部 -->
    <Header></Header>
    <div class="container">
      <div class="aside">
        <AsideList :list-info="listInfo"></AsideList>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/header/Header.vue";
import AsideList from "@/components/AsideList.vue";

export default {
  components: {
    Footer,
    Header,
    AsideList,
  },
  data() {
    return {
      listInfo: [
        { title: "发现音乐", path: "/home" },
        { title: "视频", path: "/video" },
        { title: "私人FMM", path: "/home" },
        { title: "我的音乐", path: "/home" },
        { title: "每日推荐", path: "/home" },
        { title: "最近播放", path: "/home" },
        { title: "我的收藏", path: "/home" },
        { title: "创建的歌单", path: "/home" },
        { title: "收藏的歌单", path: "/home" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: relative;
  .container {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 80px;
    display: flex;

    .aside {
      width: 200px;
    }
    .main {
      flex: 1;
    }
  }
}
</style>
