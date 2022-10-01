<template>
  <div class="special">
    <div>专项实例组件</div>
    <el-steps :active="2" v-if="false">
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
    <div>
      <SpecialList :special-list="specialList"></SpecialList>
      <InstanceList :instance-list="instanceList"></InstanceList>
    </div>
  </div>
</template>

<script>
import SpecialList from "@/components/SpecialList";
import InstanceList from "@/components/InstanceList";
export default {
  components: {
    SpecialList,
    InstanceList,
  },
  data() {
    return {
      specialList: [
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
        {
          topicName: "专项1",
          state: 1,
          batchList: [
            {
              batchCode: "2022-09-03",
            },
          ],
        },
      ],
      instanceList: [
        { id: 1, channelName: "实例1", state: "数据准备" },
        { id: 2, channelName: "实例1", state: "数据准备" },
        { id: 3, channelName: "实例1", state: "数据准备" },
        { id: 4, channelName: "实例1", state: "数据准备" },
        { id: 5, channelName: "实例1", state: "数据准备" },
        { id: 6, channelName: "实例1", state: "数据准备" },
        { id: 7, channelName: "实例1", state: "数据准备" },
        { id: 8, channelName: "实例1", state: "数据准备" },
        { id: 9, channelName: "实例1", state: "数据准备" },
        { id: 10, channelName: "实例1", state: "数据准备" },
      ],
    };
  },
};
</script>

<style scoped></style>
