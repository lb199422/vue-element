<template>
  <div class="paly-bar">
    <div class="paly-bar-left">
      <div class="left-container">
        <div class="img-wrap">
          <img :src="songInfo.imgUrl" alt="" />
        </div>
        <div class="song-name">
          {{ songInfo.songName }}
        </div>
        <div class="singer-name">
          {{ songInfo.singerName }}
        </div>
      </div>
    </div>
    <div class="paly-bar-main">
      <audio src="http://m801.music.126.net/20220605094123/19a28965a41de8c9dfa8d9476c131699/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096442961/0219/71c6/d867/eca80101c2239842e0929e3c06e8ca8e.mp3" controls="controls" v-if="false"></audio>
      <ControlBar></ControlBar>
      <div class="process">
        <el-slider v-model="currentProcess"></el-slider>
      </div>
    </div>
    <div class="paly-bar-right">this is right</div>
  </div>
</template>

<script>
import ControlBar from "@/components/play/ControlBar.vue";
export default {
  components: { ControlBar },
  data() {
    return {
      currentProcess: 10,
      songInfo: {
        imgUrl: "",
        songName: "搁浅",
        singerName: "周杰伦",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.paly-bar {
  display: flex;
  background-color: #fff;
  &-left {
    flex: 2;
  }
  &-main {
    flex: 6;
    background-color: #eee;
  }
  &-right {
    flex: 2;
  }
}
// this is wangyi test
</style>
