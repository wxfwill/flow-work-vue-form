/** @format */

// 系统设置相关接口
import axios from "../axios";

//新增/编辑流程定义
export const createFlowDefinition = (data) => {
  return axios({
    url: "/wf/flow-definition/create",
    method: "post",
    data
  });
};

//保存流程模型
export const addBpmnModel = (data) => {
  return axios({
    url: "/wf/bpmn-model/draw",
    method: "post",
    data
  });
};

//流程列表查询 版本列表查询
export const getProcessList = (data) => {
  return axios({
    url: "/wf/flow-definition/page",
    method: "post",
    data
  });
};

//流程列表查询
export const deleteFlow = (params) => {
  return axios({
    url: "/wf/flow-definition/delete",
    method: "get",
    params
  });
};

//版本列表---设置为启用版本
export const setProcessVersion = (params) => {
  return axios({
    url: "/wf/flow-definition/enable",
    method: "get",
    params
  });
};

//流程列表--启动流程、保存草稿、从草稿启动
export const startProcess = (data) => {
  return axios({
    url: "/wf/flow-operation/instance",
    method: "post",
    data
  });
};
//任务列表--办理
export const startTask = (data) => {
  return axios({
    url: "/wf/flow-operation/task",
    method: "post",
    data
  });
};
//流程设计详情
export const getFlowDetail = (params) => {
  return axios({
    url: "/wf/flow-definition/detail",
    method: "get",
    params
  });
};

//流程设计节点按钮列表查询
export const getButtonList = (params) => {
  return axios({
    url: "/wf/bpmn-model/queryButton",
    method: "get",
    params
  });
};
//流程列表--启动流程、获取实例数据
export const getProcessData = (params) => {
  return axios({
    url: "/wf/flow-instance/getInstanceFlowData",
    method: "get",
    params
  });
};
//任务列表--获取任务数据
export const getTaskData = (params) => {
  return axios({
    url: "/wf/flow-task/getTaskFlowData",
    method: "get",
    params
  });
};
//流程实例--列表分页
export const getInstanceList = (data) => {
  return axios({
    url: "/wf/flow-instance/pageListInstance",
    method: "post",
    data
  });
};
//任务列表
export const getTaskList = (data) => {
  return axios({
    url: "/wf/flow-task/pageListTask",
    method: "post",
    data
  });
};

//流程设计-用户列表查询
export const userList = (data) => {
  return axios({
    url: "/wf/flow-org/userPage",
    method: "post",
    data
  });
};

//流程设计-角色列表查询
export const getRolesList = (data) => {
  return axios({
    url: "/wf/flow-org/rolePage",
    method: "post",
    data
  });
};

//流程设计-组织机构列表查询
export const getOrganAllTree = (params) => {
  return axios({
    url: "/wf/flow-org/orgTree",
    method: "get",
    params
  });
};

//流程设计-岗位列表查询
export const getPostList = (data) => {
  return axios({
    url: "/wf/flow-org/getPostPage",
    method: "post",
    data
  });
};

//流程实例-审批历史列表查询
export const getHistoryList = (data) => {
  return axios({
    url: "wf/flow-option/pageOption",
    method: "post",
    data
  });
};

//流程实例-挂起-取消挂起
export const getIsSuspend = (params) => {
  return axios({
    url: "/wf/flow-instance/suspend",
    method: "get",
    params
  });
};

//流程实例-列表-删除实例
export const deleteInstance = (params) => {
  return axios({
    url: "/wf/flow-instance/delete",
    method: "get",
    params
  });
};

//任务列表--指派候选人
export const appointUser = (data) => {
  return axios({
    url: "wf/flow-task/delegateTask",
    method: "post",
    data
  });
};

//查询流程图数据
export const getFlowImgData = (params) => {
  return axios({
    url: "/wf/bpmn-model/getFlowImgData",
    method: "get",
    params
  });
};
// 获取任务可驳回的节点
export const getBackNode = (params) => {
  return axios({
    url: "/wf/flow-task/getRollBackNode",
    method: "get",
    params
  });
};
// 获取提交任务前的数据
export const getHandleTaskData = (params) => {
  return axios({
    url: "/wf/flow-task/getPreSubmitUser",
    method: "get",
    params
  });
};

// 获取工作流任务详情--测试
export const getTaskDetal = (params) => {
  return axios({
    url: "/wf/bus-test/detail",
    method: "get",
    params
  });
};
