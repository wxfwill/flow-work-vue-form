/** @format */

export const navList = {
  person: [
    {
      name: "事项待办",
      label: "person",
      children: [
        {name: "我的待办", label: "person-1", url: "/person"},
        {name: "申请历史", label: "person-2", url: "/person-apply-history"}
      ]
    },
    {
      name: "事项申请",
      label: "apply",
      children: [
        {name: "我的草稿", label: "apply-1", url: "/person-my-draft"},
        {name: "发起申请", label: "apply-2", url: "/person-start-apply"},
        {name: "我的已办", label: "apply-3", url: "/person-done"}
      ]
    },
    {
      name: "日程管理",
      label: "schedule",
      children: []
    }
  ],
  process: [
    {
      name: "任务列表",
      label: "taskList",
      url: "/process-task"
    },
    {
      name: "流程列表",
      label: "processList",
      url: "/process"
    },
    // {
    //   name: "流程设计",
    //   label: "processDesign",
    //   url: "/process-design",
    // },
    {
      name: "流程实例",
      label: "processInstance",
      url: "/process-example"
    }
  ],
  form: [
    {
      name: "业务对象",
      label: "businessObject",
      children: [
        {name: "业务实体", label: "businessObject-1", url: "/form"},
        {name: "业务对象", label: "businessObject-2", url: "/form-object"},
        {name: "业务表单", label: "businessObject-3", url: "/form-business"}
      ]
    },
    {
      name: "表单定义",
      label: "formDefine",
      children: [
        {name: "表单权限", label: "formDefine-1", url: "/form-formAuthority"},
        {name: "表单模板", label: "formDefine-2", url: "/form-template"}
      ]
    }
  ],
  user: [
    {
      name: "组织管理",
      label: "userManger",
      children: [
        {name: "用户组织", label: "userManger-1", url: "/user-manger"},
        {
          name: "组织管理",
          label: "userManger-2",
          url: "/user-organize-manger"
        },
        {name: "角色管理", label: "userManger-3", url: "/user-role-manger"}
      ]
    }
  ],
  system: [
    {
      name: "系统设置",
      label: "systemConfig",
      children: [
        {name: "国家节假日", label: "systemConfig-1", url: "/system"},
        {
          name: "数据源管理",
          label: "systemConfig-2",
          url: "/system-dataDictionaries"
        },
        {
          name: "流水号",
          label: "systemConfig-3",
          url: "/system-streamNumber"
        },
        {
          name: "常用脚本",
          label: "systemConfig-4",
          url: "/system-commonScripts"
        },
        {
          name: "系统树维护",
          label: "systemConfig-5",
          url: "/system-systemTree"
        }
      ]
    }
  ]
};
export const navHeader = [
  {
    navHeader: {
      name: "个人办公",
      label: "person",
      url: "/person"
    },
    navLeft: [
      {
        name: "事项待办",
        label: "person",
        children: [
          {name: "我的待办", label: "person-1", url: "/person"},
          {name: "我的已办", label: "apply-3", url: "/person-done"}
        ]
      },
      {
        name: "事项申请",
        label: "apply",
        children: [
          {name: "我的草稿", label: "apply-1", url: "/person-my-draft"},
          // { name: "发起申请", label: "apply-2", url: "/person-start-apply" },
          {name: "申请历史", label: "person-2", url: "/person-apply-history"}
        ]
      }
      // {
      //   name: "日程管理",
      //   label: "schedule",
      //   children: [],
      // },
    ]
  },
  {
    navHeader: {name: "流程管理", label: "process", url: "/process-task"},
    navLeft: [
      {
        name: "任务列表",
        label: "taskList",
        url: "/process-task"
      },
      {
        name: "流程列表",
        label: "processList",
        url: "/process"
      },
      // {
      //   name: "流程设计",
      //   label: "processDesign",
      //   url: "/process-design",
      // },
      {
        name: "流程实例",
        label: "processInstance",
        url: "/process-example"
      }
    ]
  },
  {
    navHeader: {name: "用户组织", label: "user", url: "/user-manger"},
    navLeft: [
      {
        name: "组织管理",
        label: "userManger",
        children: [
          {name: "用户管理", label: "userManger-1", url: "/user-manger"},
          {
            name: "组织管理",
            label: "userManger-2",
            url: "/user-organize-manger"
          },
          {name: "角色管理", label: "userManger-3", url: "/user-role-manger"}
        ]
      }
    ]
  },
  {
    navHeader: {name: "表单管理", label: "form", url: "/form"},
    navLeft: [
      {
        name: "业务对象",
        label: "businessObject",
        children: [
          {name: "业务实体", label: "businessObject-1", url: "/form"},
          {name: "业务对象", label: "businessObject-2", url: "/form-object"},
          {
            name: "业务表单",
            label: "businessObject-3",
            url: "/form-business"
          }
        ]
      },
      {
        name: "表单定义",
        label: "formDefine",
        children: [
          {
            name: "表单权限",
            label: "formDefine-1",
            url: "/form-formAuthority"
          },
          {name: "表单模板", label: "formDefine-2", url: "/form-template"}
        ]
      }
    ]
  },
  {
    navHeader: {name: "系统配置", label: "system", url: "/system-menu"},
    navLeft: [
      {
        name: "系统设置",
        label: "systemConfig",
        children: [
          // { name: "国家节假日", label: "systemConfig-1", url: "/system" },
          // {
          //   name: "数据源管理",
          //   label: "systemConfig-2",
          //   url: "/system-dataDictionaries",
          // },
          {
            name: "菜单管理",
            label: "systemMenu-2",
            url: "/system-menu"
          },
          {
            name: "流水号",
            label: "systemConfig-3",
            url: "/system-streamNumber"
          },
          {
            name: "常用脚本",
            label: "systemConfig-4",
            url: "/system-commonScripts"
          },
          {
            name: "系统树维护",
            label: "systemConfig-5",
            url: "/system-systemTree"
          }
        ]
      }
    ]
  }
];
