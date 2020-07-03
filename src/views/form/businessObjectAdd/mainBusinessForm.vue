<!-- @format -->

<template>
  <div>
    <el-form ref="mainForm" :model="mainForm" :inline="true">
      <el-form-item label="描述	" prop="desc">
        <el-input v-model="mainForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="别名	" prop="aliasName">
        <el-input v-model="mainForm.aliasName"></el-input>
      </el-form-item>
      <el-form-item label="表名	" prop="tableName">
        <el-input v-model="mainForm.tableName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableConfig.tableData" ref="table" border row-key="id" style="width: 100%" @row-click="rowClick">
      <el-table-column>
        <template slot-scope="scope">
          <el-radio
            v-model="businessKey"
            :label="scope.row.aliasName"
            @change="
              (val) => {
                changeBusiness(val, scope.row);
              }
            "
            >{{ "" }}</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="aliasName" label="别名"></el-table-column>
      <el-table-column prop="tableName" label="表名"></el-table-column>
    </el-table>
    <div class="clearfix mgt20">
      <div class="fl total-cont" v-show="tableConfig.pageData.total > 0">共{{ tableConfig.pageData.total }}条记录</div>
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
  </div>
</template>
<script>
export default {
  props: {
    curBusinessKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      mainForm: {
        desc: "",
        aliasName: "",
        tableName: ""
      },
      tableConfig: {
        tableData: [
          {
            tableName: "主业务表-1",
            aliasName: "mainBusiness-1",
            desc: "desc-1"
          },
          {
            tableName: "主业务表-2",
            aliasName: "mainBusiness-2",
            desc: "desc-2"
          }
        ],
        pageData: {
          pageNum: 1,
          total: 20,
          pageSize: 10
        }
      },

      businessKey: null,
      businessName: ""
    };
  },
  methods: {
    // 查询
    query() {
      console.log(this.mainForm);
    },
    // 重置
    resetForm() {
      console.log(111111111);
      this.$refs.mainForm.resetFields();
    },
    renderRow(row) {},
    rowClick(row) {
      console.log(row);
      this.businessKey = row.aliasName;
      this.businessName = row.tableName;
    },
    changeBusiness(val, row) {
      this.businessKey = val;
      this.businessName = row.tableName;
    }
  },
  watch: {
    curBusinessKey: {
      handler(val) {
        this.businessKey = val;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped></style>
