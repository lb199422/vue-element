<template>
  <div class="song-list">
    <SongItem v-for="(item, index) in songList" :key="index" :song-info="item"></SongItem>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem";
export default {
  components: {
    SongItem,
  },
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.song-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
