<!-- @format -->

<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiAble"
    :close-on-click-modal="false"
    class="cursorDialog"
    @close="close"
  >
    <slot name="content"></slot>
    <div slot="footer" v-if="isShowButtons">
      <el-button @click="hide">{{ cancelText }}</el-button>
      <el-button type="primary" @click="dialogSure">{{ sureText }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isVisiAble: false
    };
  },
  props: {
    title: {
      type: String,
      default: "提示"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    sureText: {
      type: String,
      default: "确定"
    },
    isShowButtons: {
      type: Boolean,
      default: true
    }
  },
  watch: {},
  methods: {
    hide() {
      this.$emit("cancel");
      this.isVisiAble = false;
    },
    show() {
      this.isVisiAble = true;
    },
    dialogSure() {
      this.$emit("dialogSure");
    },
    close() {
      this.$emit("close");
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
<style lang="scss">
//@import url(); 引入公共css类
.cursorDialog {
}
</style>
