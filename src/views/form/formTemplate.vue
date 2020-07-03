<!-- @format -->

<template>
  <div class="process-wrap pd20">
    <el-card header="查询条件">
      <el-form :inline="true" :model="formInline" ref="formInline" label-width="100px">
        <el-form-item label="别名" prop="title">
          <el-input v-model="formInline.title" placeholder="别名" claarable></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="taskname">
          <el-input v-model="formInline.taskname" placeholder="名称" clearable></el-input>
        </el-form-item>
        <el-form-item class="mgl20">
          <el-button type="primary">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="btn-list mgb20">
      <el-button type="primary" icon="el-icon-circle-plus">新增</el-button>
      <el-button type="primary">初始化模板</el-button>
      <!-- <el-button type="primary" icon="el-icon-bottom">导出</el-button> -->
    </div>
    <el-card header="">
      <table-data :tableConfiguration="tableConfig"></table-data>
    </el-card>
  </div>
</template>

<script>
import tableData from "components/table/table";
export default {
  components: {tableData},
  data() {
    let time = this._formatDate(new Date(1589451688712), "yyyy-MM-dd hh:mm:ss");
    return {
      formInline: {
        title: "",
        taskname: ""
      },
      tableConfig: {
        // 列表栏
        tableList: [
          {prop: "title", label: "别名"},
          {prop: "task", label: "名称"},
          {prop: "person", label: "表单类型"},
          {prop: "type", label: "模板类型"}
        ],
        // 列表数据
        tableData: [
          {
            title: "测试1",
            task: "用户任务2",
            person: "张三",
            type: "普通",
            state: "1",
            time: time
          },
          {
            title: "测试1",
            task: "用户任务2",
            person: "张三",
            type: "普通",
            state: "1",
            time: "2020-05-14 18:18:18"
          },
          {
            title: "测试1",
            task: "用户任务2",
            person: "张三",
            type: "普通",
            state: "1",
            time: "2020-05-14 18:18:18"
          }
        ],
        operationWidth: 200,
        // 操作
        operationList: [
          {
            type: "编辑",
            color: "primary",
            fun: (data) => {
              console.log(data);
              this.getDelete(data);
            },
            perms: "/sys/role/delete"
          },
          {
            type: "删除",
            color: "danger",
            fun: (data) => {
              console.log(data);
              this.getDelete(data);
            },
            perms: "/sys/role/delete"
          }
        ],
        IsIndex: false,
        IsSelection: true
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    reset() {
      this.$refs.formInline.resetFields();
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
