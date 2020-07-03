/** @format */

// 用户组织模块相关接口
import axios from "../axios";

// 新增、编辑用户
export const creatUser = (data) => {
  return axios({
    url: "/sys/sys-user/create",
    method: "post",
    data
  });
};
// 删除用户
export const deleteUser = (params) => {
  return axios({
    url: "/sys/sys-user/del",
    method: "get",
    params
  });
};
// 查看用户详情
export const userDetal = (params) => {
  return axios({
    url: "/sys/sys-user/detail",
    method: "get",
    params
  });
};
// 用户列表分页
export const userList = (data) => {
  return axios({
    url: "/sys/sys-user/page",
    method: "post",
    data
  });
};
// 重置密码
export const resetPwd = (data) => {
  return axios({
    url: "/sys/sys-user/resetPwd",
    method: "post",
    data
  });
};
// 编辑、新增角色
export const addRole = (data) => {
  return axios({
    url: "/sys/sys-role/create",
    method: "post",
    data
  });
};
// 批量删除角色
export const deleteRoles = (data) => {
  return axios({
    url: "/sys/sys-role/delBatch",
    method: "post",
    data
  });
};
// 角色列表
export const getRolesList = (data) => {
  return axios({
    url: "/sys/sys-role/page",
    method: "post",
    data
  });
};
// 新增、编辑机构
export const addOrgan = (data) => {
  return axios({
    url: "/sys/sys-org/create",
    method: "post",
    data
  });
};
// 删除机构
export const deleteOrgan = (params) => {
  return axios({
    url: "/sys/sys-org/delCascade",
    method: "get",
    params
  });
};
// 根据机构id获取详情
export const getOrganDetal = (params) => {
  return axios({
    url: "/sys/sys-org/detail",
    method: "get",
    params
  });
};
// 查询所有的机构树
export const getOrganAllTree = (params) => {
  return axios({
    url: "/sys/sys-org/queryOrgTree",
    method: "get",
    params
  });
};
// 组织人员机构列表
export const getOrganPersonList = (data) => {
  return axios({
    url: "/sys/sys-relation/getRelationUserPageByOrg",
    method: "post",
    data
  });
};
// 组织管理-加入用户-保存
export const saveOrganPersonInfo = (data) => {
  return axios({
    url: "/sys/sys-relation/saveOrgUsers",
    method: "post",
    data
  });
};
// 组织管理-组织人员-删除
export const deleteOrganUser = (data) => {
  return axios({
    url: "/sys/sys-relation/delRel",
    method: "post",
    data
  });
};
// 组织管理-组织人员-设置主组织
export const setMainOrganUser = (params) => {
  return axios({
    url: "/sys/sys-relation/setMainOrg",
    method: "get",
    params
  });
};
// 组织管理-用户管理-岗位列表
export const getPostList = (data) => {
  return axios({
    url: "/sys/sys-relation/getPostPage",
    method: "post",
    data
  });
};
// 组织管理-角色管理-资源分配-菜单
export const getRoleBindMenu = (data) => {
  return axios({
    url: "/sys/role-menu/bindMenu",
    method: "post",
    data
  });
};
// 组织管理-角色管理-分配用户
export const getRoleAssignUser = (data) => {
  return axios({
    url: "/sys/sys-relation/getRelationUserPageByRole",
    method: "post",
    data
  });
};
// 组织管理-角色管理-新增用户
export const RoleAssignUserInfo = (data) => {
  return axios({
    url: "/sys/sys-relation/saveRoleUsers",
    method: "post",
    data
  });
};
// 组织管理-角色管理-根据角色ID查询绑定的菜单
export const RoleIdBindMenu = (params) => {
  return axios({
    url: "/sys/role-menu/getMenuIdByRoleId",
    method: "get",
    params
  });
};
