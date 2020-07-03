<!-- @format -->

<template>
  <div class="customize-form-preview">
    <el-card>
      <el-form :inline="false" :model="customizeForm" :rules="formItemsRules" ref="customizeForm" label-width="125px">
        <!-- 0-隐藏 1-单行文本 2-多行文本 3-下拉框 4-复选框 5-单选按钮 6-数据字典 7-流水号 8-城市选择 9-在线签名 10-附件上传 11-日期 12-扫码（移动端）13-立案单位 -->
        <template v-for="(item, index) in customizeFormItems">
          <div class="module-div" v-if="item.children && item.children.length" :key="index">
            <span class="module-name">{{ item.name }}</span>
            <template v-for="(childItem, childIndex) in item.children">
              <el-form-item
                :label="childItem.label"
                :prop="childItem.attributeName"
                :key="childIndex"
                v-if="childItem.relateTo.includes(customizeForm[childRelateTo])"
              >
                <template v-if="childItem.type == '0'"></template>
                <template v-else-if="childItem.type == '1'">
                  <el-input
                    v-model="customizeForm[childItem.attributeName]"
                    :placeholder="`请输入${childItem.label}`"
                    clearable
                  ></el-input>
                </template>
                <template v-else-if="childItem.type == '2'">
                  <el-input
                    type="textarea"
                    :autosize="{minRows: 2, maxRows: 5}"
                    v-model="customizeForm[childItem.attributeName]"
                    :placeholder="`请输入${childItem.label}`"
                    clearable
                  ></el-input>
                </template>
                <template v-else-if="childItem.type == '3'">
                  <el-select v-model="customizeForm[childItem.attributeName]" :placeholder="`请选择${childItem.label}`">
                    <el-option
                      v-for="selItem in childItem.options"
                      :key="selItem.value"
                      :label="selItem.label"
                      :value="selItem.value"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else-if="childItem.type == '4' && customizeForm[childItem.attributeName]">
                  <el-checkbox-group v-model="customizeForm[childItem.attributeName]">
                    <el-checkbox
                      v-for="checkItem in childItem.options"
                      :key="checkItem.value"
                      :label="checkItem.label"
                      >{{ checkItem.label }}</el-checkbox
                    >
                  </el-checkbox-group>
                </template>
                <template v-else-if="childItem.type == '5'">
                  <el-radio-group v-model="customizeForm[childItem.attributeName]">
                    <el-radio v-for="radioItem in childItem.options" :key="radioItem.value" :label="radioItem.value">{{
                      radioItem.label
                    }}</el-radio>
                  </el-radio-group>
                </template>
                <template v-else-if="childItem.type == '6'"></template>
                <template v-else-if="childItem.type == '7'"></template>
                <template v-else-if="childItem.type == '8'">
                  <!-- <el-cascader
                    expand-trigger="hover"
                    :options="childItem.options"
                    :props="{ checkStrictly: childItem.checkStrictly }"
                    v-model="customizeForm[childItem.attributeName]"
                    @change="handleChange"
                  ></el-cascader>-->
                  <cascaderArea
                    :data="customizeForm[childItem.attributeName]"
                    @update="
                      (areas) => {
                        updateAreas(childItem.attributeName, areas);
                      }
                    "
                  ></cascaderArea>
                </template>
                <template v-else-if="childItem.type == '9'"></template>
                <template v-else-if="childItem.type == '10'">
                  <files-upload
                    :IsPrompt="false"
                    :IsFiles="true"
                    :IsDisabled="false"
                    :filePath="customizeForm[childItem.attributeName]"
                    :limit="childItem.limit"
                    @getFilePath="
                      (path) => {
                        getFilePath(childItem.attributeName, path);
                      }
                    "
                  ></files-upload>
                </template>
                <template v-else-if="childItem.type == '11'">
                  <el-date-picker
                    v-model="customizeForm[childItem.attributeName]"
                    :type="childItem.dateType"
                    :value-format="childItem.format"
                    :placeholder="`选择${childItem.label}`"
                  ></el-date-picker>
                </template>
                <template v-else-if="childItem.type == '13'">
                  <filingUnit
                    :data="customizeForm[childItem.attributeName]"
                    @update="
                      (unit) => {
                        updateUnit(childItem.attributeName, unit);
                      }
                    "
                  ></filingUnit>
                </template>
              </el-form-item>
            </template>
          </div>
          <el-form-item v-else :label="item.label" :prop="item.attributeName" :key="index">
            <template v-if="item.type == '0'"></template>
            <template v-else-if="item.type == '1'">
              <el-input
                v-model="customizeForm[item.attributeName]"
                :placeholder="`请输入${item.label}`"
                clearable
              ></el-input>
            </template>
            <template v-else-if="item.type == '2'">
              <el-input
                type="textarea"
                :autosize="{minRows: 2, maxRows: 5}"
                v-model="customizeForm[item.attributeName]"
                :placeholder="`请输入${item.label}`"
                clearable
              ></el-input>
            </template>
            <template v-else-if="item.type == '3'">
              <el-select v-model="customizeForm[item.attributeName]" :placeholder="`请选择${item.label}`">
                <el-option
                  v-for="selItem in item.options"
                  :key="selItem.value"
                  :label="selItem.label"
                  :value="selItem.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="item.type == '4' && customizeForm[item.attributeName]">
              <el-checkbox-group v-model="customizeForm[item.attributeName]">
                <el-checkbox v-for="checkItem in item.options" :key="checkItem.value" :label="checkItem.label">{{
                  checkItem.label
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
            <template v-else-if="item.type == '5'">
              <el-radio-group v-model="customizeForm[item.attributeName]">
                <el-radio v-for="radioItem in item.options" :key="radioItem.value" :label="radioItem.value">{{
                  radioItem.label
                }}</el-radio>
              </el-radio-group>
            </template>
            <template v-else-if="item.type == '6'"></template>
            <template v-else-if="item.type == '7'"></template>
            <template v-else-if="item.type == '8'">
              <cascaderArea
                :data="customizeForm[childItem.attributeName]"
                @update="
                  (areas) => {
                    updateAreas(childItem.attributeName, areas);
                  }
                "
              ></cascaderArea>
            </template>
            <template v-else-if="item.type == '9'"></template>
            <template v-else-if="item.type == '10'">
              <files-upload
                :IsPrompt="false"
                :IsFiles="true"
                :IsDisabled="true"
                :filePath="customizeForm[item.attributeName]"
                :limit="1"
                @getFilePath="
                  (path) => {
                    getFilePath(item.attributeName, path);
                  }
                "
              ></files-upload>
            </template>
            <template v-else-if="item.type == '11'">
              <el-date-picker
                v-model="customizeForm[item.attributeName]"
                :type="item.dateType"
                :value-format="item.format"
                :placeholder="`选择${item.label}`"
              ></el-date-picker>
            </template>
            <template v-else-if="item.type == '13'">
              <filingUnit
                :data="customizeForm[item.attributeName]"
                @update="
                  (unit) => {
                    updateUnit(item.attributeName, unit);
                  }
                "
              ></filingUnit>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import filingUnit from "./filingUnit";
import cascaderArea from "./cascaderArea";
import filesUpload from "components/filesUpload/index";
export default {
  name: "formItemRender",
  components: {filesUpload, cascaderArea, filingUnit},
  props: {
    formItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    childRelateTo: {
      // 侦察条件展示控制
      type: String,
      default: ""
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      customizeForm: {},
      formItemsRules: {},
      isInit: false, // 表单项，验证规则 初始化
      zctj: null, // 侦查条件表单项
      fixedItemAttr: [], // 固定表单项属性集合
      isEdit: false, // 是否是编辑
      // 复选框
      checkboxOptions: ["选项1", "选项2"],
      checkboxChecked: [],
      // 下拉框模拟
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      // 文件上传
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      // 失去焦点验证 的 表单项
      blurTypes: [1, 2],
      // 不需要触发条件
      notTriggerTypes: [8]
    };
  },
  computed: {
    customizeFormItems() {
      return this.formItems;
    },
    customizeForm22() {
      let data = {};
    }
  },
  methods: {
    // 级联选择
    handleChange(value) {
      console.log(value);
    },
    // 重置表单侦查条件包含的值
    resetZctj(requirementsTurn) {
      let newCustomizeForm = {};
      this.fixedItemAttr.forEach((item) => {
        newCustomizeForm[item] = this.customizeForm[item];
      });
      this.zctj &&
        this.zctj.forEach((item) => {
          if (item.relateTo.includes(requirementsTurn)) {
            if (this.customizeForm[item.attributeName]) {
              newCustomizeForm[item.attributeName] = this.customizeForm[item.attributeName];
            } else {
              newCustomizeForm[item.attributeName] =
                item.type === "4"
                  ? typeof item.defaultValue === "array"
                    ? item.defaultValue
                    : item.defaultValue.indexOf("[") > -1
                    ? JSON.parse(item.defaultValue)
                    : item.defaultValue.trim().length
                    ? [item.defaultValue]
                    : []
                  : item.defaultValue;
            }
          }
        });
      this.customizeForm = newCustomizeForm;
    },
    // 计算表单属性及验证规则
    calcFormItems(formItems, isChildren) {
      // isChildren= true  根据relateTo 判断是否为展示
      let customizeFormItems = formItems || this.customizeFormItems;
      customizeFormItems.forEach((item, index) => {
        // console.log(typeof item.defaultValue);
        if (item.children && item.children.length > 0) {
          this.zctj = item.children;
          this.calcFormItems(item.children, true);
        } else {
          let ruleItem = [
            {
              required: item.isRequired,
              message: `请输入${item.label}`,
              trigger: this.notTriggerTypes.includes(Number(item.type))
                ? null
                : this.blurTypes.includes(Number(item.type))
                ? "blur"
                : "change",
              validator: item.validate
                ? (rule, value, callback) => {
                    item.validate(this.isSubmit, rule, value, callback);
                  }
                : null
            }
          ];
          for (let key in ruleItem[0]) {
            if (!ruleItem[0][key]) {
              delete ruleItem[0][key];
            }
          }
          // 将侦查条件属性 保存
          if (!isChildren) {
            this.fixedItemAttr.push(item.attributeName);
          }
          this.formItemsRules[item.attributeName] = ruleItem;
          // if (this.customizeForm[item.attributeName]) {
          this.$set(
            this.customizeForm,
            item.attributeName,
            item.type === "4"
              ? typeof item.defaultValue === "array"
                ? item.defaultValue
                : item.defaultValue.indexOf("[") > -1
                ? JSON.parse(item.defaultValue)
                : item.defaultValue.trim().length
                ? [item.defaultValue]
                : []
              : item.defaultValue
          );
          // }
        }
      });
      console.log("this.formItemsRules", this.formItemsRules);
      this.isInit = true;
    },
    // upload 更新上传文件路径
    getFilePath(attributeName, path) {
      console.log("updateFilePath", path);
      this.customizeForm[attributeName] = path;
      this.$refs.customizeForm.validateField(attributeName);
    },
    // 区域添加
    updateAreas(attributeName, area) {
      console.log("updateArea:", attributeName, area);
      this.customizeForm[attributeName] = area;
      this.$refs.customizeForm.validateField(attributeName);
    },
    // 立案机关选择
    updateUnit(attributeName, unit) {
      console.log("updateUnit:", attributeName, unit);
      this.customizeForm[attributeName] = unit;
      this.$refs.customizeForm.validateField(attributeName);
    },
    // 取消添加 或 编辑
    resetForm() {
      console.log("resetFields", this.customizeForm);
      this.$refs.customizeForm.resetFields();
      this.calcFormItems(null, false);
    },
    // 表单包含开始结束日期 则需判断
    judgeDate(formData) {
      if (formData["startTime"] && formData["endTime"]) {
        let startTime = new Date(formData["startTime"]).getTime(),
          endTime = new Date(formData["endTime"]).getTime();
        return startTime <= endTime;
      }
      return true;
    },
    // 提交
    submit() {
      this.isSubmit = true;
      this.$refs.customizeForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.isSubmit = false;
          if (!this.judgeDate(this.customizeForm)) {
            this.$message.warning("开始日期不能大于结束日期！");
            return;
          }
          let formData = Object.assign({}, this.customizeForm);
          // console.log("formData:", formData);
          this.$emit("submit", JSON.stringify(formData));
          this.resetForm();
        } else {
          console.log("error submit!!");
          this.isSubmit = false;
          return false;
        }
      });
    }
  },
  watch: {
    formItems: {
      handler(newval, oldval) {
        if (newval && newval != oldval) {
          this.calcFormItems(newval, false);
          console.log("calcFormItems", this.customizeForm);
          // console.log(this.customizeForm, this.formItemsRules);
          this.$forceUpdate();
        }
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(val) {
        if (val && JSON.stringify(val) !== "{}") {
          this.customizeForm = JSON.parse(JSON.stringify(val));
          this.isEdit = true;
        } else {
          this.fixedItemAttr = [];
          this.calcFormItems(this.formItems, false);
        }
      },
      immediate: true,
      deep: true
    },
    "customizeForm.requirements": {
      handler(val) {
        console.log(val, 33333333333333333333);
        if (this.isInit) {
          this.resetZctj(val);
        }
      }
    }
  }
};
</script>
>
<style lang="scss" scoped>
.customize-form-preview {
  ::v-deep .el-form-item {
    .el-input__inner,
    .el-textarea__inner {
      border-color: #dcdfe6;
    }
    .el-input__inner:focus,
    .el-textarea__inner:focus {
      border-color: #409eff;
    }
  }
  ::v-deep .el-form-item.is-error {
    .el-input__inner,
    .el-input__inner:focus,
    .el-textarea__inner,
    .el-textarea__inner:focus {
      border-color: #f56c6c;
    }
  }
  ::v-deep .el-input__inner:hover,
  .el-textarea__inner:hover {
    border-color: #c0c4cc;
  }
  .module-div {
    border: 1px dashed #ddd;
    position: relative;
    padding: 20px 20px 20px 0;
    margin-top: 30px;
    .module-name {
      font-weight: bold;
      position: absolute;
      padding: 3px;
      background: #fff;
      top: -18px;
      left: 20px;
    }
  }
}
</style>
