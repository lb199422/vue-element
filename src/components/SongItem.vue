<template>
  <div class="song-item" @click="handleClick(songInfo.id)">
    <div class="container">
      <div class="img-wrap">
        <img :src="songInfo.picUrl" alt="" class="thumb" />
        <div class="play-count">
          <i class="el-icon-caret-right"></i>
          {{ songInfo.playCount | playCount }}
        </div>
        <div class="paly-button el-icon-video-play"></div>
      </div>
      <div class="title">{{ songInfo.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    playCount(val) {
      return parseInt(val / 10000) + '万';
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

<style lang="scss">
.song-item {
  margin: 10px 0;
  flex-basis: 20%;
  &:hover {
    cursor: pointer;
    .paly-button {
      display: block;
    }
  }
  .container {
    margin: 0 auto;
    width: 220px;
  }
  .img-wrap {
    height: 220px;
    position: relative;
    .play-count {
      color: white;
      position: absolute;
      top: 10px;
      right: 10px;
      i {
        color: white;
      }
    }
    .thumb {
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 8px;
    }
  }
  .title {
    line-height: 40px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .paly-button {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
    font-size: 40px;
    color: var(--bg-color);
  }
}
</style>
