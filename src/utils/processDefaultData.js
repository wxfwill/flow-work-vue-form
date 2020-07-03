/** @format */

export default {
  //状态
  statusList: [
    {value: "draft", label: "草稿"},
    {value: "publish", label: "发布"},
    {value: "disable", label: "禁用"}
  ],
  //节点表单
  formTypeList: [
    {value: "online", label: "在线表单"},
    {value: "url", label: "URL表单"}
  ],
  //驳回后执行人
  rollBackExecutorList: [
    {value: "history", label: "历史执行人员"},
    {value: "nodePerson", label: "节点配置人员"}
  ],
  //驳回后流转方式
  rollBackNodeTypeList: [
    {value: "assign", label: "指定的驳回节点"},
    {value: "freeChoose", label: "自由选择驳回节点"}
  ],
  //自由选择候选人
  candidateTypeList: [
    {value: "none", label: "不开启"},
    {value: "nodePerson", label: "节点配置人员"},
    {value: "allPerson", label: "所有人员"}
  ],
  //按钮
  buttonList: [
    {value: "draft", label: "保存草稿"},
    {value: "start", label: "提交"},
    {value: "agree", label: "同意"},
    {value: "reject", label: "驳回"},
    {value: "reject2Start", label: "驳回发起人"},
    {value: "opinion", label: "审批历史"},
    {value: "flowImage", label: "流程图"},
    {value: "end", label: "流程结束"}
  ],
  //人员类型
  personnelTypeList: [
    {
      value: "initiator",
      label: "发起人"
    },
    {
      value: "user",
      label: "用户"
    },
    {
      value: "org",
      label: "机构"
    },
    {
      value: "post",
      label: "岗位"
    },
    {
      value: "role",
      label: "角色"
    }
  ],
  //运算类型列表
  logicList: [
    {
      value: "and",
      label: "与"
    },
    {
      value: "or",
      label: "或"
    },
    {
      value: "not",
      label: "非"
    }
  ],
  //标题规则列表
  titleList: [
    {
      value: "defName",
      label: "流程定义名称"
    },
    {
      value: "initiator",
      label: "发起人姓名"
    },
    {
      value: "initiatorTime",
      label: "发起时间"
    }
  ],
  //流程节点跳过列表
  skipTypeList: [
    {
      value: "all",
      label: "所有节点跳过"
    },
    {
      value: "firstSkip",
      label: "第一个任务节点跳过"
    }
    // {
    //   value: "no",
    //   label: "不跳过",
    // },
  ]
};
