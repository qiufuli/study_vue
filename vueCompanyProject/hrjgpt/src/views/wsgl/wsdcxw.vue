<template>
  <div class="forms left">
    <el-form :rules="rules" :model="wsxwForm" ref="ref_form" :disabled="disabled" class="wsxw">
      <p class="title">北京市怀柔区人力资源和社会保障局调查询问书</p>
      <el-row class="clearfix" :gutter="20">
        <el-col :span="6" :offset="12">
          <el-form-item prop="zi">京怀人社劳监询字〔<el-input v-model="wsxwForm.zi" class="zihao"></el-input>〕</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="hao">第<el-input v-model="wsxwForm.hao" class="zihao"></el-input>号</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item prop="dwmc">
          <el-input v-model="wsxwForm.dwmc" placeholder="请填写单位名称" style="width:50%"></el-input>：
        </el-form-item>
      </el-row>
      <div class="forms_content">
        <p class="indent" style="margin:0">根据《中华人民共和国劳动法》第八十五条的规定，我局需要了解你单位（你）在劳动用工方面的情况，请你单位（你）于
          <el-form-item prop="xwsj" style="margin-bottom:0">
            <el-date-picker v-model="wsxwForm.xwsj" type="datetime" value-format="yyyy-MM-ddHH:mm:ss" placeholder="选择日期时间" class="clearindent"></el-date-picker>
            <span class="fontSize">派员到北京市怀柔区人力资源和社会保障局劳动保障监察支队接受询问，并请携带以下勾选的书面材料：</span>
          </el-form-item>
        </p>
        <div class="checked">
          <el-row>
            <el-checkbox v-model="wsxwForm.cb1">《营业执照》(副本)原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb2">《统一社会信用代码证书》原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb3">《法定代表人身份证明书》及法定代表人的身份证原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb4">《负责人身份证明书》及负责人的身份证原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb5">经营者身份证原件及复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb6">《授权委托书》及被委托人的身份证原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb7">《社会保险登记证》原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-col :span="1">
              <el-checkbox v-model="wsxwForm.cb8" @change="change(8)"></el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cb8kssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb8kssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis8"
                  :editable="false"
                  :picker-options="pickerOptionsStart"
                  placeholder="选择日期">
                </el-date-picker>至
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="cb8jssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb8jssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis8"
                  :editable="false"
                  :picker-options="pickerOptionsEnd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="cols">社会保险申报表及缴费凭证原件与复印件；</el-col>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb9">职工名册原件与复印件；</el-checkbox>
          </el-row>
          <el-row class="marbom">
            <el-col :span="1">
              <el-checkbox v-model="wsxwForm.cb10" @change="change(10)"></el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cb10kssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb10kssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis10"
                  :editable="false"
                  :picker-options="pickerOptionsStart10"
                  placeholder="选择日期">
                </el-date-picker>至
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="cb10jssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb10jssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis10"
                  :editable="false"
                  :picker-options="pickerOptionsEnd10"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="cols">的部分职工劳动合同书原件与复印件；</el-col>
          </el-row>
          <el-row class="marbom">
            <el-col :span="1">
              <el-checkbox v-model="wsxwForm.cb11" @change="change(11)"></el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cb11kssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb11kssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis11"
                  :editable="false"
                  :picker-options="pickerOptionsStart11"
                  placeholder="选择日期">
                </el-date-picker>至
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="cb11jssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb11jssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis11"
                  :editable="false"
                  :picker-options="pickerOptionsEnd11"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="cols">
              的职工工资单原件与复印件；
            </el-col>
          </el-row>
          <el-row class="marbom">
            <el-col :span="1">
              <el-checkbox v-model="wsxwForm.cb12" @change="change(12)"></el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cb12kssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb12kssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis12"
                  :editable="false"
                  :picker-options="pickerOptionsStart12"
                  placeholder="选择日期">
                </el-date-picker>至
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="cb12jssj" style="margin-bottom:10px">
                <el-date-picker
                  v-model="wsxwForm.cb12jssj"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="checkdis12"
                  :editable="false"
                  :picker-options="pickerOptionsEnd12"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="cols">
              的职工考勤记录明细原件与复印件；
            </el-col>
          </el-row>
          <el-row>
            <el-checkbox v-model="wsxwForm.cb13">企业规章制度原件与复印件；</el-checkbox>
          </el-row>
          <el-row>
            <el-col :span="1">
              <el-checkbox v-model="wsxwForm.cb14" @change="change(14)"></el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cb14cl">
                <el-input class="cl" v-model="wsxwForm.cb14cl" :disabled="discl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="cols">等材料。</el-col>
          </el-row>
        </div>
        <el-row>
          <p class="indent">如无故逾期不到，或不按照要求提供书面材料，我局将按照《劳动保障监察条例》第三十条的规定处理。</p>
        </el-row>
        <el-row>
          <p class="indent marbom">地址：北京市怀柔区开放路86号</p>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="" prop="lxr">
              <span class="inputsS">联系人：</span><el-input v-model="wsxwForm.lxr" style="width:190px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="dh">
              <span class="inputsS">电话：</span><el-input v-model="wsxwForm.dh" style="width:190px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row class="clearfix">
        <p class="right">北京市怀柔区人力资源和社会保障局</p>
      </el-row>
      <el-row class="clearfix" :gutter="20">
        <el-col :span="6" :offset="18">
          <el-form-item prop="djsj">
            <el-date-picker v-model="wsxwForm.djsj" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间" class="rightdata"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="sjr">
            <span class="inputsS">收件人：</span><el-input v-model="wsxwForm.sjr" style="width:100px" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="sf">
            <span class="inputsS">身份：</span><el-input v-model="wsxwForm.sf" style="width:100px" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="lxdh">
            <span class="inputsS">联系电话：</span><el-input v-model="wsxwForm.lxdh" style="width:100px" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="sjrdjsj" class="rightdata">
            <el-date-picker v-model="wsxwForm.sjrdjsj" type="date" value-format="yyyy-MM-dd" disabled="disabled" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="btn">
      <el-button type="primary" class="backC" @click="nextStep()" v-show="sfshow">保存</el-button>
      <el-button type="primary" class="backC" @click="goBack()">返回</el-button>
    </el-row>
  </div>
</template>
<script>
// import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import "@/common/scss/public.scss";
import { Search, baocun, reviseTime } from "./ws.js";
export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.wsxwForm.cb8jssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.wsxwForm.cb8kssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      pickerOptionsStart10: {
        disabledDate: time => {
          let endDateVal = this.wsxwForm.cb10jssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd10: {
        disabledDate: time => {
          let beginDateVal = this.wsxwForm.cb10kssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      pickerOptionsStart11: {
        disabledDate: time => {
          let endDateVal = this.wsxwForm.cb11jssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd11: {
        disabledDate: time => {
          let beginDateVal = this.wsxwForm.cb11kssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      pickerOptionsStart12: {
        disabledDate: time => {
          let endDateVal = this.wsxwForm.cb12jssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd12: {
        disabledDate: time => {
          let beginDateVal = this.wsxwForm.cb12kssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      wsxwForm: {
        zi: "",
        hao: "",
        dwmc: "",
        xwsj: "",
        cb1: false,
        cb2: false,
        cb3: false,
        cb4: false,
        cb5: false,
        cb6: false,
        cb7: false,
        cb8: false,
        cb8kssj: "",
        cb8jssj: "",
        cb9: false,
        cb10: false,
        cb10kssj: "",
        cb10jssj: "",
        cb11: false,
        cb11kssj: "",
        cb11jssj: "",
        cb12: false,
        cb12kssj: "",
        cb12jssj: "",
        cb13: false,
        cb14: false,
        cb14cl: "",
        lxr: "",
        dh: "",
        djsj: "",
        sjr: "",
        sf: "",
        lxdh: "",
        sjrdjsj: ""
      },
      rules: {
        zi: [{validator: validator('32, "full", "监询字", false') }],
        hao: [{validator: validator('32, "full", "号", false') }],
        dwmc: [{validator: validator('128, "full", "单位名称", false') }],
        xwsj: [{validator: validator('19, "less", "询问时间", false') }],
        lxr: [{validator: validator('32, "full", "联系人", false') }],
        dh: [{validator: validator('32, "lxdh", "电话", false') }],
        djsj: [{validator: validator('19, "less", "登记时间", false') }],
        sjr: [{validator: validator('32, "full", "收件人", true') }],
        sf: [{validator: validator('32, "full", "身份", true') }],
        lxdh: [{validator: validator('32, "lxdh", "联系电话", true') }],
        sjrdjsj: [{validator: validator('19, "less", "收件人登记时间", true') }],
        cb8kssj: [{validator: validator('19, "less", "开始时间", true') }],
        cb8jssj: [{validator: validator('19, "less", "结束时间", true') }],
        cb10kssj: [{validator: validator('19, "less", "开始时间", true') }],
        cb10jssj: [{validator: validator('19, "less", "结束时间", true') }],
        cb11kssj: [{validator: validator('19, "less", "开始时间", true') }],
        cb11jssj: [{validator: validator('19, "less", "结束时间", true') }],
        cb12kssj: [{validator: validator('19, "less", "开始时间", true') }],
        cb12jssj: [{validator: validator('19, "less", "结束时间", true') }],
        cb14cl: [{validator: validator('64, "full", "材料", true') }]
      },
      sfshow: true,
      disabled:false,
      checkdis8: true,
      checkdis10: true,
      checkdis11: true,
      checkdis12: true,
      discl: true,
    };
  },
  methods: {
    // 回显查询接口
    Getsearch() {
      if (this.$route.query.wslx == "1") {
        this.sfshow = false;
        this.disabled = true;
        this.LoadOn()
        Search(this.$route.query.id).then(value => {
          this.LoadClose()
          this.wsxwForm = value;
        });
      }
    },
    // 切换checkbox的选中状态
    change(num) {
      if (num == 8) {
        if (this.checkdis8) {
          this.rules.cb8kssj = [{validator: validator('19, "less", "开始时间", false') }]
          this.rules.cb8jssj = [{validator: validator('19, "less", "结束时间", false') }]
        } else {
          this.wsxwForm.cb8kssj = '';
          this.wsxwForm.cb8jssj = '';
          this.rules.cb8kssj = [{validator: validator('19, "less", "开始时间", true') }]
          this.rules.cb8jssj = [{validator: validator('19, "less", "结束时间", true') }]
        }
        this.checkdis8 = !this.checkdis8
      } else if (num == 10) {
        if(this.checkdis10) {
          this.rules.cb10kssj = [{validator: validator('19, "less", "开始时间", false') }]
          this.rules.cb10jssj = [{validator: validator('19, "less", "结束时间", false') }]
        } else {
          this.wsxwForm.cb10kssj = '';
          this.wsxwForm.cb10jssj = '';
          this.rules.cb10kssj = [{validator: validator('19, "less", "开始时间", true') }]
          this.rules.cb10jssj = [{validator: validator('19, "less", "结束时间", true') }]
        }
        this.checkdis10 = !this.checkdis10
      } else if (num == 11) {
        if(this.checkdis11) {
          this.rules.cb11kssj = [{validator: validator('19, "less", "开始时间", false') }]
          this.rules.cb11jssj = [{validator: validator('19, "less", "结束时间", false') }]
        }  else {
          this.wsxwForm.cb11kssj = '';
          this.wsxwForm.cb11jssj = '';
          this.rules.cb11kssj = [{validator: validator('19, "less", "开始时间", true') }]
          this.rules.cb11jssj = [{validator: validator('19, "less", "结束时间", true') }]
        }
        this.checkdis11 = !this.checkdis11
      } else if (num == 12) {
        if(this.checkdis12) {
          this.rules.cb12kssj = [{validator: validator('19, "less", "开始时间", false') }]
          this.rules.cb12jssj = [{validator: validator('19, "less", "结束时间", false') }]
        } else {
          this.wsxwForm.cb12kssj = '';
          this.wsxwForm.cb12jssj = '';
          this.rules.cb12kssj = [{validator: validator('19, "less", "开始时间", true') }]
          this.rules.cb12jssj = [{validator: validator('19, "less", "结束时间", true') }]
        }
        this.checkdis12 = !this.checkdis12;
      } else {
        if (this.discl) {
          this.rules.cb14cl = [{validator: validator('64, "full", "材料", false') }]
        } else {
          this.wsxwForm.cb14cl = '';
          this.rules.cb14cl = [{validator: validator('64, "full", "材料", true') }]
        }
        this.discl = !this.discl
      }
    },
    // 点击保存
    nextStep () {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.wsxwForm.sjrdjsj = reviseTime(this.wsxwForm.sjrdjsj);
          this.wsxwForm.djsj = reviseTime(this.wsxwForm.djsj);
          this.wsxwForm.xwsj = reviseTime(this.wsxwForm.xwsj);
          if (this.wsxwForm.cb8kssj) {this.wsxwForm.cb8kssj = reviseTime(this.wsxwForm.cb8kssj)}
          if (this.wsxwForm.cb8jssj) {this.wsxwForm.cb8jssj = reviseTime(this.wsxwForm.cb8jssj)}
          if (this.wsxwForm.cb10kssj) {this.wsxwForm.cb10kssj = reviseTime(this.wsxwForm.cb10kssj)}
          if (this.wsxwForm.cb10jssj) {this.wsxwForm.cb10jssj = reviseTime(this.wsxwForm.cb10jssj)}
          if (this.wsxwForm.cb11kssj) {this.wsxwForm.cb11kssj = reviseTime(this.wsxwForm.cb11kssj)}
          if (this.wsxwForm.cb11jssj) {this.wsxwForm.cb11jssj = reviseTime(this.wsxwForm.cb11jssj)}
          if (this.wsxwForm.cb12kssj) {this.wsxwForm.cb12kssj = reviseTime(this.wsxwForm.cb12kssj)}
          if (this.wsxwForm.cb12jssj) {this.wsxwForm.cb12jssj = reviseTime(this.wsxwForm.cb12jssj)}
          // var _obj = this.cbAll.find((item)=>{
          //   return item = true && this.wsxwForm['cb'+item.index+'kssj'] == ''
          // })
          if (this.wsxwForm.cb14 == true && this.wsxwForm.cb14cl == '') {
            this.$alert('请填写材料',{
              center: true,
              confirmButtonText: "确定"
            })
            return false
          }
          var arr=[];
          for(let i in this.wsxwForm){
            arr.push(this.wsxwForm[i]);
          }
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }).then(() => {
            this.LoadOn()
            baocun(this.$route.query.wsid, arr, this.$route.query.id).then((value) => {
              this.LoadClose()
              if (value.executeResult == "1") {
                this.$message({
                  type: "success",
                  center: true,
                  message: value.msg
                });
                this.$router.push({ name: "Ajblgc", query: { lasqbid: this.$route.query.id } });
              } else {
                this.$message({
                  type: "error",
                  center: true,
                  message: value.msg
                });
              }
            })
          }).catch(() => {
            return false;
          })
        }
      });
    }
  },
  created() {
    this.Getsearch();
  },
};
</script>
<style scope>
.size {
  font-size: 14px;
  height: 60px;
  line-height: 60px;
}
.clearfix {
  color: #333;
}
.title {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  font-size: 33px;
}
.wsxw {
  padding: 0 50px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.forms_content {
  width: 100%;
}
.indent {
  text-indent: 35px;
  color: #333;
}
.clearindent {
  text-indent: -5px;
}
.clearindent input {
  border: none;
}
.el-input__inner {
  width: 100%;
}
.zihao {
  width: 64px;
  padding: 0 4px;
}
.checked .el-input__inner {
  width: 190px;
  padding: 0 10px 0 28px;
}
.el-checkbox__label {
  font-size: 16px;
  line-height: 40px;
  color: #333;
}
.rightdata {
  float: right;
}
p {
  color: #333;
}
.btn {
  text-align: center;
}
.marbom {
  margin-top: 0;
  margin-bottom: 10px;
}
.cl .el-input__inner {
  width: 100%;
   padding: 0 10px 0 10px;
}
.fontSize {
  font-size: 16px;
}
.cols {
  line-height:40px;
  margin-left:12px;
}
.inputsS {
  font-size: 16px;
  margin-left: 35px;
  color: #333;
}
</style>