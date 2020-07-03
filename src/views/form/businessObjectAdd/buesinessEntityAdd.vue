<!-- @format -->

<template>
  <div>
    <el-form ref="businessForm" :inline="true" :model="businessForm" class="demo-form-inline">
      <el-form-item label="描述" prop="desc">
        <el-input v-model="businessForm.name" placeholder></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="key">
        <el-input v-model="businessForm.key" placeholder></el-input>
      </el-form-item>
      <el-form-item label="表名" prop="tableKey">
        <el-input v-model="businessForm.tableKey" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <!-- 表格数据 -->
      <el-col :span="18">
        <el-table
          :data="tableConfig.tableData"
          ref="table"
          border
          :row-key="renderRow"
          style="width: 100%"
          @row-click="rowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="desc" label="描述" sortable></el-table-column>
          <el-table-column prop="key" label="别名" sortable></el-table-column>
          <el-table-column prop="tableKey" label="表名" sortable></el-table-column>
        </el-table>
        <div class="clearfix mgt20">
          <div class="fl total-cont" v-show="tableConfig.pageData.total > 0">
            共{{ tableConfig.pageData.total }}条记录
          </div>
          <div class="fr">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="tableConfig.pageData.pageNum"
              :hide-on-single-page="false"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="tableConfig.pageData.pageSize"
              layout="sizes, prev, pager, next, jumper"
              :total="tableConfig.pageData.total"
            ></el-pagination>
          </div>
        </div>
      </el-col>
      <!-- 已勾选数据 -->
      <el-col :span="6">
        <el-table :data="checkedLists" ref="tableChecked" border :row-key="renderRow">
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column :render-header="renderCheckedtableHeader">
            <template slot-scope="scope">
              <i class="primary el-icon-delete" @click="deleteRow(scope.row, scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableConfig: {
        // 业务列表数据
        tableData: [
          {
            desc: "业务-1",
            key: "yewu-1",
            tableKey: "yewu-1"
          },
          {
            desc: "业务-2",
            key: "yewu-2",
            tableKey: "yewu-2"
          }
        ],
        pageData: {
          pageNum: 1,
          total: 20,
          pageSize: 10
        }
      },
      businessForm: {
        // 业务列表查询表单
        desc: "",
        key: "",
        tableKey: ""
      },
      // 已选业务
      checkedLists: []
    };
  },
  methods: {
    // 流水号-查询-提交
    query() {
      console.log("提交", this.businessForm);
    },
    // 流水号-查询-重置
    resetForm() {
      this.$refs.businessForm.resetFields();
    },
    renderRow(row) {
      return row.tableKey;
    },
    rowClick(row) {
      console.log(row);
      this.$refs.table.toggleRowSelection(row);
    },
    // 复选框勾选/取消
    handleSelectionChange(val) {
      this.checkedLists = val;
      console.log(this.checkedLists);
    },
    // 分页
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    // 已选业务
    renderCheckedtableHeader() {
      return (
        <div style="display: flex; align-items: center">
          <span style="margin-right: 5px">操作</span>
          <i
            type="primary"
            size="mini"
            class="primary el-icon-delete"
            onClick={() => {
              this.deleteAll();
            }}></i>
        </div>
      );
    },
    // 删除已选
    deleteRow(row, index) {
      console.log(row);
      if (row) {
        this.$refs.table.toggleRowSelection(row);
      }
    },
    deleteAll(row, index) {
      this.$refs.table.clearSelection();
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .primary.el-icon-delete {
  color: #409eff;
  cursor: pointer;
  font-size: 16px;
}
</style>
