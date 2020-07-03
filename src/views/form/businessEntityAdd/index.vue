<!-- @format -->

<template>
  <div class="customize-form-edit">
    <div class="mgt10 mgb10">
      <el-button type="primary" size="mini" @click="addFormItem">添加字段</el-button>
    </div>
    <table-data
      ref="addBusinessTable"
      :tableConfiguration="tableConfig"
      :hasDatabaseTable="hasDatabaseTable"
    ></table-data>
    <!-- 预览 -->
    <!-- <custom-dialog title="自定义表单预览" ref="preview-dialog">
      <template v-slot:content>
        <formItemPreview :formItems.sync="customizeFormItems"></formItemPreview>
      </template>
    </custom-dialog>-->
  </div>
</template>
<script>
import customDialog from "components/dialog/dialog";
import tableData from "./table";
// import formItemPreview from "./formItemPreview";
export default {
  components: {tableData, customDialog},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    hasDatabaseTable: {
      type: Number,
      default: 0
    },
    defaultTableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      customizeFormItems: null,
      tableConfig: {}
    };
  },
  computed: {},
  methods: {
    // 添加表单项
    addFormItem() {
      //   alert("填加字段");
      this.$refs.addBusinessTable.addFormItem();
    }
  },
  watch: {
    defaultTableData: {
      handler(val) {
        console.log(val, "defaultData");
        this.tableConfig = Object.assign(
          {},
          {
            tableData: JSON.parse(JSON.stringify(val))
          }
        );
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped></style>
