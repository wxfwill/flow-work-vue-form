<!-- @format -->

<template>
  <div class="formItemEditTable">
    <el-table
      id="businessEntityTable"
      :data="tableConfig.tableData"
      ref="table"
      :border="tableConfig.isborder"
      row-key="sn"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        :align="tableConfig.align"
        width="55"
        v-if="tableConfig.IsSelection"
      ></el-table-column>
      <el-table-column :align="tableConfig.align" fixed label="序号" width="80" v-if="tableConfig.IsIndex">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :align="tableConfig.align"
        :label="item.label"
        :render-header="item.render"
        :width="item.width"
        v-for="(item, index) in tableConfig.tableList"
        :key="index"
      >
        <template slot-scope="scope">
          <!-- <span v-if="item.render" v-html="item.render(scope.row)"></span>
          <span v-else>{{ scope.row[item.prop] }}</span>-->
          <!-- 注释 -->
          <span v-if="item.prop == 'comment'">
            <el-popover
              :append-to-body="false"
              :popper-class="checkComment(scope.row.comment, 'class', false)"
              placement="bottom"
              trigger="hover"
            >
              <span>{{ checkComment(scope.row.comment, "message", false) }}</span>
              <el-input
                slot="reference"
                v-model="scope.row.comment"
                :placeholder="`请输入${item.label}`"
                clearable
              ></el-input>
            </el-popover>
          </span>
          <!-- 属性名 -->
          <span v-if="item.prop == 'key'">
            <el-popover
              :append-to-body="false"
              :popper-class="checkComment(scope.row.key, 'class', true)"
              placement="bottom"
              trigger="hover"
            >
              <span>{{ checkComment(scope.row.key, "message", true) }}</span>
              <el-input
                slot="reference"
                v-model="scope.row.key"
                :placeholder="`请输入${item.label}`"
                clearable
              ></el-input>
            </el-popover>
          </span>
          <!-- 是否必填 -->
          <span v-if="item.prop == 'required'">
            <el-switch v-model="scope.row.required" active-color="#13ce66" inactive-color="#ddd"></el-switch>
          </span>
          <!-- 数据类型 -->
          <span v-if="item.prop == 'type'">
            <el-select
              v-model="scope.row.type"
              placeholder="请选择"
              :disabled="scope.row.primary"
              @change="
                (val) => {
                  changeDataType(val, scope);
                }
              "
            >
              <el-option
                v-for="item in dataTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <!-- 属性长度 -->
          <span v-if="item.prop == 'length'">
            <el-input v-model="scope.row.length" type="number" min="0" :placeholder="`请输入${item.label}`"></el-input>
          </span>
          <!-- 默认值 -->
          <span v-if="!scope.row.primary && item.prop == 'defaultValue'">
            <el-input v-model="scope.row.defaultValue" :placeholder="`请输入${item.label}`" clearable></el-input>
          </span>
          <!-- 数据库字段 -->
          <span v-if="item.prop == 'name'">
            <el-popover
              :append-to-body="false"
              :popper-class="checkComment(scope.row.name, 'class', true)"
              placement="bottom"
              trigger="hover"
            >
              <span>{{ checkComment(scope.row.name, "message", true) }}</span>
              <el-input
                slot="reference"
                v-model="scope.row.name"
                :placeholder="`请输入${item.label}`"
                clearable
              ></el-input>
            </el-popover>
          </span>
          <!-- 控件类型 -->
          <span v-if="!scope.row.primary && item.prop == 'ctrlType'">
            <el-popover
              :append-to-body="false"
              :popper-class="checkComment(scope.row.ctrl.type, 'class', false)"
              placement="bottom"
              trigger="hover"
            >
              <span>{{ checkComment(scope.row.ctrl.type, "message", false) }}</span>
              <el-select
                slot="reference"
                @change="(value) => changeCtrlType(value, scope)"
                v-model="scope.row.ctrl.type"
                :placeholder="`请选择${item.label}`"
              >
                <el-option
                  v-for="item in controlTypeOptions"
                  v-if="item.types.includes(scope.row.type)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-popover>
          </span>
          <!-- 控件配置 -->
          <span v-if="!scope.row.primary && item.prop == 'ctrlConfig'" style="text-align: left;width: 100%">
            <!-- 多行文本 -->
            <template v-if="scope.row.ctrl.type === '2'">
              <div style="display: flex; align-items: center; justify-content: space-between">
                <el-button
                  :type="scope.row.ctrl.config && scope.row.ctrl.config.isEditor ? 'success' : 'info'"
                  size="mini"
                  @click="changeMultipleType(scope.row, scope.$index)"
                  >{{ scope.row.ctrl.config && scope.row.ctrl.config.isEditor ? "编辑器" : "Textarea" }}</el-button
                >
                <span style="display: flex; align-items: center;margin-left: 5px;">
                  宽:
                  <el-input
                    @input="(value) => updateTextareaConfig(scope.row, value, 'ewidth')"
                    v-model="scope.row.ctrl.config.ewidth"
                  ></el-input>
                </span>
                <span style="display: flex; align-items: center;margin-left: 5px;">
                  高:
                  <el-input
                    @input="(value) => updateTextareaConfig(scope.row, value, 'eheight')"
                    v-model="scope.row.ctrl.config.eheight"
                  ></el-input>
                </span>
              </div>
            </template>
            <!-- 下拉框 单选、复选框 -->
            <template v-else-if="['3', '4', '5'].includes(scope.row.ctrl.type)">
              <el-button icon="el-icon-edit-outline" size="mini" type="primary" @click="setOptions(scope)"
                >设置</el-button
              >
            </template>
            <!-- 数据字典  -->
            <template v-else-if="scope.row.ctrl.type == '6'">
              <el-select
                placeholder="点击选择"
                @change="
                  (value) => {
                    changeDataDictionary(value, scope.row, scope.$index);
                  }
                "
                v-model="scope.row.ctrl.config.keyName"
              >
                <el-option
                  v-for="(item, index) in dataDictionaryLists"
                  :label="item.name"
                  :value="item.key"
                  :key="item.key"
                ></el-option>
              </el-select>
            </template>
            <!-- 流水号 -->
            <template v-if="scope.row.ctrl.type == '7'">
              <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="selectSerialNumber(scope)"
                >选择</el-button
              >
            </template>
            <el-button
              :type="scope.row.ctrl.config.placeholder ? 'success' : 'info'"
              size="mini"
              @click="changePlaceholder(scope.row, scope.$index)"
              >显示占位符</el-button
            >
            <el-input
              v-if="scope.row.ctrl.config && scope.row.ctrl.config.placeholder"
              placeholder="请输入控件placeholder的信息"
              v-model="scope.row.ctrl.config.placeholderText"
            ></el-input>
          </span>
          <!-- 字段校验 -->
          <span v-if="!scope.row.primary && item.prop == 'ctrlValidRule'">
            <validType
              :validCollects="scope.row.ctrl.validRule"
              :scope="scope"
              @updateValid="
                (validCollects) => {
                  updateValid(validCollects, scope);
                }
              "
            ></validType>
            <!-- <el-select
              v-model="scope.row.ctrl.validRule"
              multiple
              @change="(value)=>{changeValidType(value, scope.row, scope.$index)}"
              placeholder="请选择"
            >
              <el-option
                v-for="item in dataCheckOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="tableConfig.btnDescribe"
        :align="tableConfig.align"
        :width="tableConfig.operationWidth"
        v-if="tableConfig.operationList.length > 0 && !tableConfig.operationListBtnStatus"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.primary" style="color: red">主键字段</span>
          <template v-else>
            <el-button
              v-if="scope.$index > 1 || item.icon !== 'el-icon-caret-top'"
              v-for="(item, index) in tableConfig.operationList"
              :key="index"
              :disabled="item.isabled"
              :type="item.color"
              :icon="item.icon"
              @click="item.fun(scope.row, scope.$index)"
              size="mini"
              >{{ item.type }}</el-button
            >
          </template>
        </template>
      </el-table-column>
      <slot name="operationListBtnStatus"></slot>
    </el-table>
    <div class="clearfix mgt20" v-if="tableConfig.isShowPage">
      <div class="fl total-cont" v-show="tableConfig.pageData.total > 0">共{{ tableConfig.pageData.total }}条记录</div>
      <div class="fr">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableConfig.pageData.pageNum"
          :hide-on-single-page="true"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableConfig.pageData.pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="tableConfig.pageData.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 控件选项配置 -->
    <el-dialog
      :title="`字段${curScope.row.comment}控件配置`"
      :visible.sync="optionsVisible"
      width="30%"
      :append-to-body="true"
    >
      <optionsSet ref="optionsSet" :tableData="curScope.row.ctrl.config.options"></optionsSet>
      <div slot="footer">
        <el-button @click="addOptionCancel">取消</el-button>
        <el-button type="primary" @click="addOptionSure">确定</el-button>
      </div>
    </el-dialog>
    <!-- 流水号选择 -->
    <el-dialog title="流水号选择" :visible.sync="serialNumberVisible" width="40%" :append-to-body="true">
      <serialPop ref="serialPop" :curSelSerialKey="curSelSerialKey"></serialPop>
      <div slot="footer">
        <el-button @click="selectSerialCancel">取消</el-button>
        <el-button type="primary" @click="selectSerialSure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let vm;
let warnData =
  "1：以#{}包含的以脚本运行，eg:#{return sysScript.getCurrentUserName;}" +
  "2：以${}代表常量，具体如下：${currentUserId}：当前用户ID（字符串）${currentUserName}：当前用户名（字符串）${currentUserAccount}：当前用户账号（字符串）${currentOrgId}：当前用户组织ID（字符串）${currentOrgName}：当前用户组织名（字符串） ${currentOrgCode}：当前用户组织code（字符串）${currentDateTime}：当前时间（日期Date，只能在日期字段使用）";
import serialPop from "./serialPop";
import optionsSet from "./optionsSet";
import validType from "./validType";
export default {
  components: {serialPop, optionsSet, validType},
  props: {
    hasDatabaseTable: {
      type: Number,
      default: 0
    },
    tableConfiguration: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    vm = this;
    vm.warnData = warnData;
    return {
      optionsVisible: false, // 控件选项配置弹窗
      curScope: {row: {comment: "", ctrl: {config: {option: []}}}}, // 当前配置字段
      dataDictionaryLists: [
        {name: "证件类型", key: "idtype"},
        {name: "教育程度", key: "education"}
      ],
      serialNumberVisible: false, // 流水号选择弹窗

      curSelSerialKey: "", //当前所选流水
      dataCheckOptions: [
        {
          value: "0",
          label: "必填"
        },
        {
          value: "1",
          label: "数字"
        },
        {
          value: "2",
          label: "字母或下划线"
        },
        {
          value: "3",
          label: "email"
        },
        {
          value: "4",
          label: "url"
        },
        {
          value: "5",
          label: "日期"
        },
        {
          value: "6",
          label: "时间"
        },
        {
          value: "7",
          label: "汉字"
        },
        {
          value: "8",
          label: "QQ号"
        },
        {
          value: "9",
          label: "手机号码"
        },
        {
          value: "10",
          label: "整数"
        },
        {
          value: "11",
          label: "不以数字开头"
        },
        {
          value: "12",
          label: "以字母开头"
        }
      ],
      dataTypeOptions: [
        {
          value: "0",
          label: "大文本"
        },
        {
          value: "1",
          label: "日期型"
        },
        {
          value: "2",
          label: "数字型"
        },
        {
          value: "3",
          label: "字符串"
        }
      ],
      controlTypeOptions: [
        {
          value: "0",
          label: "隐藏",
          types: ["0", "1", "2", "3"]
        },
        {
          value: "1",
          label: "单行文本",
          types: ["2", "3"]
        },
        {
          value: "2",
          label: "多行文本",
          types: ["0", "3"]
        },
        {
          value: "3",
          label: "下拉框",
          types: ["2", "3"]
        },
        {
          value: "4",
          label: "复选框",
          types: ["3"]
        },
        {
          value: "5",
          label: "单选按钮",
          types: ["2", "3"]
        },
        {
          value: "6",
          label: "数据字典",
          types: ["2", "3"]
        },
        {
          value: "7",
          label: "流水号",
          types: ["2", "3"]
        },
        {
          value: "8",
          label: "城市选择",
          types: ["3"]
        },
        {
          value: "9",
          label: "在线签名",
          types: ["3"]
        },
        {
          value: "10",
          label: "附件上传",
          types: ["0", "3"]
        },
        {
          value: "11",
          label: "日期控件",
          types: ["1"]
        },
        {
          value: "12",
          label: "扫码（移动端）",
          types: ["3"]
        }
      ],
      // 控件选项表格
      optionsTableConfig: {
        // 多选
        IsSelection: true,
        // 列表栏
        tableList: [
          {prop: "comment", label: "注释"},
          {prop: "key", label: "属性名"}
        ],
        operationWidth: 280,
        // 操作
        operationList: [
          {
            type: "上移",
            icon: "el-icon-caret-top",
            color: "default",
            fun: (data, index) => {
              console.log("上移", data, index);
              this.moveUp(data, index);
            }
            // perms: "/sys/role/delete"
          },
          {
            type: "下移",
            icon: "el-icon-caret-bottom",
            color: "default",
            fun: (data, index) => {
              console.log("下移", data, index);
              this.moveDown(data, index);
            }
          },
          {
            type: "删除",
            icon: "el-icon-delete",
            color: "danger",
            fun: (data, index) => {
              console.log("删除", data, index);
              this.deleteFormItem(index);
            }
          }
        ],
        IsIndex: false
      },
      // 字段添加表格
      filedTableConfig: {
        // 列表栏位
        tableList: [
          {prop: "comment", label: "注释"},
          {prop: "key", label: "属性名"},
          {prop: "name", label: "数据库字段名"},
          {prop: "required", label: "是否必填", width: 80},
          {prop: "type", label: "数据类型"},
          {prop: "length", label: "属性长度", width: 100},
          {
            prop: "defaultValue",
            label: "默认值",
            width: 110,
            render: () => {
              return (
                <el-popover ref="popover4" placement="right-start" width="300" trigger="hover">
                  <p style="width: 100%; max-height: 300px;overflow:auto">{vm.warnData}</p>
                  <span slot="reference">
                    默认值 <i class="el-icon-warning" style="color: red"></i>
                  </span>
                </el-popover>
              );
            }
          },
          {prop: "ctrlType", label: "控件类型"},
          {prop: "ctrlConfig", label: "控件配置", width: 250},
          {prop: "ctrlValidRule", label: "字段校验"}
        ],
        // 列表数据
        tableData: [],
        // 操作栏按钮状态是否根据数据不同展示不同
        operationListBtnStatus: false,
        // 表格内容是否居中
        align: "center",
        // 操作栏位的宽度
        operationWidth: 100,
        // 是否展示分页
        isShowPage: true,
        // 分页信息
        pageData: {
          // 数据总数
          total: 0,
          // 当前页数
          pageNum: 1,
          // 每页显示多少条
          pageSize: 10
        },
        // 是否隐藏序号栏位
        IsIndex: true,
        //是否显示多选
        IsSelection: false,
        // 是否显示边框
        isborder: true,
        // 操作按钮描述
        btnDescribe: "操作",
        operationWidth: 280,
        // 操作
        operationList: [
          {
            type: "上移",
            icon: "el-icon-caret-top",
            color: "default",
            fun: (data, index) => {
              console.log("上移", data, index);
              this.moveUp(data, index);
            }
            // perms: "/sys/role/delete"
          },
          {
            type: "下移",
            icon: "el-icon-caret-bottom",
            color: "default",
            fun: (data, index) => {
              console.log("下移", data, index);
              this.moveDown(data, index);
            }
          },
          {
            type: "删除",
            icon: "el-icon-delete",
            color: "danger",
            fun: (data, index) => {
              console.log("删除", data, index);
              this.deleteFormItem(index);
            }
          }
        ],
        IsIndex: false
      },
      tableConfig: {}
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    //多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 添加字段
    addFormItem(item) {
      let exampleFormItem = {
        // sn: 0, // 排序
        comment: "", //注释
        key: "", //属性名
        name: "", //数据库字段名
        required: false, //是否必填
        type: "3", //数据类型  0-大文本 1-日期型 2-数字型 3-字符串
        length: 50, //属性长度
        defaultValue: null, //默认值
        //控件配置 0-隐藏 1-单行文本 2-多行文本 3-下拉框 4-复选框 5-单选按钮 6-数据字典 7-流水号 8-城市选择 9-在线签名 10-附件上传 11-日期 12-扫码（移动端）
        ctrl: {
          config: {}, // 配置
          type: "1", // 类型
          validRule: "[]" //字段校验
        },
        primary: false // 非主键标识
      };
      let len = this.tableConfig.tableData.length;
      let sn = len ? this.tableConfig.tableData[len - 1].sn : -1;
      exampleFormItem.title = `测试${sn + 1}`;
      exampleFormItem.sn = sn + 1;
      this.tableConfig.tableData.push(exampleFormItem);
    },
    // 删除表单项
    deleteFormItem(index) {
      this.tableConfig.tableData.splice(index, 1);
      //   this.tableConfig.tableData = this.tableConfig.tableData.filter(
      //     fomrItem => fomrItem.id != item.id
      //   );
    },
    // 上移
    moveUp(data, index) {
      if (index === 0) {
        return;
      }
      let prevItem = this.tableConfig.tableData.splice(index - 1, 1)[0];
      // console.log(this.tableConfig.tableData, prevItem);
      this.tableConfig.tableData.splice(index, 0, prevItem);
    },
    // 下移
    moveDown(data, index) {
      if (index >= this.tableConfig.tableData.length - 1) {
        return;
      }
      let nextItem = this.tableConfig.tableData.splice(index + 1, 1)[0];
      this.tableConfig.tableData.splice(index, 0, nextItem);
    },
    // 数据类型切换重置控件类型
    changeDataType(val, scope) {
      scope.row.ctrl = {
        config: {}, // 配置
        type: "", // 类型
        validRule: "[]" //字段校验
      };
    },
    // 控件类型切换重置控件配置
    changeCtrlType(val, scope) {
      scope.row.ctrl = {
        config: {}, // 配置
        type: val, // 类型
        validRule: "[]" //字段校验
      };
    },
    // 注释输入框校验
    checkComment(value, type, testReg) {
      // testReg - 格式验证
      let check;
      if (testReg) {
        check = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
      } else {
        check = value && value.trim().length > 0;
      }
      switch (type) {
        case "class":
          return check ? "right-popper" : "err-popper";
          break;
        case "message":
          return check ? "" : value ? "只能以字母开头,允许字母、数字和下划线" : "必填";
      }
    },
    // 多行文本更新控件配置
    updateTextareaConfig(row, value, attr) {
      row.ctrl.config[attr] = value;
      // console.log(this.tableConfig.tableData);
    },
    // 多行文本点击控件 按钮切换 多行输入框/富文本编辑器
    changeMultipleType(row, index) {
      let ctrl = row.ctrl;
      if (ctrl.config && ctrl.config.isEditor) {
        ctrl.config.isEditor = false;
      } else {
        ctrl.config.isEditor = true;
      }
      this.$set(this.tableConfig.tableData, index, row);
      // this.$forceUpdate();
    },
    // 占位符控制
    changePlaceholder(row, index) {
      let ctrl = row.ctrl;
      if (ctrl.config.placeholder) {
        ctrl.config.placeholder = false;
      } else {
        ctrl.config.placeholder = true;
      }
      this.$set(this.tableConfig.tableData, index, row);
    },
    // 带选项表单配置选项
    setOptions(scope) {
      let config = scope.row.ctrl.config;
      this.curScope = Object.assign({}, this.curScope, scope);
      if (!config.options || config.options.length == 0) {
        this.curScope.row.ctrl.config.options = [{txt: "", key: ""}];
      }
      this.optionsVisible = true;
    },
    renderRow(row) {
      // console.log(row)
    },
    // 带选项表单配置项-取消
    addOptionCancel() {
      this.optionsVisible = false;
    },
    // 带选项表单配置项-确定
    addOptionSure() {
      this.curScope.row.ctrl.config.options = this.$refs.optionsSet.options;
      this.$refs.optionsSet.options;
      this.$set(this.tableConfig.tableData, this.curScope.$index, this.curScope.row);
      this.optionsVisible = false;
    },
    // 数据字典
    changeDataDictionary(val, row, index) {
      row.ctrl.config.key = val;
      this.dataDictionaryLists.map((item) => {
        if (item.key == val) {
          row.ctrl.config.keyName = item.name;
        }
      });
      this.$set(this.tableConfig.tableData, index, row);
    },
    // 流水号
    selectSerialNumber(scope) {
      this.curScope = scope;
      this.curSelSerialKey = scope.row.ctrl.config.alias || "";
      this.serialNumberVisible = true;
    },
    // 流水号-取消
    selectSerialCancel() {
      this.serialNumberVisible = false;
    },
    // 流水号-确定
    selectSerialSure() {
      let key = this.$refs.serialPop.selSerialKey;
      if (key) {
        this.curScope.row.ctrl.config.alias = key;
        this.curScope.row.ctrl.config.name = this.$refs.serialPop.selSerialName;
        this.$set(this.tableConfig.tableData, this.curScope.$index, this.curScope.row);
      }
      this.serialNumberVisible = false;
    },
    // 字段校验修改
    updateValid(validCollects, scope) {
      let row = scope.row,
        index = scope.$index;
      row.ctrl.validRule = validCollects;
      this.$set(this.tableConfig.tableData, index, row);
    }
  },
  watch: {
    tableConfiguration: {
      handler(val) {
        // console.log(val.tableData, "addItem");
        this.tableConfig = Object.assign({}, this.filedTableConfig, JSON.parse(JSON.stringify(val)));
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.formItemEditTable {
  ::v-deep .el-input--suffix .el-input__inner {
    padding: 0 5px;
  }
  ::v-deep .el-table__header-wrapper,
  ::v-deep .el-table th,
  ::v-deep .el-table th .cell {
    overflow: visible;
  }
}
</style>
<style lang="scss">
.err-popper {
  width: auto;
  min-width: 50px;
  padding: 3px 5px;
  text-align: center;
  border-color: #dd514c;
  background: #f79491;
  .popper__arrow {
    border-bottom-color: #dd514c !important;
    &::after {
      border-bottom-color: #f79491 !important;
    }
  }
  + .el-input > .el-input__inner,
  + .el-select > .el-input > .el-input__inner {
    border-color: #dd514c;
  }
}
.right-popper {
  display: none !important;
}
</style>
