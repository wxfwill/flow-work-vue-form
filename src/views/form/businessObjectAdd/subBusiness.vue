<!-- @format -->

<template>
  <div>
    <el-button
      v-if="tableKey"
      type="primary"
      size="mini"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="addSubBusiness"
      >添加子业务实体</el-button
    >
    <el-card>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" prop="type" label="类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.type">
              <el-option
                v-for="(type, index) in typeLists"
                :key="index"
                :label="type.name"
                :value="type.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="tableComment" label="描述"></el-table-column>
        <el-table-column align="center" prop="tableKey" label="别名"></el-table-column>
        <el-table-column align="center" prop="foreignKey" label="外键" width="530">
          <template slot-scope="scope">
            <div class="fksConfig" v-for="(fk, index) in scope.row.fks" :key="index">
              <div class="sel-box">
                <!-- 子表单 -->
                <el-popover
                  :append-to-body="false"
                  :popper-class="checkComment(fk.from, 'class', false)"
                  placement="bottom"
                  trigger="hover"
                >
                  <span>{{ checkComment(fk.from, "message", false) }}</span>
                  <el-select slot="reference" class="small" v-model="fk.from">
                    <el-option
                      v-for="(subItem, subIndex) in subFormItems"
                      :key="subIndex"
                      :label="subItem.comment"
                      :value="subItem.key"
                    ></el-option>
                  </el-select>
                </el-popover>
                <!-- 对应方式 -->
                <el-select class="middle" v-model="fk.type">
                  <el-option
                    v-for="(filed, filedIndex) in parentFields"
                    :key="filedIndex"
                    :label="filed.desc"
                    :value="filed.key"
                  ></el-option>
                </el-select>
                <!-- 父表单 -->
                <el-popover
                  :append-to-body="false"
                  :popper-class="checkComment(fk.value, 'class', false)"
                  placement="bottom"
                  trigger="hover"
                >
                  <span>{{ checkComment(fk.value, "message", false) }}</span>
                  <el-select slot="reference" class="small" v-model="fk.value">
                    <el-option
                      v-for="(parentItem, parentIndex) in parentFormItems"
                      :key="parentIndex"
                      :label="parentItem.comment"
                      :value="parentItem.key"
                    ></el-option>
                  </el-select>
                </el-popover>
              </div>
              <div style="margin-left: 8px">
                <el-button
                  v-if="scope.row.fks && scope.row.fks.length > 1"
                  type="default"
                  icon="el-icon-close"
                  size="mini"
                  @click="deleteFkConfig(scope.row, scope.$index, index)"
                ></el-button>
                <el-button
                  v-if="scope.row.fks.length == index + 1"
                  type="default"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addFkConfig(scope.row, scope.$index)"
                ></el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteSubBusiness(scope)"></el-button>
            <subTableConfigBtn
              :row="scope.row"
              :index="scope.$index"
              @addBusinessEntities="addBusinessEntities"
            ></subTableConfigBtn>
            <!-- <el-button
              type="primary"
              size="mini"
              el-icon="el-icon-edit-outline"
            >配置子表</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加子业务实体 -->
    <el-dialog
      title="业务表列表"
      :visible="buesinessEntityVisible"
      width="60%"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="addSubBusinessCancel"
    >
      <buesinessEntityAdd ref="buesinessEntityAdd"></buesinessEntityAdd>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="addSubBusinessSure">确定</el-button>
        <el-button type="default" size="mini" @click="addSubBusinessCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import subTableConfigBtn from "./subTableConfigBtn";
import {subFormItems, parentFields, parentFormItems} from "./demo.js";
import buesinessEntityAdd from "./buesinessEntityAdd";
export default {
  name: "subBusiness",
  components: {subTableConfigBtn, buesinessEntityAdd},
  props: {
    tableKey: {
      type: String,
      default: ""
    },
    subBusinessEntities: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 添加子业务实体
      buesinessEntityVisible: false,
      // 已选业务
      businessEntities: [],
      // 类型列表
      typeLists: [
        {name: "一对一", value: "oneToOne"},
        {name: "一对多", value: "oneToMore"}
      ],
      tableData: [
        {
          type: "oneToOne", //类型
          tableComment: "表单控件案例子表", //描述
          tableKey: "别名", //别名
          fks: [
            {from: "dj", type: "parentField", value: "id"},
            {from: "dj", type: "parentField", value: "id"}
          ], //外键
          upperFirstTableKey: "", // 与tableKey一致  定义未知
          children: [] //子表
        }
      ],
      subFormItems: subFormItems,
      parentFields: parentFields,
      parentFormItems: parentFormItems
    };
  },
  methods: {
    // 输入框校验
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
    // 新增子业务实体
    addSubBusiness() {
      console.log("新增子业务实体");
      // let subBusinessItem = {
      //   type: "oneToOne", //类型
      //   tableComment: "表单控件案例子表", //描述
      //   tableKey: "别名", //别名
      //   fks: [{ from: "", type: "parentField", value: "" }], //外键
      //   upperFirstTableKey: "", // 与tableKey一致  定义未知
      //   children: [] //子表
      // };
      // this.tableData.push(subBusinessItem);
      this.buesinessEntityVisible = true;
    },
    // 删除子业务实体
    deleteSubBusiness(scope) {
      this.tableData.splice(scope.$index, 1);
    },
    // 删除外键配置
    deleteFkConfig(row, scopeIndex, fkIndex) {
      row.fks.splice(fkIndex, 1);
      this.$set(this.tableData, scopeIndex, row);
      console.log(row.fks);
    },
    // 添加外键配置
    addFkConfig(row, index) {
      row.fks.push({from: "", type: "parentField", value: ""});
      this.$set(this.tableData, index, row);
    },
    // 添加子业务实体-取消
    addSubBusinessCancel() {
      this.buesinessEntityVisible = false;
    },
    // 添加子业务实体-确定
    addSubBusinessSure() {
      let checkedBusEntityLists = JSON.parse(JSON.stringify(this.$refs.buesinessEntityAdd.checkedLists));
      // 清空已选
      this.$refs.buesinessEntityAdd.deleteAll();
      console.log("添加子业务实体-确定", checkedBusEntityLists);
      let resetBusinessEntities = checkedBusEntityLists.map((item) => {
        return {
          type: "oneToOne", //类型
          tableComment: item.desc, //描述
          tableKey: item.tableKey, //别名
          fks: [{from: "", type: "parentField", value: ""}], //外键
          upperFirstTableKey: item.tableKey, // 与tableKey一致  定义未知
          children: [] //子表
        };
      });
      this.tableData = this.tableData.concat(resetBusinessEntities);
      this.buesinessEntityVisible = false;
    },
    // subTableConfigBtn 组件 添加业务实体
    addBusinessEntities(row, index) {
      this.$set(this.tableData, index, row);
      console.log(this.tableData, "subTableConfigBtn 组件 添加业务实体");
    }
  },
  watch: {
    subBusinessEntities: {
      handler(val) {
        this.tableData = val;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.fksConfig,
.sel-box {
  display: flex;
  align-items: center;
  ::v-deep .el-select.small {
    width: 120px;
  }
  ::v-deep .el-select.middle {
    width: 200px;
  }
  + .fksConfig {
    margin-top: 5px;
  }
}
</style>
