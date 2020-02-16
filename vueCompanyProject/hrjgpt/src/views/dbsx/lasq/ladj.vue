<template>
  <div>
    <div class="forms">
      <el-form
        :rules="rules"
        :inline="true"
        :model="lasqForm"
        size="small"
        ref="lasqForm"
        label-position="right"
        label-width="100px"
        class="demo-ruleForm"
        style="height:100%"
        :disabled="disabled"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件号：">
              <el-input v-model="lasqForm.ajh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件来源：" prop="ajly" required>
              <el-select v-model="lasqForm.ajly" value-key="value" placeholder :disabled="true">
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ajly_dmb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案由：" prop="ay" required>
              <el-select v-model="lasqForm.ay" value-key="value" :title="ayTitle">
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ay_dmb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="base">
          <div class="person">当事人基本信息</div>
          <el-row>
            <el-form-item label="当事人：" prop="dwmc" required>
              <el-input v-model="lasqForm.dwmc" class="input_width"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="地址：" prop="dwdz" required>
              <el-input v-model="lasqForm.dwdz" class="input_width"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人：" prop="lxr" required>
                <el-input v-model="lasqForm.lxr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：" prop="lxdh" required>
                <el-input v-model="lasqForm.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="证件类型：" prop="zjlx" required>
                <el-select
                  v-model="lasqForm.zjlx"
                  value-key="value"
                  placeholder
                  @change="changeZjlx()"
                >
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in zjlx_dmb"
                    :key="item.dmid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码：" prop="zjhm" required>
                <el-input v-model="lasqForm.zjhm" @blur="changeZjh"></el-input>
                <!-- <el-input v-model="lasqForm.zjhm" @keydown.once="changeZjh"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="xcOpinion">
          <el-form-item label="案件基本情况及涉及违反的法律法规" class="only box1" prop="ajjbqk" required>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 18}"
              v-model="lasqForm.ajjbqk"
              class="noresize"
            ></el-input>
          </el-form-item>
        </div>
        <div class="cbOpinion">
          <el-form-item label="截止日期：" prop="jzrq" class="shijian">
            <el-date-picker
              type="date"
              :picker-options="pickerOptions0"
              v-model="lasqForm.jzrq"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="承办人意见" class="only1 box2" prop="cbyj" required>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 18}"
              v-model="lasqForm.cbyj"
              class="noresize"
            ></el-input>
          </el-form-item>
        </div>
        <div class="xcRemarks">
          <div class="person">备注</div>
          <el-form-item label class="box3" prop="bz">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 18}"
              class="noresize"
              v-model="lasqForm.bz"
            ></el-input>
          </el-form-item>
        </div>
        <div class="xcRemarks" v-show="lasqForm.jaxaspyj">
          <div class="person">审批意见</div>
          <el-form-item label class="box3" prop="bz">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 18}"
              class="noresize"
              v-model="lasqForm.jaxaspyj"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 延期 -->
        <el-form
          ref="form"
          :model="yq_form"
          label-width="80px"
          :rules="rules"
          status-icon
          class="xcRemarks"
          v-if="flag == 'yq'"
          v-cloak
        >
          <div class="person">
            <el-form-item label="延期理由" class="only yq_style box1" prop="yqyy" required>
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 18}"
                class="noresize"
                v-model="yq_form.yqyy"
              ></el-input>
            </el-form-item>
            <el-col :span="24" class="btn">
              <el-button type="primary" @click="submit">申请延期</el-button>
              <el-button type="primary" @click="back">返回</el-button>
            </el-col>
          </div>
        </el-form>
        <!-- 审核 -->
        <el-form
          ref="forms"
          :model="sp_forms"
          label-width="80px"
          :rules="rules_sh"
          class="xcRemarks"
          v-if="flag_sh == 'sh'"
          v-cloak
        >
          <el-row>
            <el-form-item
              label="审核意见"
              :autosize="{ minRows: 8, maxRows: 18}"
              class="box4 xjdj_jcnr"
              prop="shyj"
            >
              <el-input
                type="textarea"
                class="noresize"
                :autosize="{ minRows: 8, maxRows: 18}"
                v-model="sp_forms.shyj"
                :disabled="lasqsp_btn"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="!lasqsp_btn" v-cloak>
            <el-col :span="24" class="btn">
              <el-button type="primary" @click="sh_submit(31)">审批通过</el-button>
              <el-button type="primary" @click="sh_unsubmit(32)">审批退回</el-button>
              <el-button type="primary" @click="back">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 审皮 -->
        <el-form
          ref="forms"
          :model="sp_forms"
          label-width="80px"
          :rules="rules_sp"
          class="xcRemarks"
          v-show="flag == 'sp'"
          v-cloak
        >
          <el-row>
            <el-form-item label="审批意见" class="box4 xjdj_jcnr" prop="spyj">
              <el-input
                type="textarea"
                class="noresize"
                :autosize="{ minRows: 8, maxRows: 18}"
                v-model="sp_forms.spyj"
                :disabled="lasqsp_btn"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="!lasqsp_btn" v-cloak>
            <el-col :span="24" class="btn">
              <el-button type="primary" @click="sh_submit(41)">审批通过</el-button>
              <el-button type="primary" @click="sh_unsubmit(42)">审批退回</el-button>
              <el-button type="primary" @click="wwf_submit(43)">无违法行为</el-button>
              <el-button type="primary" @click="back">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 结案审批 -->
        <el-form
          ref="ja_forms"
          :model="jasp_forms"
          label-width="80px"
          :rules="rules_jasp"
          class="xcRemarks"
          v-if="flag == 'jasp'"
          v-cloak
        >
          <el-row>
            <el-form-item label="审批意见" class="box4 xjdj_jcnr" prop="spyj">
              <el-input
                type="textarea"
                class="noresize"
                :autosize="{ minRows: 8, maxRows: 18}"
                v-model="jasp_forms.spyj"
                :disabled="lasqsp_btn"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="!lasqsp_btn" v-cloak>
            <el-col :span="24" class="btn">
              <el-button type="primary" @click="jasptg">审批通过</el-button>
              <el-button type="primary" @click="jaspth">审批退回</el-button>
              <el-button type="primary" @click="back">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-form>
      <el-row v-show="!disabled" class="btn1" v-cloak>
        <el-col :span="24">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="primary" @click="resetForm">提交</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" v-if="disabled && lasqsp_btn">
        <el-button type="primary" @click="downLond(id)" v-if="lasqForm.sfkxz == '1'">下载</el-button>
        <el-button type="primary" @click="back">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import $ from "@/common/js/axios";
import { mapActions } from "vuex";
import { getdmb } from "@/common/js/common";
import { validator } from "@/common/js/valid";

export default {
  data() {
    var _this = this;
    return {
      // 文书对应参数id
      // id: "00000000000004",
      id: "",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      // 证件通过可提交
      flag_zjtg: "",
      lasqsp_btn: true,
      lasqsp: "",
      flag: "",
      flag_sh: "",
      ajdjbid: "",
      lasqbid: "",
      yq_form: {
        yqyy: ""
      },
      sp_forms: {
        shyj: ""
      },
      // 结案审批
      jasp_forms: {
        spyj: ""
      },
      // disabled: this.$route.query.disable == 'false' ? false : true,
      disabled: "",
      //disabled: this.$route.query.disable == 'false' ? false : true,
      // 案由
      ay_dmb: "",
      ayTitle: "",
      //案件来源
      ajly_dmb: "",
      //证件类型
      zjlx_dmb: "",
      // 表单数据
      lasqForm: {},
      rules: {
        ay: [{ validator: validator('20, "full", "案由", false') }],
        ajly: [{ validator: validator('2, "full", "案件来源", false') }],
        dwmc: [{ validator: validator('32, "full", "当事人", false') }],
        dwdz: [{ validator: validator('64, "full", "地址", false') }],
        lxr: [{ validator: validator('32, "full", "联系人", false') }],
        lxdh: [{ validator: validator('32, "phone", "联系电话", false') }],
        zjlx: [{ validator: validator('2, "full", "证件类型", false') }],
        zjhm: [{ validator: validator('18, "full", "证件号码", false') }],
        ajjbqk: [
          {
            validator: validator(
              '4000, "bz", "案件基本情况及涉及违反的法律法规名称", false'
            )
          }
        ],
        cbyj: [{ validator: validator('4000, "bz", "承办意见", false') }],
        jzrq: [
          {
            type: "string",
            required: true,
            message: "截止日期不能为空",
            trigger: "blur"
          }
        ],
        bz: [{ validator: validator('512, "bz", "备注", true') }],
        yqyy: [{ validator: validator('256, "bz", "延期原因", false') }]
      },
      rules_sp: {
        spyj: [
          { validator: validator('256, "bz", "审批意见", false') },
          { required: true }
        ]
      },
      rules_sh: {
        shyj: [
          { validator: validator('256, "bz", "审核意见", false') },
          { required: true }
        ]
      },
      rules_jasp: {
        spyj: [
          { validator: validator('256, "bz", "审批意见", false') },
          { required: true }
        ]
      }
    };
  },
  methods: {
    // 下拉控制参数id
    ready(num) {
      this.$refs["lasqForm"].validate(valid => {
        if (valid) {
          const _obj = this.lasqForm;
          _obj.flag = num;
          $.post("/lasp/lasqxxSave", _obj).then(() => {
            // console.log(res);
            this.dbNum();
            this.$message.success("操作成功");
            this.$router.push({ name: "Lasq" });
          });
        } else {
          return false;
        }
      });
    },
    // 提交
    resetForm() {
      if (this.flag_zjtg != 1) {
        this.$refs["lasqForm"].validate(valid => {
          if (valid) {
            this.$confirm("是否提交", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            })
              .then(() => {
                this.ready(1);
              })
              .catch(() => {});
          }
        });
      } else {
        this.$alert("请输入正确证件号", {
          center: true,
          confirmButtonText: "确定"
        });
      }
    },
    // 保存
    submitForm(num) {
      if (this.flag_zjtg != 1) {
        this.$refs["lasqForm"].validate(valid => {
          this.lasqForm.flag = num;
          if (valid) {
            this.$confirm("是否保存", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            })
              .then(() => {
                this.ready(0);
              })
              .catch(() => {});
          }
        });
      } else {
        this.$alert("请输入正确证件号", {
          center: true,
          confirmButtonText: "确定"
        });
      }
    },
    getData() {
      var id = this.$route.query.lasqbid;
      this.flag = this.$route.query.flag;
      this.flag_sh = this.$route.query.flag_sh;
      this.LoadOn();
      $.get("/lasp/lasqxxCx", {
        params: { lasqbid: id }
      }).then(res => {
        // console.log(res);
        this.sp_forms.shyj = res.returnData.vb.shyj;
        this.lasqForm = res.returnData.vb;
        this.id = this.lasqForm.ajwsdybid;
        if (res.returnData.vb.shyj) {
          this.jasp_forms.shyj = res.returnData.vb.shyj;
        }
        if (res.returnData.vb.spyj) {
          this.sp_forms.spyj = res.returnData.vb.spyj;
        }
        // 页面数据项的状态
        if (
          this.$route.query.disable == "false" ||
          this.$route.query.disable == false
        ) {
          var is_disabled = false;
        } else if (
          this.$route.query.disable == "true" ||
          this.$route.query.disable == true
        ) {
          is_disabled = true;
        }
        this.disabled = is_disabled;
        // 判断审批的状态   lasqsp 标识 立案跳转    jasp 结案标识
        if (
          this.$route.query.lasqsp == "false" ||
          this.$route.query.lasqsp == false
        ) {
          var is_lasqsp = false;
        } else if (
          this.$route.query.lasqsp == "true" ||
          this.$route.query.lasqsp == true
        ) {
          is_lasqsp = true;
        }
        this.lasqsp_btn = is_lasqsp;
        //清空校验
        this.$nextTick(() => {
          if (this.disabled == true || this.disabled == "true") {
            this.$refs.lasqForm.clearValidate();
            if (this.$refs.forms) {
              this.$refs.forms.clearValidate();
            }
          }
          this.$refs["lasqForm"].clearValidate();
        });
        //案由
        var _this = this;
        getdmb("/dmbgl/dmblbCx", "ldjg_ay", function(res) {
          // console.log(res);
          const _res = res.returnData;
          if (+_res.executeResult === 1) {
            // 循环dmb查询结果当sfky字段=0时下拉不可选
            for (let i in _res.dmblb) {
              if (_res.dmblb[i].sfky == 0) {
                _res.dmblb[i].disabled = true;
              }
            }
            _this.ay_dmb = _res.dmblb;
            if (_this.lasqForm.ay) {
              _this.ayTitle = _this.ay_dmb.find(item => {
                return item.dmid == _this.lasqForm.ay;
              }).dmmc;
            }
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
        //案件来源
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
            _this.ajly_dmb = res.returnData.dmblb;
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
        //案件来源
        getdmb("/dmbgl/dmblbCx", "ldjg_d_zjlx", function(res) {
          _this.LoadClose();
          // console.log(res);
          _this.zjlx_dmb = res.returnData.dmblb;
        });

        this.lasqsp = this.$route.query.lasqsp;
      });
    },
    // 点击不同证件类型，加不同校验
    changeZjlx() {
      if (this.lasqForm.zjlx == "01") {
        // this.zjhRegexp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        this.zjhRegexp = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)$/;
      } else if (this.lasqForm.zjlx == "02") {
        this.zjhRegexp = new RegExp("^[a-zA-Z0-9]{3,21}$");
      } else if (this.lasqForm.zjlx == "03") {   //军官证
        // this.zjhRegexp = new RegExp("^[a-zA-Z0-9]{7,21}$");
        this.zjhRegexp =  /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
      } else if (this.lasqForm.zjlx == "04") {
        // this.zjhRegexp = /^([A-Z](\d{6})\(\d\))$/;
        this.zjhRegexp = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
      } else if (this.lasqForm.zjlx == "05") {
        // this.zjhRegexp = new RegExp("^[1|5|7][0-9]{6}([0-9Aa])");
        this.zjhRegexp = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
      } else if (this.lasqForm.zjlx == "06") {
        this.zjhRegexp = new RegExp("^[HMhmCc]{1}([0-9]{10}|[0-9]{8})$");
      } else if (this.lasqForm.zjlx == "07") {//台胞证
        // this.zjhRegexp = new RegExp("^[a-zA-Zd]{6,10}$");
        this.zjhRegexp = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
      } else if (this.lasqForm.zjlx == "08") {
        this.zjhRegexp = "";
      }
    },

    changeZjh() {
      if (this.lasqForm.zjlx == undefined || this.lasqForm.zjlx == "") {
        this.$alert("请选择证件类型", {
          center: true,
          confirmButtonText: "确定"
        });
        this.lasqForm.zjhm = "";
        return false;
      }
      if (this.lasqForm.zjhm != "") {
        var result = this.zjhRegexp.test(this.lasqForm.zjhm);
        if (result != true) {
          this.$alert("证件号错误", {
            center: true,
            confirmButtonText: "确定"
          });
          this.flag_zjtg = 1; //为一是不通过
          return false;
        } else {
          this.flag_zjtg = "";
        }
      }
    },
    //延期提交
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $.post("/ajbl/yq", {
                lasqbid: this.$route.query.lasqbid, //类型：String  必有字段  备注：14,full,立案申请id,false
                ajblid: this.$route.query.ajblid, //类型：String  必有字段  备注：14,full,案件办理id,false
                yqyy: this.yq_form.yqyy //类型：String  必有字段  备注：128,full,延期原因,false
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.back();
                } else {
                  this.$alert(_res.message, {
                    center: true,
                    confirmButtonText: "确定"
                  });
                }
              });
            })
            .catch(() => {});
        }
      });
    },

    // 立案申请审批审核提交
    la_submit(num) {
      this.LoadOn();
      $.post("/lasp/lasqSh", {
        lasqbid: this.$route.query.lasqbid, //	文本	必填	14,full,案件登记id,false
        ajdjbid: this.lasqForm.ajdjbid,
        spyj: this.sp_forms.spyj,
        ajh: this.lasqForm.ajh,
        ajzt: num
      }).then(res => {
        this.LoadClose();
        var _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.$message({
            type: "success",
            center: true,
            message: res.returnMsg
          });
          this.back();
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //审批通过
    sh_submit() {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否审批通过", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.la_submit(41);
            })
            .catch(() => {});
        }
      });
      // this.la_submit(41);
    },
    // 审核退回
    sh_unsubmit() {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否审批退回", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.la_submit(42);
            })
            .catch(() => {});
        }
      });
      // 判断立案申请审批标识
      // if (!this.$route.query.lasqsp) {
      // this.la_submit(42);
      // } else {
      //   if (!this.sp_forms.shyj) {
      //     this.$alert("审核意见不能为空", {
      //       center: true,
      //       confirmButtonText: "确定"
      //     });
      //     return;
      //   }
      //   this.ja_submit("/ajbl/jaxashth");
      // }
    },
    // 无违法行为
    wwf_submit() {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.la_submit(43);
            })
            .catch(() => {});
        }
      });
    },
    // 结案销案 审批通过
    jasptg() {
      this.$refs["ja_forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否审批通过?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.ja_submit("/ajbl/jaxashtg");
            })
            .catch(() => {});
        }
      });
    },
    // 结案销案 审批退回
    jaspth() {
      this.$refs["ja_forms"].validate(valid => {
        if (valid) {
          this.$confirm("是否审批退回?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.ja_submit("/ajbl/jaxashth");
            })
            .catch(() => {});
        }
      });
    },
    // 结案申请审批审核提交
    ja_submit(Path) {
      $.post(Path, {
        lasqbid: this.$route.query.lasqbid, //	文本	必填	14,full,案件登记id,false
        wsid: this.$route.query.wsid,
        jaxaspyj: this.jasp_forms.spyj
      }).then(res => {
        var _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.$message({
            type: "success",
            center: true,
            message: res.returnMsg
          });
          this.back();
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    downLond(id) {
      window.location.href = "wsgl/downloadWs?id=" + id;
      // window.location.href = "hrldjc/wsgl/downloadWs?id=" + id;
    }
  },
  created() {
    this.getData();
    // var key_this = this
    // document.onkeydown=function(e){
    //   key_this.changeZjh()
    // }
  }
};
</script>

<style scoped>
.input_width {
  width: 400px;
}
.btn,
.btn1 {
  width: 100%;
  text-align: center;
  margin: 20px auto;
}
.btn1 {
  margin: 10px auto;
}
.cbOpinion,
.xcOpinion,
.xcRemarks {
  margin-top: 35px;
}
.xcRemarks {
  margin-bottom: 35px;
}
.cbOpinion .person {
  display: inline-block;
}

.shijian {
  margin-left: 32%;
  position: absolute;
}

.shijian .el-input {
  margin-left: 15px;
}
.three {
  margin: 15px 80px 0 80px;
}

.three .el-input {
  margin-bottom: 15px;
}
.register::after,
.base::after,
.procuratorate::after,
.xcOpinion::after,
.xcRemarks::after,
.btn::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}

.jczh {
  height: 62px;
  line-height: 40px;
}

.jcnr {
  width: 800px;
}

.jcnr .el-checkbox-group {
  margin-left: 80px;
  padding: 0;
  list-style: none;
}

.jcnr .el-checkbox {
  width: 350px;
  margin: 0;
}

.jcnr .el-checkbox + .el-checkbox {
  margin-left: 0;
}

.problem .el-form-item {
  margin-left: 80px;
  width: 100%;
}

.problem .people .el-input__inner {
  width: 30px;
  padding: 0;
  position: relative;
}

.problem .el-textarea__inner {
  border: 1px solid #dcdfe6;
}

.xcOpinion .box1,
.cbOpinion .box2,
.xcRemarks .box3 {
  border-radius: 4px;
  margin-left: 80px;
  width: 80%;
  height: 100%;
}

.xcRemarks .box4 {
  border-radius: 4px;
  width: 80%;
  /* height: 50px; */
  margin-bottom: 20px;
}
.xcRemarks .box1{
  width:80%;
}
.base .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.base .el-date-editor.el-input {
  width: 200px;
}

.person {
  color: #089fb1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}

.com_content {
  padding: 20px;
}

.el-range-input {
  width: 150px;
}
</style>
