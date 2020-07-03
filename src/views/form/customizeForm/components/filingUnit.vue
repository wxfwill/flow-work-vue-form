<!-- @format -->

<template>
  <div class="filingUnit">
    <el-popover placement="bottom" title width="400" trigger="click" v-model="visible">
      <div>
        <el-input placeholder="关键字如兴义、州局等词汇" v-model="filterText"></el-input>
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="unitData"
          :props="defaultProps"
          node-key="id"
          :filter-node-method="filterNode"
          :render-after-expand="true"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          lazy
          :load="loadNode"
          highlight-current
          @node-click="handleXmxz"
        ></el-tree>
      </div>
      <el-select
        v-model="test"
        :placeholder="(checkUnit && checkUnit.label) || '请选择立案单位'"
        slot="reference"
        :popper-append-to-body="false"
      >
        <div slot="empty" style="display: none; visibility: hidden; border: none;"></div>
        <!-- <el-option label="111" value="111" key="111"></el-option> -->
      </el-select>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      test: "",
      checkUnit: null, //所选机关
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf"
      },
      unitData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    requestData(data, id) {
      return new Promise((resolve, reject) => {
        let childrenData = data.children;
        if (childrenData) {
          resolve(childrenData);
        } else {
          resolve([]);
        }
      });
    },
    async loadNode(node, resolve) {
      console.log(node);
      if (node.level === 0) {
        return resolve(this.unitData);
      }
      let parentData = node.data;
      let children = await this.requestData(parentData, parentData.id);
      console.log(children);
      setTimeout(() => {
        resolve(children);
        this.$refs.tree.setChecked(4, true, false);
      }, 500);
    },
    // 节点点击
    handleXmxz(obj, node, data) {
      console.log(obj, node, data);
      this.visible = false;
      this.checkUnit = obj;
      this.$emit("update", obj);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    data: {
      handler(val, oldVal) {
        this.checkUnit = val || {};
        this.$nextTick((_) => {
          this.$refs.tree.setCurrentKey(this.checkUnit.id);
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.filingUnit {
  ::v-deep .el-select-dropdown {
    display: none;
    visibility: hidden;
  }
  ::v-deep .el-tree-node {
    &.is-checked {
      background: #fafafa;
    }
  }
}
</style>
<style scoped>
.filter-tree ::v-deep .el-tree-node__expand-icon.is-leaf {
  color: transparent !important;
}
</style>
