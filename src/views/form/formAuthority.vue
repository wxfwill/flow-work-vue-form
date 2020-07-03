<!-- @format -->

<template>
  <div class="process-wrap">
    <div class="process-wrap-left">
      <p class="type">分类</p>
      <el-tree
        :data="data"
        default-expand-all
        node-key="id"
        @node-click="handleNode"
        ref="tree"
        icon-class="el-icon-folder-opened"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
    </div>
    <div class="process-wrap-right pd20 scrollbar">
      <el-card header="查询条件">
        <el-form :inline="true" :model="formInline" ref="formInline" label-width="80px">
          <el-form-item label="别名" prop="title">
            <el-input v-model="formInline.title" placeholder="别名" claarable></el-input>
          </el-form-item>
          <el-form-item label="表名" prop="taskname">
            <el-input v-model="formInline.taskname" placeholder="表名" clearable></el-input>
          </el-form-item>
          <el-form-item class="mgl20">
            <el-button type="primary">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="btn-list mgb20">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addProcess">新增</el-button>
        <!-- <el-button type="primary" icon="el-icon-bottom">导出</el-button> -->
      </div>
      <el-card header="表单权限">
        <table-data :tableConfiguration="tableConfig"></table-data>
      </el-card>
      <el-dialog title="创建流程定义" :visible.sync="processVisible" width="28%" :close-on-click-modal="false">
        <el-form :model="processForm" v-model="processForm" label-width="80px" style="width: 70%;margin: 0 auto;">
          <el-form-item label="流程分类">
            <el-select placeholder="选择分类" v-model="processForm.type" style="width:100%;">
              <el-option label="办公" value="bg"></el-option>
              <el-option label="业务流程" value="yw"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程名字">
            <el-input placeholder="请输入流程名字" v-model="processForm.name"></el-input>
          </el-form-item>
          <el-form-item label="流程KEY">
            <el-input placeholder="请输入流程KEY" v-model="processForm.key"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="描述" v-model="processForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="processVisible = false">取消</el-button>
          <el-button type="primary" @click="processSure">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="设计流程图" :visible.sync="processDesign" :fullscreen="true" class="process-design">
        <bpmn></bpmn>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableData from "components/table/table";
import bpmn from "components/bpmn/bpmn";
export default {
  components: {tableData, bpmn},
  data() {
    let time = this._formatDate(new Date(1589451688712), "yyyy-MM-dd hh:mm:ss");
    return {
      data: [
        {
          id: 2,
          label: "所有数据",
          children: [
            {
              id: 5,
              label: "办公",
              children: [
                {
                  id: 5 - 1,
                  label: "公司"
                },
                {
                  id: 5 - 2,
                  label: "家里"
                }
              ]
            },
            {
              id: 6,
              label: "业务流程"
            }
          ]
        }
      ],
      processVisible: false,
      processDesign: false,
      processForm: {
        name: "",
        type: "",
        key: "",
        desc: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      formInline: {
        title: "",
        taskname: ""
      },
      tableConfig: {
        // 多选
        IsSelection: true,
        // 列表栏
        tableList: [
          {prop: "title", label: "别名"},
          {prop: "task", label: "名字"},
          {prop: "person", label: "描述"}
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
            color: "success",
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
        IsIndex: false
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    reset() {
      this.$refs.formInline.resetFields();
    },
    // 开始创建流程
    processSure() {
      this.processVisible = false;
      this.$router.push("/bpmn-design");
      //  this.processDesign = true;
    },
    addProcess() {
      this.processVisible = true;
    },
    handleNode(data, node, key) {
      console.log(data);
      console.log(node);
      console.log(key);
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
.process-wrap {
  height: 100%;
  display: flex;
  .process-wrap-left {
    width: 180px;
    border-right: 1px solid #dddddd;
    .type {
      background: linear-gradient(to bottom, #f5f5f5 0, #e6e5e5 100%);
      font-size: 12px;
      color: #0e2d5f;
      padding: 6px 8px;
    }
  }
  .process-wrap-right {
    flex: 1;
    height: calc(100vh - 126px);
    overflow: auto;
    box-sizing: border-box;
  }
}
.process-design {
  ::v-deep .is-fullscreen .el-dialog__body {
    padding: 0;
    height: calc(100vh - 54px);
  }
}
</style>
