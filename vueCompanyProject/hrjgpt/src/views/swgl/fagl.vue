<template>
  <div class="mian">
    <div class="forms">
      <div class="check">
        <div class="check_top">
          <span>查询条件</span>
        </div>
        <el-form
          :rules="rules"
          :inline="true"
          label-position="right"
          :model="formInline"
          label-width="100px"
          ref="formInline"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="案件号：" prop="ajh">
                <el-input v-model="formInline.ajh" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="当事人：" prop="dwmc">
                <el-input v-model="formInline.dwmc" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批状态：" prop="ajzt">
                <el-select v-model="formInline.ajzt" value-key="value" placeholder="请选择" clearable>
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in ajztCx_dmb"
                    :key="item.dmid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="抽查内容：" prop="ccsx">
                <el-select v-model="formInline.ccsx" value-key="value" placeholder="请选择" clearable>
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in ccsx_dmbb"
                    :key="item.dmid"
                  :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="案件来源：" prop="ajly">
                <el-select v-model="formInline.ajly" value-key="value" placeholder="请选择" clearable>
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in ajly_dmbb"
                    :key="item.dmid"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主办监察员：" prop="zbjcy">
                <el-select v-model="formInline.zbjcy" value-key="value" placeholder="请选择" clearable>
                  <el-option
                    :label="item.xm"
                    :value="item.ryid"
                    v-for="item in zbjcy_dmbb"
                    :key="item.ryid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="submit" @click="query(1, 1)">查询</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="check_result">
        <div class="check_top">
          <i class="icon-ali-wenben"></i>
          <span>查询结果</span>
        </div>
        <div class="result_table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#27B6C7'}"
          >
            <el-table-column label="案件号" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="jcdw_class" @click="ajhlink(scope.row)">{{ scope.row.ajh }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="bjcdw"
              label="当事人"
              min-width="10%"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column label="案件来源" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.ajly | ly(ajly_dmbb) }}</span> -->
                <span>{{ scope.row.ajly ? scope.row.ajly : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="主办监察员" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.zbjcy | zbr(zbjcy_dmbb) }}</span> -->
                <span>{{ scope.row.zbjcy ? scope.row.zbjcy : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="协办监察员" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.xbjcy | zbr(zbjcy_dmbb) }}</span> -->
                <span>{{ scope.row.xbjcy ? scope.row.xbjcy : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审批状态" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.ajzt | zt(ajzt_dmbb) }}</span>
                <!-- <span>{{ scope.row.ajzt }}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="10%" align="center">
              <template slot-scope="scope" align="center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="visible(scope.row)"
                  v-if="scope.row.ajzt == '01'"
                >分配</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="link(scope.row)"
                  v-if="scope.row.ajzt == '20'"
                >审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- //弹出层 -->
        <el-dialog title="监察员：" :visible.sync="dialogFormVisible">
          <el-form :model="form" class="form" :rules="rules2" ref="form">
            <el-row>
              <el-form-item label="监察小组" :label-width="formLabelWidth" prop="jcxz" required>
                <el-select
                  v-model="form.jcxz"
                  @change="changes"
                  value-key="value"
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.jcxzmc"
                    :value="item.jcxzid"
                    v-for="item in jcxz_dmb"
                    :key="item.jcxzid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="主办监察员" :label-width="formLabelWidth" prop="zbjcy" required>
                  <el-select
                    v-model="form.zbjcy"
                    @change="getnum"
                    value-key="value"
                    :disabled="disable"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      :id="item.jczh"
                      :label="item.xm"
                      :value="item.ryid"
                      v-for="item in zbjc_dmb"
                      :key="item.ryid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="监察证号：" :label-width="formLabelWidth">
                  <el-input disabled v-model="form.zbjczh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="协办监察员" :label-width="formLabelWidth" prop="xbjcy" required>
                  <el-select
                    v-model="form.xbjcy"
                    value-key="value"
                    @change="getnum1"
                    :disabled="disable"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      :label="item.xm"
                      :value="item.ryid"
                      v-for="item in zbjc_dmb"
                      :key="item.ryid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="监察证号：" :label-width="formLabelWidth">
                  <el-input disabled v-model="form.xbjczh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="off">取 消</el-button>
            <el-button type="primary" @click="close">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout=" prev, pager, next, total"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        v-if="this.total !== 0"
      ></el-pagination>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import "../../common/scss/public.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { deepClone, getdmb } from "@/common/js/common";
export default {
  data() {
    return {
      disable: true,
      //弹出层
      jcxz_dmb: "", //监察小组
      zbjc_dmb: "", //主办监察
      // xbjc_dmb: "",//主办监察
      formLabelWidth: "100px",
      form: {
        // ajdjbid:"",
        // ajh:"",
        zbjcy: "",
        xbjcy: "",
        ajdjlx: "",
        jcxzid: ""
      },
      dialogFormVisible: false,
      // 表单数据
      formInline: {
        ajh: "", //	选填	14,full,案件号,true
        dwmc: "", //	选填	64,full,单位名称,true
        ajly: "", //	选填	2,full,案件来源,true（ldjg_ajly）
        xbjcy: "", //选填	  6,full,协办监察员,true
        zbjcy: "", //	选填	6,,full,主办监察员,true
        ajzt: "", //	选填	2,full,案件登记状态,true
        pageNum: 1
      },
      formInline_page: {
        ajh: "", //	选填	14,full,案件号,true
        dwmc: "", //	选填	64,full,单位名称,true
        ajly: "", //	选填	2,full,案件来源,true（ldjg_ajly）
        xbjcy: "", //选填	  6,full,协办监察员,true
        zbjcy: "", //	选填	6,,full,主办监察员,true
        ajzt: "", //	选填	2,full,案件登记状态,true
        pageNum: 1
      },
      // 表格数据
      tableData: [
        {
          ajdjbid: "", //类型：String  必有字段  备注：案件登记id
          ajh: "", //类型：String  必有字段  备注：案件号
          bjcdw: "", //类型：String  必有字段  备注：被检查单位
          ajly: "", //类型：String  必有字段  备注：案件来源（ldjg_ajly）
          // ccsx: "", //类型：String  必有字段  备注：抽查内容(ldjg_ay)
          // jckssj: "", //类型：String  必有字段  备注：到达现场时间
          // jcjssj: "", //类型：String  必有字段  备注：离开现场时间
          zbjcy: "", //类型：String  必有字段  备注：主办监察员
          xbjcy: "", //类型：String  必有字段  备注：协办监察员
          ajzt: "" //类型：String  必有字段  备注：巡检事项状态（ldjg_ajzt）
          // djr: "" //类型：String  必有字段  备注：登记人
        }
      ],
      //分页
      total: 0,
      currentPage: "",
      pageSize: 12,
      //代码表
      ajztCx_dmb: "",
      ajly_dmbb: "", //案件来源
      ajzt_dmbb: "", //状态
      zbjcy_dmbb: "", //主办
      ccsx_dmbb: "", //内容
      // 校验
      rules: {
        ajh: [{ validator: validator('9, "full", "案件号", true') }],
        ajly: [{ validator: validator('2, "full", "案件来源", true') }],
        dwmc: [{ validator: validator('64, "full", "单位名称", true') }],
        zbjcy: [{ validator: validator('6, "full", "主办检查员", true') }],
        xbjcy: [{ validator: validator('6, "full", "抽查事项", true') }],
        ajzt: [{ validator: validator('13, "full", "案件状态", true') }]
      },
      rules2: {
        jcxz: [{ validator: validator('14, "full", "监察小组", false') }],
        zbjcy: [{ validator: validator('6, "full", "主办监察员", false') }],
        xbjcy: [{ validator: validator('6, "full", "协办监察员", false') }]
      }
    };
  },
  methods: {
    //弹出层
    // visible(n, m, x) {
    visible(n) {
      this.form.ajdjbid = n.ajdjbid;
      this.form.ajh = n.ajh;
      this.form.ajdjlx = n.ajdjlx;

      this.dialogFormVisible = true;
      //检查小组
      var _this = this;
      getdmb("/dmbgl/jcxzcx", "", function(res) {
        // console.log(res);
        _this.jcxz_dmb = res.returnData.jcxzlb;
      });
      // 主办监察
      // getdmb("/dmbgl/jcxzry", "", function(res) {
      //   console.log(res);
      //   _this.zbjc_dmb = res.returnData.jcxzlb;
      // });
    },
    //检查小组改变，对应检查员变
    changes() {
      this.form.zbjcy = "";
      this.form.xbjcy = "";
      this.form.zbjczh = "";
      this.form.xbjczh = "";
      // 主办监察
      $.get("/dmbgl/jcxzry", {
        params: { jcxzid: this.form.jcxz }
      }).then(res => {
        // console.log(res);
        this.zbjc_dmb = res.returnData.jcxzlb;
      });
      this.disable = false;
    },
    // 实现对应的检查账号
    getnum(val) {
      if (val == this.form.xbjcy && this.form.xbjcy != "") {
        this.$message.warning("不能选择同一个监察员");
        this.form.zbjcy = "";
      } else {
        if (val) {
          var targetObj = this.zbjc_dmb.find(item => {
            return item.ryid == val;
          });
          this.form.zbjczh = targetObj.jczh;
        } else {
          this.form.zbjczh = "";
        }
      }
    },
    getnum1(val) {
      if (val == this.form.zbjcy && this.form.zbjcy != "") {
        this.$message.warning("不能选择同一个监察员");
        this.form.xbjcy = "";
      } else {
        if (val) {
          var targetObj = this.zbjc_dmb.find(item => {
            return item.ryid == val;
          });
          this.form.xbjczh = targetObj.jczh;
        } else {
          this.form.xbjczh = "";
        }
      }
    },
    //确定
    close() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.zbjczh != null) {
            if (this.form.xbjczh != null) {
              this.$confirm("是否分配", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              })
                .then(() => {
                  this.dialogFormVisible = false;
                  $.post("/ajfp/fp", {
                    ajdjbid: this.form.ajdjbid, //类型：String  必有字段  备注：14,full,案件登记id,false
                    ajh: this.form.ajh, //类型：String  必有字段  备注：9,full,案件号,false
                    zbjcy: this.form.zbjcy, //类型：String  必有字段  备注：6,full,主办监察员,false
                    xbjcy: this.form.xbjcy, //类型：String  必有字段  备注：6,full,协办监察员,false
                    ajdjlx: this.form.ajdjlx, //类型：String  必有字段  备注：2,full,案件登记类型,false
                    jcxzid: this.form.jcxz
                  }).then(res => {
                    // console.log(res);
                    this.$refs["form"].resetFields();
                    this.form.zbjczh = "";
                    this.form.xbjczh = "";
                    this.query();
                    this.disable = true;
                  });
                })
                .catch(() => {});
            } else {
              this.$message.warning("请维护协办监察员的监察证号");
            }
          } else {
            this.$message.warning("请维护主办监察员的监察证号");
          }
        }
      });
    },
    //取消
    off() {
      this.dialogFormVisible = false;
      (this.form.zbjczh = ""),
        (this.form.xbjczh = ""),
        this.$refs["form"].resetFields();
      this.disable = true;
    },
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    // 点击查询
    query(num, flag) {
      this.$refs["formInline"].validate(valid => {
        if (valid) {
          // 分页点击带参数问题处理
          if (flag == 1) {
            this.formInline_page = deepClone(this.formInline);
          }
          var _form = this.formInline_page;
          _form.pageNum = num || this.pagenum;
          this.LoadOn();
          $({
            url: "/lasp/laqspCx",
            method: "get",
            params: _form
          }).then(res => {
            this.LoadClose();
            // console.log(res);
            const _res = res.returnData;
            if (+_res.executeResult === 1 && res.returnCode == 1) {
              this.tableData = res.returnData.vbs;
              this.total = parseInt(res.rowsCount);
              this.currentPage = num;
            } else {
              this.tableData = [];
              this.total = 0;
            }
          });
        }
      });
    },
    // 来源
    ajly_dmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
        // console.log(res);
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
          _this.ajly_dmbb = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //主办人
    zbjcy_dmb() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        // console.log(res);
        _this.zbjcy_dmbb = res.returnData.dmblb;
        _this.xbjcy_dmbb = res.returnData.dmblb;
      });
    },
    //状态
    ajzt_dmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_lczt", function(res) {
        _this.ajzt_dmbb = res.returnData.dmblb;
        var arr_ajzt = _this.ajzt_dmbb.filter(item => {
          return item.dmid == "01" || item.dmid == "10" || item.dmid == "20"; //已提交，已分配
        });
        _this.ajztCx_dmb = arr_ajzt;
      });
    },
    //内容
    ccsx_dmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ccnr", function(res) {
        // console.log(res);
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
        _this.ccsx_dmbb = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //案件号跳转
    ajhlink(data) {
      if (data.sjly == 0) {
        this.$router.push({
          name: "NqdjFaxq",
          query: {
            ajdjbid: data.ajdjbid,
            ajh: data.ajh,
            disable: true
          }
        });
      } else if (data.sjly == 1) {
        this.$router.push({
          name: "Xqxjdj",
          query: {
            ajdjbid: data.ajdjbid,
            disable: true
          }
        });
      }
    },
    //提交跳转
    link(data) {
      if (data.sjly == 0 && data.ajzt == "20") {
        this.$router.push({
          name: "NqdjFaxq",
          query: {
            ajdjbid: data.ajdjbid,
            ajh: data.ajh,
            disable: true,
            nqdj: true,
            flag: "sh"
          }
        });
      } else if (data.sjly == 1 && data.ajzt == "20") {
        this.$router.push({
          name: "Xqxjdj",
          query: {
            ajdjbid: data.ajdjbid,
            ajh: data.ajh,
            disable: true,
            flag_sh: "sh"
          }
        });
      } else {
        this.$message.warning("无效的数据");
      }
    }
  },
  created() {
    var _this = this;
    this.$nextTick(() => {
      _this.query();
    });
    // 来源
    this.ajly_dmb();
    //主办
    this.zbjcy_dmb();
    // 状态
    this.ajzt_dmb();
    //内容
    this.ccsx_dmb();
  }
};
</script>
<style scoped>
.jcdw_class {
  text-decoration: underline;
  color: #089fb1;
  cursor: pointer;
}
.form {
  padding: 0 !important;
}
.check_top i {
  margin-right: 5px;
}
.last_label {
  margin-left: 15px;
}
.submit {
  width: 80px;
  height: 30px;
  background: #0a9daf;
  opacity: 0.9;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  float: left;
  margin-left: 50%;
  transform: translate(-50%);
  cursor: pointer;
}
.result_table {
  margin-top: 20px;
}

.el-pagination {
  text-align: center;
  padding: 40px 0;
}
</style>
