/** @format */

// 系统设置相关接口
import axios from "../axios";

// 新增 更新树
export const addSystemTree = (data) => {
  return axios({
    url: "/sys/sys-tree/create",
    method: "post",
    data
  });
};
// 删除树节点
export const deleteTreeNode = (params) => {
  return axios({
    url: "/sys/sys-tree/delCascade",
    method: "get",
    params
  });
};

// 查看详情
export const systemTree = (params) => {
  return axios({
    url: "/sys/sys-tree/detail",
    method: "get",
    params
  });
};
// 系统树列表
export const systemTreeList = (data) => {
  return axios({
    url: "/sys/sys-tree/page",
    method: "post",
    data
  });
};
// 查询树结构
export const showSystemTree = (data) => {
  return axios({
    url: "/sys/sys-tree/queryTree",
    method: "post",
    data
  });
};
// 查询所有的树结构
export const showSystemTreeAll = (data) => {
  return axios({
    url: "/sys/sys-tree/queryAll",
    method: "post",
    data
  });
};
// 查询所有的菜单树
export const showMenuTreeAll = (params) => {
  return axios({
    url: "/sys/sys-menu/queryMenuTree",
    method: "get",
    params
  });
};
// 新增、编辑系统菜单
export const createSystemMenu = (data) => {
  return axios({
    url: "/sys/sys-menu/create",
    method: "post",
    data
  });
};
// 查询菜单类型
export const getMenuType = (params) => {
  return axios({
    url: "/sys/sys-menu/queryMenuType",
    method: "get",
    params
  });
};
// 删除菜单
export const deleteMenu = (params) => {
  return axios({
    url: "/sys/sys-menu/delCascade",
    method: "get",
    params
  });
};
// 系统设置-流水号-分页查询
export const systemNumList = (data) => {
  return axios({
    url: "/sys/sys-serial-number/page",
    method: "post",
    data
  });
};
// 系统设置-流水号-新增、编辑
export const systemNumCreate = (data) => {
  return axios({
    url: "/sys/sys-serial-number/save",
    method: "post",
    data
  });
};
// 系统设置-流水号-删除
export const systemNumDelete = (params) => {
  return axios({
    url: "/sys/sys-serial-number/del",
    method: "get",
    params
  });
};
// 系统设置-流水号-详情
export const systemNumDetal = (params) => {
  return axios({
    url: "/sys-serial-number/detail",
    method: "get",
    params
  });
};
// 系统设置-流水号-流水生成类型
export const systemNumType = (params) => {
  return axios({
    url: "/sys/sys-serial-number/type",
    method: "get",
    params
  });
};
// 系统设置-常用脚本-类别查询
export const systemScriptType = (params) => {
  return axios({
    url: "/sys/sys-script/category",
    method: "get",
    params
  });
};
// 系统设置-常用脚本-删除
export const systemScriptDelete = (params) => {
  return axios({
    url: "/sys/sys-script/del",
    method: "get",
    params
  });
};
// 系统设置-常用脚本-详情
export const systemScriptDetal = (params) => {
  return axios({
    url: "/sys/sys-script/detail",
    method: "get",
    params
  });
};
// 系统设置-常用脚本-脚本测试
export const systemScriptTest = (data) => {
  return axios({
    url: "/sys/sys-script/executeScript",
    method: "post",
    data
  });
};
// 系统设置-常用脚本-列表查询
export const systemScriptList = (data) => {
  return axios({
    url: "/sys/sys-script/page",
    method: "post",
    data
  });
};
// 系统设置-常用脚本-新增、修改
export const systemScriptAdd = (data) => {
  return axios({
    url: "/sys/sys-script/save",
    method: "post",
    data
  });
};
