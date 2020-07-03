<!-- @format -->

<template>
  <div class="formItemEditTable">
    <el-table
      id="tableId"
      :data="tableConfig.tableData"
      ref="table"
      :border="tableConfig.isborder"
      row-key="id"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 新增按钮 -->
      <div slot="append" style="text-align:center; background: #fafafa; line-height: 50px">
        <el-button type="text" icon="el-icon-plus" size="middle" @click="addTableTr" :disabled="disabled"
          >新增</el-button
        >
      </div>
      <!-- 空数据展示 -->
      <div slot="empty" class="empty-box">
        <i class="iconfont">&#xe60b;</i>
        <span>暂无数据</span>
      </div>
      <el-table-column
        type="selection"
        :align="tableConfig.align"
        width="55"
        v-if="tableConfig.IsSelection"
      ></el-table-column>
      <el-table-column :align="tableConfig.align" fixed label="序号" width="80" v-if="tableConfig.IsIndex">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :align="tableConfig.align"
        :label="item.label"
        :width="item.width"
        v-for="(item, index) in tableConfig.tableList"
        :key="index"
      >
        <template slot-scope="scope">
          <span v-if="item.render" v-html="item.render(item.prop, scope.row, zctj)"></span>
          <span style="white-space: pre-line;" v-else>
            <pre>{{ customizeRender(item.prop, scope.row) }}</pre>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="tableConfig.btnDescribe"
        :align="tableConfig.align"
        :width="tableConfig.operationWidth"
        v-if="tableConfig.operationList.length > 0 && !tableConfig.operationListBtnStatus"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in tableConfig.operationList"
            :key="index"
            :disabled="item.isabled || disabled"
            :type="item.color"
            :icon="item.icon"
            @click="item.fun(scope.row, scope.$index)"
            size="mini"
            >{{ item.type }}</el-button
          >
        </template>
      </el-table-column>
      <slot name="operationListBtnStatus"></slot>
    </el-table>
    <div class="clearfix mgt20" v-if="tableConfig.isShowPage">
      <div class="fl total-cont" v-show="tableConfig.pageData.total > 0">共{{ tableConfig.pageData.total }}条记录</div>
      <div class="fr">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableConfig.pageData.pageNum"
          :hide-on-single-page="true"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableConfig.pageData.pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="tableConfig.pageData.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    tableConfiguration: {
      //table配置
      type: Object,
      default() {
        return {};
      }
    },
    tableRenderTml: {
      // 生成表单项的数据
      type: Array,
      default: () => {
        return [];
      }
    },
    policeCategory: {
      // 警种
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      newTableRenderTml: [], //所有表单项
      zctj: [], // 侦查条件项
      newTableConfig: {}, // 用于修改computed属性
      oldTableData: {} // 保存旧表格数据
    };
  },
  computed: {
    tableConfig: {
      get: function() {
        return Object.assign(
          {
            // 列表栏位
            tableList: [],
            // 列表数据
            tableData: [],
            // 操作
            operationList: [],
            // 操作栏按钮状态是否根据数据不同展示不同
            operationListBtnStatus: false,
            // 表格内容是否居中
            align: "center",
            // 操作栏位的宽度
            operationWidth: 100,
            // 是否展示分页
            isShowPage: true,
            // 分页信息
            pageData: {
              // 数据总数
              total: 0,
              // 当前页数
              pageNum: 1,
              // 每页显示多少条
              pageSize: 10
            },
            // 是否隐藏序号栏位
            IsIndex: true,
            //是否显示多选
            IsSelection: false,
            // 是否显示边框
            isborder: true,
            // 操作按钮描述
            btnDescribe: "操作"
          },
          this.tableConfiguration
          // this.newTableConfig
        );
      },
      set: function(val) {
        console.log(val);
        // this.tableConfiguration.tableData = val;
        // this.tableConfig = {};
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    //多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 新增
    addTableTr(item) {
      console.log("click", item);
      this.$emit("showAddModal");
    },
    // 自定义渲染表头
    renderHandleHeader(h, {column, $index}) {
      return (
        <div>
          <el-button
            onClick={() => {
              this.addTableTr();
            }}
            type="success"
            size="small">
            新增
          </el-button>
        </div>
      );
    },
    // getZctj
    getZctj(data) {
      data.forEach((item) => {
        if (item.children) {
          this.zctj = item.children;
        }
      });
    },
    // 获取当前属性对应的设置项
    getPropSets(attributeName) {
      let itemSet;
      this.newTableRenderTml.forEach((item) => {
        if (item.attributeName == attributeName) {
          itemSet = item;
        }
      });
      return itemSet;
    },

    // 自定义渲染表格单元内容
    customizeRender(attributeName, data) {
      if (
        attributeName !== "investConditions" &&
        (data[attributeName] === "" || data[attributeName] === null || data[attributeName] === undefined)
      ) {
        return "-";
      }
      let itemSet = this.getPropSets(attributeName),
        label;
      if (["requirements", "personnelType"].includes(attributeName) && itemSet) {
        let options = itemSet.options;
        options.forEach((item) => {
          if (item.value === data[attributeName]) {
            label = item.label;
          }
        });
        return label;
      } else {
        return data[attributeName];
      }
    }
  },
  watch: {
    tableRenderTml: {
      handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          console.log("警种:", this.policeCategory);
          this.newTableRenderTml = newVal;
          this.getZctj(newVal);
        }
      },
      deep: true,
      immediate: true
    },
    policeCategory: {
      handler(val, oldVal) {
        console.log(oldVal);
        let tableConfig = JSON.parse(JSON.stringify(this.tableConfig)),
          tableData = tableConfig.tableData;
        if (tableData && tableData.length > 0) {
          let policeCategory = oldVal === undefined ? this.policeCategory : oldVal;
          this.oldTableData[policeCategory] = tableData;
        }
        let newTableData = this.oldTableData[val] || [];
        // this.tableConfig = newTableData;
        this.$emit("updateRequirementsData", newTableData);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* project id 1740380 */
  src: url("//at.alicdn.com/t/font_1740380_c75xl4x6hgl.eot");
  src: url("//at.alicdn.com/t/font_1740380_c75xl4x6hgl.eot?#iefix") format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1740380_c75xl4x6hgl.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1740380_c75xl4x6hgl.woff") format("woff"),
    url("//at.alicdn.com/t/font_1740380_c75xl4x6hgl.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1740380_c75xl4x6hgl.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.formItemEditTable {
  ::v-deep .el-input--suffix .el-input__inner {
    padding: 0 5px;
  }
  ::v-deep .el-table__header {
    background: #ddd;
  }
  ::v-deep .el-table__empty-block {
    min-height: 120px;
    background: #fff;
  }
  ::v-deep .el-table__header {
    thead tr {
      background: #fafafa;
      th {
        background: #fafafa;
        &:not(:last-child) {
          border-right: none;
        }
      }
    }
  }
}
.empty-box {
  display: flex;
  flex-direction: column;
  line-height: 35px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
  .iconfont {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
