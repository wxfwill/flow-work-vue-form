<!-- @format -->

<template>
  <el-card class="customize-form-container">
    <!-- 编辑 -->
    <!-- <formItemEdit></formItemEdit> -->
    <!-- 预览 -->
    <!-- <formItemPreview ref="customizeForm" :formItems.sync="customizeFormItems"></formItemPreview> -->
    <!-- 黔西南平台表单自定义 -->
    <el-form :inline="false" :model="qxnForm" :rules="qxnFormRules" ref="qxnForm" label-width="125px">
      <el-row>
        <el-col :span="12">
          <!-- 主题 -->
          <el-form-item label="主题:" prop="theme">
            <el-input v-model="qxnForm.theme" placeholder="请输入主题" :disabled="urlData.detail" clearable></el-input>
          </el-form-item>
          <!-- 协办方单位 -->
          <el-form-item label="协办方单位:" prop="organizerUnit">
            <el-select v-model="qxnForm.organizerUnit" placeholder="请选择协办方单位" :disabled="urlData.detail">
              <el-option
                v-for="selItem in options"
                :key="selItem.value"
                :label="selItem.label"
                :value="selItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 事由 -->
          <el-form-item label="事由:" prop="subjectMatter">
            <el-input type="textarea" v-model="qxnForm.subjectMatter" :disabled="urlData.detail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 警种 -->
          <el-form-item label="警种:" prop="policeCategory">
            <el-radio-group v-model="qxnForm.policeCategory" @change="policeCategoryChange" :disabled="urlData.detail">
              <el-radio v-for="radioItem in policeCategoryLists" :key="radioItem.value" :label="radioItem.value">{{
                radioItem.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 反馈天数 -->
          <el-form-item label="反馈天数:" prop="feedbackDays">
            <el-radio-group v-model="qxnForm.feedbackDays" :disabled="urlData.detail">
              <el-radio v-for="radioItem in feedbackDaysLists" :key="radioItem.value" :label="radioItem.value">{{
                radioItem.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 反馈方式 -->
          <el-form-item label="反馈方式:" prop="feedbackMethod">
            <el-select v-model="qxnForm.feedbackMethod" placeholder="请选择反馈方式" :disabled="urlData.detail">
              <el-option
                v-for="selItem in feedbackMethodLists"
                :key="selItem.value"
                :label="selItem.label"
                :value="selItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 简要案情 -->
        <el-col :span="24">
          <el-form-item label="简要案情:" prop="briefCase">
            <el-input
              type="textarea"
              :autosize="{minRows: 6, maxRows: 8}"
              v-model="qxnForm.briefCase"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="需求及数据类型:" prop="requirementsType">
          <template></template>
          <newForm
            :policeCategory="qxnForm.policeCategory"
            :tableConfig="newAddTableConfig"
            :addFormItems="addFormItems"
            :disabled="urlData.detail"
            @updateRequirementsData="updateRequirementsData"
          ></newForm>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 不同警种对应表单展示 -->
    <policeCategoryForm
      ref="policeCategoryForm"
      :policeCategory="qxnForm.policeCategory"
      :data="qxnForm"
      :disabled="urlData.detail"
    ></policeCategoryForm>

    <!-- <div style="text-align:center;">
      <el-button type="default">取消</el-button>
      <el-button type="primary">提交</el-button>
    </div>-->
  </el-card>
</template>
<script>
let vm;
// 监听iframe父页面事件
onmessage = function(e) {
  e = e || event;
  console.log(e);
  switch (e.data) {
    case "submit":
      vm && vm.submit();
      break;
  }
};
import {jzForm, szForm, qbForm, waForm, xzForm} from "mock/newForm.js";
import newForm from "./components/newForm/index";
import formItemEdit from "./components/formItemEdit";
import formItemPreview from "./components/formItemPreview";
import policeCategoryForm from "./components/policeCatograyForm";
export default {
  components: {formItemEdit, formItemPreview, newForm, policeCategoryForm},
  data() {
    var validateRequireMentsType = (rule, value, callback) => {
      if (!value || !value.length) {
        callback(new Error("请添加需求及数据类型"));
      } else {
        callback();
      }
    };
    vm = this;
    return {
      // urlData
      urlData: {},
      title: "自定义表单",
      options: [
        //协办方单位列表
        {label: "选项1", value: 1},
        {label: "选项2", value: 2}
      ],
      policeCategoryLists: [
        // 警种列表
        {
          label: "技侦",
          value: 0
        },
        {
          label: "视侦",
          value: 1
        },
        {
          label: "情报",
          value: 2
        },
        {
          label: "网安",
          value: 3
        },
        {
          label: "刑技",
          value: 4
        }
      ],
      feedbackDaysLists: [
        // 反馈天数
        {
          label: "1天",
          value: 0
        },
        {
          label: "3天",
          value: 1
        },
        {
          label: "5天",
          value: 2
        }
      ],
      feedbackMethodLists: [
        // 反馈方式
        {
          label: "系统",
          value: 0
        },
        {
          label: "其他",
          value: 1
        }
      ],
      qxnForm: {
        type: "child",
        theme: "", //主题
        organizerUnit: "", //协办方单位
        subjectMatter: "", //事由
        //简要案情
        briefCase:
          "2019年04月11日12时许，张未（男，身份证号码：52232119790429371X，户籍地址：贵州省兴义市老城街22号，现住地址：贵州省兴义市老城街22号，联系电话：18185922000）在兴义市老城街22号“市公安局”门口，发现自己中国银行发送来的信用卡还款信息，后到中国银行查询信用卡余额后，发现信用卡内的10001元现金被人盗刷。",
        policeCategory: 0, //警种
        feedbackDays: 0, //反馈天数
        feedbackMethod: 0, //反馈方式
        requirementsType: null // 需求及数据类型
      },
      qxnFormRules: {
        requirementsType: [{required: true, validator: validateRequireMentsType}],
        theme: [{required: true, message: "请输入主题", trigger: "blur"}],
        organizerUnit: [{required: true, message: "请选择协办方单位", trigger: "change"}],
        policeCategory: [{required: true, message: "请选择警种", trigger: "blur"}],
        feedbackDays: [{required: true, message: "请选择反馈天数", trigger: "blur"}],
        feedbackMethod: [{required: true, message: "请选择反馈方式", trigger: "blur"}]
      },
      tableColumnItems: [
        {
          label: "需求类型",
          prop: "requirements",
          relateTo: [0, 1, 2, 4]
        },
        {
          label: "人员类型",
          prop: "personnelType",
          relateTo: [0, 1, 2, 4]
        },
        {
          label: "侦查条件",
          prop: "investConditions",
          relateTo: [0, 1, 2, 4],
          render: (attributeName, data, zctj) => {
            return this.renderInvestConditions(attributeName, data, zctj);
          }
        },
        {
          label: "姓名",
          prop: "username",
          relateTo: [3]
        },
        {
          label: "证件种类与号码",
          prop: "username",
          relateTo: [3]
        },
        {
          label: "目标或特定信息",
          prop: "targetOrSpecialInfo",
          relateTo: [3]
        },
        {
          label: "备注",
          prop: "remarks",
          relateTo: [3]
        }
      ]
    };
  },
  created() {
    // 解析获取url参数
    // this.urlData = this.getUrlData();
    this.urlData = {
      detail: false
    };
    console.log(window.parent.location.href, this.urlData, 2222222222222222);
    // 编辑
    let qxnForm = sessionStorage.getItem("qxnForm");
    if (qxnForm) {
      this.qxnForm = JSON.parse(qxnForm);
    }
  },
  methods: {
    // 地址解析
    getUrlData() {
      let urlData = {};
      let url = window.parent.location.href;
      // url = "faefaef?baseId=%7B%22a%22:21,%22b%22:%22121%22%7D";
      if (url.indexOf("?") != -1) {
        let urlDataStr = decodeURI(url.split("?")[1]); // 解码
        let keyValueArr = urlDataStr.split("&");
        keyValueArr.forEach((item) => {
          console.log(item);
          let keyValueItemArr = item.split("=");
          let key = keyValueItemArr[0],
            value = keyValueItemArr[1];
          urlData[key] = JSON.parse(value);
        });
      }
      return urlData;
    },
    // 警种切换
    policeCategoryChange(val) {
      // this.qxnForm.requirementsType = [];
    },
    // newForm 组件更新数据
    updateRequirementsData(data) {
      this.qxnForm.requirementsType = data;
      this.valiDateRequirementsType();
    },
    // 验证需求及数据类型
    valiDateRequirementsType() {
      this.$nextTick(() => {
        this.$refs["qxnForm"].validateField("requirementsType");
      });
    },
    // 表单提交
    submit() {
      this.$refs["qxnForm"].validate((valid) => {
        if (valid) {
          // alert("submit!");
          let data = Object.assign({}, this.qxnForm, this.$refs.policeCategoryForm.policeCatograyForm);
          // 存储本地用于编辑
          sessionStorage.setItem("qxnForm", JSON.stringify(data));
          this.$router.go(0);
          window.parent.postMessage(data, "http://172.20.5.198:8080");
        } else {
          console.log("error submit!!");
          this.$message.error("表单数据错误");
          window.parent.postMessage("error", "http://172.20.5.198:8080");
          return false;
        }
      });
    },
    // 判断是否为有效值
    judgeValue(val) {
      if (!val) {
        return false;
      } else if (val instanceof Object) {
        if (val instanceof Array) {
          return val.length && val[0];
        } else {
          return JSON.stringify(val) !== "{}";
        }
      }
      return true;
    },
    // 判断是否是有效图片
    checkImgExists(imgurl) {
      var ImgObj = new Image(); //判断图片是否存在
      ImgObj.src = imgurl;
      //没有图片，则返回-1
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
      } else {
        return false;
      }
    },
    // 侦查条件渲染
    renderInvestConditions(attributeName, data, zctj) {
      console.log("渲染侦查条件", data);
      if (attributeName == "investConditions") {
        // console.log("table-render", data);
        let content = "";
        for (let key in data) {
          // console.log("key:", key, ",value:", data[key]);
          zctj.forEach((item) => {
            if (item.attributeName == key && this.judgeValue(data[key])) {
              let domStr = `<span style="color: #999">${item.label}：</span>`;
              // console.log(item.type);
              if (item.type == "8") {
                // 区域回显
                domStr += `<span style="color: #333">`;
                data[key].forEach((item) => {
                  domStr += item.areaName;
                });
                domStr += `</span>`;
              } else if (item.type == "10") {
                //文件上传回显
                let fileLists = data[key].split(",");
                fileLists.forEach((item) => {
                  domStr += `${
                    this.checkImgExists(item)
                      ? "<img src=" + item + " />"
                      : "<span style='color:#333'>" + item + "</span>"
                  }`;
                });
              } else if (item.type == "13") {
                // 立案单位回显
                domStr += `<span style="color: #333">${data[key].label}</span>`;
              } else {
                // string 展示
                domStr += `<span style="color: #333">${data[key]}</span>`;
              }
              // console.log(domStr);
              content += `<p>${domStr}</p>`;
            }
          });
        }
        // console.log(content);
        return content;
      }
      return "-";
    }
  },
  computed: {
    newAddTableConfig() {
      // qxnForm.policeCategory
      let type = this.qxnForm.policeCategory;
      let tableList = this.tableColumnItems.filter((item) => item.relateTo.includes(type));
      let tableConfig = {
        // 多选
        IsSelection: false,
        // 列表栏
        tableList: tableList,
        // 列表数据
        tableData: this.qxnForm.requirementsType || [],
        operationWidth: 150,
        IsIndex: false
      };
      return tableConfig;
    },
    // 新增表单项
    // eslint-disable-next-line vue/return-in-computed-property
    addFormItems() {
      switch (this.qxnForm.policeCategory) {
        case 0:
          return jzForm;
          break;
        case 1:
          return szForm;
          break;
        case 2:
          return qbForm;
          break;
        case 3:
          return waForm;
          break;
        case 4:
          return xzForm;
          break;
      }
    }
  }
};
</script>
>
<style lang="scss" scoped>
.customize-form-container {
  box-sizing: border-box;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  min-width: 500px;
  .customize-form-preview {
    width: 800px;
  }
  ::v-deep ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #999;
    font-family: "Microsoft YaHei";
  }
}
</style>
