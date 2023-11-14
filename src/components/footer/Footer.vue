<template>
  <div class="base-footer">
    this is footer
    <PlayBar></PlayBar>
  </div>
</template>

<script>
import PlayBar from '@/components/play/PlayBar';
export default {
  components: {
    PlayBar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.base-footer {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-top: 1px solid var(--border-color);
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
