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
  render() {
    // return h('h' + this.titleLevel, this.$slots.default);
    return <div>{this.$slots.default}</div>; // jsx 写法
  },
};
</script>

<style lang="scss" scoped></style>
