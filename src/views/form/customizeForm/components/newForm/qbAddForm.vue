<!-- @format -->

<template>
  <formItemPreview
    ref="addForm"
    :formItems.sync="customizeFormItems"
    :formData="editFormData"
    childRelateTo="requirements"
    @submit="submit"
  ></formItemPreview>
</template>
<script>
import customDialog from "components/dialog/dialog";
import tableData from "./table.vue";
import formItemPreview from "../formItemPreview.vue";
export default {
  components: {tableData, customDialog, formItemPreview},
  props: {
    newAddFormItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    dialogAdd() {
      return this.$refs["preview-dialog"];
    },
    customizeFormItems() {
      return this.newAddFormItems;
    },
    editFormData() {
      return this.formData;
    }
  },
  methods: {
    // 表单验证
    validateForm() {
      this.$refs["addForm"].submit();
    },
    // 验证后提交
    submit(formData) {
      console.log("jzAddForm:", formData);
      this.$emit("submit", formData);
    }
  }
};
</script>
<style lang="scss" scoped></style>
