<template>
  <el-select
    ref="select"
    :value="value"
    @change="updateValue($event)"
    placeholder="请选择"
    :filter-method="filterMethod"
    :multiple="multiple"
    @remove-tag="handleRemoveTag"
    @blur="handleBlur"
    @focus="handleFocus"
    v-bind="$attrs"
    v-on="$listeners"
    :filterable="filterable"
  >
    <template v-if="!multiple">
      <el-option :label="label" :value="value" class="hide" />
    </template>
    <template v-else>
      <el-option label="placeholder" value="placeholder" class="hide" />
      <el-option
        v-for="item in multipleNodeValue"
        :key="item[selectValueKey]"
        :label="item[getPropName('label')]"
        :value="item[selectValueKey]"
        class="hide"
      />
    </template>
    <el-tree
      ref="tree"
      v-bind="treeAttrs"
      :data="treeData"
      :props="treeProps"
      :node-key="treeNodeKey"
      showLine
      :show-label-line="true"
      highlight-current
      :expand-on-click-node="false"
      @current-change="handleCurrentChange"
      :filter-node-method="filterNodeMethod"
      :show-checkbox="multiple"
      @check-change="handleCheckChange"
    />
  </el-select>
</template>

<script>
const defaultProps = {
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  isLeaf: 'isLeaf',
};

export default {
  name: 'YbTreeSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      default: '',
    },
    // 树的数据，同el-tree的data
    treeData: {
      type: Array,
      default: () => [],
    },
    // 同el-tree的props
    treeProps: {
      type: Object,
      default: () => ({}),
    },
    // 同el-tree的node-key
    treeNodeKey: {
      type: String,
      default: 'id',
    },
    // el-select的value在treeData中的键名
    selectValueKey: {
      type: String,
      required: true,
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultProps,
    };
  },
  computed: {
    label() {
      const labelName = this.getPropName('label');
      const valueName = this.selectValueKey;

      let res = this.findTreeNode(this.treeData, (node) => {
        return node[valueName] === this.value;
      });
      return res && res[labelName];
    },
    treeRef() {
      return this.$refs.tree;
    },
    // 数组，元素为：多选模式下的value的元素对应的在treeData里面的节点对象
    multipleNodeValue() {
      if (
        !this.multiple ||
        !Array.isArray(this.value) ||
        this.treeData.length === 0
      ) {
        return [];
      }
      return this.value
        .map((item) => {
          return this.findTreeNode(
            this.treeData,
            (node) => node[this.selectValueKey] === item
          );
        })
        .filter((item) => !!item);
    },
    treeAttrs() {
      const curAttrs = {};
      const keys = Object.keys(this.$attrs);
      keys.forEach((item) => {
        if (item.startsWith('tree-')) {
          const treeAttrKey = item.split('tree-');
          curAttrs[treeAttrKey[1]] = this.$attrs[item];
        }
      });
      return curAttrs;
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.$nextTick(() => {
          if (this.treeData.length === 0) {
            return false;
          }
          if (this.multiple) {
            // 多选模式下同步更新树型组件的选中状态
            this.treeRef.setCheckedKeys(Array.isArray(newVal) ? newVal : []);
            // this.treeRef.setCheckedKeys(newVal);
          } else {
            // 单选模式下同步更新树型组件的选中状态
            this.treeRef.setCurrentKey(newVal);
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getPropName(prop) {
      return this.treeProps[prop] || defaultProps[prop];
    },
    updateValue(val, node) {
      if (!node) {
        this.$nextTick(() => {
          const node = this.treeRef.getCheckedNodes();
          this.$emit('select-change', val, node);
        });
      } else {
        this.$emit('select-change', val, node);
      }
      // el-select的value和选中节点的对象会传递过去
      this.$emit('change', val);
    },
    handleCurrentChange(node) {
      const disabledName = this.getPropName('disabled');
      if (node[disabledName] === true || this.multiple) {
        // 禁止选中
        return;
      }

      this.updateValue(node[this.selectValueKey], node);
      this.$refs.select.blur();
    },
    // 查找树的节点，callback返回true则满足条件
    findTreeNode(tree, callback) {
      const childrenName = this.getPropName('children');
      let res;
      const traverse = (tree) => {
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i];
          if (callback(node)) {
            res = node;
            break;
          }
          if (node[childrenName]) {
            traverse(node[childrenName]);
          }
        }
      };
      traverse(tree);
      return res;
    },
    filterMethod(val) {
      console.log(val);
      this.treeRef.filter(val);
    },
    filterNodeMethod(value, data) {
      const labelName = this.getPropName('label');
      return data[labelName].includes(value);
    },
    handleCheckChange() {
      const checkedNodes = this.treeRef.getCheckedNodes();
      this.updateValue(
        checkedNodes.map((item) => item[this.selectValueKey]),
        checkedNodes
      );
    },
    handleRemoveTag(id) {
      this.treeRef.setChecked(id, false);
    },
    handleBlur() {
      this.filterMethod('');
    },
    handleFocus() {
      this.filterMethod('');
    },
    getSelect() {
      return this.$refs['select'];
    },
    getTree() {
      return this.$refs['tree'];
    },
  },
};
</script>

<style lang="scss">
.hide {
  display: none;
}
</style>
