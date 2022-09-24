<template>
  <div class="special">
    <div>专项实例组件</div>
    <SpecialInstanceContainer></SpecialInstanceContainer>
    <el-steps :active="2">
      <el-step title="步骤 1">
        <template v-slot:icon>
          <i class="el-icon-success" :style="{ fontSize: '16px' }"></i>
        </template>
      </el-step>
      <el-step title="步骤 2">
        <template v-slot:icon>
          <i class="el-icon-error" :style="{ color: 'red' }"></i>
        </template>
      </el-step>

      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
import SpecialInstanceContainer from "@/components/SpecialInstanceContainer.vue";
export default {
  components: { SpecialInstanceContainer },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
