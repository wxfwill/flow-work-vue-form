<!-- @format -->

<template>
  <div>
    <el-select v-model="validCollectsArr" multiple @change="changeValidType" placeholder="请选择">
      <el-option v-for="item in dataCheckOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    validCollects: {
      type: String,
      default: ""
    },
    scope: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      validCollectsArr: [],
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
      ]
    };
  },
  methods: {
    changeValidType(val) {
      let validCollects = [];
      this.validCollectsArr &&
        this.validCollectsArr.forEach((item) => {
          this.dataCheckOptions.forEach((option) => {
            if (item == option.value) {
              validCollects.push({
                name: option.value,
                title: option.label
              });
            }
          });
        });
      this.$emit("updateValid", JSON.stringify(validCollects));
    }
  },
  computed: {
    curScope() {
      return this.scope;
    }
  },
  watch: {
    validCollects: {
      handler(val) {
        if (val && val.length > 0) {
          let validCollectsArr = JSON.parse(val);
          if (validCollectsArr && validCollectsArr.length > 0) {
            this.validCollectsArr = validCollectsArr.map((item) => {
              return item.name;
            });
          } else {
            this.validCollectsArr = [];
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
