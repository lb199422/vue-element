<template>
  <div>
    <CommonSelect v-model="selectValue" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import CommonSelect from '@/components/CommonSelect';
export default {
  components: {
    CommonSelect,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Array, Number, String, Boolean],
      required: true,
    },
    request: {
      type: Function,
    },
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
