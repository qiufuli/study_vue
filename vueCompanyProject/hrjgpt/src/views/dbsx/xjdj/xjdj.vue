<template>
  <div>
    <div class="com_content">
      <el-form
        :rules="rules"
        :inline="true"
        :model="xcdjForm"
        size="small"
        ref="xcdjForm"
        label-position="right"
        label-width="150px"
        class="demo-ruleForm"
        style="height:100%"
        :disabled="isdisabled"
      >
        <div class="register">
          <el-col :span="12">
            <el-form-item label="案件来源：">
              <el-input v-model="ajly" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="案由：" prop="ay">
              <el-select
                v-model="xcdjForm.ay"
                value-key="value"
                placeholder=""
                clearable
                :title="ayTitle"
                ref="t_select"
                @change="titlech"
              >
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
        </div>
        <div class="base">
          <div class="person">单位基本信息</div>
          <el-row>
            <el-form-item label="检查时间：" required>
              <el-col :span="11">
                <el-form-item prop="jckssj">
                  <el-date-picker
                    type="datetime"
                    :editable="false"
                    @blur="kaishi_time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="xcdjForm.jckssj"
                    :picker-options="pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align:center;">至</el-col>
              <el-col :span="11">
                <el-form-item prop="jcjssj">
                  <el-date-picker
                    v-model="xcdjForm.jcjssj"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    :editable="false"
                    @blur="jieshu_time"
                    :picker-options="pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="被检查单位/人：" prop="bjcdw" required>
              <el-input v-model="xcdjForm.bjcdw" class="inputWidth"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="检查地点：" prop="jcdz" required>
              <el-input v-model="xcdjForm.jcdz" class="inputWidth"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="法定代表人：" prop="frdb" required>
              <el-input v-model="xcdjForm.frdb"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="现场人：" prop="xcr" required>
                <el-input v-model="xcdjForm.xcr"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="身份：" prop="sf" required>
                <el-input v-model="xcdjForm.sf"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：" prop="lxdh" required>
                <el-input v-model="xcdjForm.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="procuratorate">
          <div class="person">监察员</div>
          <el-col :span="24">
            <el-form-item label="监察小组：">
              <el-input v-model="xcdjForm.jcxz" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主办监察员：">
                <el-input v-model="xcdjForm.zbjcyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监察证号：">
                <el-input v-model="xcdjForm.zbjczh" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="协办监察员：">
                <el-input v-model="xcdjForm.xbjcyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监察证号：">
                <el-input v-model="xcdjForm.xbjczh" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="jcnr">
          <el-form-item label="检查内容" class="xjdj_jcnr" required>
            <el-checkbox-group v-model="jcnr">
              <el-checkbox
                name="type"
                v-for="item in ccsx_dmb"
                :label="item.dmmc"
                :key="item.dmid"
                :id="item.dmid"
                :disabled="(item.sfky == 0 ? true : false)"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="three">
            <el-row>
              <el-col>
                <el-input v-model="xcdjForm.ccnr_1" placeholder="附加检查内容1" porp="ccnr_1"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-input v-model="xcdjForm.ccnr_2" placeholder="附加检查内容2" porp="ccnr_2"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-input v-model="xcdjForm.ccnr_3" placeholder="附加检查内容3" porp="ccnr_3"></el-input>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="problem">
          <div class="person">涉嫌存在问题</div>
          <el-row style="width:100%;margin-left:80px;">
            <el-form-item label>
              <el-radio-group v-model="xcdjForm.sfywt" @change="checkboxeven(xcdjForm.sfywt)">
                <el-radio label="1">有</el-radio>
                <el-radio label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <div v-show="xcdjForm.sfywt == 1" style="margin-left:80px;">
            <el-row class="problem_lineheight">
                <el-form-item prop="wtrs">
                  <span>经查：该单位有员工</span>
                  <el-input v-model="xcdjForm.wtrs" class="people" style="width:100px;"></el-input>
                  <span>人，在</span>
                </el-form-item>
                <el-form-item prop="wt">
                  <el-input v-model="xcdjForm.wt" style="width:350px;"></el-input>
                  <span>方面涉嫌</span>
                </el-form-item>
            </el-row>
            <el-row class="problem_lineheight">
                <el-form-item prop="wtcl">
                  <span>存在问题，现场取得</span>
                  <el-input v-model="xcdjForm.wtcl" style="width:500px"></el-input>
                  <span>等材料。</span>
                </el-form-item>
            </el-row>
            <el-row class="problem_lineheight">
              <el-col>
                <el-form-item label="是否发放调查询问书" class="jcy">
                  <el-radio-group v-model="xcdjForm.sfffdcxws">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="10">
                <el-form-item label="监察员：" class="jcy" label-width="100px">
                  <el-input v-model="xcdjForm.ldbzjcy"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="监察员登记时间：" class>
                  <el-input v-model="xcdjForm.ldbzjcysj"></el-input>
                </el-form-item>
              </el-col>
            </el-row>-->
          </div>
        </div>
        <div class="xcOpinion">
          <el-form-item label="现场人意见登记时间：" label-width="250px" prop="xcryjdjsj" class="shijian">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="xcdjForm.xcryjdjsj"
              :picker-options="xcr_pickerOptionsStart"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="现场人意见" class="only box1" prop="xcryj" required>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 18}"
              v-model="xcdjForm.xcryj"
              class="noresize"
            ></el-input>
          </el-form-item>
        </div>
        <div class="cbOpinion">
          <el-form-item label="承办人意见登记时间：" label-width="250px" prop="cbryjdjsj" class="shijian">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="xcdjForm.cbryjdjsj"
              :picker-options="xcr_pickerOptionsStart"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="承办人意见" class="only box2" prop="cbryj" required>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 18}"
              v-model="xcdjForm.cbryj"
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
              v-model="xcdjForm.bz"
              class="noresize"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- 审核 -->
      <el-form
        ref="forms"
        :model="sh_forms"
        label-width="80px"
        :rules="rules2"
        status-icon
        class="xcRemarks"
        v-if="flag == 'sp' || flag_sh == 'sh'"
      >
        <el-form-item label="审核意见" class="xjdj_jcnr box4" prop="shyj" required>
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 18}"
            v-model="sh_forms.shyj"
            :disabled="xjdjsx_btn"
            class="noresize"
          ></el-input>
        </el-form-item>
        <el-row class="btn" v-if="!xjdjsx_btn">
          <el-col :span="24">
            <el-button type="primary" @click="sh_save()">审核通过</el-button>
            <el-button type="primary" @click="sh_cancel()">审核退回</el-button>
            <el-button type="primary" @click="back">返回</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-row v-show="!isdisabled" class="btn1" v-else>
        <el-col :span="24" style="text-align: center;">
          <el-button type="primary" @click="submitForm('xcdjForm')">保存</el-button>
          <el-button type="primary" @click="resetForm('xcdjForm')">提交</el-button>
          <el-button type="primary" @click="goBack()" >返回</el-button>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" align="middle" v-if="isdisabled && xjdjsx_btn">
        <!-- v-if="isdisabled && !(flag == 'sp' || flag == 'sh')" -->
        <el-button type="primary" @click="downLond(id)" v-if="xcdjForm.sfkxz === '1'">下载</el-button>
        <el-button type="primary" @click="back">返回</el-button>
      </el-row>
      <el-row type="flex" justify="center" align="middle" v-if="isdisabled && !flag && !flag_sh && !xjdjsx_btn">
        <el-button type="primary" @click="back">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import $ from "@/common/js/axios";
import { mapActions, mapState } from "vuex";
import { validator } from "@/common/js/valid";
import { getdmb } from "@/common/js/common";

export default {
  data() {
    var _this = this;
    return {
      // 文书对应参数id
      id: "",
      xcr_pickerOptionsStart: {
        disabledDate: time => {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.xcdjForm.jcjssj;
          if (endDateVal) {
            return (
              time.getTime() > new Date(endDateVal).getTime()
            );
          }else {
            return time.getTime() > Date.now(_this.$store.state.djtime);
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.xcdjForm.jckssj;
          if (beginDateVal) {
            return (
              time.getTime() > Date.now(_this.$store.state.djtime) ||
              time.getTime() <= new Date(beginDateVal).getTime() - 24 * 60 * 60 * 1000
            );
          } else {
            return time.getTime() > Date.now(_this.$store.state.djtime);
          }

        }
      },
      radio: '1',
      applyTime: null,
      ajly: "",
      flag: "",
      flag_sh: "",
      isdisabled: "",
      xjdjsx_btn: true,
      //审核数据
      sh_forms: {
        shyj: ""
      },
      // 案由
      ay_dmb: "",
      ayTitle: "",
      // 回显复选框的选中内容
      jcnr: [],
      update: [],
      new_update: "",
      new_checkbox: "",
      ccsx_dmb: [], //抽查内容(ldjg_ay)
      xcdjForm: {
        xcryjdjsj: "",
        cbryjdjsj: "",
        sfywt: '0'
      },
      rules: {
        ay: [{ validator: validator('20, "full", "案由", true') },{required:true,message:"案由不能为空",trigger:'blur'}],
        bjcdw: [{ validator: validator('32, "full", "被检查单位/人", false') }],
        jcdz: [{ validator: validator('64, "full", "检查地点", false') }],
        frdb: [{ validator: validator('32, "full", "法定代表人", false') }],
        xcr: [{ validator: validator('32, "full", "现场人", false') }],
        sf: [{ validator: validator('32, "full", "身份", false') }],
        lxdh: [{ validator: validator('32, "phone", "联系电话", false') }],
        ccnr_1: [{ validator: validator('32, "full", "检查内容", true') }],
        ccnr_2: [{ validator: validator('32, "full", "检查内容", true') }],
        ccnr_3: [{ validator: validator('32, "full", "检查内容", true') }],
        wtrs: [{ validator: validator('4, "num", "问题人数", true') }],
        wt: [{ validator: validator('32, "full", "问题", true') }],
        wtcl: [{ validator: validator('64, "full", "投诉(举报)材料", true') }],
        xcryj: [{ validator: validator('256, "bz", "现场人意见", false') }],
        xcryjdjsj: [
          {
            type: "string",
            required: true,
            message: "现场人意见登记时间",
            trigger: "blur"
          }
        ],
        cbryj: [{ validator: validator('256, "bz", "承办人意见", false') }],
        cbryjdjsj: [
          {
            type: "string",
            required: true,
            message: "承办人意见登记时间",
            trigger: "blur"
          }
        ],
        bz: [{ validator: validator('512, "bz", "备注", true') }],
        jckssj: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        jcjssj: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      rules2: {
        shyj: [{ validator: validator('256,"bz","审核意见",false') }]
      }
    };
  },
  computed: {
    ...mapState(["download_data"])
  },
  methods: {
    readyDate(flag) {
      // 过滤复选框数据
      this.ccsx_dmb.filter(item => {
        // 选中的复选框数据
        var bb = this.jcnr.map(item1 => {
          let newarr = "";
          if (item.dmmc == item1) {
            newarr = item.dmid;
          }
          this.update.push(newarr);
          return this.update;
        });
        return bb;
      });
      // console.log(this.update);
      // 数组去重
      var newArr = this.update.filter(function(ele, index, self) {
        return self.indexOf(ele) === index;
      });
      this.new_update = newArr.filter(function(s) {
        return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
      });
      this.new_checkbox = this.new_update.join(",");
      var _obj = this.xcdjForm;
      _obj.flag = flag;
      _obj.sfywt = Number(this.xcdjForm.sfywt);
      _obj.ccsx = this.new_checkbox;
      this.LoadOn()
      $.post("/wqdj/wqajSave", _obj).then(res => {
        // console.log(res);
        this.LoadClose()
        if (res.returnData.executeResult != 1) {
          this.$message.warning(res.returnData.message);
        } else {
          this.dbNum();
          this.$message.success("操作成功");
          this.$router.push({ name: "Xjdjsx" });
        }
      });
    },
    ready(flag) {
      if (
        (this.xcdjForm.sfywt == 1 && this.xcdjForm.sfffdcxws != null) ||
        this.xcdjForm.sfywt == 0
      ) {
        this.$refs["xcdjForm"].validate(valid => {
          if (valid) {
            if (this.jcnr == null || this.jcnr.length == 0) {
              if (
                (this.xcdjForm.ccnr_1 !== "" ||
                  this.xcdjForm.ccnr_2 !== "" ||
                  this.xcdjForm.ccnr_3 !== "") &&
                (this.xcdjForm.ccnr_1 !== null ||
                  this.xcdjForm.ccnr_2 !== null ||
                  this.xcdjForm.ccnr_3 !== null)
              ) {
                this.readyDate(flag);
              } else {
                this.$alert("检查内容不能为空", {
                  center: true,
                  confirmButtonText: "确定"
                });
              }
            } else {
              this.readyDate(flag);
            }
          } else {
            return false;
          }
        });
      } else {
        this.$alert("请选择是否发放调查询问书", {
          center: true,
          confirmButtonText: "确定"
        });
      }
    },
    // 提交
    resetForm() {
      this.$refs["xcdjForm"].validate(valid => {
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
    },
    // 保存
    submitForm() {
      this.$refs["xcdjForm"].validate(valid => {
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
    },
    checkboxeven(value) {
      // 判断选中是  无
      if (value == 0) {
        this.xcdjForm.wtrs = "";
        this.xcdjForm.wt = "";
        this.xcdjForm.wtcl = "";
        this.xcdjForm.sfffdcxws = null;
      } else {
        return;
      }
    },

    // 获取数据
    getData() {
      var id = this.$route.query.ajdjbid;
      this.flag = this.$route.query.flag;
      this.flag_sh = this.$route.query.flag_sh;
      this.LoadOn();
      $.get("/wqdj/wqajxgCx", {
        params: { ajdjbid: id }
      }).then(res => {
        // console.log(res);
        if (res.returnData.executeResult == 1) {
          this.xcdjForm = res.returnData.vb;
          this.id = this.xcdjForm.ajwsdybid;
          if (!res.returnData.vb.sfywt) {
            this.xcdjForm.sfywt = '0';
          }
          this.sh_forms.shyj = this.xcdjForm.shyj;
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
          this.isdisabled = is_disabled;
          if (
            this.$route.query.xjdjsx == "false" ||
            this.$route.query.xjdjsx == false
          ) {
            var is_xjdjsx = false;
          } else if (
            this.$route.query.xjdjsx == "true" ||
            this.$route.query.xjdjsx == true
          ) {
            is_xjdjsx = true;
          }
          this.xjdjsx_btn = is_xjdjsx;
          // 判断是否有sh,清空校验
          this.$nextTick(() => {
            if (this.isdisabled) {
              this.$refs.xcdjForm.clearValidate();
              if (this.$refs.forms) {
                this.$refs.forms.clearValidate();
              }
            }
            this.$refs.xcdjForm.clearValidate();
            if (this.$refs.forms) {
                this.$refs.forms.clearValidate();
              }
          });
          // 赋值复选框
          $.get("/dmbgl/dmblbCx", {
            params: {
              table_name: "ldjg_d_ccnr"
            }
          })
            .then(res => {
              const _res = res.returnData;
              if (_res.executeResult === "1") {
                var target = _res.dmblb.filter(current => {
                  return (
                    (current.dmmc !== null &&
                    current.dmmc !== undefined &&
                    current.dmmc !== "") 
                  );
                });
                this.ccsx_dmb = target;
              } else {
                this.$alert(_res.message, {
                  center: true,
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(() => {});
          // 赋值表单
          $.get("/dmbgl/dmblbCx", {
            params: {
              table_name: "ldjg_ajly",
              dmid: this.xcdjForm.ajly
            }
          }).then(res => {
            this.LoadClose();
            // 案件来源
            this.ajly = res.returnData.dmblb[0].dmmc;
          });
          // 案由
          getdmb("/dmbgl/dmblbCx", "ldjg_ay", res => {
            const _res = res.returnData;
            if (+_res.executeResult === 1) {
              // 循环dmb查询结果当sfky字段=0时下拉不可选
              for (let i in _res.dmblb) {
                if (_res.dmblb[i].sfky == 0) {
                  _res.dmblb[i].disabled = true;
                }
              }
              this.ay_dmb = _res.dmblb;
              if (this.xcdjForm.ay) {
                this.ayTitle = this.ay_dmb.find(item => {
                  return item.dmid == this.xcdjForm.ay;
                }).dmmc;
              }
              // this.ayTitle = _val.dmmc;
            } else {
              this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
          // 获取选中的复选框内容
          if (this.xcdjForm.ccsx !== "" && this.xcdjForm.ccsx !== null) {
            var a = this.xcdjForm.ccsx.split(",");
            a.map(item => {
              $.get("/dmbgl/dmblbCx", {
                params: {
                  table_name: "ldjg_d_ccnr",
                  dmid: item
                }
              }).then(res => {
                if (res.returnData.dmblb !== null) {
                  const dmmc = res.returnData.dmblb[0].dmmc;
                  if (res.returnData.dmblb[0].sfky == '1') {
                    this.jcnr.push(dmmc);
                  }
                } else {
                  return;
                }
              });
            });
          }
        }
      });
    },
    titlech: function(val) {
      this.ay_dmb.find(item => {
        if (item.dmid == val) {
          this.ayTitle = item.dmmc;
        }
      })
    },
    // 审核通过
    sh_save() {
      this.sh_event(31, "是否确认审核通过？");
    },
    // 审核不通过
    sh_cancel() {
      this.sh_event(32, "是否确认审核退回？");
    },
    sh_event(num, str) {
      this.$refs["forms"].validate(valid => {
        if (valid) {
          this.$confirm(str, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.LoadOn()
              $.post("/lasp/laqspSp", {
                ajdjbid: this.$route.query.ajdjbid, //	文本	必填	14,full,案件登记id,false
                ajh: this.$route.query.ajh, //	文本	必填	14,full,案件号,false
                ajzt: num, //	文本	必填	14,full,案件状态,false
                shyj: this.sh_forms.shyj //	文本	必填	256,full,审核意见,false
              }).then(res => {
                var _res = res.returnData;
                this.LoadClose()
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.$router.go(-1);
                } else {
                  this.$alert(_res.message, {
                    center: true,
                    confirmButtonText: "确定"
                  });
                }
              });
            })
            .catch(() => {}); //一定别忘了这个
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    downLond(id) {
      window.location.href = "wsgl/downloadWs?id=" + id;
      // window.location.href = "hrldjc/wsgl/downloadWs?id=" + id;
    },
    // 判断前后时间
    jieshu_time(){
      if (this.xcdjForm.jckssj == undefined || this.xcdjForm.jckssj == '') {
        return false
      } else if (new Date(this.xcdjForm.jckssj).getTime() > new Date(this.xcdjForm.jcjssj).getTime()) {
        this.$alert("开始时间不能大于结束时间", {
          center: true,
          confirmButtonText: "确定"
          });
      }
    },
    kaishi_time(){
      if (this.xcdjForm.jcjssj == undefined || this.xcdjForm.jcjssj == '') {
        return false
      } else if (new Date(this.xcdjForm.jckssj).getTime() > new Date(this.xcdjForm.jcjssj).getTime()) {
        this.$alert("开始时间不能大于结束时间", {
          center: true,
          confirmButtonText: "确定"
          });
        return false
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.shijian {
  margin-left: 25%;
  position: absolute;
}
.problem_lineheight {
  margin-bottom: 20px;
}
.el-form-item--small .el-form-item {
  margin-bottom: 0px;
}
.xcRemarks .box4 {
  border-radius: 4px;
  width: 80%;
  margin-bottom: 50px;
}
.btn,
.btn1 {
  width: 100%;
  text-align: center;
  margin: 60px auto;
}
.btn1 {
  margin: 30px auto;
}
.three {
  margin: 15px 80px 0 80px;
}

.three .el-input {
  margin-bottom: 15px;
}
.xcOpinion,
.cbOpinion,
.xcRemarks {
  margin-top: 35px;
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
.problem {
  margin-top: 20px;
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

.base .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.inputWidth {
  width: 435px;
}

.person {
  color: #089fb1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}

.com_content {
  padding: 20px;
  background-color: #fff;
}

.el-range-input {
  width: 150px;
}

.problem span {
  font-size: 14px;
  color: #606266;
  line-height: 32px;
}
.jcy {
  margin-left: 0 !important;
}
</style>
