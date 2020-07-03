<!-- @format -->

<template>
  <el-table :data="tableData" ref="optionsTable" border row-key="id" style="width: 100%">
    <el-table-column prop="txt" label="描述">
      <template slot-scope="scope">
        <el-popover
          :append-to-body="false"
          :popper-class="checkComment(scope.row.txt, 'class', false)"
          placement="bottom"
          trigger="hover"
        >
          <span>{{ checkComment(scope.row.txt, "message", false) }}</span>
          <el-input slot="reference" v-model="scope.row.txt"></el-input>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="key" label="值">
      <template slot-scope="scope">
        <el-popover
          :append-to-body="false"
          :popper-class="checkComment(scope.row.key, 'class', false)"
          placement="bottom"
          trigger="hover"
        >
          <span>{{ checkComment(scope.row.key, "message", false) }}</span>
          <el-input slot="reference" v-model="scope.row.key"></el-input>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column align="center" width="50" :render-header="renderHeaderOptions">
      <template slot-scope="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          style="padding: 5px"
          @click="deleteOption(scope.row, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    // 注释输入框校验
    checkComment(value, type, testReg) {
      // testReg - 格式验证
      let check;
      if (testReg) {
        check = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
      } else {
        check = value && value.trim().length > 0;
      }
      switch (type) {
        case "class":
          return check ? "right-popper" : "err-popper";
          break;
        case "message":
          return check ? "" : value ? "只能以字母开头,允许字母、数字和下划线" : "必填";
      }
    },
    // 带选项表单配置项-操作
    renderHeaderOptions() {
      return (
        <el-button
          size="mizi"
          type="primary"
          icon="el-icon-plus"
          style="padding: 4px"
          onClick={this.addOption}></el-button>
      );
    },
    // 带选项表单配置项-添加
    addOption() {
      this.options.push({
        txt: "",
        key: ""
      });
    },
    // 带选项表单配置项-删除
    deleteOption(row, index) {
      this.options.splice(index, 1);
    },
    renderRow(row) {
      // console.log(row)
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.options = val || [];
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
