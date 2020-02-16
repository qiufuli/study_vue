<template>
  <div>
    <div class="ws01">
      <el-form
        :inline="true"
        :model="formInline"
        label-position="right"
        size="small"
        class="demo-form-inline"
        ref="ref_form"
        :disabled="disabled"
      >
        <div class="nr_content">
          <p class="title">北京市怀柔区人力资源和社会保障局接待投诉（举报）登记</p>
          <el-row >
            <el-col :span="6" :offset="2">
              <el-form-item label="序号:">
                <el-input v-model="formInline.xh" class="small_input" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-form-item label="接待人:">
                <el-input v-model="formInline.jdr" class="small_input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-checkbox v-model="formInline.ts">投诉</el-checkbox>
              <el-checkbox v-model="formInline.jb">举报</el-checkbox>
            </el-col>
          </el-row>
          <div class="need_border">
            <el-row>
              <div class="person">被投诉（举报）人</div>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称/姓名:" label-width="150px">
                  <el-input v-model="formInline.dwmc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法定代表人负责人）:" label-width="150px">
                  <el-input v-model="formInline.fddbr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册(登记)地址:" label-width="150px">
                  <el-input v-model="formInline.szdwid"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="劳资负责人:" label-width="150px">
                  <el-input v-model="formInline.lzfzr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经营(用工)地址:" label-width="150px">
                  <el-input v-model="formInline.jyhbgdz"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话:" label-width="150px">
                  <el-input v-model="formInline.lxdh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="person">投诉（举报）人</div>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名:" label-width="120px">
                  <el-input v-model="formInline.xm" class="small_input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="性别:">
                  <el-input v-model="formInline.xb" class="small_input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话:" label-width="150px">
                  <el-input v-model="formInline.tsrlxdh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="身份证号:" label-width="120px">
                  <el-input v-model="formInline.sfzh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-checkbox v-model="formInline.cz">城镇</el-checkbox>
                <el-checkbox v-model="formInline.fcz">非城镇</el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="送达信息地址:" label-width="120px">
                <el-input v-model="formInline.txdz" class="big_input"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <div class="person">投诉（举 报）事项及要求</div>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 50}"
                  placeholder="请输入内容"
                  v-model="formInline.tj_nr"
                  style="font-size:14px;"
                  class="noresize"
                ></el-input>
              </el-col>
            </el-row>
            <el-row class="mT">
              <el-row>
                <el-form-item label="以上情况曾于" label-width="100px">
                  <el-input v-model="formInline.lstjsj"></el-input>
                </el-form-item>
                <el-form-item label="在">
                  <el-input v-model="formInline.lstjdw"></el-input>
                </el-form-item>
                <span class="text_span">进行过投诉（举报）</span>
              </el-row>
              <el-row>
                <el-form-item label="处理结果：" label-width="100px">
                  <el-input v-model="formInline.lstjcljg"></el-input>
                </el-form-item>
              </el-row>
              <el-form-item label="附相关材料：" label-width="100px" style="display:block">
                <el-input v-model="formInline.lstjcl" class="big_input"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="投诉人（举报人）：">
                  <el-input v-model="formInline.tsr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="3" style="text-align:right">
                <el-form-item style="margin-right:0">
                  <el-input v-model="formInline.tsjbsj"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="person">审批意见</div>
            </el-row>
            <el-row>
              <el-form-item label="劳动保障监察机构负责人：">
                <el-input v-model="formInline.jgfzr"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 50}"
                  placeholder="请输入内容"
                  v-model="formInline.spyj"
                  style="font-size:14px;"
                  class="noresize"
                ></el-input>
              </el-col>
            </el-row>
            <el-row class="mT">
              <el-col :span="4" :offset="11" style="text-align:right">
                <el-form-item style="margin-right:0">
                  <el-input v-model="formInline.jgfzrdjsj"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="person">备注</div>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 50}"
                  placeholder="请输入内容"
                  v-model="formInline.bz"
                  style="font-size:14px;"
                  class="noresize"
                ></el-input>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <el-row type="flex" justify="center" align="middle" class="mT">
        <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import "@/common/scss/public.scss";
import $ from "@/common/js/axios";
export default {
  data() {
    return {
      disabled: true,
      formInline: {
        id: "",
        xh: "",
        jdr: "",
        ts: "",
        jb: "",
        dwmc: "",
        fddbr: "",
        szdwid: "",
        lzfzr: "",
        jyhbgdz: "",
        lxdh: "",
        xm: "",
        xb: "",
        tsrlxdh: "",
        sfzh: "",
        cz: "",
        fcz: "",
        txdz: "",
        tj_nr: "",
        lstjsj: "",
        lstjdw: "",
        lstjcljg: "",
        lstjcl: "",
        tsr: "",
        tsjbsj: "",
        spyj: "",
        jgfzr: "",
        jgfzrdjsj: "",
        bz: ""
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.LoadOn();
      $({
        url: "/wsgl/getWssj",
        method: "get",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
         this.LoadClose();
        const _res = res.returnData;
        if (_res.executeResult == 1) {
          _res.sj.tsjbsj = _res.sj.tsjbsj.substring(0, 10);
          _res.sj.jgfzrdjsj = _res.sj.jgfzrdjsj.substring(0, 10);
          _res.sj.lstjsj = _res.sj.lstjsj.substring(0,10)
          this.formInline = _res.sj;
          if (_res.sj.xb == '1') {
            this.formInline.xb = '男';
          } else if (_res.sj.xb == '2') {
            this.formInline.xb = '女';
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.need_border {
  border: 1px solid #ccc;
  padding: 50px 5px 35px 30px;
}
.ws01 {
  margin: 0;
  padding: 30px 20px 30px 20px;
  background-color: #ffffff;
  min-height: 620px;
  font-size: 16px;
}
.small_input {
  width: 100px;
}
.big_input {
  width: 500px;
}
.nr_content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.nr_content .title {
  width: 70%;
  margin: 0 auto 20px;
  text-align: center;
  font-size: 33px;
}
.el-checkbox__label {
  font-size: 16px;
  line-height: 40px;
  color: #333;
}
.el-radio-group {
  line-height: 50px;
}
.mT {
  margin-top: 20px;
}
.text_span {
  line-height: 32px;
  font-size: 14px;
  color: #606266;
}

</style>
