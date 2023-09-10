<script>
export default {
  data() {
    return {};
  },
  props: {
    titleLevel: {
      type: Number,
      default: null,
    },
  },
  render(h) {
    return h('h' + this.titleLevel, this.$slots.default);
  },
};
</script>



<style lang="scss" scoped>
.test {
  // height: 30px;
}
</style>