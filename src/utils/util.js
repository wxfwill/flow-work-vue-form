/** @format */

export default {
  // 流程实例状态
  processInstnceStatus(type) {
    if (!type) {
      this.$message.error("流程实例状态不存在");
      return;
    }
    let obj = {
      start: "发起流程",
      draft: "草稿",
      running: "运行中",
      end: "结束",
      manualEnd: "人工结束",
      back: "驳回"
    };
    return obj[type];
  },
  // 任务列表状态
  processTaskStatus(type) {
    if (!type) {
      this.$message.error("流程任务状态不存在");
      return;
    }
    let obj = {
      NORMAL: "普通",
      TURN: "转办",
      BACK: "驳回",
      SUSPEND: "挂起",
      DESIGNATE: "指派",
      FORWARD: "转发"
    };
    return obj[type];
  },
  // 任务列表类型
  processTaskType(type) {
    if (!type) {
      this.$message.error("流程任务类型不存在");
      return;
    }
    let obj = {
      NORMAL: "普通"
    };
    return obj[type];
  }
};
