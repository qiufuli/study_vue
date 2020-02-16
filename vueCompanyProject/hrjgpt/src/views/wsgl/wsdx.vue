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
        <p class="indent">根据《中华人民共和国劳动法》第八十五条的规定，我局需要了解你单位（你）在劳动用工方面的情况，请你单位（你）于
          <el-form-item prop="xwsj" style="margin-bottom:0">
            <el-date-picker v-model="wsxwForm.xwsj" type="datetime" value-format="yyyy-MM-ddHH:mm:ss" placeholder="选择日期时间" class="clearindent"></el-date-picker>
            <span class="fontSize">派员到北京市怀柔区人力资源和社会保障局劳动保障监察支队接受询问，并请携带以下勾选的书面材料：</span>
          </el-form-item>
        </p>
        <el-row>
          <el-checkbox v-model="wsxwForm.cb1">《营业执照》(副本)原件与复印件；</el-checkbox>
        </el-row>
        <el-row>
          <el-checkbox v-model="wsxwForm.cb2">《法定代表人身份证明书》及法定代表人的身份证原件与复印件；</el-checkbox>
        </el-row>
        <el-row>
          <el-checkbox v-model="wsxwForm.cb3">《授权委托书》及被委托人的身份证原件与复印件；</el-checkbox>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb4">管理人员及农民工名册原件与复印件及管理台账；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（总、分）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb5">管理人员及农民工劳动合同书原件与复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（总、分）</span>
          </el-col>
        </el-row>
        <el-row class="marbom">
          <el-col :span="1">
            <el-checkbox v-model="wsxwForm.cb6" @change="change(6)"></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cb6kssj" style="margin-bottom:10px">
              <el-date-picker
                v-model="wsxwForm.cb6kssj"
                type="month"
                value-format="yyyy-MM"
                :disabled="discb6"
                :editable="false"
                :picker-options="pickerOptionsStart"
                placeholder="选择日期">
              </el-date-picker>至
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cb6jssj" style="margin-bottom:10px">
              <el-date-picker
                v-model="wsxwForm.cb6jssj"
                type="month"
                value-format="yyyy-MM"
                :disabled="discb6"
                :editable="false"
                :picker-options="pickerOptionsEnd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="cols">的管理人员及农民工工资表复印件；</el-col>
          <el-col :span="2">
            <span class="last_data">（总、分）</span>
          </el-col>
        </el-row>
        <el-row class="marbom">
          <el-col :span="1">
            <el-checkbox v-model="wsxwForm.cb7" @change="change(7)"></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cb7kssj" style="margin-bottom:10px">
              <el-date-picker
                v-model="wsxwForm.cb7kssj"
                type="month"
                value-format="yyyy-MM"
                :disabled="discb7"
                :editable="false"
                :picker-options="pickerOptionsStart7"
                placeholder="选择日期">
              </el-date-picker>至
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cb7jssj" style="margin-bottom:10px">
              <el-date-picker
                v-model="wsxwForm.cb7jssj"
                type="month"
                value-format="yyyy-MM"
                :disabled="discb7"
                :editable="false"
                :picker-options="pickerOptionsEnd7"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" class="cols">的管理人员及农民工考勤表复印件；</el-col>
          <el-col :span="2">
            <span class="last_data">（总、分）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb8">企业规章制度原件与复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（分）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb9">农民工工伤保险费支付凭证及社保登记证原件与复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（建、总）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb10">向总承包企业拨付人工费（劳务费）有关凭证原件与复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（建）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb11">向分包企业拨付人工费（劳务费）有关凭证原件与复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（总）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb12">建立农民工工资保证金账户有关材料复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（总、分）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb13">建立农民工工资专用账户有关材料复印件；</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（总、分）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-checkbox v-model="wsxwForm.cb14">与承包人签订的书面承包协议原件与复印件：</el-checkbox>
          </el-col>
          <el-col :span="2">
            <span class="last_data">（分）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <el-checkbox v-model="wsxwForm.cb15" :checked="wsxwForm.cb15" @change="change(15)"></el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cb15cl">
              <el-input class="cl" v-model="wsxwForm.cb15cl" :disabled="discl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="cols">等材料。</el-col>
        </el-row>
        <el-row>
          <p class="indent">如无故逾期不到，或不按照要求提供书面材料，我局将按照《劳动保障监察条例》第三十条的规定处理。</p>
        </el-row>
        <el-row>
          <p class="marbom indent">地址：北京市怀柔区开放路86号</p>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="lxr">
              <span class="inputsS">联系人：</span><el-input v-model="wsxwForm.lxr" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="dh">
              <span class="inputsS">电话：</span><el-input v-model="wsxwForm.dh" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row class="clearfix">
        <p class="right">北京市怀柔区人力资源和社会保障局</p>
      </el-row>
      <el-row class="clearfix" :gutter="20">
        <el-col :span="4" :offset="20">
          <el-form-item prop="djsj">
            <el-date-picker v-model="wsxwForm.djsj" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd" class="rightdata"></el-date-picker>
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
          <el-form-item  prop="sf">
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
  <!-- <div class="forms right">
      <h1>北京市怀柔区人力资源和社会保障局</h1>
      <h1>调 查 询 问 书（副本）</h1>
  </div>-->
</template>
<script>
import { validator } from "@/common/js/valid";
import "@/common/scss/public.scss";
import { Search, baocun, reviseTime } from "./ws.js";
export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.wsxwForm.cb6jssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.wsxwForm.cb6kssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      pickerOptionsStart7: {
        disabledDate: time => {
          let endDateVal = this.wsxwForm.cb7jssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd7: {
        disabledDate: time => {
          let beginDateVal = this.wsxwForm.cb7kssj;
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
        cb6kssj: "",
        cb6jssj: "",
        cb7: false,
        cb7kssj: "",
        cb7jssj: "",
        cb8: false,
        cb9: false,
        cb10: false,
        cb11: false,
        cb12: false,
        cb13: false,
        cb14: false,
        cb15: false,
        cb15cl: "",
        lxr: "",
        dh: "",
        djsj: "",
        sjr: "",
        sf: "",
        lxdh: "",
        sjrdjsj: ""
      },
      rules: {
        zi: [{ validator: validator('32, "full", "字", false') }], 
        hao: [{ validator: validator('32, "full", "号", false') }], 
        dwmc: [{ validator: validator('32, "full", "单位名称", false') }], 
        xwsj: [{validator: validator('19, "less", "询问时间", false') }],
        lxr: [{ validator: validator('32, "full", "联系人", false') }], 
        dh: [{ validator: validator('14, "full", "电话", false') }],
        djsj: [{validator: validator('19, "less", "登记时间", false') }],
        sjr	: [{ validator: validator('32, "full", "收件人", true') }], 
        sf: [{ validator: validator('32, "full", "身份", true') }], 
        lxdh: [{ validator: validator('256, "full", "联系电话", true') }] ,
        sjrdjsj: [{validator: validator('19, "less", "收件人登记时间", true') }],
        cb6kssj: [{validator: validator('19, "less", "开始时间", true') }],
        cb6jssj: [{validator: validator('19, "less", "结束时间", true') }],
        cb7kssj: [{validator: validator('19, "less", "开始时间", true') }],
        cb7jssj: [{validator: validator('19, "less", "结束时间", true') }],
        cb15cl: [{validator: validator('64, "full", "材料", true') }]
      },
      sfshow: true,
      disabled: false,
      discb6: true,
      discb7: true,
      discl: true
    }
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
      if (num == 6) {
        if (this.discb6) {
          this.rules.cb6kssj = [{validator: validator('19, "less", "开始时间", false') }]
          this.rules.cb6jssj = [{validator: validator('19, "less", "结束时间", false') }]
        } else {
          this.wsxwForm.cb6kssj = '';
          this.wsxwForm.cb6jssj = '';
          this.rules.cb6kssj = [{validator: validator('19, "less", "开始时间", true') }]
          this.rules.cb6jssj = [{validator: validator('19, "less", "结束时间", true') }]
        }
        this.discb6 = !this.discb6
      } else if (num == 7) {
        if(this.discb7) {
          this.rules.cb7kssj = [{validator: validator('19, "less", "开始时间", false') }]
          this.rules.cb7jssj = [{validator: validator('19, "less", "结束时间", false') }]
        } else {
          this.wsxwForm.cb7kssj = '';
          this.wsxwForm.cb7jssj = '';
          this.rules.cb7kssj = [{validator: validator('19, "less", "开始时间", true') }]
          this.rules.cb7jssj = [{validator: validator('19, "less", "结束时间", true') }]
        }
        this.discb7 = !this.discb7
      } else {
        if (this.discl) {
          this.rules.cb15cl = [{validator: validator('64, "full", "材料", false') }]
        } else {
          this.wsxwForm.cb15cl = '';
          this.rules.cb15cl = [{validator: validator('64, "full", "材料", true') }]
        }
        this.discl = !this.discl
      }
    },
    // 点击保存
    nextStep () {
      this.wsxwForm.sjrdjsj = reviseTime(this.wsxwForm.sjrdjsj);
      this.wsxwForm.djsj = reviseTime(this.wsxwForm.djsj);
      this.wsxwForm.xwsj = reviseTime(this.wsxwForm.xwsj);
      if (this.wsxwForm.cb6kssj) {this.wsxwForm.cb6kssj = reviseTime(this.wsxwForm.cb6kssj)}
      if (this.wsxwForm.cb6jssj) {this.wsxwForm.cb6jssj = reviseTime(this.wsxwForm.cb6jssj)}
      if (this.wsxwForm.cb7kssj) {this.wsxwForm.cb7kssj = reviseTime(this.wsxwForm.cb7kssj)}
      if (this.wsxwForm.cb7jssj) {this.wsxwForm.cb7jssj = reviseTime(this.wsxwForm.cb7jssj)}
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
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
            });
          });
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
.zihao {
  width: 64px;
  padding: 0 4px;
}
.forms_content {
  width: 100%;
}
.indent {
  text-indent: 35px;
  color: #333;
  margin-bottom: 0;
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
.last_data {
  font-size: 13px;
  margin-top: 14px;
  float: right;
}
.btn {
  text-align: center;
}
.marbom {
  margin-bottom: 10px;
}
.fontSize {
  font-size: 16px;
}
.cols {
  line-height:40px;
  margin-left:0;
}
.inputsS {
  font-size: 16px;
  margin-left: 35px;
  color: #333;
}
</style>