<template>
  <div class="base-nav">
    <div class="nav-item" v-for="(item, index) in navInfo" :key="index" @click="navClick(item.path, index)" :class="{ active: currentIndex === index }">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    navClick(path, index) {
      if (this.$route.path != path) {
        this.currentIndex = index;
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.base-nav {
  display: flex;
  line-height: 40px;
  .nav-item {
    margin: 0 15px;
    &:hover {
      cursor: pointer;
    }
    &.active {
      font-size: 18px;
      font-weight: bold;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 4px;
        background-color: var(--bg-color);
        border-radius: 2px;
      }
    }
  }
}
</style>
