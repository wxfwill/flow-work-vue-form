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
          <el-form-item class="mgl20">
            <el-button type="primary">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="btn-list mgb20">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addObject">新增</el-button>
        <!-- <el-button type="primary" icon="el-icon-bottom">导出</el-button> -->
      </div>
      <el-card header="业务对象列表">
        <table-data :tableConfiguration="tableConfig"></table-data>
      </el-card>
      <el-dialog
        class="fullscreenDialog"
        title="新增业务对象"
        :visible.sync="addObjectVisible"
        width="28%"
        fullscreen
        :append-to-body="true"
        :close-on-click-modal="false"
        @close="addObjectCancel"
      >
        <el-card>
          <el-form
            ref="objectForm"
            :model="objectForm"
            :rules="objectFormRules"
            v-model="objectForm"
            label-width="120px"
            style="width: 70%;margin: 0 auto;"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="分类:" prop="type">
                  <el-select v-model="objectForm.type" placeholder="点击选择">
                    <el-option
                      v-for="(item, index) in objectTypeLists"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="持久化方式:" prop="lastingMode">
                  <el-select v-model="objectForm.lastingMode">
                    <el-option
                      v-for="(item, index) in lastingModeLists"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称:" prop="name">
                  <el-input v-model="objectForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="别名:" prop="aliasName">
                  <el-input v-model="objectForm.aliasName" placeholder="请输入别名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="描述:" prop="desc">
                  <el-input v-model="objectForm.desc" placeholder="请输入描述"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="主业务表:" prop="mainBusinessTable">
                  <span v-if="objectForm.relation.tableComment" style="margin-right: 5px; color: #7a7a83">{{
                    objectForm.relation.tableComment
                  }}</span>
                  <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="selMainBusiness"
                    >选择</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否维护索引:" prop="desc">
                  <div slot="label">
                    <el-popover ref="popover4" placement="right-start" width="200" trigger="hover">
                      <p style="width: 100%; max-height: 300px;overflow:auto">
                        当启动该功能时，每次保存业务对象时会自动去维护表外键在数据库的索引关系
                      </p>
                      <span slot="reference">
                        是否维护索引
                        <i class="el-icon-warning" style="color: red"></i>:
                      </span>
                    </el-popover>
                  </div>
                  <el-button
                    :type="objectForm.defendIndex ? 'success' : 'info'"
                    size="mini"
                    @click="changeDefendIndex"
                    >{{ objectForm.defendIndex ? "是" : "否" }}</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="relation"></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <!-- 子业务实体 -->
        <subBusiness
          ref="subBusiness"
          :tableKey="objectForm.relation.tableKey"
          :subBusinessEntities="objectForm.relation.children"
        ></subBusiness>
        <div slot="footer" style="text-align: center">
          <el-button @click="addObjectCancel">取消</el-button>
          <el-button type="primary" @click="addObjectSure">保存</el-button>
        </div>
      </el-dialog>
      <!-- 选择主业务表 -->
      <el-dialog
        class="animateDialog"
        title="业务表列表"
        :visible.sync="mainBusinessVisible"
        width="60%"
        :close-on-click-modal="false"
        :append-to-body="true"
      >
        <mainBusinessForm ref="mainBusinessForm" :curBusinessKey="objectForm.relation.tableKey"></mainBusinessForm>
        <div slot="footer">
          <el-button type="primary" size="mini" @click="addMainBusinessSure">确定</el-button>
          <el-button type="default" size="mini" @click="addMainBusinessCancel">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
var validateMainBusiness = function(rule, value, callback) {
  console.log(value, "valid mainBusinessTable");
  if (!value) {
    callback(new Error("请选择主业务表"));
  } else {
    callback();
  }
};
import tableData from "components/table/table";
import businessObjectAdd from "./businessEntityAdd/index";
import mainBusinessForm from "./businessObjectAdd/mainBusinessForm";
import subBusiness from "./businessObjectAdd/subBusiness";
export default {
  components: {
    tableData,
    businessObjectAdd,
    mainBusinessForm,
    subBusiness
  },
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 新增对象弹窗
      addObjectVisible: false,
      // 主业务列表弹窗
      mainBusinessVisible: false,
      businessName: "",
      // 分类列表
      objectTypeLists: [{name: "业务默认对象分类", value: "defaltvalue"}],
      // 持久化方式列表
      lastingModeLists: [
        {name: "ServiceBean", value: "ServiceBean"},
        {name: "数据库", value: "database"},
        {name: "feign接口", value: "feign"},
        {name: "远程http", value: "http"}
      ],
      // 新增对象表单
      objectForm: {
        type: "", //分类
        lastingMode: "", //持久化方式
        name: "", // 名称
        aliasName: "", //别名
        desc: "", //描述
        defendIndex: true, // 是否维护索引
        relation: {
          // 关联的子业务实体
          children: [],
          tableComment: "",
          tableKey: "", // 主业务表
          type: "main",
          upperFirstTableKey: ""
        },
        relationJson: ""
      },
      objectFormRules: {
        type: [{required: true, message: "请选择分类"}],
        lastingMode: [{required: true, message: "请选择持久化方式"}],
        name: [{required: true, message: "请输入名称"}],
        aliasName: [{required: true, message: "请输入别名"}],
        mainBusinessTable: [{required: true, validator: validateMainBusiness}]
      },
      // 业务对象查询
      formInline: {
        title: "",
        taskname: ""
      },
      // 业务对象数据
      tableConfig: {
        // 多选
        IsSelection: true,
        // 列表栏
        tableList: [
          {prop: "tableKey", label: "别名"},
          {prop: "tableComment", label: "名字"},
          {prop: "desc", label: "描述"}
        ],
        // 列表数据
        tableData: [
          {
            tableKey: "tableKey1",
            tableComment: "业务对象1",
            desc: "业务对象1"
          },
          {
            tableKey: "tableKey2",
            tableComment: "业务对象2",
            desc: "业务对象2"
          },
          {
            tableKey: "tableKey3",
            tableComment: "业务对象3",
            desc: "业务对象3"
          }
        ],
        operationWidth: 200,
        // 操作
        operationList: [
          {
            type: "数据结构",
            color: "primary",
            fun: (data) => {
              console.log(data);
            },
            perms: "/sys/role/delete"
          },
          {
            type: "编辑",
            color: "success",
            fun: (data) => {
              console.log(data);
              this.addObjectVisible = true;
              if (sessionStorage.getItem("subBusinessData")) {
                this.$nextTick((_) => {
                  this.objectForm = JSON.parse(sessionStorage.getItem("subBusinessData"));
                });
              }
            },
            perms: "/sys/role/delete"
          },
          {
            type: "删除",
            color: "danger",
            fun: (data) => {
              console.log(data);
              this.tableConfig.tableData = this.tableConfig.tableData.filter((item) => item.tableKey != data.tableKey);
            },
            perms: "/sys/role/delete"
          }
        ],
        IsIndex: false
      }
    };
  },
  watch: {},
  methods: {
    reset() {
      this.$refs.formInline.resetFields();
    },
    // 重置新增对象表单
    resetObjectForm() {
      this.$refs.objectForm.resetFields();
      this.objectForm.relation = {
        children: [],
        tableComment: "",
        tableKey: "",
        type: "main",
        upperFirstTableKey: ""
      };
    },
    // 新增对象
    addObject() {
      this.addObjectVisible = true;
    },
    // 新增对象-取消
    addObjectCancel() {
      this.addObjectVisible = false;
      this.resetObjectForm();
    },
    // 新增对象-确定
    addObjectSure() {
      // this.addObjectVisible = false;
      this.$refs.objectForm.validate((valid) => {
        if (!valid) {
          this.$message.error("表单数据有误");
          return;
        } else if (this.$refs.subBusiness.$el.getElementsByClassName("err-popper").length > 0) {
          this.$message.error("表单数据有误");
          return;
        }
        let subBusinessData = this.$refs.subBusiness.tableData;
        this.objectForm.relation.children = subBusinessData;
        let objectForm = JSON.parse(JSON.stringify(this.objectForm));
        objectForm.relationJson = JSON.stringify(objectForm.relation);
        this.resetObjectForm();
        this.addObjectVisible = false;
        console.log("subBusinessData", JSON.stringify(objectForm));
        // 本地存储用于测试编辑
        sessionStorage.setItem("subBusinessData", JSON.stringify(objectForm));
      });
    },
    // 选择主业务表
    selMainBusiness() {
      this.mainBusinessVisible = true;
    },
    // 选择主业务表-确定
    addMainBusinessSure() {
      this.mainBusinessVisible = false;
      let businessKey = this.$refs.mainBusinessForm.businessKey,
        businessName = this.$refs.mainBusinessForm.businessName;
      if (businessKey && businessKey != this.objectForm.relation.tableKey) {
        this.objectForm.relation.tableComment = businessName;
        this.objectForm.relation.tableKey = businessKey;
        this.objectForm.relation.upperFirstTableKey = businessKey;
        this.$refs.objectForm.validateField("mainBusinessTable");
        this.objectForm.relation.children = [];
      }
    },
    // 选择主业务表-取消
    addMainBusinessCancel() {
      this.mainBusinessVisible = false;
    },
    // 是否维护索引
    changeDefendIndex() {
      this.objectForm.defendIndex = !this.objectForm.defendIndex;
    },
    // 左侧导航点击
    handleNode(data, node, key) {
      console.log(data);
      console.log(node);
      console.log(key);
    }
  },
  created() {
    console.log("created", this.objectForm);
  },
  mounted() {
    console.log("mounted", this.objectForm);
  },
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
.fullscreenDialog {
  ::v-deep .is-fullscreen .el-dialog__body {
    height: 100%;
    max-height: 100%;
  }
}
</style>
<style lang="scss">
@keyframes mymove {
  from {
    top: -100px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}

.animateFadeIn {
  animation: mymove 0.3s forwards;
}
</style>
