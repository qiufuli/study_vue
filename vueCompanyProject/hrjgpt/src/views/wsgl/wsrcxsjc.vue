<template>
  <div class="forms left">
    <el-form :model="form_data" ref="ref_form" :disabled="disabled" class="wsxw">
      <p class="title">北京市怀柔区人力资源和社会保障局</P>
      <P class="title">劳动保障监察日常巡视检查记录</p>
      <div class="newadd_table">
        <el-row>
          <el-col>
            <el-form-item label="检查时间：">
              <el-date-picker
                v-model="form_data.jckssj"
                type="datetime"
                value-format="yyyy-MM-ddHH:mm:ss"
                placeholder="选择日期"
              ></el-date-picker>至
              <el-date-picker
                v-model="form_data.jcjssj"
                type="datetime"
                value-format="yyyy-MM-ddHH:mm:ss"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="检查地点：">
              <el-input v-model="form_data.jcdz" class="wd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="被检查人：">
              <el-input v-model="form_data.bjcdw" class="wd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人：">
              <el-input v-model="form_data.frdb" class="wd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="现场人：">
              <el-input v-model="form_data.xcr" class="wd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份：">
              <el-input v-model="form_data.sf" class="wd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：">
              <el-input v-model="form_data.lxdh" class="wd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="person">现场检查情况</el-col>
          <el-col>
            我们是北京市怀柔区人力资源和社会保障局劳动保障监察员
            <el-input v-model="form_data.zbjcy" style="width: 100px"></el-input>、
            <el-input v-model="form_data.xbjcy" style="width: 100px"></el-input>，
            劳动保障监察证号为
            <el-input v-model="form_data.zbjczh" style="width: 100px"></el-input>、
            <el-input v-model="form_data.xbjczh" style="width: 100px"></el-input>，请你查看。今天对你单位遵守劳动保障法律、法规情况进行检查。
          </el-col>
          <el-col class="person">主要内容：</el-col>
          <el-col>
            <el-checkbox v-model="form_data.dm01" class="checks on">规章制度情况</el-checkbox>
            <el-checkbox v-model="form_data.dm02" class="checks on">劳动合同情况</el-checkbox>
            <el-checkbox v-model="form_data.dm03" class="checks">女工特殊劳动保护情况</el-checkbox>
            <el-checkbox v-model="form_data.dm04" class="checks">未成年工特殊劳动保护情况</el-checkbox>
            <el-checkbox v-model="form_data.dm05" class="checks">是否使用童工情况</el-checkbox>
            <el-checkbox v-model="form_data.dm06" class="checks">工作时间情况</el-checkbox>
            <el-checkbox v-model="form_data.dm07" class="checks">休息休假情况</el-checkbox>
            <el-checkbox v-model="form_data.dm08" class="checks">工资支付情况</el-checkbox>
            <el-checkbox v-model="form_data.dm09" class="checks">参加社会保险情况</el-checkbox>
            <el-checkbox v-model="form_data.ccnr_1_qk" class="checks">
              <el-input v-model="form_data.ccnr_1" size="small"></el-input>
            </el-checkbox>
            <el-checkbox v-model="form_data.ccnr_2_qk" class="checks">
              <el-input v-model="form_data.ccnr_2" size="small"></el-input>
            </el-checkbox>
            <el-checkbox v-model="form_data.ccnr_3_qk" class="checks">
              <el-input v-model="form_data.ccnr_3" size="small"></el-input>
            </el-checkbox>
          </el-col>
          <el-col style="margin:20px 0">经查：该单位有员工
            <el-input v-model="form_data.wtrs" style="width: 100px"></el-input>人,在
            <el-input v-model="form_data.wt" :title="form_data.wt" style="width: 200px"></el-input>方面涉嫌存在问题，现场取得
            <el-input v-model="form_data.wtcl" :title="form_data.wtcl" style="width: 200px"></el-input>等材料。
          </el-col>
          <el-row>
            <el-form-item label="是否发放调查询问书" class="box_check">
              <!-- <el-radio-group v-model="form_data.sfffdcxws"> -->
              <el-radio-group v-model="sfffdcxws">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        </el-row>
        <div class="cbrbk">
          <el-row>
            <el-col class="person">现场人意见</el-col>
            <el-col>
              <el-input type="textarea" v-model="form_data.xcryj" class="wbwd noresize"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:20px 0 0">
            <el-col :span="12">现场人：
              <el-input v-model="form_data.xcr1" class="wd"></el-input>
            </el-col>
            <el-col :span="6" :offset="6">
              <el-date-picker
                v-model="form_data.xcr1djsj"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间"
                class="rightdata"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div class="cbrbk">
          <el-row>
            <el-col class="person">承办意见</el-col>
            <el-col>
              <el-form-item label="承办意见：">
                <el-input type="textarea" v-model="form_data.cbyj" class="wbwd noresize"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">劳动保障监察员：
              <el-input v-model="form_data.jcy" class="wd"></el-input>
            </el-col>
            <el-col :span="12">
              <el-date-picker
                v-model="form_data.jcydjsj"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间"
                class="rightdata"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div class="cbrbk">
          <el-row>
            <el-col class="person">审批意见</el-col>
            <el-col>
              <el-form-item label="审批意见：">
                <el-input type="textarea" v-model="form_data.spyj" class="wbwd noresize"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">劳动保障监察机构负责人：
              <el-input v-model="form_data.jgfzr" class="wd"></el-input>
            </el-col>
            <el-col :span="12">
              <el-date-picker
                v-model="form_data.jgfzrdjsj"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间"
                class="rightdata"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div class="cbrbk">
          <el-row>
            <el-col class="person">备注</el-col>
            <el-col>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form_data.bz" class="wbwd noresize"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <el-row type="flex" justify="center" align="middle">
      <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
    </el-row>
  </div>
</template>
<script>
// import $ from "@/common/js/axios";
import "@/common/scss/public.scss";
import { Search } from "./ws.js";
export default {
  data() {
    return {
      sfffdcxws:'1',
      isShow: true,
      disabled: true,
      form_data: {
        jckssj: "",
        jcjssj: "",
        jcdz: "",
        bjcdw: "",
        frdb: "",
        xcr: "",
        sf: "",
        lxdh: "",
        zbjcy: "",
        xbjcy: "",
        zbjczh: "",
        xbjczh: "",
        dm01: false,
        dm02: false,
        dm03: false,
        dm04: false,
        dm05: false,
        dm06: false,
        dm07: false,
        dm08: false,
        dm09: false,
        ccnr_1_qk: "",
        ccnr_1: "",
        ccnr_2_qk: "",
        ccnr_2: "",
        ccnr_3_qk: "",
        ccnr_3: "",
        wtrs: "",
        wt: "",
        wtcl: "",
        xczryj: "",
        xcr1: "",
        xcr1djsj: "",
        cbyj: "",
        jcy: "",
        jcydjsj: "",
        spyj: "",
        jgfzr: "",
        jgfzrdjsj: "",
        bz: ""
      }
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      if (this.$route.query.wslx == 1) {
        this.isShow = false;
        this.LoadOn()
        Search(this.$route.query.id).then(res => {
          this.LoadClose()
          this.form_data = res;
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.forms {
  font-size: 14px;
}
.title {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  font-size: 33px;
}
.person {
  margin: 10px 0;
}
.newadd_table {
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 50px 5px 0px 30px;
}
.wd {
  width: 60%;
}
.cbrbk {
  border-top: 1px solid #cccccc;
  padding: 20px 0;
  margin: 10px 0;
}
.checks {
  width: 45%;
  height: 40px;
  line-height: 40px;
}
.checks.on {
  margin-left: 30px;
}
// .el-radio__inner{
//   border-radius: 0;
// }

</style>