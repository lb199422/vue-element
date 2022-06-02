<template>
  <div class="aside-list">
    <div class="list-item" v-for="(item, index) in listInfo" :key="index" @click="itemClick(item.path, index)" :class="{ active: currentIndex === index }">
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listInfo: {
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
    itemClick(path, index) {
      console.log(path, this.$route);
      if (this.$route.path != path) {
        this.currentIndex = index;
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.aside-list {
  border-right: 1px solid var(--border-color);
  .list-item {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    &:hover {
      cursor: pointer;
      background-color: #f6f6f7;
    }
    &.active {
      background-color: #f6f6f7;
      span {
        font-size: 15px;
        font-weight: bold;
        color: #313131;
      }
    }
  }
}
</style>
