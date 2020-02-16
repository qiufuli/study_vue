<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px;height:48px;background: #EAF5FF;">
        <el-breadcrumb-item>
          <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
        </el-breadcrumb-item>
        <el-breadcrumb-item style="line-height: 52px;">档案接收</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base-content dajs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="档案接收" name="first">
          <!--查询 -->
          <el-form ref="form" :model="formData" :rules="rules" class="formData">
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码：" prop="sfzhm" required>
                  <el-input v-model="formData.sfzhm" @blur="sfzSearch($event)" :disabled="flag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="xm" required>
                  <el-input v-model="formData.xm" :disabled="flag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：" required>
                  <!-- <el-radio v-model="formData.xb" label="1" :disabled="xb_flag">男</el-radio>
                  <el-radio v-model="formData.xb" label="2" :disabled="xb_flag">女</el-radio> -->
                  <span style="margin-left: 15px;" v-if="boy_flag">男</span>
                  <span style="margin-left: 15px;" v-if="gir_flag">女</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="档案存放位置：" prop="dacfwz" required>
                  <el-input v-model="formData.dacfwz" :disabled="flag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码：" prop="sj" required>
                  <el-input v-model="formData.sj"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档日期：" prop="cdrq" required>
                  <el-date-picker
                    v-model="formData.cdrq"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :class="{'as_pad':as_padfalg}"
                    :disabled="flag"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="所属单位：" prop="dwmc" class="dajs_ssdw" required>
                  <el-autocomplete
                    v-model="formData.dwmc"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    popper-class="select-option"
                    @blur="on_blur"
                    @select="handleSelect"
                    :disabled="flag"
                    style="width: 350px;"
                    :title="formData.dwmc"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="btn_parent">
              <el-button type="primary" size="medium" class="base_btn" @click="form_submit">保存</el-button>
              <el-button
                size="medium"
                class="base_btn"
                style="margin-left:20px;"
                @click="form_reset"
              >重置</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <!-- 档案接收查询 -->
        <el-tab-pane label="档案接收查询" name="second">
          <el-form
            ref="Search_form"
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
                <el-form-item label="存档开始时间：" prop="cdkssj">
                  <el-date-picker
                    v-model="Search_formData.cdkssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="ksjc_pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="存档结束时间：" prop="cdjssj">
                  <el-date-picker
                    v-model="Search_formData.cdjssj"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="jsjc_pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="档案状态：" prop="xm" class="dazt_select">
                  <el-select v-model="Search_formData.dazt">
                    <el-option label="当前" value="1"></el-option>
                    <el-option label="转出" value="2"></el-option>
                    <el-option label="全部" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
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
              <el-table :data="Search_tableData" stripe @sort-change="sortChange" style="width: 100%">
                <el-table-column prop="xh" label="序号" min-width="5%" align="center"></el-table-column>
                <el-table-column prop="sfzhm" label="身份证号码" min-width="15%" sortable='custom' align="center"></el-table-column>
                <el-table-column prop="xm" label="姓名" min-width="10%" sortable='custom' align="center"></el-table-column>
                <el-table-column prop="cdbh" label="存档编号" min-width="15%" sortable='custom' align="center"></el-table-column>
                <el-table-column prop="cdrq" label="存档日期" min-width="10%" sortable='custom' align="center"></el-table-column>
                <el-table-column prop="czymc" label="操作员" min-width="10%" sortable='custom' align="center"></el-table-column>
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
export default {
  data() {
    return {
      disabled: true,
      as_padfalg: false,
      formData: {
        dwid: "",
        dwmc: "",
        cdrq: JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
      },
      fwqsj: "",
      sfzhm: "",
      form_data_page: "",
      rules: {
        sfzhm: [
          {
            validator: validator(
              '18, "sfzhm", "身份证号码", false',
              (rule, value, callback) => {
                this.formData.sfzhm = value;
                callback();
              }
            )
          }
        ], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", false') }], //姓名
        // xb: [{ validator: validator('1, "full", "性别", false') }], //性别
        sj: [{ validator: validator('11, "sjh", "手机号码", false') }], //手机号
        cdrq: [{ validator: validator('14, "full", "存档日期", false') }], //存档日期
        dwmc: [{ validator: validator('128, "less", "所属单位", false') }], //所属单位
        dacfwz: [{ validator: validator('64, "full", "档案存档位置", false') }] //档案存档位置
      },
      Search_formData: { dazt: "1" },
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        cdkssj: [{ validator: validator('10, "full", "存档开始时间", true') }],
        cdjssj: [{ validator: validator('10, "full", "存档结束时间", true') }],
        dazt: [{ validator: validator('1, "full", "档案状态", true') }]
      },
      Search_tableData: [],
      dwxzTitle: "",
      dwxz_dmb: [],
      activeName: "first",
      dwlist: [],
      flag: false,
      boy_flag: false,
      gir_flag: false,
      secondFlag: false,
      cdid: "",
      Search_total: "0",
      pageSize: 12,
      pageNum: 1,
      Search_totalFlag: false,
      pickerOptions: {
        disabledDate: time => {
          return (
            time.getTime() >
            new Date(
              JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
            ).getTime()
          );
        }
      },
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.Search_formData.jdjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return (
              time.getTime() >
              new Date(
                JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
              ).getTime()
            );
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.Search_formData.jdkssj;
          if (beginDateVal) {
            return (
              time.getTime() >
                new Date(
                  JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
                ).getTime() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return (
              time.getTime() >
              new Date(
                JSON.parse(sessionStorage.getItem("czyInfo")).xtsj
              ).getTime()
            );
          }
        }
      }
    };
  },
  beforeMount() {
    this.fwqsj = JSON.parse(sessionStorage.getItem("czyInfo")).xtsj;
    this.formData.cdrq = this.fwqsj;
  },
  methods: {
    // 列表排序
     sortChange(column, prop, order) {
      this.form_data_page.prop = column.prop
      this.form_data_page.order = column.order
      var _this = this;
        getData(
          "/dafw/dajsxxCx",
          this.form_data_page,
          function(res) {
            _this.Search_tableData = res.returnData.jsxxs;
            for (var i = 0; i < res.returnData.jsxxs.length; i++) {
              //序号赋值
              _this.Search_tableData[i].xh = res.startNum - 0 + i;
            }
            _this.Search_totalFlag = true;
            _this.Search_total = res.rowsCount;
          },
          function() {
            _this.Search_totalFlag = false;
            _this.secondFlag = false;
          }
        );
      },
    //保存
    form_submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.formData.cdid = this.cdid;
          this.$confirm("确定要保存吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $({
                url: "/dafw/jsbc",
                method: "post",
                data: this.formData
              }).then(res => {
                var _data = res.returnData;
                if (_data.executeResult == 1) {
                  this.$message({
                    message: _data.message,
                    type: "success"
                  });
                  this.flag = false;
                  this.boy_flag = false,
                  this.gir_flag = false;
                  this.$refs.form.resetFields();
                  // router.go(0)
                } else {
                  this.$message.error(_data.message);
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    sfzSearch(event) {
      //身份查询
      var _val = event.currentTarget.value;
      var szfhm_zz = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (szfhm_zz.test(_val)) {
        $({
          url: "/dafw/jscx",
          method: "get",
          params: {
            sfzhm: this.formData.sfzhm
          }
        }).then(res => {
          var _data = res.returnData;
          if (+_data.executeResult == 1) {
            if (_data.dajs.grbh) {
              this.boy_flag = false,
              this.gir_flag = false;
              this.flag = true;
              this.as_padfalg = true  //调整日期选择框间距
              this.formData = _data.dajs;
            } else {
              this.flag = false;
            }
            if (parseInt(this.formData.sfzhm.charAt(16)) % 2 == 1) {
              this.formData.xb = "1";
              this.boy_flag = true;
            } else if (parseInt(this.formData.sfzhm.charAt(16)) % 2 == 0) {
              this.formData.xb = "2";
              this.gir_flag = true;
            }
            this.cdid = _data.dajs.cdid;
          }
        });
        // _this.$refs["form"].resetFields();
      }
    },
    querySearch(queryString, cb) {
      //模糊查询
      var list = [{}];
      $({
        url: "/dafw/cxdw",
        method: "get",
        params: {
          dwmc: this.formData.dwmc
        }
      }).then(res => {
        var _data = res.returnData;
        if (+_data.executeResult == 1) {
          if (_data.dws) {
            if (_data.dws.length == 0) {
              this.$message.error('没有单位信息！');
            }
            for (let i of _data.dws) {
              i.value = i.dwmc; //将想要展示的数据作为value
            }
            list = _data.dws;
            cb(list);
          }
        }
      });
    },
    handleSelect(item) {
      this.formData.dwid = item.dwid;
      this.formData.dwmc = item.dwmc;
    },
    on_blur() {
      this.formData.dwid ? "" : (this.formData.dwmc = "");
    },
    SearchCurrentChange(val) {
      //查询分页
      this.Search_submit(val);
    },
    Search_submit(num, flag) {
      // 查询tab
      this.$refs["Search_form"].validate(valid => {
        if (valid) {
          if (flag == 1) {
            this.form_data_page = deepClone(this.Search_formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || this.pageNum;
          var _this = this;
          getData(
            "/dafw/dajsxxCx",
            data,
            function(res) {
              _this.Search_tableData = res.returnData.jsxxs;
              _this.secondFlag = true; //显示查询列表
              for (var i = 0; i < res.returnData.jsxxs.length; i++) {
                //序号赋值
                _this.Search_tableData[i].xh = res.startNum - 0 + i;
              }
              _this.Search_totalFlag = true;
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
    form_reset() {
      //重置
      this.flag = false;
      this.boy_flag = false;
      this.gir_flag = false;
      this.formData = {
        cdrq: this.fwqsj
      };
      this.Search_formData = { dazt: "1" };
      this.$nextTick(_ => {
        this.$refs.form.clearValidate();
      });
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.boy_flag = false;
      this.gir_flag = false;
        this.flag = false;
        this.formData = {
          cdrq: this.fwqsj
        };
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      } else if (this.activeName == "second") {
        this.secondFlag = false;
        this.Search_totalFlag = false;
        this.Search_formData = { dazt: "1" };
      }
    }
  }
};
</script>

<style scoped lang="scss">
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
  cursor: pointer;
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
.searchResult {
  position: relative;
}
.totles {
  position: absolute;
  left: 150px;
  top: 16px;
}
.el-autocomplete {
  width: 50%;
}
input {
  text-align: left !important;
}
.page_style {
  margin: 20px 0;
}
</style>
