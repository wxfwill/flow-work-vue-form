<!-- @format -->

<template>
  <div style="display: inline-block; margin-left: 5px;">
    <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="addModal">配置子表</el-button>
    <el-dialog
      :title="`[${row.tableComment}(${row.tableKey})]子表配置`"
      :visible.sync="visible"
      width="60%"
      :close-on-click-modal="false"
      :append-to-body="true"
      custom-class="animateFadeIn"
    >
      <subBusiness
        ref="subBusiness"
        :key="row.tableKey"
        :tableKey="row.tableKey"
        :subBusinessEntities="row.children"
      ></subBusiness>
      <el-button @click="addSubTableCancel()">取消</el-button>
      <el-button type="primary" @click="addSubTableSure()">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
// import subBusiness from "./subBusiness";
export default {
  name: "subTableConfigBtn",
  components: {
    // subBusiness
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    // confirmBox({
    //   component = null,
    //   customClass = "",
    //   componentName = "",
    //   confirmData = {},
    //   confirmValidate = () => {}
    // }) {
    //   console.log(component, 12222222222);
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: "消息",
    //     customClass: customClass,
    //     message: h(component, {
    //       props: { confirmData }
    // 		}),
    // 		closeOnClickModal: false,
    //     showCancelButton: true,
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     beforeClose: (action, instance, done) => {
    //       const cptInstance = instance.$children.find(child => {
    //         return child.$options.name === componentName;
    //       });
    //       confirmValidate(action, cptInstance, done);
    //     }
    //   }).then(action => {
    //     this.$message({
    //       type: "info",
    //       message: "action: " + action
    //     });
    //   });
    // },
    // loadSubBusinessModal() {
    //   this.confirmBox({
    //     title: "ceshi1",
    //     customClass: "subBusinessModal",
    //     showCancelButton: true,
    //     confirmButtonText: "确定",
    //     component: subBusiness,
    //     componentName: "subBusiness",
    //     confirmValidate: (action, cpt, done) => {
    //       if (action == "cancel") {
    //         console.log("cancel");
    //       }
    //       console.log("success");
    //       done();
    //     }
    //   });
    // },
    addModal() {
      this.visible = true;
    },
    addSubTableCancel() {
      this.visible = false;
    },
    addSubTableSure() {
      if (this.$refs["subBusiness"].$el.getElementsByClassName("err-popper").length > 0) {
        this.$message.error("表单数据有误");
        return;
      }
      // let businessEntities = this.$refs.subBusiness.tableData;
      this.row.children = this.$refs.subBusiness.tableData || [];
      this.$emit("addBusinessEntities", this.row, this.index);
      this.visible = false;
    }
  }
};
</script>
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
