<template>
  <el-container>
    <div class="forms">
      <el-form :inline="true" status-icon ref="ref_form" :rules="rules" :model="formInline" label-position="right" label-width="155px" size="medium" class="demo-form-inline">
        <el-row>
          <div class="person">抽查步骤</div>
        </el-row>
        <div class="qiehuan"> 
          <ul>
            <li class="backs same">
              <p class="first">01</p>
              <p class="second">随机抽查基本填写</p>
            </li>
            <li class="two_backs same">
              <p class="first">02</p>
              <p class="second">设置随机抽查执法对象范围</p>
            </li>
            <li class="third_backs same">
              <p class="first">03</p>
              <p class="second">抽取结果确认</p>
            </li>
          </ul>
        </div>
        <div class="second-step">
          <!-- <el-row>
            <div class="person">抽查对象：</div>
          </el-row> -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="执法对象名称" label-width="110px">
                <el-form-item prop="zfdx">
                  <el-input v-model="formInline.zfdx" clearable></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属地区" label-width="110px" prop="ssdq">
                <el-select v-model="formInline.ssdq" clearable>
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in ssdq_dmb"
                    :key="item.dmid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构类型" label-width="110px" prop="jglx">
                <el-select v-model="formInline.jglx" clearable>
                  <el-option
                    v-for="item in jglx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属行业" label-width="110px" prop="sshy">
                <el-select v-model="formInline.sshy" clearable>
                  <el-option
                    v-for="item in sshy_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记注册类型" label-width="110px" prop="djzclx">
                <el-select v-model="formInline.djzclx" clearable>
                  <el-option
                    v-for="item in djzclx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="从业人员总数" label-width="110px" prop="cyryzsq">
                <el-input v-model="formInline.cyryzsq" style="width: 95px" clearable></el-input>~
                <el-form-item label-width="110px" prop="cyryzsz">
                  <el-input v-model="formInline.cyryzsz" style="width: 95px" clearable></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="btn">
            <el-button type="primary" size="small" class="backC" @click="query(1,1)">查询</el-button>
            <el-button type="primary" size="small" class="backC" @click="reset()">重置</el-button>
          </el-row>
          <el-row>
            <div class="result_table">
              <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#27B6C7'}">
                <el-table-column
                  prop="yyzzh"
                  label="营业执照号码"
                  width="180" align="center">
                </el-table-column>
                <el-table-column
                  prop="zfdxmc"
                  label="执法对象名称" align="center">
                </el-table-column>
                <el-table-column
                  prop="ssdqName"
                  label="所属地区" align="center">
                </el-table-column>
                <el-table-column
                  prop="jglxName"
                  label="机构类型" align="center">
                </el-table-column>
                <el-table-column
                  prop="frdb"
                  label="法定代表人" align="center">
                </el-table-column>
                <el-table-column
                  prop="sshyName"
                  label="所属行业" align="center">
                </el-table-column>
                <el-table-column
                  prop="djzclxName"
                  label="登记注册类型" align="center">
                </el-table-column>
                <el-table-column
                  prop="cyryzs"
                  label="从业人员总数" align="center">
                </el-table-column>
                <el-table-column
                  prop="zfdx"
                  label="执法对象状态" align="center">
                </el-table-column>
              </el-table>
            </div>
          </el-row>
          <!-- 分页 -->
          <div class="page_class">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              layout=" prev, pager, next, total"
              :total="total"
              :page-size="pageSize"
              prev-text="上一页"
              next-text="下一页"
              v-if="this.total !== 0"
            ></el-pagination>
          </div>
        </div>
        <el-row class="btn">
          <el-button type="primary" size="small" class="backC" @click="preStep()">上一步</el-button>
          <el-button type="primary" size="small" class="backC" :disabled="disabled" @click="nextStep()">下一步</el-button>
          <el-button type="primary" size="small" class="backB" @click="goBack()">返回</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
import "@/common/scss/public.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getdmb } from "@/common/js/common";
import { Group, deepClone} from "@/common/js/common";
export default {
  name: "",
  data() {
    return {
      formInline: {
        zfdx: "",
        ssdq: "",
        jglx: "",
        sshy: "",
        djzclx: "",
        cyryzsq: "",
        cyryzsz: "",
        sjccid: ""
      },
      formInline_page: {
        zfdx: "",
        ssdq: "",
        jglx: "",
        sshy: "",
        djzclx: "",
        cyryzsq: "",
        cyryzsz: "",
        sjccid: ""
      },
      rules: {
        zfdx: [{ validator: validator("64, \"full\", \"执法对象名称\", true") }],
        cyryzsq: [{ validator: validator("4, \"number\", \"从业人员总数起\", true") }],
        cyryzsz: [{ validator: validator("4, \"number\", \"从业人员总数止\", true") }],
      },
      id: "",
      //分页
      pageSize: 12,
      total: 0,
      pageNum: 1, //	无
      tableData: [],
      ssdq_dmb: "",
      jglx_dmb: "",
      sshy_dmb: "",
      djzclx_dmb: "",
      disabled: false
    };
  },
  methods: {
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    //查询信息回显
    Msg_hx() {
      if (this.$route.query.id) {
        $.get("/ssj/cctjCx", {params: { sjccid: this.$route.query.id}}).then(res => {
          var _res = res.returnData;
          if (_res.executeResult == "1") {
            this.formInline = _res.vb;
            this.query(1,1);
          }
        });
      }
    },
    // 查询代码表接口
    ssdqdmb() {
      var _this = this;
      // 所属地区
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ssdq", function(res) {
        _this.ssdq_dmb = res.returnData.dmblb;
      });
      // 机构类型代码表
      getdmb("/dmbgl/dmblbCx", "ldjg_d_jglx", function (res) {
        _this.jglx_dmb = res.returnData.dmblb;
      });
      // 所属行业表
      getdmb("/dmbgl/dmblbCx", "ldjg_d_sshy", function (res) {
        _this.sshy_dmb = res.returnData.dmblb;
      });
       // 登记注册类型表
       getdmb("/dmbgl/dmblbCx", "ldjg_d_djzclx", function (res) {
        _this.djzclx_dmb = res.returnData.dmblb;
      });
    },
    // 下一步
    nextStep () {
      this.formInline.sjccid = this.$route.query.id;
      $.post("/ssj/sjcxxxSave", {
        zfdx: this.formInline.zfdx,
        ssdq:	this.formInline.ssdq,
        jglx:	this.formInline.jglx,
        sshy:	this.formInline.sshy,
        djzclx:this.formInline.djzclx,
        cyryzsq: this.formInline.cyryzsq,
        cyryzsz:this.formInline.cyryzsz,
        sjccid: this.formInline.sjccid,
      }).then( res => {
        var _res = res.returnData;
        if (_res.executeResult == "1") {
          this.$router.push({name: "Third", query: { id: this.$route.query.id }});
        }
      });
    },
    // 上一步
    preStep() {
      this.$router.push({name: "First", query: { id: this.$route.query.id }});
    },
    // 查询
    query(num, flag) {
      if (flag == 1) {
        this.formInline_page = deepClone(this.formInline);
      }
      var _form = this.formInline_page;
      if (this.$route.query.id) {
        _form.sjccid = this.$route.query.id;
        // this.formInline = this.$route.query.id;
      }
      this.pageNum = num;
      _form.pageNum = num || this.pageNum;
      $.get("/ssj/sjccdwCx", {params: {
        zfdx: _form.zfdx,
        ssdq:  _form.ssdq,
        jglx: _form.jglx,
        sshy: _form.sshy,
        djzclx: _form.djzclx,
        cyryzsq: _form.cyryzsq,
        cyryzsz: _form.cyryzsz,
        pageNum: _form.pageNum
      }}).then(res => {
        var _res = res.returnData;
        if (_res.executeResult == "1") {
          this.tableData = Group(_res.vbs);
          this.total = parseInt(res.rowsCount);
          this.disabled = false;
        } else {
          this.tableData = Group(_res.vbs);
          this.total = parseInt(res.rowsCount);
          this.disabled = true;
          if (_res.message != "无查询结果") {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        }
        this.$refs.ref_form.clearValidate();
      });
    },
    //重置方法
    reset() {
      this.$refs.ref_form.resetFields();
    },
  },
  created() {
    this.ssdqdmb();
    this.query();
    this.Msg_hx();
  }
};
</script>
<style scoped lang="scss">
.el-breadcrumb-item {
  color: #5D5D5D;
}
.person {
  color: #089FB1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}
.btn {
  text-align: center;
  margin: 15px 0;
  .backC {
    background-color: #089FB1;
    margin-right: 20px;
  }
  .backC:hover {
    background-color: #089FB1;
    opacity: 0.7;
  }
  .backB {
    border: 1px solid #089FB1;
    color: #fff;
  }
  .backB:hover {
    background-color: #089FB1;
    opacity: 0.7;
  }
}
.result_table {
  margin-top: 20px;
}
.qiehuan {
  width: 100%;
  height: 60px;
  margin: 0 auto 30px;
  ul {
    width: 100%;
  }
}
.same {
  p {
    color: #fff;
    margin: 0 0 0 -11px;
    text-align: center;
  }
  .first {
    font-size: 18px;
  }
  .second {
    margin: 14px 0 0 0px;
  }
}
.backs {
  width: 30%;
  height: 60px;
  background: url('../../../assets/images/1.png') 100% 100% no-repeat;
  list-style:none;
  float: left;
  margin-right: 2%;
  background-size: 100% 100%; 
}
.two_backs {
  width: 31%;
  height: 60px;
  background: url('../../../assets/images/02.png') no-repeat;
  list-style:none;
  float: left;
  margin-right: 2%;
  background-size: 100% 100%; 
}
.third_backs {
  width: 30%;
  height: 60px;
  background: url('../../../assets/images/2.png') 100% 100% no-repeat;
  list-style:none;
  float: left;
  background-size: 100% 100%; 
}
</style>