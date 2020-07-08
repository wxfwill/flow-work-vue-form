<!-- @format -->

<template>
  <div class="form-warp">
    <h6>HY-加班流程</h6>
    <el-form :model="baseForm" ref="baseForm" label-width="100px" :disabled="isDisable">
      <el-card header="基本信息">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input placeholder="请输入标题" v-model="baseForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期">
              <el-date-picker v-model="baseForm.date" type="date" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人">
              <el-input placeholder="请输入" v-model="baseForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号">
              <el-input placeholder="请输入" v-model="baseForm.num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请部门">
              <el-input placeholder="请输入" v-model="baseForm.dept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位">
              <el-input placeholder="请输入" v-model="baseForm.post"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card header="表单内容">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input placeholder="请输入" v-model="baseForm.entryName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理">
              <el-input placeholder="请输入" v-model="baseForm.entryLeader"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始日期">
              <el-date-picker v-model="baseForm.starTime" type="date" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期">
              <el-date-picker v-model="baseForm.endTime" type="date" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-time-select
                v-model="baseForm.startDate"
                style="width:100%;"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-time-select
                style="width:100%;"
                v-model="baseForm.endDate"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="加班时长">
              <el-input placeholder="请输入" v-model="baseForm.timeLong"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="加班类型">
              <el-select placeholder="请选择" v-model="baseForm.workType" style="width:100%;">
                <el-option label="工作日加班" value="1"></el-option>
                <el-option label="休息日加班" value="2"></el-option>
                <el-option label="法定假日加班" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否用餐">
              <el-select placeholder="请选择" v-model="baseForm.meals" style="width:100%;">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="加班输出">
              <el-input placeholder="请输入" type="textarea" v-model="baseForm.efficiency"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card header="签字意见">
        <div>=={{ urlData.nodeId }}==</div>
        <el-form-item label="本人签字">
          <el-input placeholder="请输入" type="textarea" v-model="baseForm.sign"></el-input>
        </el-form-item>
        <!-- 审批环节1 -->
        <el-form-item label="审批意见1" v-if="urlData.nodeId == 'Activity_1nxnrpz'">
          <el-input placeholder="请输入" type="textarea" v-model="baseForm.mark"></el-input>
        </el-form-item>
        <!-- 审批环节2 -->
        <el-form-item label="审批意见2" v-if="urlData.nodeId == 'Activity_11y49q3'">
          <el-input placeholder="请输入" type="textarea" v-model="baseForm.mark"></el-input>
        </el-form-item>
        <!-- 审批环节3 -->
        <el-form-item label="审批意见3" v-if="urlData.nodeId == 'Activity_0qilmoy'">
          <el-input placeholder="请输入" type="textarea" v-model="baseForm.mark"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>
<script>
// let vm;
// // 接收信息 postMessage通信
// onmessage = function(e) {
//   e = e || event;
//   let res = e.data;
//   console.log(res);
//   switch (res) {
//     case "submit":
//       vm.submit();
//       break;
//     case "detal":
//       vm.getDetal();
//   }
// };
// 引入 actions 实例
import actions from "@/shared/actions";
export default {
  data() {
    // vm = this;
    return {
      urlData: {},
      isDisable: false,
      baseForm: {
        type: "child",
        title: "",
        date: "",
        name: "",
        num: "",
        dept: "",
        post: "",
        entryName: "",
        entryLeader: "",
        starTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        timeLong: 8,
        workType: "",
        meals: "",
        efficiency: "",
        sign: "",
        mark: ""
      }
    };
  },
  mounted() {
    console.log("我是嵌套表单子页面");
    // 添加观察者
    // onGlobalStateChange 第二个入参为 true，代表立即执行一次观察者函数
    actions.onGlobalStateChange((state) => {
      console.log("收到父页面的值" + state.flag);
      if (state.flag == "subit") {
        this._test();
      } else if (state.flag == "detal") {
        console.log(state.detalData);
        this.getDetal(state.detalData);
      }
      // const {token} = state;
      // console.log("========" + token);
      // 未登录 - 返回主页
      // if (!token) {
      //   this.$message.error("未检测到登录信息！");
      //   return this.$router.push("/");
      // }
      // // 获取用户信息
      // this.getUserInfo(token);
    }, true);

    // this.$nextTick(() => {
    // var self = this;
    // window.addEventListener("message", function(e) {
    //   e = e || event;
    //   let res = e.data;
    //   console.log(res);
    //   switch (res) {
    //     case "submit-process":
    //       self.baseForm.type = res;
    //       self.submit();
    //       break;
    //     case "submit-task":
    //       self.baseForm.type = res;
    //       self.submit();
    //       break;
    //     case "detal":
    //       self.getDetal();
    //   }
    // }, false);
    // });
    // let _this = this;
    // var beginTime = 0; //执行onbeforeunload的开始时间
    // var differTime = 0; //时间差
    // window.onunload = function() {
    //   differTime = new Date().getTime() - beginTime;
    //   if (differTime <= 3) {
    //     // 关闭
    //   } else {
    //     // 刷新

    //     console.log("刷新页面");
    //     // debugger;
    //     // _this.parentData.parentRouter("/test");
    //     // _this.$router.go(-1);
    //     // window.sessionStorage.removeItem('keyFlag');
    //   }
    // };
    // window.onbeforeunload = function() {
    //   beginTime = new Date().getTime();
    // };
  },
  methods: {
    // 获取详情
    getDetal(data) {
      console.log("===============详情==============");
      // this.urlData = this.getUrlData();
      console.log(data);
      if (data.isable == "false") {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
      // if(data.nodeId) {

      // }
      if (data.busId) {
        this.$api.process.getTaskDetal({busId: data.busId}).then((res) => {
          if (res && res.code == 200) {
            this.baseForm = JSON.parse(res.data.data);
            console.log(this.baseForm);
          }
        });
      }
    },
    // 地址解析
    getUrlData() {
      let urlData = {};
      let url = window.location.href;
      if (url.indexOf("?") != -1) {
        let urlDataStr = decodeURI(url.split("?")[1]); // 解码
        let keyValueArr = urlDataStr.split("&");
        keyValueArr.forEach((item) => {
          let keyValueItemArr = item.split("=");
          let key = keyValueItemArr[0],
            value = keyValueItemArr[1];
          urlData[key] = value;
        });
      }
      return urlData;
    },
    _test() {
      this.baseForm.timeLong = Number(this.baseForm.timeLong);
      let data = this.baseForm;
      actions.setGlobalState({flag: null, flagData: data});
    },
    // 表单提交
    submit() {
      this.baseForm.timeLong = Number(this.baseForm.timeLong);
      let data = this.baseForm;
      console.log(data);
      console.log(window.parent);
      window.parent.postMessage(data, "*");
      //   this.$refs["qxnForm"].validate((valid) => {
      //     if (valid) {
      //       let data = Object.assign({}, this.qxnForm, this.$refs.policeCategoryForm.policeCatograyForm);
      //       let data = this.baseForm;
      //       console.log(data);
      //       window.parent.postMessage(data, "*");
      //     } else {
      //       console.log("error submit!!");
      //       this.$message.error("表单数据错误");
      //       window.parent.postMessage("error", "*");
      //       return false;
      //     }
      //   });
    }
  },
  destroyed() {
    // window.onbeforeunload = null;
    // window.onunload = null;
  },
  beforeDestroy() {}
};
</script>
>
<style lang="scss" scoped>
.form-warp {
  width: 70%;
  margin: auto;
  text-align: left;
  > h6 {
    text-align: center;
    margin: 20px 0;
    font-weight: bold;
    font-size: 16px;
  }
  .el-card ::v-deep {
    margin-bottom: 0;
    .el-card__header {
      color: #ffffff;
      background-color: #6795cc;
      padding: 10px 20px;
    }
  }
}
</style>
