<!-- @format -->

<template>
  <div class="customize-form-edit">
    <div class="mgt10 mgb10">
      <el-button type="primary" @click="addFormItem">添加字段</el-button>
    </div>
    <table-data :tableConfiguration="tableConfig"></table-data>
    <div>
      <el-button @click="previewForm">预览</el-button>
    </div>
    <!-- 预览 -->
    <custom-dialog title="自定义表单预览" ref="preview-dialog">
      <template v-slot:content>
        <formItemPreview :formItems.sync="customizeFormItems"></formItemPreview>
      </template>
    </custom-dialog>
  </div>
</template>
<script>
import customDialog from "components/dialog/dialog";
import tableData from "./table";
import formItemPreview from "./formItemPreview";
export default {
  components: {tableData, customDialog, formItemPreview},
  data() {
    return {
      customizeFormItems: null,
      exampleFormItem: {
        id: 0,
        label: "",
        attributeName: "", //属性名
        note: "", //注释
        dataType: "", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
        type: "", //控件类型 0-隐藏 1-单行文本 2-多行文本 3-下拉框 4-复选框 5-单选按钮 6-数据字典 7-流水号 8-城市选择 9-在线签名 10-附件上传 11-日期 12-扫码（移动端）
        dataId: "", //数据库字段
        isRequired: false, //是否必填
        isCheck: null, //字段校验
        attributeLength: 50, //属性长度
        defaultValue: 1, //默认值
        placeholder: "请输入控件placeholder信息", //输入型控件占位符
        options: [
          // 下拉框 单选框 复选框  选项设置
          {label: "选项1", value: 1},
          {label: "选项2", value: 2}
        ]
      },
      // 列表数据
      tableConfig: {
        // 多选
        IsSelection: true,
        // 列表栏
        tableList: [
          {prop: "label", label: "表单项名称"},
          {prop: "note", label: "注释"},
          {prop: "attributeName", label: "属性名"},
          {prop: "dataId", label: "数据库字段"},
          {prop: "isRequired", label: "是否必填"},
          {prop: "dataType", label: "数据类型"},
          {prop: "attributeLength", label: "属性长度"},
          {prop: "defaultValue", label: "默认值"},
          {prop: "type", label: "控件类型"},
          {prop: "isCheck", label: "字段校验"}
        ],
        // 列表数据
        tableData: [
          {
            id: 0,
            label: "单选框",
            attributeName: "radio", //属性名
            note: "单选框", //注释
            dataType: "3", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
            type: "5", //控件类型
            dataId: "radio", //数据库字段
            isRequired: false, //是否必填
            isCheck: null, //字段校验
            attributeLength: 50, //属性长度
            defaultValue: 1, //默认值
            options: [
              // 下拉框 单选框 复选框  选项设置
              {label: "选项1", value: 1},
              {label: "选项2", value: 2}
            ]
          },

          {
            id: 1,
            label: "复选框",
            attributeName: "checkbox", //属性名
            note: "复选框", //注释
            dataType: "3", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
            type: "4", //控件类型
            dataId: "checkbox", //数据库字段
            isRequired: false, //是否必填
            isCheck: null, //字段校验
            attributeLength: 50, //属性长度
            defaultValue: "", //默认值
            options: [
              // 下拉框 单选框 复选框  选项设置
              {label: "选项1", value: 1},
              {label: "选项2", value: 2}
            ]
          },
          {
            id: 2,
            label: "单行文本",
            attributeName: "singleDrug", //属性名
            note: "单行文本", //注释
            dataType: "3", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
            type: "1", //控件类型
            dataId: "singleDrug", //数据库字段
            isRequired: false, //是否必填
            isCheck: null, //字段校验
            attributeLength: 50, //属性长度
            defaultValue: 1, //默认值
            options: [
              // 下拉框 单选框 复选框  选项设置
              {label: "选项1", value: 1},
              {label: "选项2", value: 2}
            ]
          },
          {
            id: 3,
            label: "多行文本",
            attributeName: "multiDrug", //属性名
            note: "多行文本", //注释
            dataType: "3", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
            type: "2", //控件类型
            dataId: "multiDrug", //数据库字段
            isRequired: false, //是否必填
            isCheck: null, //字段校验
            attributeLength: 50, //属性长度
            defaultValue: 1, //默认值
            options: [
              // 下拉框 单选框 复选框  选项设置
              {label: "选项1", value: 1},
              {label: "选项2", value: 2}
            ]
          },
          {
            id: 4,
            label: "日期",
            attributeName: "datetime", //属性名
            note: "日期", //注释
            dataType: "1", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
            type: "11", //控件类型
            dataId: "datetime", //数据库字段
            isRequired: false, //是否必填
            isCheck: null, //字段校验
            attributeLength: 50, //属性长度
            defaultValue: 1, //默认值
            options: [
              // 下拉框 单选框 复选框  选项设置
              {label: "选项1", value: 1},
              {label: "选项2", value: 2}
            ]
          },
          {
            id: 5,
            label: "附件上传",
            attributeName: "fileList", //属性名
            note: "附件上传", //注释
            dataType: "3", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
            type: "10", //控件类型
            dataId: "fileList", //数据库字段
            isRequired: false, //是否必填
            isCheck: null, //字段校验
            attributeLength: 50, //属性长度
            defaultValue: 1, //默认值
            options: [
              // 下拉框 单选框 复选框  选项设置
              {label: "选项1", value: 1},
              {label: "选项2", value: 2}
            ]
          }
        ],
        operationWidth: 280,
        // 操作
        operationList: [
          {
            type: "上移",
            icon: "el-icon-caret-top",
            color: "default",
            fun: (data, index) => {
              console.log("上移", data, index);
              this.moveUp(data, index);
            }
            // perms: "/sys/role/delete"
          },
          {
            type: "下移",
            icon: "el-icon-caret-bottom",
            color: "default",
            fun: (data, index) => {
              console.log("下移", data, index);
              this.moveDown(data, index);
            }
          },
          {
            type: "删除",
            icon: "el-icon-delete",
            color: "danger",
            fun: (data, index) => {
              console.log("删除", data, index);
              this.deleteFormItem(index);
            }
          }
        ],
        IsIndex: false
      }
    };
  },
  methods: {
    // 添加表单项
    addFormItem() {
      //   alert("填加字段");
      let exampleFormItem = JSON.parse(JSON.stringify(this.exampleFormItem));
      let len = this.tableConfig.tableData.length;
      let id = len ? this.tableConfig.tableData[len - 1].id : -1;
      exampleFormItem.title = `测试${id + 1}`;
      exampleFormItem.id = id + 1;
      this.tableConfig.tableData.push(exampleFormItem);
    },
    // 删除表单项
    deleteFormItem(index) {
      this.tableConfig.tableData.splice(index, 1);
      //   this.tableConfig.tableData = this.tableConfig.tableData.filter(
      //     fomrItem => fomrItem.id != item.id
      //   );
    },
    // 上移
    moveUp(data, index) {
      if (index === 0) {
        return;
      }
      let prevItem = this.tableConfig.tableData.splice(index - 1, 1)[0];
      console.log(this.tableConfig.tableData, prevItem);
      this.tableConfig.tableData.splice(index, 0, prevItem);
    },
    // 下移
    moveDown(data, index) {
      if (index >= this.tableConfig.tableData.length - 1) {
        return;
      }
      let nextItem = this.tableConfig.tableData.splice(index + 1, 1)[0];
      this.tableConfig.tableData.splice(index, 0, nextItem);
    },
    // 预览
    previewForm() {
      this.customizeFormItems = this.tableConfig.tableData;
      console.log(this.tableConfig.tableData);
      this.$refs["preview-dialog"].show();
    }
  }
};
</script>
<style lang="scss" scoped></style>
