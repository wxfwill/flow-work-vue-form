<!-- @format -->

<template>
  <el-form ref="policeCatograyForm" label-width="125px" :model="policeCatograyForm">
    <el-row v-if="policeCategory === 3">
      <el-col :span="12">
        <el-form-item label="手动查询:" prop="manualQuery">
          <el-switch
            :disabled="disabled"
            v-model="policeCatograyForm.manualQuery"
            active-color="#1890ff"
            inactive-color="#ddd"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="自动监控:" prop="autoMonitor">
          <el-switch
            :disabled="disabled"
            v-model="policeCatograyForm.autoMonitor"
            active-color="#1890ff"
            inactive-color="#ddd"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="手动查询时间:" prop="manualQueryTime">
          <el-date-picker
            :disabled="disabled"
            v-model="policeCatograyForm.manualQueryTime"
            type="daterange"
            align="right"
            :value-format="dateFormat"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="使用目的:" prop="usePurpose">
          <el-input
            v-model="policeCatograyForm.usePurpose"
            type="textarea"
            placeholder="请输入使用目的"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="使用资源:" prop="useResources">
          <el-input
            v-model="policeCatograyForm.useResources"
            type="textarea"
            placeholder="请输入使用资源"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="详细描述:" prop="detailDesc">
          <el-input
            v-model="policeCatograyForm.detailDesc"
            type="textarea"
            placeholder="请输入详细描述"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remarks">
          <el-input
            v-model="policeCatograyForm.remarks"
            type="textarea"
            placeholder="请输入备注"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件:" prop="enclosure">
          <files-upload
            :IsPrompt="false"
            :IsFiles="true"
            :IsDisabled="disabled"
            :filePath="policeCatograyForm.enclosure"
            :limit="5"
            @getFilePath="getFilePath"
          ></files-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="提请人:" prop="requester">
          <el-input v-model="policeCatograyForm.requester" placeholder="请输入提请人" :disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="提请单位:" prop="requestUnit">
          <el-input
            v-model="policeCatograyForm.requestUnit"
            placeholder="请输入提请单位"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="提请时间:" prop="requestTime">
          <el-date-picker
            :disabled="disabled"
            v-model="policeCatograyForm.requestTime"
            type="date"
            :value-format="dateFormat"
            placeholder="选择提请时间"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="短信通知:" prop="shortMessage">
          <el-switch
            :disabled="disabled"
            v-model="policeCatograyForm.shortMessage"
            active-color="#1890ff"
            inactive-color="#ddd"
          ></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
var validatorEnclosure = function(rule, value, callback) {
  if (!value) {
    callback(new Error("请上传附件"));
  }
};
import filesUpload from "components/filesUpload/index";
export default {
  components: {filesUpload},
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    policeCategory: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dateFormat: "yyyy-MM-dd",
      policeCatograyForm: {
        manualQuery: false, //手动查询
        autoMonitor: false, //自动监控
        manualQueryTime: "", //手动查询时间
        usePurpose: "", //使用目的
        useResources: "", //使用资源
        detailDesc: "", //详细描述
        remarks: "", //备注
        enclosure: "", //附件
        requester: "", //提请人
        shortMessage: false, //短信通知
        requestUnit: "", //提请单位
        requestTime: "" //提请时间
      },
      policeCatograyFormRules: {}
    };
  },
  methods: {
    // 附件上传路径更新
    getFilePath(path) {
      this.policeCatograyForm.enclosure = path;
    },
    // 提交
    submit() {
      this.$emit("updateData", this.policeCatograyForm);
    }
  },
  watch: {
    data: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          for (let key in this.policeCatograyForm) {
            if (val[key]) {
              this.policeCatograyForm[key] = val[key];
            }
          }
          this.$forceUpdate();
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="sass" scoped></style>
