<template>
  <div class="test-container">
    <!-- <div class="content-container">
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
    </div> -->
    <div>时间选择器 <YearRange v-model="time" />{{ time }}</div>
    <div><HalfYearRange v-model="halfYear" /></div>
    <div><QuarterRange v-model="quarterRange" /> {{ quarterRange }}</div>
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
    <el-button type="primary" @click="handleTest">测试</el-button>
    <div>selectTree</div>
    <CommonDrawer ref="common-drawer" />
    <RenderTest v-model="test" />
    {{ test }}

    <Jsx :title-level="1">测试jsx</Jsx> 测试
    <CommonDescription :description-list="descriptionList" />
    <h3>测试common-select {{ selectValue }}</h3>
    <div>
      <CommonSelect
        v-model="selectValue"
        :multiple="true"
        :options="options"
        :isShowCheckBox="true"
      />
    </div>
  </div>
</template>

<script>
import YearRange from '@/components/YearRange.vue';
import SelectTree from '@/components/TreeSelect.vue';
import HalfYearRange from '@/components/HalfYearRange.vue';
import QuarterRange from '@/components/QuarterRange.vue';
import CommonDrawer from '@/components/CommonDrawer.vue';
import RenderTest from '@/components/RenderTest.vue';
import Jsx from '@/components/Jsx.vue';
import CommonDescription from '@/components/CommonDescription.vue';
import CommonSelect from '@/components/CommonSelect.vue';
export default {
  components: {
    YearRange,
    SelectTree,
    HalfYearRange,
    QuarterRange,
    CommonDrawer,
    RenderTest,
    Jsx,
    CommonDescription,
    CommonSelect,
  },
  data() {
    return {
      time: [],
      halfYear: [],
      quarterRange: [],
      tree: '',
      treeData: [
        {
          label:
            '1hishishigehigheihgiehigeijgiejijishogehioghjiohgiehgioehiogheiohgie',
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
      test: '',
      descriptionList: [
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '连笑',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 2,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
        {
          label: '姓名',
          value: '1',
          valueText: '战鹰',
          type: 'text',
          isShow: 1,
        },
      ],
      selectValue: [],
      options: [
        {
          label: '测试1',
          value: 1,
        },
        {
          label: '测试2',
          value: 2,
        },
        {
          label: '测试3',
          value: 3,
        },
      ],
    };
  },
  created() {},
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
    handleTest() {
      this.$refs['common-drawer'].show();
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
.test-container {
  padding: 20px;
}
</style>
