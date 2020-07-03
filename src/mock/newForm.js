var validateTroubleshootingArea = (isSubmit, rule, value, callback) => {
  if (!(value && value.length) && isSubmit) {
    callback(new Error("请添加区域"));
  } else {
    callback();
  }
};
var validateComparisonAreaArea = (isSubmit, rule, value, callback) => {
  if (!(value && value.length) && isSubmit) {
    callback(new Error("请添加区域"));
  } else {
    callback();
  }
};
var validateQueryArea = (isSubmit, rule, value, callback) => {
  if (!(value && value.length) && isSubmit) {
    callback(new Error("请添加区域"));
  } else {
    callback();
  }
};
export const jzForm = [
  {
    type: "3",
    label: "需求及数据类型",
    attributeName: "requirements",
    options: [
      {label: "电信用户通话记录信息", value: 0},
      {label: "电信用户登记资料信息", value: 1},
      {label: "即时通讯号码注册信息", value: 2},
      {label: "互联网用户注册信息", value: 3},
      {label: "互联网登录日志信息", value: 4},
      {label: "寄递物流服务信息", value: 5},
      {label: "移动网警用定位系统(LBS)信息", value: 6}
    ],
    defaultValue: 0,
    isRelate: true,
    isRequired: true
  },
  {
    name: "侦查条件",
    children: [
      {
        type: "1",
        label: "目标",
        attributeName: "target",
        isRequired: true,
        relateTo: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        type: "11",
        label: "开始时间",
        attributeName: "startTime",
        format: "yyyy-MM-dd",
        dateType: "date",
        isRequired: true,
        relateTo: [0, 4, 5, 6]
      },
      {
        type: "11",
        label: "结束时间",
        attributeName: "endTime",
        format: "yyyy-MM-dd",
        dateType: "date",
        isRequired: true,
        relateTo: [0, 4, 5, 6]
      }
    ]
  }
];
export const szForm = [
  {
    type: "3",
    label: "需求及数据类型",
    attributeName: "requirements",
    options: [
      {label: "调取跨分局间视频", value: 0},
      {label: "跨区域动态人像轨迹排查", value: 1},
      {label: "跨省人像身份比对", value: 2},
      {label: "云鉴比对嫌疑人身份", value: 3},
      {label: "其他", value: 4}
    ],
    defaultValue: 0,
    isRelate: true,
    isRequired: true
  },
  {
    type: "3",
    label: "人员类型",
    attributeName: "personnelType",
    options: [
      {label: "嫌疑人照片", value: 0},
      {label: "受害人照片", value: 1}
    ],
    isRequired: true
  },
  {
    name: "侦查条件",
    children: [
      {
        type: "11",
        label: "开始时间",
        attributeName: "startTime",
        format: "yyyy-MM-dd",
        dateType: "date",
        isRequired: true,
        relateTo: [1]
      },
      {
        type: "11",
        label: "结束时间",
        attributeName: "endTime",
        format: "yyyy-MM-dd",
        dateType: "date",
        isRequired: true,
        relateTo: [1]
      },
      {
        type: "1",
        label: "案件编号",
        attributeName: "caseNo",
        isRequired: true,
        relateTo: [0]
      },
      {
        type: "13",
        label: "立案单位",
        attributeName: "filingUnit",
        isRequired: true,
        relateTo: [0],
        options: [
          {
            value: "zhinan",
            label: "一级",
            children: [
              {
                value: "shejiyuanze",
                label: "二级",
                children: [
                  {
                    value: "yizhi",
                    label: "三级-1"
                  },
                  {
                    value: "fankui",
                    label: "三级-2"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "10",
        limit: 1,
        label: "嫌疑人像",
        attributeName: "personalPicture",
        isRequired: true,
        relateTo: [1, 2]
      },
      {
        type: "10",
        label: "审核表单",
        attributeName: "approvalForm",
        isRequired: true,
        relateTo: [3]
      },
      {
        type: "8",
        label: "排查区域",
        attributeName: "troubleshootingArea",
        isRequired: true,
        validate: validateTroubleshootingArea,
        checkStrictly: true,
        relateTo: [1]
      },
      {
        type: "8",
        label: "比对区域",
        attributeName: "comparisonArea",
        isRequired: true,
        validate: validateComparisonAreaArea,
        checkStrictly: true,
        relateTo: [2]
      },
      {
        type: "1",
        label: "其他",
        attributeName: "others",
        isRequired: true,
        relateTo: [4]
      }
    ]
  }
];
export const qbForm = [
  {
    type: "3",
    label: "需求及数据类型",
    attributeName: "requirements",
    options: [
      {label: "对嫌疑人进行全市布控", value: 0},
      {label: "对嫌疑人进行全省布控", value: 1},
      {label: "对嫌疑人身份进行数据排查", value: 2},
      {label: "对嫌疑人手机号码进行话单分析及数据排查", value: 3},
      {label: "对涉案车辆进行数据排查", value: 4},
      {label: "对嫌疑人落地信息核查", value: 5},
      {label: "对嫌疑人轨迹进行核查", value: 6}
    ],
    isRelate: true,
    defaultValue: 0,
    isRequired: true
  },
  {
    type: "3",
    label: "人员类型",
    attributeName: "personnelType",
    options: [
      {label: "嫌疑人", value: 0},
      {label: "受害人", value: 1},
      {label: "报警人", value: 2},
      {label: "证人", value: 3}
    ],
    isRequired: true
  },
  {
    name: "侦查条件",
    children: [
      {
        type: "1",
        label: "车牌号码",
        attributeName: "licensePlate",
        isRequired: true,
        relateTo: []
      },
      {
        type: "1",
        label: "网络特征( QQ, 微信ID, 新浪, 支付宝 )",
        attributeName: "netCharacter",
        isRequired: true,
        relateTo: [2, 6]
      },
      {
        type: "1",
        label: "手机号码",
        attributeName: "phoneNum",
        isRequired: true,
        relateTo: [2]
      },
      {
        type: "1",
        label: "电话号码",
        attributeName: "telNum",
        isRequired: true,
        relateTo: [3]
      },
      {
        type: "1",
        label: "身份证号码",
        attributeName: "IDCard",
        isRequired: true,
        relateTo: [0, 1, 5, 6]
      },
      {
        type: "1",
        label: "车牌号码",
        attributeName: "plateNum",
        isRequired: true,
        relateTo: [4, 6]
      },
      {
        type: "10",
        limit: 1,
        label: "车辆照片",
        attributeName: "vehiclePhoto",
        isRequired: true,
        relateTo: [4]
      },
      {
        type: "10",
        limit: 1,
        label: "人像图片",
        attributeName: "portraitPicture",
        isRequired: true,
        relateTo: [2, 6]
      }
    ]
  }
];
export const waForm = [
  {
    type: "1",
    label: "姓名",
    attributeName: "username",
    isRequired: true
  },
  {
    type: "1",
    label: "证件种类与号码",
    attributeName: "cardTypeAndNum",
    isRequired: true
  },
  {
    type: "1",
    label: "目标或特定信息",
    attributeName: "targetOrSpecialInfo",
    isRequired: true
  },
  {
    type: "2",
    label: "备注",
    attributeName: "remarks",
    isRequired: false
  }
];
export const xzForm = [
  {
    type: "3",
    label: "需求类型",
    attributeName: "requirements",
    options: [
      {label: "人员指纹采集情况", value: 0},
      {label: "现场指纹比对情况", value: 1},
      {label: "现场DNA比对情况", value: 2},
      {label: "人员DNA比对情况", value: 3},
      {label: "现场基站信息数据", value: 4},
      {label: "人员指纹跨省比对情况", value: 5},
      {label: "现场指纹跨省比对情况", value: 6}
    ],
    isRelate: true,
    defaultValue: 0,
    isRequired: true
  },
  {
    type: "3",
    label: "人员类型",
    attributeName: "personnelType",
    options: [
      {label: "嫌疑人", value: 0},
      {label: "受害人", value: 1},
      {label: "报警人", value: 2},
      {label: "证人", value: 3}
    ],
    isRequired: true
  },
  {
    name: "侦查条件",
    children: [
      {
        type: "1",
        label: "人员信息采集编号",
        attributeName: "personInfoCollectNo",
        isRequired: true,
        relateTo: [0, 3, 5]
      },
      {
        type: "1",
        label: "接警号",
        attributeName: "alarmNum",
        isRequired: true,
        relateTo: [1, 2, 4]
      },
      {
        type: "1",
        label: "车牌号码",
        attributeName: "licensePlate",
        isRequired: true,
        relateTo: []
      },
      {
        type: "1",
        label: "网络特征( QQ, 微信ID, 新浪, 支付宝 )",
        attributeName: "netCharacter",
        isRequired: true,
        relateTo: []
      },
      {
        type: "1",
        label: "身份证号",
        attributeName: "IDCard",
        isRequired: true,
        relateTo: [3]
      },
      {
        type: "1",
        label: "姓名",
        attributeName: "username",
        isRequired: true,
        relateTo: [3]
      },
      {
        type: "1",
        label: "现勘编号",
        attributeName: "siteSurveyNo",
        isRequired: true,
        relateTo: [6]
      },
      {
        type: "1",
        label: "物证编号",
        attributeName: "physicalNo",
        isRequired: true,
        relateTo: [6]
      },
      {
        type: "8",
        label: "查询区域",
        attributeName: "queryArea",
        isRequired: true,
        validate: validateQueryArea,
        checkStrictly: true,
        relateTo: [5, 6]
      }
    ]
  }
];
