<template>
  <div>
    <div class="bread">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="line-height:48px;height:48px;background: #EAF5FF;"
      >
        <el-breadcrumb-item>
          <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
        </el-breadcrumb-item>
        <el-breadcrumb-item style="line-height: 52px;">档案转出</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base-content dazc">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="档案转出" name="first">
          <!--查询 -->
          <el-form ref="form" :model="formData" :rules="rules" class="formData">
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm">
                  <el-input v-model="formData.sfzhm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm">
                  <el-input v-model="formData.xm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档编号：" prop="cdbh">
                  <el-input v-model="formData.cdbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="btn_parent">
              <el-button type="primary" size="medium" class="base_btn" @click="form_submit">查询</el-button>
              <el-button
                size="medium"
                class="base_btn"
                style="margin-left:20px;"
                @click="form_reset"
              >重置</el-button>
            </div>
          </el-form>
          <!-- 基本信息 -->
          <div class="base-content_public base-content_personMes" v-if="flag">
            <div>
              <my-bread level1="iconjichuxinxi" level2="基础信息"></my-bread>
            </div>
            <div>
              <el-form ref="BaseForm" :model="BaseFormData" class="BaseFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名：">
                      <!-- @click="see(BaseFormData.grbh)"
                      class="base_input_view HasColor"-->
                      <span class="base_input_view" :title="BaseFormData.xm">{{BaseFormData.xm}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="性别："
                    >{{BaseFormData.xb == 1? '男':BaseFormData.xb == 2?'女':''}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="存档日期：">
                      <input v-model="BaseFormData.cdrq" class="base_input_view Baseclass" readonly />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="委托存档单位：">
                      <!-- @click="see(BaseFormData.grbh)"
                      class="base_input_view HasColor"-->
                      <span class="base_input_view" :title="BaseFormData.dwmc">{{BaseFormData.dwmc}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在位置：">
                      <input
                        v-model="BaseFormData.dacfwz"
                        class="base_input_view Baseclass"
                        readonly
                        :title="BaseFormData.dacfwz"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 转出信息 -->
          <div class="base-content_public" style="margin-top: 10px;" v-if="flag">
            <div>
              <my-bread level1="iconzaitu" level2="转出信息"></my-bread>
            </div>
            <el-form ref="forms" :model="out_FormData" class="dazcFormData" :rules="rules1">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="转出原因：" prop="zcyy" required>
                    <el-select
                      v-model="out_FormData.zcyy"
                      value-key="value"
                      clearable
                      class="zcyy_select"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zcyy_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="转出去向：" prop="zcqx" required>
                    <el-cascader
                      v-model="csd_arr"
                      @change="handleChange"
                      :options="options"
                      clearable
                      class="zcyy_select"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="具体去向：" prop="jtqx" required>
                    <el-input v-model="out_FormData.jtqx"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="转递方式：" prop="zdfs" required>
                    <el-select
                      v-model="out_FormData.zdfs"
                      value-key="value"
                      clearable
                      class="zcyy_select"
                    >
                      <el-option
                        :label="item.dmmc"
                        :value="item.dmid"
                        v-for="item in zdfs_dmb"
                        :key="item.dmid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="转出日期：" prop="zcrq" required>
                    <el-date-picker
                      v-model="out_FormData.zcrq"
                      align="right"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="取档人：" prop="dajsr" required>
                    <el-input v-model="out_FormData.dajsr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="取档人电话：" prop="jsrlxdh" required>
                    <el-input v-model="out_FormData.jsrlxdh"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注：" prop="zcbz">
                    <el-input v-model="out_FormData.zcbz"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="btn_parent">
                <el-button type="primary" size="medium" class="base_btn" @click="out_submit">确定</el-button>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- 档案转出查询 -->
        <el-tab-pane label="档案转出查询" name="second">
          <el-form
            ref="Search_formData"
            :model="Search_formData"
            :rules="Search_rules"
            class="formData"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm">
                  <el-input v-model="Search_formData.sfzhm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm">
                  <el-input v-model="Search_formData.xm"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档编号：" prop="cdbh">
                  <el-input v-model="Search_formData.cdbh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="接档日期开始：" prop="zckssj">
                  <el-date-picker
                    v-model="Search_formData.zckssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接档日期结束：" prop="zcjssj">
                  <el-date-picker
                    v-model="Search_formData.zcjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="档案状态：" prop="dazt" class="dazt_select">
                  <el-select v-model="Search_formData.dazt">
                    <el-option label="当前" value="1"></el-option>
                    <el-option label="转出" value="2"></el-option>
                    <el-option label="全部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>-->
            </el-row>
            <div class="btn_parent">
              <el-button
                type="primary"
                size="medium"
                @click="Search_submit(1, 1)"
                class="base_btn"
              >查询</el-button>
              <el-button
                size="medium"
                class="base_btn"
                style="margin-left:20px;"
                @click="form_reset"
              >重置</el-button>
            </div>
          </el-form>
          <!-- 证明查询信息 -->
          <div class="base-content_public" style="margin-top: 10px;" v-if="secondFlag">
            <div class="searchResult">
              <my-bread level1="iconzaitu" level2="查询结果"></my-bread>
              <p class="totles">共{{Search_total}}条</p>
            </div>
            <div class="table_div">
              <el-table
                :data="Search_tableData"
                stripe
                @sort-change="sortChange"
                style="width: 100%"
              >
                <el-table-column prop="xh" label="序号" min-width="10%" align="center"></el-table-column>
                <el-table-column
                  prop="sfzhm"
                  label="身份证号码"
                  sortable="custom"
                  min-width="15%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="xm"
                  label="姓名"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="cdbh"
                  label="存档编号"
                  sortable="custom"
                  min-width="15%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="zcrq"
                  label="转出日期"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="zcqx"
                  label="转往行政区划"
                  sortable="custom"
                  min-width="15%"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="czyxm"
                  label="操作员"
                  sortable="custom"
                  min-width="10%"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <el-row class="btn_parent page_style" v-if="Search_totalFlag">
            <el-pagination
              @current-change="SearchCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total, jumper"
              :total="Search_total"
              :page-size="pageSize"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import "@/common/scss/common.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getData, deepClone } from "@/common/js/common";
import { create } from "domain";
export default {
  data() {
    return {
      zcFlag: "",
      disabled: true,
      fwqsj: "",
      formData: {},
      sfzhm: "",
      rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }]
      },
      options: [],
      zdfsTitle: "",
      csd_arr: [], //行政区划
      zcyy_dmb: [], //代码表 转出原因
      zdfs_dmb: [], //代码表 转递方式
      rules1: {
        zcyy: [{ validator: validator('2, "full", "转出原因", false') }],
        zcqx: [{ validator: validator('12, "full", "转出去向", false') }],
        jtqx: [{ validator: validator('128, "full", "具体去向", false') }],
        zdfs: [{ validator: validator('2, "full", "转档方式", false') }],
        zcrq: [{ validator: validator('10, "full", "转出日期", false') }],
        dajsr: [{ validator: validator('32, "full", "取档人", false') }],
        jsrlxdh: [
          { validator: validator('11, "full", "取档人联系电话", false') }
        ],
        zcbz: [{ validator: validator('256, "full", "备注", true') }]
      },
      BaseFormData: {}, //基本信息
      out_FormData: {
        zcyy: "",
        jtqx: "",
        dajsr: "",
        jsrlxdh: "",
        zcrq: "" //转出日期
      }, //转出信息
      Search_formData: { dazt: "1" }, //查询tab的form数据
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        zckssj: [{ validator: validator('10, "full", "接档日期开始", true') }],
        zcjssj: [{ validator: validator('10, "full", "接档日期结束", true') }],
        dazt: [{ validator: validator('1, "full", "档案状态", true') }]
      }, //查询tab的form校验
      Search_tableData: [],
      Search_totalFlag: false,
      secondFlag: false,
      Search_total: "",
      pageNum: 1,
      pageSize: 12,
      dwxzTitle: "",
      dwxz_dmb: [],
      activeName: "first",
      dwlist: [],
      flag: false,
      form_data_page: "",
      cdid: "",
      totals: "0",
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > new Date(this.fwqsj).getTime();
        }
      },
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.Search_formData.zcjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.Search_formData.zckssj;
          if (beginDateVal) {
            return (
              time.getTime() > new Date(this.fwqsj).getTime() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return time.getTime() > new Date(this.fwqsj).getTime();
          }
        }
      }
    };
  },
  beforeMount() {
    this.fwqsj = JSON.parse(sessionStorage.getItem("czyInfo")).xtsj;
  },
  methods: {
    getdmb() {
      var _this = this;
      const zcyy_data = { table_name: "szdayy_d_zcyy" }; //转出原因
      getData("/dmbgl/dmblbCx", zcyy_data, function(res) {
        _this.zcyy_dmb = res.returnData.dmblb;
      });
      const zdfs_data = { table_name: "szdayy_d_zdfs" }; //转出原因
      getData("/dmbgl/dmblbCx", zdfs_data, function(res) {
        _this.zdfs_dmb = res.returnData.dmblb;
      });
    },
    // 列表排序
    sortChange(column, prop, order) {
      if (column.prop == "czyxm") {
        column.prop = "czyid";
      }
      this.form_data_page.prop = column.prop;
      this.form_data_page.order = column.order;
      var _this = this;
      getData(
        "/dafw/dazccx",
        this.form_data_page,
        function(res) {
          _this.Search_tableData = res.returnData.dazcs;
          for (var i = 0; i < res.returnData.dazcs.length; i++) {
            //序号赋值
            _this.Search_tableData[i].xh = res.startNum - 0 + i;
          }
          // _this.Search_totalFlag = true;
          // _this.secondFlag = true;
          _this.Search_total = res.rowsCount;
        },
        function() {
          _this.Search_totalFlag = false;
          _this.secondFlag = false;
        }
      );
    },
    form_submit() {
      //查询
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.formData.sfzhm || this.formData.cdbh || this.formData.xm) {
            const data = this.formData;
            var _this = this;
            getData(
              "/dafw/dazcxxCx",
              data,
              function(res) {
                _this.flag = true;
                _this.BaseFormData = res.returnData.dazcxx;
                _this.out_FormData.zcrq = _this.fwqsj;
                _this.out_FormData.dajsr = res.returnData.dazcxx.xm;
                _this.out_FormData.jsrlxdh = res.returnData.dazcxx.sj;
                // 判断转出的状态type
                _this.zcFlag = res.returnData.type;
              },
              function() {
                _this.flag = false;
              }
            );
          } else {
            this.$alert("请输入查询条件！", {
              center: true,
              confirmButtonText: "确定"
            });
          }
        }
      });
    },
    xzqhCx() {
      // 行政区划查询
      $.get("/xzqh2.json").then(res => {
        this.options = res.returnData.xzqhlb;
      });
    },
    handleChange() {
      // 获取行政区划最后一级传给后台
      this.out_FormData.zcqx = this.csd_arr[this.csd_arr.length - 1];
      this.$nextTick(() => {
        this.$refs.forms.clearValidate();
      });
    },
    // 转出报错接口
    zc_submit() {
      const data = this.out_FormData;
      data.cdid = this.BaseFormData.cdid;
      data.grbh = this.BaseFormData.grbh;
      $({
        url: "/dafw/dagd",
        method: "post",
        data: data
      }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.$message({
            type: "success",
            center: true,
            message: res.returnMsg
          });
          this.BaseFormData = {};
          this.out_FormData = { zcrq: this.fwqsj };
          this.csd_arr = [];
          this.$nextTick(() => {
            if (this.$refs.forms) {
              this.$refs.forms.clearValidate();
            }
          });
          this.flag = false;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 转出报错提示
    out_submit() {
      this.$refs["forms"].validate(valid => {
        if (valid && this.zcFlag == false) {
          this.$confirm("此材料处于外借中是否继续转出？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.zc_submit();
            })
            .catch(() => {});
        } else if (valid) {
          this.$confirm("确定要转出吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.zc_submit();
            })
            .catch(() => {});
        }
      });
    },
    SearchCurrentChange(val) {
      //分页
      this.Search_submit(val);
    },
    Search_submit(num, flag) {
      // 查询tab
      this.$refs.Search_formData.validate(valid => {
        if (valid) {
          if (flag == 1) {
            this.form_data_page = deepClone(this.Search_formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || this.pageNum;
          var _this = this;
          getData(
            "/dafw/dazccx",
            data,
            function(res) {
              _this.Search_tableData = res.returnData.dazcs;
              for (var i = 0; i < res.returnData.dazcs.length; i++) {
                //序号赋值
                _this.Search_tableData[i].xh = res.startNum - 0 + i;
              }
              _this.Search_totalFlag = true;
              _this.secondFlag = true;
              _this.Search_total = res.rowsCount;
            },
            function() {
              _this.Search_totalFlag = false;
              _this.secondFlag = false;
            }
          );
        }
      });
    },
    handleClick(tab, event) {
      //tabs切换
      if (this.activeName == "first") {
        this.flag = false;
        this.BaseFormData = {};
        this.out_FormData = {};
        this.csd_arr = [];
        if (this.$refs.forms) {
          this.$refs.forms.clearValidate();
        }
      } else if (this.activeName == "second") {
        this.secondFlag = false;
        this.Search_totalFlag = false;
        this.Search_formData = { dazt: "1" };
      }
    },
    form_reset() {
      //重置
      this.formData = {};
      this.Search_formData = { dazt: "1" };
    },
    // 跳转个人页面
    see(row) {
      this.$router.push({ path: "/dagl/personal", query: { grbh: row } });
    }
  },

  created() {
    this.xzqhCx();
    this.getdmb();
  }
};
</script>

<style>
.el-form-item__label {
  width: 110px;
}
.btn_parent {
  text-align: center;
}
.zmxx_btn {
  width: 116px;
  height: 32px;
  border: none;
  background: -webkit-linear-gradient(left, #0081e6, #39b5fd);
  color: #fff;
  border-radius: 4px;
}
.formData {
  margin-bottom: 10px;
  padding: 20px;
  background-color: #fff;
}
.J_dropdown {
  position: absolute;
  min-width: 200px;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  background: #ffffff;
  padding: 5px 10px;
  box-sizing: border-box;
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
}
.J_dropdown li {
  line-height: 1.2;
  padding: 5px 0;
  color: #6d6c6c;
  cursor: pointer;
}
.table_div {
  padding: 0 20px;
}
.Baseclass,
.HasColor {
  width: 53%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.HasColor {
  color: #1488f5;
  cursor: pointer;
}
.searchResult {
  position: relative;
}
.totles {
  position: absolute;
  left: 12%;
  top: 16px;
}
.dazcFormData {
  margin: 10px 20px 0 20px;
  padding-bottom: 20px;
}
.BaseFormData {
  margin: 15px 20px 0 20px;
}
.BaseFormData input {
  border: none;
}
.page_style {
  margin: 20px 0;
}
</style>
