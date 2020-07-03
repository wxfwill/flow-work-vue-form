/** @format */

// 个人办公相关接口
import axios from "../axios";
//个人办公--待办列表
export const notHandlePageList = (data) => {
  return axios({
    url: "/wf/flow-task/pageTodoTask",
    method: "post",
    data
  });
};
//个人办公--已办列表
export const handlePageList = (data) => {
  return axios({
    url: "/wf/flow-option/pageFinished",
    method: "post",
    data
  });
};
//个人办公--草稿列表
export const draftPageList = (data) => {
  return axios({
    url: "/wf/flow-instance/pageDraft",
    method: "post",
    data
  });
};
//个人办公--草稿列表--刪除
export const deleteDraft = (id) => {
  return axios({
    url: `/wf/flow-instance/delete/${id}`,
    method: "delete"
  });
};
//个人办公--申请历史
export const applyHistoryPageList = (data) => {
  return axios({
    url: "/wf/flow-instance/pageMyApplyHistory",
    method: "post",
    data
  });
};
