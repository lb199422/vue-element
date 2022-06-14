<template>
  <div class="base-slot">
    <header>
      <slot name="header" :label="slotData.label" :age="slotData.age"> </slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BaseSlot",
  props: {
    slotData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
