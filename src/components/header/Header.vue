<template>
  <div class="base-header">
    <div class="header-left">
      <div class="logo"></div>
    </div>
    <div class="header-right">
      <div class="arrow-container">
        <div class="arrow-item arrow-left">
          <div class="arrow"></div>
        </div>
        <div class="arrow-item arrow-right">
          <div class="arrow"></div>
        </div>
      </div>
      <div class="search"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.base-header {
  width: 100%;
  height: 40px;
  padding: 10px 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 40px;
  display: flex;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      background: url('~@/assets/wangyi.png') 0 -20px no-repeat;
      width: 160px;
      height: 34px;
    }
  }
  .header-right {
    .arrow-container {
      height: 40px;
      display: flex;
      align-content: center;
      .arrow-item {
        margin: auto 10px;
        border-radius: 50%;
        background: var(--bg-color);
        box-sizing: border-box;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        padding-right: 5px;
        &:hover {
          cursor: pointer;
        }
      }
      .arrow-left {
        padding-left: 5px;
        .arrow {
          transform: rotateZ(-135deg);
        }
      }
    }
  }
}
</style>
