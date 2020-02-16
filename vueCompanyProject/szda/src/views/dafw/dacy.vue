<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px;height:48px;background: #EAF5FF;">
        <el-breadcrumb-item>
          <i class="iconfont iconweizhi" style="color:#1488f5;margin: 0 8px;"></i>档案服务
        </el-breadcrumb-item>
        <el-breadcrumb-item style="line-height: 52px;">档案查阅</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base-content dacy">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="档案查阅" name="first">
          <!--查询 -->
          <el-form ref="searchForm" :model="formData" :rules="rules" class="formData">
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
              <el-button type="primary" size="medium" class="base_btn" @click="form_submit()">查询</el-button>
              <el-button
                size="medium"
                class="base_btn"
                style="margin-left:20px;"
                @click="form_reset"
              >重置</el-button>
            </div>
          </el-form>
          <!-- 基本信息 -->
          <div class="base-content_public" v-if="flag">
            <div>
              <my-bread level1="iconjichuxinxi" level2="基础信息"></my-bread>
            </div>
            <div>
              <el-form ref="form" :model="BaseFormdata" class="BaseFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名：">
                      <!-- @click="see(BaseFormdata.grbh)"
                      class="base_input_view HasColor"-->
                      <span class="base_input_view" :title="BaseFormdata.xm">{{BaseFormdata.xm}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="性别："
                    >{{BaseFormdata.xb == 1? '男':BaseFormdata.xb == 2?'女':''}}</el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="存档日期：">
                      <input v-model="BaseFormdata.cdrq" readonly class="base_input_view Baseclass" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="委托存档单位：">
                      <!-- @click="see(BaseFormdata.grbh)"
                      class="base_input_view HasColor"-->
                      <span class="base_input_view" :title="BaseFormdata.dwmc">{{BaseFormdata.dwmc}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在位置：">
                      <span class="base_input_view Baseclass">{{BaseFormdata.dacfwz}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 档案查阅信息 -->
          <div class="base-content_public marTop" v-if="flag">
            <div>
              <my-bread level1="iconjichuxinxi" level2="档案查阅信息"></my-bread>
            </div>
            <div class="wjxx_content">
              <el-form ref="mes_form" :rules="rules1" :model="dacyFormData" class="dacyFormData">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="查阅类型：" prop="cylx" class="cylx">
                      <el-select v-model="dacyFormData.cylx" @change="currentSel">
                        <el-option label="实体档案" value="1"></el-option>
                        <el-option label="数字档案" value="2" :disabled="dayxIdFlag"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="查阅单位：" prop="cydwmc" required>
                      <el-input v-model="dacyFormData.cydwmc"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话：" prop="cydwlxdh" required>
                      <el-input v-model="dacyFormData.cydwlxdh"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="查阅日期：" prop="cyrq" class="cyrq" required>
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="dacyFormData.cyrq"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="备注：" prop="cybz">
                      <!-- <el-input v-model="dacyFormData.jdr" style="width:500px;"></el-input> -->
                      <el-input v-model="dacyFormData.cybz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <!-- 查阅人信息 -->
          <div class="base-content_public marTop title_wrap" v-if="flag">
            <div style="position: relative; margin-bottom: 20px;">
              <my-bread level1="iconjichuxinxi" level2="查阅人信息"></my-bread>
              <div class="title_r" @click="addList" v-if="addListFlag">
                <i class="iconfont">&#xe62d;</i>
                <span>新增</span>
              </div>
            </div>
            <el-form ref="dacy_form" :rules="rules2" :model="dacyFormData">
              <div v-for="(item,index) in dacyFormData.cyrVB" :key="index">
                <el-row style="height:60px">
                  <el-col :span="8">
                    <el-form-item label="查阅人：" :prop="'cyrVB.' + index + '.xm'" :rules="rules2.xm" required>
                      <el-input v-model="item.xm"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item class="zjlx" label="证件类型：" :prop="'cyrVB.' + index + '.zjlx'" :rules="rules2.zjlx" required>
                      <el-select
                        v-model="item.zjlx"
                        value-key="value"
                        @change="jdrzjlx_checkVal(item.zjlx,index)"
                      >
                        <el-option
                          :label="item.dmmc"
                          :value="item.dmid"
                          v-for="item in jdrzjlx_dmb"
                          :key="item.dmid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="证件号："
                      :prop="'cyrVB.' + index + '.zjhm'"
                      :rules="rules2.zjhm"
                      required
                    >
                      <el-input v-model="item.zjhm" @blur="jdr(index)"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="height:60px">
                  <el-col :span="8">
                    <el-form-item
                      label="联系电话："
                      :prop="'cyrVB.' + index + '.lxdh'"
                      :rules="rules2.lxdh"
                    >
                      <el-input v-model="item.lxdh"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-if="delFlag">
                    <div class="delcls" @click="del(index)">
                      <i class="iconfont del_icon">&#xe606;</i>
                      <span>删除</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <el-table
            :data="tableData6"
            :span-method="arraySpanMethod"
            border
            ref="multipleTable"
            style="width: 100%; margin-top: 20px"
            @selection-change="handleSelectionChange"
            @select="onTableSelect"
            v-if="flag"
            v-show="tableflag"
          >
            <el-table-column prop="lh" width="50" label="类号"></el-table-column>
            <el-table-column min-width="15%" label="类别">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.region}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" min-width="20%" label="小类名称"></el-table-column>
            <el-table-column prop="clmc" min-width="30%" label="材料名称"></el-table-column>
            <el-table-column prop="time" min-width="10%" label="制成时间"></el-table-column>
            <el-table-column prop="page" width="50" label="页数"></el-table-column>
            <el-table-column label="操作" width="50" type="selection"></el-table-column>
          </el-table>
          <div v-if="tableflag">
            <el-row v-if="flag">
              有效时间：
              <span style="color: red;">*</span> <el-input v-model="yxsj_xs" style="width: 55px;margin-top:10px;" @blur="checkValXs"></el-input>时
              <el-input class="fz" style="width: 55px;" v-model="yxsj_fz" @blur="checkValFz"></el-input>分
            </el-row>
          </div>
          <div class="btn_parent" v-if="flag">
            <el-button type="primary" size="medium" style="margin-top: 10px;" class="base_btn" @click="handleQuire()">保存</el-button>
          </div>
        </el-tab-pane>
        <!-- 档案接收查询 -->
        <!-- <el-tab-pane label="档案接收查询" name="second"></el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "@/common/scss/common.scss";
import axios from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getData, deepClone } from "@/common/js/common";
import { log } from "util";
import { longStackSupport } from "q";
export default {
  data() {
    return {
      yxsj_fz: "",
      yxsj_xs: "",
      checked: "",
      selected: "",
      disabled: true,
      tableflag: true,
      dayxIdFlag: false,
      delFlag: false,
      addListFlag: true,
      formData: {
        sfzhm: "",
        xm:'',
        cdbh:''
      },
      xzFormData: {},
      tableData: [],
      tableData2: [],
      tableData6: [],
      checkArr: [],
      fwqsj: "",
      BaseFormdata: {},
      dacyFormData: {
        cylx: "",
        cyrq: "",
        cyrVB: [
          {
            rules: "",
            xm: "",
            zjlx: "",
            zjhm: "",
            lxdh: ""
          }
        ]
      },
      addListNum: "",
      zjlxNum: "",
      sfzhm: "",
      jdrzjlx_dmb: [],
      rules: {
        sfzhm: [{ validator: validator('18, "full", "身份证号码", true') }],
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        xm: [{ validator: validator('64, "full", "姓名", true') }]
      },
      rules1: {
        cylx: [{ validator: validator('2, "number", "查阅类型", false') }],
        cydwmc: [{ validator: validator('128, "full", "查阅单位", false') }], //128,"full","查阅单位名称",true
        cydwlxdh: [{ validator: validator('30, "lxdh", "联系电话", false') }], //30,"lxdh","查阅单位联系电话",false
        cyrq: [{ validator: validator('10, "full", "查阅日期", false') }], //借档日期
        cybz: [{ validator: validator('256, "full", "备注", true') }] //备注
      },
      rules2: {
        xm: [{ validator: validator('32, "full", "查阅人", false') }], //借档人
        lxdh: [{ validator: validator('30, "lxdh", "联系电话", true') }], //联系电话
        zjlx: [{ validator: validator('2, "full", "证件类型", false') }], //联系电话
        zjhm: [{ validator: validator('18, "full", "证件号码", false') }] //证件号
      },
      Search_formData: { dazt: "1" },
      Search_rules: {
        sfzhm: [{ validator: validator('18, "sfzhm", "身份证号码", true') }], //身份证号码
        xm: [{ validator: validator('50, "full", "姓名", true') }], //姓名
        cdbh: [{ validator: validator('20, "full", "存档编号", true') }],
        dazt: [{ validator: validator('1, "full", "档案状态", true') }]
      },
      Search_tableData: [],
      dwxzTitle: "",
      dwxz_dmb: [],
      activeName: "first",
      dwlist: [],
      flag: false,
      xb_flag: false,
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
    this.dacyFormData.cyrq = this.fwqsj;
  },
  created() {
    this.getdmb();
    // this.getTable()
  },
  methods: {
    // 处理表格数据
    has_dealTable() {
      var getDate = []; // 存储新表格数据
      var typeIndex = [0]; // 保存id,地区需要合并的值
      var listsIndex = [0];
      var nameIndex = [0]; // 保存类型需要合并的值
      var listIndex = [0]; // 保存类型需要合并的值
      var a; // id,地区需要合并的行是所有类型的长度
      this.tableData2.forEach((v, index) => {
        if (v.type && v.type.length) {
          a = 0;
          v.type.forEach((subV, i, typeData) => {
            if (subV.sortList && subV.sortList.length) {
              subV.sortList.forEach((ss, k, data) => {
                if (k === data.length - 1) {
                  typeIndex.push(data.length); // 把每一个类型下面数据长度存起来
                  a += data.length; // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    nameIndex.push(a); // 类型循环完成后把数据长度存起来
                  }
                }
                getDate.push({
                  id: v.id,
                  lh: ss.lh,
                  region: v.region,
                  type: subV.sortName,
                  clmc: ss.clmc,
                  time: ss.clzcrq,
                  page: ss.clys,
                  clmlid: ss.clmlid,
                  dayxid: ss.dayxid,
                  cllb: ss.cllb
                });
              });
            }
          });
        }
      });
      let k = 0;
      let t = 0;
      let m = 0;
      nameIndex.forEach((v, i, nameArr) => {
        if (nameArr[i + 1]) {
          getDate[k].nameIndex = nameArr[i + 1];
          k += nameArr[i + 1];
        }
      });

      typeIndex.forEach((v, i, typeArr) => {
        if (typeArr[i + 1]) {
          getDate[t].typeIndex = typeArr[i + 1];
          t += typeArr[i + 1];
        }
      });
      this.tableData6 = getDate;
    },
    onTableSelect(rows, row) {
      //判断选中状态
      this.selected = rows.length && rows.indexOf(row) !== -1;
      // console.log("selected", this.selected); // true就是选中，0或者false是取消选中
    },
    handleSelectionChange(val) {
      //checkbox方法
      this.multipleSelection = val;
    },
    // 自定义CheckBox点击事件
    toggleSelection(rows) {
      var Arr = [];
      this.tableData6.forEach(item => {
        if (item.id == rows) {
          Arr.push(item);
        }
      });
      if (Arr) {
        Arr.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 表格合并方法
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.nameIndex) {
          // 如果有值,说明需要合并
          return [row.nameIndex, 1];
        } else return [0, 0];
      }
      if (columnIndex === 2) {
        if (row.typeIndex) {
          return [row.typeIndex, 1];
        } else return [0, 0];
      }
    },
    dealTable(data) {
      var _arr = [];
      var _all_arr = [];
      data.forEach((v, k) => {
        if (data[k + 1]) {
          if (data[k].lbid == data[k + 1].lbid) {
            _arr.push(data[k]);
          } else {
            _arr.push(data[k]);
            _all_arr.push(_arr);
            _arr = [];
          }
        } else {
          if (data[k - 1].lbid == data[k].lbid) {
            _arr.push(data[k]);
            _all_arr.push(_arr);
          } else {
            _all_arr.push(_arr);
            _arr = [];
            _arr.push(data[k]);
            _all_arr.push(_arr);
          }
        }
      });
      let arrays = [];
      let Newarrays = [];
      var BigArr = [];
      var lastArr = [];
      for (var i = 0; i < _all_arr.length; i++) {
        let finalArr = [];
        finalArr = fl(finalArr, _all_arr[i]);
        finalArr.reverse();
        if (finalArr.length > 1) {
          //有小类
          var NewArr = [
            { id: finalArr[0][0].lbid, region: finalArr[0][0].lbmc, type: [] }
          ];
          for (var j = 0; j < finalArr.length; j++) {
            var type_obj = { sortName: "", sortList: [] };
            type_obj.sortName = finalArr[j][0].cllbmc;
            finalArr[j].map(item => {
              return type_obj.sortList.push(item);
            });
            NewArr[0].type.push(type_obj);
          }
          BigArr.push(NewArr);
        } else {
          //没有小类
          var noMinArr = [
            {
              id: finalArr[0][0].lbid,
              region: finalArr[0][0].lbmc,
              type: [{ sortName: finalArr[0][0].cllbmc, sortList: [] }]
            }
          ];
          finalArr.forEach((item, i) => {
            item.forEach(items => {
              noMinArr[0].type[0].sortList.push(items);
            });
          });
          BigArr.push(noMinArr);
        }
      }
      BigArr.map(item => {
        return lastArr.push(item[0]);
      });
      this.tableData2 = lastArr;
      this.has_dealTable();
      function fl(finalArr, arr) {
        let sameArr = [];
        let difArr = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[0].cllb == arr[i].cllb) {
            sameArr.push(arr[i]);
          } else {
            difArr.push(arr[i]);
          }
        }
        if (difArr.length > 1) {
          fl(finalArr, difArr);
        }
        if (difArr.length == 1) {
          finalArr.push(difArr);
        }
        finalArr.push(sameArr);
        return finalArr;
      }
    },
    getdmb() {
      //代码表
      var _this = this;
      const jdrzjlx_data = { table_name: "szdayy_d_zjlx" };
      getData("/dmbgl/dmblbCx", jdrzjlx_data, function(res) {
        _this.jdrzjlx_dmb = res.returnData.dmblb;
      },function(res){
      });
      if (this.dacyFormData.cyrVB.length == 0) {
        this.delFlag = false;
      }
    },
    currentSel(val) {
      if (val == 1) {
        this.tableflag = false;
      } else {
        this.tableflag = true;
      }
    },
    //查询
    form_submit() {
      this.$refs["searchForm"].validate(valid => {
        if (valid) {
          if (this.formData.sfzhm || this.formData.cdbh || this.formData.xm) {
            var data = this.formData;
            var _this = this;
            getData(
              "/dafw/getDacyxx",
              data,
              function(res) {
                res.returnData.damlxx.length == 0
                  ? (_this.tableflag = false)
                  : (_this.tableData = res.returnData.damlxx);
                _this.BaseFormdata = res.returnData.jbxx;
                if (_this.BaseFormdata.dayxid) {
                  _this.dacyFormData.cylx = "2";
                  _this.tableflag = true;
                } else {
                  _this.dacyFormData.cylx = "1";
                  _this.dayxIdFlag = true;
                  _this.tableflag = false;
                }
                _this.dealTable(_this.tableData);
                _this.flag = true; //显示查询列表
              },
              function() {
                // _this.Search_totalFlag = false
                // _this.secondFlag = false
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
    addList() {
      if (this.dacyFormData.cyrVB.length == 9) {
        this.addListFlag = false;
      } else if (this.dacyFormData.cyrVB.length !== 0) {
        this.delFlag = true;
      }
      this.$refs["dacy_form"].validate(valid => {
        if (valid) {
          this.dacyFormData.cyrVB.push({
            rules: "",
            xm: "",
            zjlx: "",
            zjhm: "",
            lxdh: ""
          });
        }
      });
    },
    // 删除
    del(num) {
      this.dacyFormData.cyrVB.some((item, i) => {
        if (i == num) {
          this.dacyFormData.cyrVB.splice(i, 1);
          // 在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          return true;
        }
      });
      if (this.dacyFormData.cyrVB.length < 9) {
        this.addListFlag = true;
        if (this.dacyFormData.cyrVB.length == 1) {
          this.delFlag = false;
        }
      }
    },
    jdrzjlx_checkVal(item, num) {
      if (item == "01") {
        this.dacyFormData.cyrVB[
          num
        ].rules = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      } else {
        this.dacyFormData.cyrVB[
          num
        ].rules = /^[^\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ ]*$/;
      }
      // else if (item == "02") {
      //   this.dacyFormData.cyrVB[num].rules = /^[a-zA-Z0-9]{7,21}$/; //军官证
      // } else if (item == "03") {
      //   this.dacyFormData.cyrVB[num].rules = /^[a-zA-Z0-9]{3,21}$/; //护照
      // } else if (item == "04") {
      //   this.dacyFormData.cyrVB[num].rules = /^[a-zA-Z0-9]{7,21}$/; //警官证
      // } else if (item == "05") {
      //   this.dacyFormData.cyrVB[num].rules = ""; //其他
      // }
      this.dacyFormData.cyrVB[num].zjhm = "";
    },
    jdr(num) {
      this.$forceUpdate();
      if (
        this.dacyFormData.cyrVB[num].zjlx == "" ||
        this.dacyFormData.cyrVB[num].zjlx == undefined
      ) {
        this.$alert("请选择证件类型", {
          center: true,
          confirmButtonText: "确定"
        });
        this.dacyFormData.cyrVB[num].zjhm = "";
      } else {
        var val = this.dacyFormData.cyrVB[num].zjhm;
        var result = this.dacyFormData.cyrVB[num].rules.test(val);
        if (result != true) {
          this.$alert("证件号错误", {
            center: true,
            confirmButtonText: "确定"
          });
          this.dacyFormData.cyrVB[num].zjhm = "";
          return false;
        }
      }
    },
    // 重置
    form_reset() {
      //重置
      this.formData = {};
      this.formData.cdrq = this.fwqsj;
      this.Search_formData = { dazt: "1" };
    },
    //保存校验
    handleQuire() {
      this.$refs["mes_form"].validate(valid => {
        if (valid) {
          this.$refs["dacy_form"].validate(valid => {
            if (valid) {
              if (this.dacyFormData.cylx == 1) {
                this.checkdata()
                return false
              }
              if (this.yxsj_xs == 0 && this.yxsj_fz == 0) {
                  this.$alert("有效期不能都为0时0分！", {
                    center: true,
                    confirmButtonText: "确定"
                  });
                  return false
                }
              if (this.yxsj_xs && this.yxsj_fz) {
                if (this.multipleSelection && this.dacyFormData.cylx == 2) {
                  this.checkdata()
                } else {
                  this.$alert("档案目录信息没有勾选！", {
                    center: true,
                    confirmButtonText: "确定"
                  });
                }
                
              } else {
                this.$alert("请输入有效期时、分！", {
                  center: true,
                  confirmButtonText: "确定"
                });
              }
            } else {
              this.$alert("查阅人信息不正确!", {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        } else {
          this.$alert("档案查阅信息不正确!", {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //保存请求
    checkdata() {
      this.dacyFormData.szdacysx = this.yxsj_xs;
      this.dacyFormData.szdacyfz = this.yxsj_fz;
      this.dacyFormData.cdid = this.BaseFormdata.cdid;
      this.dacyFormData.grbh = this.BaseFormdata.grbh;
      this.dacyFormData.cyqsVB = this.multipleSelection; //表格数据
      var data = this.dacyFormData;
      axios({
        url: "/dafw/dacySave",
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
          this.dacyFormData= {
            cylx: "",
            cyrq: this.fwqsj,
            cyrVB: [
              {
                rules: "",
                xm: "",
                zjlx: "",
                zjhm: "",
                lxdh: ""
              }
            ]
          }
          this.yxsj_xs=''
          this.yxsj_fz=''
           this.flag = false;
          if (_res.sqm == '') {
            return false
          }
          alert("操作成功！本次生成的授权码为：" + _res.sqm);
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    handleClick() {},
    checkValXs(){
      if (this.yxsj_xs >71) {
        this.$message.warning("时间最大为71时59分");
        this.yxsj_xs = ''
      }
    },
    checkValFz(){
      if (this.yxsj_fz >59) {
        this.$message.warning("时间最大为71时59分");
        this.yxsj_fz = ''
      }
    },
    // 跳转个人页面
    see(row) {
      this.$router.push({ path: "/dagl/personal", query: { grbh: row } });
    }
  }
};
</script>

<style scoped lang="scss">
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
.marTop {
  margin-top: 10px;
}
.BaseFormData {
  padding: 0 20px;
}
.dacyFormData {
  margin-top: 20px;
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
input {
  text-align: left !important;
}
.page_style {
  margin: 20px 0;
}
.title_wrap {
  position: relative;
}
.title_r {
  position: absolute;
  top: 0px;
  right: 13px;
  width: 73px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  margin: 10px 0;
  float: right;
  color: #0081e6;
  cursor: pointer;
}
.delcls {
  display: inline-block;
  margin: 13px 0 0 20px;
  color: red;
  cursor: pointer;
}
</style>
