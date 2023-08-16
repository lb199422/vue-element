<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  value: {
    type: [String, Number],
    default: '',
  },
  computed: {
    newValue: {
      get({ value }) {
        return value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  render(h) {
    h = this.$createElement;
    const { onInputHandle, $attrs } = this;

    return h('el-input', {
      props: {
        type: 'text',
        value: this.newValue,
        ...this.$attrs,
      },
      on: {
        input: onInputHandle,
      },
    });
  },
  methods: {
    onInputHandle(val) {
      this.newValue = val;
    },
  },
};
</script>



<style lang="scss" scoped>
</style>