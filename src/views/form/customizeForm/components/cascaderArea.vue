<!-- @format -->

<template>
  <div>
    <div class="flex space-between align-center">
      <div class="flex align-center select-box">
        <!-- 省份 -->
        <el-select v-model="province" @change="getProviceName" placeholder="请选择">
          <el-option v-for="item in provinces" :key="item.id" :label="item.simplename" :value="item.code"></el-option>
        </el-select>
        <!-- 市区 -->
        <el-select v-model="city" @change="getCityName" placeholder="请选择">
          <el-option v-for="item in cities" :key="item.id" :label="item.simplename" :value="item.code"></el-option>
        </el-select>
        <!-- 市区 -->
        <el-select v-model="country" @change="getCountryName" placeholder="请选择">
          <el-option v-for="item in countries" :key="item.id" :label="item.simplename" :value="item.code"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="addArea">添加</el-button>
    </div>
    <!-- 已添加地区展示 -->
    <div class="areas-show-box">
      <div v-for="(area, index) in areas" class="area-item" :key="index">
        <span>{{ area.areaName }}</span>
        <i class="el-icon-delete" @click="deleteArea(index)"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editAreas: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      province: null, //当前所选省
      cur_province: "",
      city: null, //当前所选市区
      cur_city: "",
      country: null, //当前所选县
      cur_country: "",
      // areas: [], //添加的区域
      provinces: [
        {
          code: "11",
          fullname: null,
          id: 2402,
          pcode: "",
          simplename: "北京市"
        },
        {
          code: "35",
          fullname: null,
          id: 3618,
          pcode: "",
          simplename: "福建省"
        },
        {
          code: "43",
          fullname: null,
          id: 4322,
          pcode: "",
          simplename: "湖南省"
        },
        {
          code: "31",
          fullname: null,
          id: 3239,
          pcode: "",
          simplename: "上海市"
        },
        {
          code: "64",
          fullname: null,
          id: 5799,
          pcode: "",
          simplename: "宁夏回族自治区"
        },
        {
          code: "42",
          fullname: null,
          id: 4201,
          pcode: "",
          simplename: "湖北省"
        },
        {
          code: "53",
          fullname: null,
          id: 5292,
          pcode: "",
          simplename: "云南省"
        },
        {
          code: "52",
          fullname: null,
          id: 5101,
          pcode: "",
          simplename: "贵州省"
        },
        {
          code: "37",
          fullname: null,
          id: 3824,
          pcode: "",
          simplename: "山东省"
        },
        {
          code: "63",
          fullname: null,
          id: 5745,
          pcode: "",
          simplename: "青海省"
        },
        {
          code: "33",
          fullname: null,
          id: 3378,
          pcode: "",
          simplename: "浙江省"
        },
        {
          code: "12",
          fullname: null,
          id: 2420,
          pcode: "",
          simplename: "天津市"
        },
        {
          code: "50",
          fullname: null,
          id: 4855,
          pcode: "",
          simplename: "重庆市"
        },
        {
          code: "32",
          fullname: null,
          id: 3257,
          pcode: "",
          simplename: "江苏省"
        },
        {
          code: "44",
          fullname: null,
          id: 4476,
          pcode: "",
          simplename: "广东省"
        },
        {
          code: "54",
          fullname: null,
          id: 5438,
          pcode: "",
          simplename: "西藏自治区"
        },
        {
          code: "36",
          fullname: null,
          id: 3712,
          pcode: "",
          simplename: "江西省"
        },
        {
          code: "65",
          fullname: null,
          id: 5827,
          pcode: "",
          simplename: "新疆维吾尔自治区"
        },
        {
          code: "22",
          fullname: null,
          id: 3012,
          pcode: "",
          simplename: "吉林省"
        },
        {
          code: "46",
          fullname: null,
          id: 4805,
          pcode: "",
          simplename: "海南省"
        },
        {
          code: "13",
          fullname: null,
          id: 2438,
          pcode: "",
          simplename: "河北省"
        },
        {
          code: "45",
          fullname: null,
          id: 4679,
          pcode: "",
          simplename: "广西壮族自治区"
        },
        {
          code: "62",
          fullname: null,
          id: 5642,
          pcode: "",
          simplename: "甘肃省"
        },
        {
          code: "14",
          fullname: null,
          id: 2641,
          pcode: "",
          simplename: "山西省"
        },
        {
          code: "21",
          fullname: null,
          id: 2897,
          pcode: "",
          simplename: "辽宁省"
        },
        {
          code: "23",
          fullname: null,
          id: 3091,
          pcode: "",
          simplename: "黑龙江省"
        },
        {
          code: "61",
          fullname: null,
          id: 5524,
          pcode: "",
          simplename: "陕西省"
        },
        {
          code: "15",
          fullname: null,
          id: 2775,
          pcode: "",
          simplename: "内蒙古自治区"
        },
        {
          code: "34",
          fullname: null,
          id: 3480,
          pcode: "",
          simplename: "安徽省"
        },
        {
          code: "41",
          fullname: null,
          id: 3998,
          pcode: "",
          simplename: "河南省"
        },
        {
          code: "51",
          fullname: null,
          id: 4896,
          pcode: "",
          simplename: "四川省"
        }
      ],
      cities: [
        {
          code: "350200000000",
          fullname: null,
          id: 3633,
          pcode: "35",
          simplename: "厦门市"
        },
        {
          code: "350100000000",
          fullname: null,
          id: 3619,
          pcode: "35",
          simplename: "福州市"
        },
        {
          code: "350700000000",
          fullname: null,
          id: 3683,
          pcode: "35",
          simplename: "南平市"
        },
        {
          code: "350900000000",
          fullname: null,
          id: 3702,
          pcode: "35",
          simplename: "宁德市"
        },
        {
          code: "350600000000",
          fullname: null,
          id: 3671,
          pcode: "35",
          simplename: "漳州市"
        },
        {
          code: "350300000000",
          fullname: null,
          id: 3640,
          pcode: "35",
          simplename: "莆田市"
        },
        {
          code: "350500000000",
          fullname: null,
          id: 3659,
          pcode: "35",
          simplename: "泉州市"
        },
        {
          code: "350400000000",
          fullname: null,
          id: 3646,
          pcode: "35",
          simplename: "三明市"
        },
        {
          code: "350800000000",
          fullname: null,
          id: 3694,
          pcode: "35",
          simplename: "龙岩市"
        }
      ],
      countries: [
        {
          code: "350524000000",
          fullname: null,
          id: 3665,
          pcode: "350500000000",
          simplename: "安溪县"
        },
        {
          code: "350525000000",
          fullname: null,
          id: 3666,
          pcode: "350500000000",
          simplename: "永春县"
        },
        {
          code: "350526000000",
          fullname: null,
          id: 3667,
          pcode: "350500000000",
          simplename: "德化县"
        },
        {
          code: "350581000000",
          fullname: null,
          id: 3668,
          pcode: "350500000000",
          simplename: "石狮市"
        },
        {
          code: "350582000000",
          fullname: null,
          id: 3669,
          pcode: "350500000000",
          simplename: "晋江市"
        },
        {
          code: "350583000000",
          fullname: null,
          id: 3670,
          pcode: "350500000000",
          simplename: "南安市"
        },
        {
          code: "350502000000",
          fullname: null,
          id: 3660,
          pcode: "350500000000",
          simplename: "鲤城区"
        },
        {
          code: "350503000000",
          fullname: null,
          id: 3661,
          pcode: "350500000000",
          simplename: "丰泽区"
        },
        {
          code: "350504000000",
          fullname: null,
          id: 3662,
          pcode: "350500000000",
          simplename: "洛江区"
        },
        {
          code: "350505000000",
          fullname: null,
          id: 3663,
          pcode: "350500000000",
          simplename: "泉港区"
        },
        {
          code: "350521000000",
          fullname: null,
          id: 3664,
          pcode: "350500000000",
          simplename: "惠安县"
        }
      ]
    };
  },
  methods: {
    // 获取所选区域名称
    getProviceName(value) {
      this.provinces.forEach((province, index) => {
        if (province.code === value) {
          this.cur_province = province;
        }
      });
      console.log("province", value);
    },
    getCityName(value) {
      console.log("city", value);
      this.cities.forEach((city, index) => {
        if (city.code === value) {
          this.cur_city = city;
        }
      });
    },
    getCountryName(value) {
      console.log("country", value);
      this.countries.forEach((country, index) => {
        if (country.code === value) {
          this.cur_country = country;
        }
      });
    },
    // 添加
    addArea() {
      console.log(this.cur_province);
      if (!this.cur_province.code && !this.cur_city.code && !this.cur_country.code) {
        return;
      }
      this.areas.push({
        provinceCode: this.cur_province.code,
        cityCode: this.cur_city.code,
        country: this.cur_country.code,
        areaName: `${this.cur_province.simplename || ""} ${this.cur_city.simplename || ""} ${this.cur_country
          .simplename || ""}`
      });
      this.$message.success("添加成功！");
      this.$emit("update", this.areas);
    },
    // 删除
    deleteArea(index) {
      this.areas.splice(index, 1);
      this.$message.success("删除成功！");
      this.$emit("update", this.areas);
    }
  },
  computed: {
    areas() {
      return this.data;
    }
  },
  watch: {
    data: {
      handler(val, oldVal) {
        if (val && val != [] && val !== oldVal) {
          // this.areas = val;
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  &.space-between {
    justify-content: space-between;
  }
  &.align-center {
    align-items: center;
  }
}
.areas-show-box {
  .area-item {
    height: 40px;
    padding: 0 8px;
    background: rgb(245, 245, 245);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
}
.select-box {
  ::v-deep .el-select {
    margin-right: 15px;
  }
}
</style>
