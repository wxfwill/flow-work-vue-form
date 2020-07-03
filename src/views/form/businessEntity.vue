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
      ></el-tree>
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
          <el-form-item label="描述" prop="desc">
            <el-input v-model="formInline.desc" placeholder="描述" clearable></el-input>
          </el-form-item>
          <el-form-item class="mgl20">
            <el-button type="primary">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="btn-list mgb20">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addBusinessEntity">新增</el-button>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addBusinessEntity({external: true})"
          >新增外部表</el-button
        >
      </div>
      <el-card header="任务列表">
        <table-data :tableConfiguration="tableConfig"></table-data>
      </el-card>
      <el-dialog
        class="fullscreenDialog"
        title="业务实体新增"
        :visible.sync="businessEntityVisible"
        :close-on-click-modal="false"
        fullscreen
      >
        <el-form
          ref="businessEntityForm"
          :model="businessEntityForm"
          :rules="businessEntityRules"
          v-model="businessEntityForm"
          label-width="120px"
          style="width: 70%;margin: 0 auto;"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="分类：" prop="type">
                <el-select placeholder="点击选择" v-model="businessEntityForm.type" style="width:100%;">
                  <el-option label="默认分类" value="defaultValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据源：">
                <el-select placeholder="点击选择" v-model="businessEntityForm.dataSource" style="width:100%;">
                  <el-option
                    v-for="(item, index) in dataSourceLists"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :inline="true" v-if="businessEntityForm.external" label="查询：">
                <div style="display: flex; align-items: center">
                  <el-input v-model="externalSearchKey" placeholder="请输入查询" style="margin-right: 5px;"></el-input>
                  <el-button type="primary" size="mini" icon="el-icon-search" @click="externalSearch">查询</el-button>
                </div>
              </el-form-item>
              <el-form-item v-else label="是否已生成表：" prop="hasDatabaseTable">
                <el-select v-model="businessEntityForm.hasDatabaseTable" style="width:100%;" disabled>
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="描述：" prop="desc">
                <el-input placeholder="请输入描述" v-model="businessEntityForm.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="别名：" prop="anotherName">
                <el-input placeholder="请输入别名" v-model="businessEntityForm.anotherName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据库表名" prop="databaseTableName">
                <el-input placeholder="请输入数据库表名" v-model="businessEntityForm.databaseTableName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="0">
              <el-form-item prop="businessTableData"></el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 添加字段 -->
        <addBusinessEntity
          :isEdit="isEdit"
          ref="addBusinessEntity"
          :defaultTableData="businessEntityForm.businessTableData"
          :hasDatabaseTable="businessEntityForm.hasDatabaseTable"
        ></addBusinessEntity>
        <div slot="footer" style="text-align: center">
          <el-button @click="businessEntityVisible = false">取消</el-button>
          <el-button type="primary" @click="businessEntitySure">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableData from "components/table/table";
import addBusinessEntity from "./businessEntityAdd/index";

export default {
  components: {tableData, addBusinessEntity},
  data() {
    let time = this._formatDate(new Date(1589451688712), "yyyy-MM-dd hh:mm:ss");
    return {
      isEdit: false,
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 实体查询表单
      formInline: {
        title: "",
        taskname: ""
      },
      // 实体查询数据
      tableConfig: {
        // 多选
        IsSelection: true,
        // 列表栏
        tableList: [
          {prop: "title", label: "实体名"},
          {prop: "task", label: "表名"},
          {prop: "person", label: "描述"},
          {prop: "type", label: "类型"},
          {prop: "state", label: "分组"},
          {prop: "time", label: "数据源"}
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
            state: "2",
            time: "2020-05-14 18:18:18"
          },
          {
            title: "测试1",
            task: "用户任务2",
            person: "张三",
            type: "普通",
            state: "3",
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
              this.isEdit = true;
              this.businessEntityVisible = true;
              if (sessionStorage.getItem("businessEntityFormData")) {
                this.businessEntityForm = JSON.parse(sessionStorage.getItem("businessEntityFormData"));
              }
            },
            perms: "/sys/role/delete"
          },
          {
            type: "删除",
            color: "danger",
            fun: (data) => {
              console.log("删除", data);
            },
            perms: "/sys/role/delete"
          }
        ],
        IsIndex: false
      },
      // 实体新增弹窗 展示/隐藏
      businessEntityVisible: false,
      // 新增实体表单
      businessEntityForm: {
        type: "", // 分类
        dataSource: 1, // 数据源
        hasDatabaseTable: 0, // 是否已生成表
        desc: "", //描述
        anotherName: "", // 别名
        databaseTableName: "", // 数据库表名
        external: false, // 是否是外部表
        businessTableData: [
          // 数据库字段表
          {
            sn: 0,
            key: "",
            comment: "主键",
            name: "",
            type: "3",
            required: true,
            length: 50,
            primary: true // 主键标识
          }
        ]
      },
      externalSearchKey: "", // 新增外部表查询关键词
      // 新增实体验证
      businessEntityRules: {
        type: [{required: true, message: "请选择分类"}],
        desc: [{required: true, message: "请输入描述"}],
        anotherName: [{required: true, message: "请输入别名"}],
        databaseTableName: [{required: true, message: "请输入数据库表名"}]
      },
      // 数据源列表
      dataSourceLists: [
        {name: "Aschs本地数据库", value: 0},
        {name: "本地数据源", value: 1}
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 查询重置
    reset() {
      this.$refs.formInline.resetFields();
    },
    // 业务实体节点点击
    handleNode(data, node, key) {
      console.log(data);
      console.log(node);
      console.log(key);
    },
    // 新增业务实体
    addBusinessEntity({external = false}) {
      this.businessEntityForm.external = external;
      this.isEdit = false;
      this.businessEntityVisible = true;
      this.$nextTick(() => this.$refs.businessEntityForm.resetFields());
      // this.businessEntityForm.businessTableData=[{

      // }];
    },
    // 新增外部表-查询
    externalSearch() {
      console.log(this.externalSearchKey, "新增外部表-查询");
    },
    // 新增业务实体-确定
    businessEntitySure() {
      console.log("新增业务实体");
      this.$refs.businessEntityForm.validate((valid) => {
        if (valid) {
          let errCell = document.getElementById("businessEntityTable").getElementsByClassName("err-popper");
          if (errCell.length == 0) {
            let businessEntityFormData = JSON.parse(JSON.stringify(this.businessEntityForm));
            let businessTableData = this.$refs.addBusinessEntity.$refs.addBusinessTable.tableConfig.tableData;
            businessEntityFormData.businessTableData = businessTableData;
            console.log(businessEntityFormData, "businessEntityForm");
            // 保存本地-修改
            sessionStorage.setItem("businessEntityFormData", JSON.stringify(businessEntityFormData));
            this.businessEntityVisible = false;
            this.$refs.businessEntityForm.resetFields();
          } else {
            this.$message.error("表单数据有误");
          }
        } else {
          this.$message.error("表单数据有误");
        }
      });
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
// 新增业addBusinessEntity务实体
.fullscreenDialog {
  height: 100%;
  ::v-deep .is-fullscreen,
  ::v-deep .el-dialog .el-dialog__body {
    height: 100%;
    max-height: 100%;
  }
}
</style>
