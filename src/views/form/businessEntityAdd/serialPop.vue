<!-- @format -->

<template>
  <div>
    <el-form ref="serialForm" :inline="true" :model="serialForm" class="demo-form-inline">
      <el-form-item label="名称" prop="name">
        <el-input v-model="serialForm.name" placeholder></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="aliasName">
        <el-input v-model="serialForm.aliasName" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" ref="table" border row-key="id" style="width: 100%" @row-click="rowClick">
      <el-table-column>
        <template slot-scope="scope">
          <el-radio
            v-model="selSerialKey"
            :label="scope.row.aliasName"
            @change="
              (val) => {
                changeSerial(val, scope.row);
              }
            "
            >{{ "" }}</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="aliasName" label="别名"></el-table-column>
      <el-table-column prop="rule" label="规则"></el-table-column>
      <el-table-column prop="step" label="步长"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    curSelSerialKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableData: [
        {
          name: "流水-1",
          aliasName: "liushui-1",
          rule: "rule-1",
          step: 1
        },
        {
          name: "流水-2",
          aliasName: "liushui-2",
          rule: "rule-2",
          step: 2
        }
      ],
      serialForm: {
        // 流水号查询表单
        name: "",
        aliasName: ""
      },
      selSerialKey: null,
      selSerialName: ""
    };
  },
  methods: {
    // 流水号-查询-提交
    query() {
      console.log("提交", this.serialForm);
    },
    // 流水号-查询-重置
    resetForm() {
      this.$refs.serialForm.resetFields();
    },
    rowClick(row) {
      console.log(row);
      this.selSerialKey = row.aliasName;
      this.selSerialName = row.name;
    },
    changeSerial(val, row) {
      this.selSerialKey = val;
      this.selSerialName = row.name;
    }
  },
  watch: {
    curSelSerialKey: {
      handler(val) {
        this.selSerialKey = val;
        this.selSerialName = "";
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
