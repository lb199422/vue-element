<template>
  <div>
    <span>this is testss </span>
    <el-button type="default">this is test</el-button>
    <el-button type="success">this is test</el-button>
    <i class="el-icon-edit"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>

    <div class="content-container">
      <div class="container" ref="container">
        <div
          v-for="(item, index) in 100"
          class="item"
          :ref="'item-' + index"
          :key="index"
        >
          {{ index }}
        </div>
      </div>
      <div>
        <div
          class="icon"
          @click="handleClick(index)"
          v-for="(icon, index) in 100"
          :key="index"
        >
          {{ index }}
        </div>
      </div>
    </div>
    <div>时间选择器 <YearRange v-model="time" /></div>

    <div>selectTree</div>

    <SelectTree
      v-model="tree"
      :tree-data="treeData"
      :tree-props="treeProps"
      tree-node-key="id"
      select-value-key="id"
      :filterable="true"
      :multiple="true"
      :collapse-tags="true"
      :tree-check-strictly="true"
    />
    <div>selectTree</div>
    <div>selectTree</div>
    <div>selectTree</div>
    <div>selectTree</div>
    <div>selectTree</div>
    <div>selectTree</div>
    <div>selectTree</div>
  </div>
</template>

<script>
import request from '@/utils/request';
import YearRange from '@/components/YearRange';
import SelectTree from '@/components/SelectTree.vue';
export default {
  components: {
    YearRange,
    SelectTree,
  },
  data() {
    return {
      time: '',
      tree: '',
      treeData: [
        {
          label: '1',
          id: 1,
          children: [
            {
              label: '1-1',
              id: 11,
            },
            {
              label: '1-2',
              id: 12,
            },
          ],
        },
        {
          label: '2',
          id: 2,
          children: [
            {
              label: '2-1',
              id: 21,
            },
            {
              label: '2-2',
              id: 22,
            },
          ],
        },
      ],
      treeProps: {
        label: 'label',
        children: 'children',
      },
    };
  },
  created() {
    // request({
    //   url: "/get_user",
    //   method: "get",
    // })
    //   .then((res) => {
    //     console.log(res, "test");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
  methods: {
    handleClick(index) {
      console.log(index, this.$refs[`item-${index}`][0].offsetTop);
      let height = this.$refs[`item-${index}`][0].offsetTop;
      this.$refs['container'].scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style>
.content-container {
  display: flex;
}
.container {
  height: 400px;
  width: 400px;
  margin: 0 auto;
  overflow: auto;
  background-color: #fff;
  position: relative;
}
.item {
  height: 100px;
  box-sizing: border-box;
  background-color: lightblue;
  border: 1px solid red;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>
