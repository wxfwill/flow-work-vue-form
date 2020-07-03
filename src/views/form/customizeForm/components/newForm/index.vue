<!-- @format -->

<template>
  <div class="new-form">
    <tableData
      :disabled="disabled"
      :tableConfiguration="tableConfigCalc"
      @showAddModal="showAddModal"
      @updateRequirementsData="updateRequirementsData"
      :tableRenderTml="newAddFormItems"
      :policeCategory="policeCategory"
    ></tableData>
    <!-- 新增 -->
    <custom-dialog
      :title="isEdit ? '修改' : '新增'"
      ref="preview-dialog"
      @dialogSure="addTableTrSure"
      @close="cancelEdit"
      @hide="cancelEdit"
    >
      <template v-slot:content>
        <jzAddForm
          v-if="policeCategory == 0"
          ref="addForm_0"
          :newAddFormItems="newAddFormItems"
          :formData="customizeFormData"
          @submit="submit"
        ></jzAddForm>
        <szAddForm
          v-else-if="policeCategory == 1"
          ref="addForm_1"
          :newAddFormItems="newAddFormItems"
          :formData="customizeFormData"
          @submit="submit"
        ></szAddForm>
        <qbAddForm
          v-else-if="policeCategory == 2"
          ref="addForm_2"
          :newAddFormItems="newAddFormItems"
          :formData="customizeFormData"
          @submit="submit"
        ></qbAddForm>
        <waAddForm
          v-else-if="policeCategory == 3"
          ref="addForm_3"
          :newAddFormItems="newAddFormItems"
          :formData="customizeFormData"
          @submit="submit"
        ></waAddForm>
        <xzAddForm
          v-else-if="policeCategory == 4"
          ref="addForm_4"
          :newAddFormItems="newAddFormItems"
          :formData="customizeFormData"
          @submit="submit"
        ></xzAddForm>
      </template>
    </custom-dialog>
  </div>
</template>
<script>
import customDialog from "components/dialog/dialog";
import tableData from "./table.vue";
// import formItemPreview from "../formItemPreview.vue";
import jzAddForm from "./jzAddForm.vue"; // 技侦
import szAddForm from "./szAddForm.vue"; // 视侦
import qbAddForm from "./qbAddForm.vue"; // 情报
import waAddForm from "./waAddForm.vue"; // 网安
import xzAddForm from "./xzAddForm.vue"; // 网安
export default {
  components: {
    tableData,
    jzAddForm,
    szAddForm,
    qbAddForm,
    waAddForm,
    xzAddForm
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    policeCategory: {
      type: Number,
      default: 0
    },
    tableConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    addFormItems: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isEdit: false,
      editIndex: null,
      newAddFormItems: [],
      // 列表数据
      tableConfigTml: {
        // 多选
        IsSelection: false,
        // 列表栏
        tableList: [],
        // 列表数据
        tableData: [],
        operationWidth: 200,
        // 操作
        operationList: [
          {
            type: "修改",
            icon: "el-icon-edit",
            color: "default",
            fun: (data, index) => {
              // console.log("修改", data, index);
              this.customizeFormData = data;
              this.isEdit = true;
              this.editIndex = index;
              this.dialogAdd.show();
            }
          },
          {
            type: "删除",
            icon: "el-icon-delete",
            color: "danger",
            fun: (data, index) => {
              // console.log("删除", data, index);
              this.tableConfig.tableData.splice(index, 1);
              this.updateRequirementsData(this.tableConfig.tableData);
            }
          }
        ],
        IsIndex: true
      },
      // 表单数据
      customizeFormData: {}
    };
  },
  computed: {
    dialogAdd() {
      // 返回弹窗示例
      return this.$refs["preview-dialog"];
    },
    tableConfigCalc() {
      return Object.assign(this.tableConfigTml, this.tableConfig);
    },
    newAddFormItems222() {
      return this.addFormItems;
    }
  },
  methods: {
    showAddModal() {
      this.dialogAdd.show();
    },
    // 点击确定 表单验证
    addTableTrSure() {
      this.$refs[`addForm_${this.policeCategory}`].validateForm();
    },
    // 点击关闭弹窗
    cancelEdit() {
      this.$refs[`addForm_${this.policeCategory}`].$refs.addForm.resetForm();
      this.customizeFormData = {};
      this.isEdit = false;
    },
    //子组件表单验证后返回值
    submit(formData) {
      console.log("newForm-index-formData", formData);
      if (this.isEdit) {
        this.tableConfig.tableData.splice(this.editIndex, 1, JSON.parse(formData));
        this.customizeFormData = {};
        this.isEdit = false;
      } else {
        this.tableConfig.tableData.push(JSON.parse(formData));
      }
      this.updateRequirementsData(this.tableConfig.tableData);
      this.dialogAdd.hide();
    },
    // 更新需求表格数据
    updateRequirementsData(data) {
      this.$emit("updateRequirementsData", data);
    }
  },
  watch: {
    addFormItems: {
      handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.newAddFormItems = newVal;
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped></style>
