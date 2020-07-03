<!-- @format -->

<template>
  <div class="formItemEditTable">
    <el-table
      id="tableId"
      :data="tableConfig.tableData"
      ref="table"
      :border="tableConfig.isborder"
      row-key="id"
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
        :width="item.width"
        v-for="(item, index) in tableConfig.tableList"
        :key="index"
      >
        <template slot-scope="scope">
          <!-- <span v-if="item.render" v-html="item.render(scope.row)"></span>
          <span v-else>{{ scope.row[item.prop] }}</span>-->
          <!-- 注释 -->
          <span v-if="item.prop == 'note'">
            <el-input v-model="scope.row.note" :placeholder="`请输入${item.label}`" clearable></el-input>
          </span>
          <!-- 属性名 -->
          <span v-if="item.prop == 'attributeName'">
            <el-input v-model="scope.row.attributeName" :placeholder="`请输入${item.label}`" clearable></el-input>
          </span>
          <!-- 表单项名称 -->
          <span v-if="item.prop == 'label'">
            <el-input v-model="scope.row.label" :placeholder="`请输入${item.label}`" clearable></el-input>
          </span>
          <!-- 是否必填 -->
          <span v-if="item.prop == 'isRequired'">
            <el-switch v-model="scope.row.isRequired" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </span>
          <!-- 数据类型 -->
          <span v-if="item.prop == 'dataType'">
            <el-select v-model="scope.row.dataType" placeholder="请选择">
              <el-option
                v-for="item in dataTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <!-- 属性长度 -->
          <span v-if="item.prop == 'attributeLength'">
            <el-input
              v-model="scope.row.attributeLength"
              type="number"
              min="0"
              :placeholder="`请输入${item.label}`"
            ></el-input>
          </span>
          <!-- 默认值 -->
          <span v-if="item.prop == 'defaultValue'">
            <el-input v-model="scope.row.defaultValue" :placeholder="`请输入${item.label}`" clearable></el-input>
          </span>
          <!-- 数据库字段 -->
          <span v-if="item.prop == 'dataId'">
            <el-input v-model="scope.row.dataId" :placeholder="`请输入${item.label}`" clearable></el-input>
          </span>
          <!-- 字段校验 -->
          <span v-if="item.prop == 'isCheck'">
            <el-select v-model="scope.row.isCheck" placeholder="请选择">
              <el-option
                v-for="item in dataCheckOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <!-- 控件类型 -->
          <span v-if="item.prop == 'type'">
            <el-select v-model="scope.row.type" :placeholder="`请选择${item.label}`">
              <el-option
                v-for="item in controlTypeOptions"
                v-if="item.types.includes(scope.row.dataType)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
          <el-button
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
  </div>
</template>
<script>
export default {
  props: {
    tableConfiguration: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
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
      ]
    };
  },
  computed: {
    tableConfig() {
      return Object.assign(
        {
          // 列表栏位
          tableList: [],
          // 列表数据
          tableData: [],
          // 操作
          operationList: [],
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
          btnDescribe: "操作"
        },
        this.tableConfiguration
      );
    }
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
    }
  }
};
</script>
<style lang="scss" scoped>
.formItemEditTable {
  ::v-deep .el-input--suffix .el-input__inner {
    padding: 0 5px;
  }
}
</style>
