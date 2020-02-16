<template>
  <el-container>
    <div class="forms">
      <el-form
        :inline="true"
        :rules="rules"
        :model="formInline"
        label-position="right"
        label-width="180px"
        size="small"
        class="demo-form-inline"
        ref="ref_form"
        :disabled="disabled"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="案件来源：" label-width="150px" prop="ajly" required>
              <el-select v-model="formInline.ajly" @change="check_page" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in formdmb.ajly_dmb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="案由：" prop="ay" required>
              <el-select v-model="formInline.ay" :title="ayTitle" @change="getnum" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in formdmb.ay_dmb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="wqxs == 1" class="wq">
          <el-form
            :rules="rules2"
            :inline="true"
            :model="xcdjForm"
            size="small"
            ref="xcdjForm"
            label-position="right"
            label-width="120px"
            class="demo-ruleForm"
            style="height:100%"
          >
            <div class="base">
              <div class="person">单位基本信息</div>
              <el-row>
                <el-form-item label="检查时间：" style="margin-bottom: 0;" required>
                  <el-col :span="11">
                    <el-form-item prop="jckssj">
                      <el-date-picker
                        type="datetime"
                        :editable="false"
                        @blur="kaishi_time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="xcdjForm.jckssj"
                        :picker-options="ksjc_pickerOptionsStart"
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
                        @blur="jieshu_time"
                        :editable="false"
                        :picker-options="jsjc_pickerOptionsEnd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="当事人：" prop="bjcdw" required>
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
              <el-row>
                <el-col :span="24">
                  <el-form-item label="监察小组：" prop="jcxz" required>
                    <el-select
                      v-model="xcdjForm.jcxz"
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
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="主办监察员：" prop="zbjcy" required>
                    <el-select
                      v-model="xcdjForm.zbjcy"
                      @change="getjcy"
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
                <el-col :span="12">
                  <el-form-item label="监察证号：">
                    <el-input v-model="xcdjForm.zbjczh" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="协办监察员：" prop="xbjcy" required>
                    <el-select
                      v-model="xcdjForm.xbjcy"
                      value-key="value"
                      @change="getjcy1"
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
                <el-col :span="12">
                  <el-form-item label="监察证号：">
                    <el-input v-model="xcdjForm.xbjczh" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="jcnr">
              <el-form-item label="检查内容" class="xjdj_jcnr">
                <el-checkbox-group v-model="jcnr">
                  <el-checkbox
                    name="type"
                    v-for="item in ccsx_dmb"
                    :label="item.dmmc"
                    :key="item.dmid"
                    :id="item.dmid"
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
                <el-row class="problem_lineheight" v-if="xcdjForm.sfywt == 1">
                  <el-col>
                    <el-form-item label="是否发放调查询问书" class="jcy">
                      <el-radio-group v-model="xcdjForm.sfffdcxws">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="xcOpinion">
              <el-form-item label="现场人意见登记时间：" label-width="250px" prop="xcryjdjsj" class="shijian">
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="xcdjForm.xcryjdjsj"
                  :picker-options="pickerOptions0"
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
                  :picker-options="pickerOptions0"
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
          <!-- 保存提交 -->
          <el-row type="flex" justify="center" align="middle" v-show="!disabled">
            <el-button type="primary" size="medium" @click="wq_submit()">提交</el-button>
          </el-row>
        </div>
        <div v-else class="nq">
          <el-row>
            <div class="person">被投诉(举报)人</div>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称/姓名：" label-width="150px" prop="dwmc" required>
                <el-input v-model="formInline.dwmc" class="txdz_input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法定代表人(负责人)：" prop="fddbr">
                <el-input v-model="formInline.fddbr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册(登记)地址：" label-width="150px" prop="szdwid">
                <el-input v-model="formInline.szdwid" class="txdz_input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="劳资负责人：" prop="lzfzr">
                <el-input v-model="formInline.lzfzr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经营(办公)地址：" label-width="150px" required prop="jyhbgdz">
                <el-input v-model="formInline.jyhbgdz" class="txdz_input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="lxdh">
                <el-input v-model="formInline.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="person">投诉(举报)人</div>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名：" label-width="150px" prop="xm" :required="isHaveTo">
                <el-input v-model="formInline.xm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：" label-width="150px" prop="xb" :required="isHaveTo">
                <el-select v-model="formInline.xb" placeholder>
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投诉时间：" label-width="150px" prop="tsjbsj" :required="isHaveTo">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formInline.tsjbsj"
                  :picker-options="pickerOptions0"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话：" label-width="150px" prop="tsrlxdh" :required="isHaveTo">
                <el-input v-model="formInline.tsrlxdh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号：" label-width="150px" prop="sfzh" :required="isHaveTo">
                <el-input v-model="formInline.sfzh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="sfnh">
              <el-form-item>
                <el-radio-group v-model="formInline.sfnh">
                  <el-radio label="0">城镇</el-radio>
                  <el-radio label="1">非城镇</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item
              label="送达信息地址(通讯地址)："
              label-width="200px"
              prop="txdz"
              :required="isHaveTo"
            >
              <el-input v-model="formInline.txdz" class="jbinput_width"></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <div class="person">投诉(举报)事项及要求</div>
          </el-row>
          <el-row>
            <el-form-item prop="tj_nr">
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 50}"
                v-model="formInline.tj_nr"
                style="width:800px; font-size:14px;"
                class="noresize"
              ></el-input>
            </el-form-item>
          </el-row>
          <div class="tsjbsxyq">
            <el-row>
              <el-form-item label="以上情况曾于" prop="lstjsj" label-width="120px">
                <el-date-picker
                  type="date"
                  v-model="formInline.lstjsj"
                  :picker-options="pickerOptions0"
                  style="width: 170px;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="，在" prop="lstjdw" label-width="40px">
                <el-input v-model="formInline.lstjdw" style="width: 170px;"></el-input>
              </el-form-item>
              <span class="txt">进行过投诉举报，</span>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="处理结果：" prop="lstjcljg" label-width="120px">
                  <el-input v-model="formInline.lstjcljg" class="yq_input"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="附相关材料：" prop="lstjcl" label-width="120px">
                  <el-input v-model="formInline.lstjcl" class="yq_input"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <div class="person">备注</div>
          </el-row>
          <el-row>
            <el-form-item prop="bz">
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 18}"
                style="width:800px; font-size:14px;"
                v-model="formInline.bz"
                class="noresize"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row v-show="formInline.shyj">
            <div class="person">审核意见</div>
          </el-row>
          <el-row v-show="formInline.shyj">
            <el-form-item prop="bz">
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 18}"
                style="width:800px; font-size:14px;"
                v-model="formInline.shyj"
                class="noresize"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 保存提交 -->
          <el-row type="flex" justify="center" align="middle" v-show="!disabled">
            <el-button type="primary" size="medium" @click="save()">保存</el-button>
            <el-button type="primary" size="medium" @click="submit()">提交</el-button>
          </el-row>
        </div>
      </el-form>
      <el-form
        v-if="shFlag"
        :model="shForm"
        :rules="rules"
        status-icon
        ref="sh_form"
        class="clearfix"
      >
        <el-row>
          <el-form-item class="xjdj_jcnr" prop="shyj" label="审核意见：" required>
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              :disabled="!nqdj_btn"
              placeholder="请输入内容"
              style="width:800px; font-size:14px;"
              v-model="shForm.shyj"
              class="noresize"
            ></el-input>
          </el-form-item>
        </el-row>
        <!-- 保存提交 -->
        <el-row type="flex" justify="center" align="middle" v-if="nqdj_btn">
          <el-button type="primary" size="medium" @click="sh_save()">审核通过</el-button>
          <el-button type="primary" size="medium" @click="sh_cancel()">审核退回</el-button>
          <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
        </el-row>
      </el-form>
      <!-- <el-row type="flex" justify="center" align="middle" v-if="!shFlag && disabled"> -->
      <el-row type="flex" justify="center" align="middle" v-if="disabled && !nqdj_btn">
        <el-button type="primary" @click="downLond(id)" v-if="formInline.sfkxz === '1'">下载</el-button>
        <el-button type="primary" @click="goBack()">返回</el-button>
      </el-row>
    </div>
  </el-container>
</template>
<script>
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { mapActions } from "vuex";
import { getdmb } from "@/common/js/common";
import "@/common/scss/public.scss";

export default {
  name: "Nqdj",
  computed: {},
  data() {
    var _this = this;
    return {
      // 文书对应参数id
      // id:"00000000000001",
      isHaveTo: false,
      id: "",
      wqxs: 0,
      nqdj_btn: true,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      // 外勤数据
      xcdjForm: {
        ay: "",
        zbjcy: "",
        xbjcy: "",
        xbjczh:"",
        ajdjlx: "",
        jcxzid: "",
        sfffdcxws: "",
        sfywt: ""
      },
      ccsx_dmb: [], //抽查内容(ldjg_ay)
      jcnr: [],
      disable: true,
      jcxz_dmb: "", //监察小组
      zbjc_dmb: "", //主办监察
      update: [],
      new_update: "",
      new_checkbox: "",
      ksjc_pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.xcdjForm.jcjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > Date.now(_this.$store.state.djtime);
          }
        }
      },
      jsjc_pickerOptionsEnd: {
        disabledDate: time => {
          var beginDateVal = this.xcdjForm.jckssj;
          if (beginDateVal) {
            return (
              time.getTime() > Date.now(_this.$store.state.djtime) ||
              time.getTime() <=
                new Date(beginDateVal).getTime() - 24 * 60 * 60 * 1000
            );
          } else {
            return time.getTime() > Date.now(_this.$store.state.djtime);
          }
        }
      },
      //内勤数据
      disabled: Boolean(this.$route.query.disable),
      shFlag: Boolean(this.$route.query.flag == "sh"),
      shForm: {
        shyj: ""
      },
      formdmb: {
        ajly_dmb: [],
        ay_dmb: []
      },
      // 案由标题
      ayTitle: "",
      formInline: {
        ajdjbid: "",
        ajh: "",
        ay: "",
        dwmc: "", //类型：String  必有字段  备注：64,full,单位名称/姓名,false
        ajly: "", //类型：String  必有字段  备注：2,full,案件来源,false(案件来源：ldjg_ajly)
        fddbr: "", //类型：String  必有字段  备注：32,full,法定代表人,true
        szdwid: "", //类型：String  可有字段  备注：256,full,注册或登记地址,true
        lzfzr: "", //类型：String  可有字段  备注：32,full,劳资负责人,true
        jyhbgdz: "", //类型：String  可有字段  备注：256,full,经营或办公地址,true
        lxdh: "", //类型：String  可有字段  备注：32,full,联系电话,true
        xm: "", //类型：String  可有字段  备注：32,full,投诉举报人姓名,true
        xb: "", //类型：String  可有字段  备注：1,full,性别,true(性别：cdg_sex)
        tsrlxdh: "", //类型：String  可有字段  备注：32,full,投诉人联系电话,true
        sfzh: "", //类型：String  可有字段  备注：18,full,身份证号,true
        txdz: "", //类型：String  可有字段  备注：256,full,通讯地址,true
        sfnh: "", //类型：String  可有字段  备注：1,full,户籍性质,true(0否，1是)
        tsjbsj: "", //类型：String  可有字段  备注：14,full,投诉/举报时间,true
        bz: "", //类型：String  可有字段  备注：512,full,备注,true
        flag: "", //类型：String  必有字段  备注：0:保存，1提交
        tj_nr: "", //类型：String  必有字段  备注：512,full,投诉(举报)事项及要求,true
        lstjsj: "", //类型：String  必有字段  备注：10,rq_8,历史投诉(举报)时间,true
        lstjdw: "", //类型：String  必有字段  备注：128,full,历史投诉(举报)单位,true
        lstjcljg: "", //类型：String  必有字段  备注：256,full,历史投诉(举报)结果,true
        lstjcl: "", //类型：String  必有字段  备注：128,full,历史投诉(举报)材料,true
        shyj: ""
      },
      rules: {
        dwmc: [{ validator: validator('64, "full", "单位名称/姓名", false') }],
        ajly: [{ validator: validator('2, "full", "案件来源", false') }],
        ay: [{ validator: validator('2, "full", "案由", false') }],
        fddbr: [{ validator: validator('32, "full", "法定代表人", true') }],
        szdwid: [
          { validator: validator('256, "full", "注册或登记地址", true') }
        ],
        lzfzr: [{ validator: validator('32, "full", "劳资负责人", true') }],
        jyhbgdz: [
          { validator: validator('156, "full", "经营(办公)地址", false') }
        ],
        lxdh: [{ validator: validator('64, "phone", "联系电话", true') }],
        xm: [{ validator: validator('32, "full", "投诉举报人姓名", false') }],
        xb: [{ validator: validator('1, "full", "性别", false') }],
        // tsrlxdh: [
        //   { validator: validator('32, "phone", "投诉人联系电话", false') }
        // ],
        tsrlxdh: [
          { validator: validator('32, "phone", "投诉人联系电话", false') }
        ],
        sfzh: [
          {
            validator: validator(
              '18, "sfzhm", "身份证号", false',
              (rule, value, callback) => {
                this.formInline.sfzh = value;
                callback();
              }
            )
          }
        ],
        txdz: [{ validator: validator('256, "full", "通讯地址", false') }],
        sfnh: [{ validator: validator('1, "full", "户籍性质", false') }],
        tsjbsj: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        bz: [{ validator: validator('512, "bz", "备注", true') }],
        shyj: [{ validator: validator('512, "bz", "审核意见", false') }],
        tj_nr: [
          { validator: validator('512, "bz", "投诉(举报)事项及要求", true') }
        ],
        lstjsj: [
          {
            type: "string",
            required: false,
            message: "请选择历史投诉(举报)时间",
            trigger: "change"
          }
        ],
        lstjdw: [
          { validator: validator('128, "full", "历史投诉(举报)单位", true') }
        ],
        lstjcljg: [{ validator: validator('256, "full", "处理结果", true') }],
        lstjcl: [{ validator: validator('128, "full", "相关材料", true') }]
      },
      rules2: {
        bjcdw: [{ validator: validator('32, "full", "当事人", false') }],
        jcdz: [{ validator: validator('64, "full", "检查地点", false') }],
        frdb: [{ validator: validator('32, "full", "法定代表人", false') }],
        xcr: [{ validator: validator('32, "full", "现场人", false') }],
        sf: [{ validator: validator('32, "full", "身份", false') }],
        lxdh: [{ validator: validator('32, "phone", "联系电话", false') }],
        jcxz: [{ validator: validator('14, "full", "监察小组", false') }],
        zbjcy: [{ validator: validator('14, "full", "主办监察员", false') }],
        xbjcy: [{ validator: validator('14, "full", "协办监察员", false') }],
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
            message: "请选择开始日期",
            trigger: "blur"
          }
        ],
        jcjssj: [
          {
            type: "string",
            required: true,
            message: "请选择结束日期",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // this.getCom();
    this.getajly(); //获取案件来源(代码表)
    this.getay(); //获取案由(代码表)
    this.echo(); //参数回显
  },
  methods: {
    // 参数回显
    echo() {
      var flag = this.$route.query.flag || false;
      if (this.$route.query.ajdjbid) {
        var ajdjbid = this.$route.query.ajdjbid;
        var ajh = this.$route.query.ajh;
        this.LoadOn();
        $({
          url: "/nqdj/ajxxxgcx",
          method: "get",
          params: {
            ajdjbid: ajdjbid,
            ajh: ajh
          }
        }).then(res => {
          this.LoadClose();
          var _res = res.returnData;
          if (+_res.executeResult == 1) {
            this.formInline = _res.ajxxxq;
            this.id = this.formInline.ajwsdybid;
            this.shForm.shyj = this.formInline.shyj;
            if (this.formInline.ay) {
              this.sureNo()
              this.ayTitle = this.formdmb.ay_dmb.find(item => {
                return item.dmid == this.formInline.ay;
              }).dmmc;
            }
            //清空校验
            this.$nextTick(() => {
              if (this.disabled == true || this.disabled == "true") {
                if (this.$refs.sh_form) {
                  this.$refs.sh_form.clearValidate();
                }
              }
            });
            if (
              this.$route.query.disable == "false" ||
              this.$route.query.disable == false
            ) {
              var isdisabled = false;
            } else if (
              this.$route.query.disable == "true" ||
              this.$route.query.disable == true
            ) {
              isdisabled = true;
            }
            this.disabled = isdisabled;
            // 判断审批的状态
            if (
              this.$route.query.nqdj == "false" ||
              this.$route.query.nqdj == false
            ) {
              var is_nqdj = false;
            } else if (
              this.$route.query.nqdj == "true" ||
              this.$route.query.nqdj == true
            ) {
              is_nqdj = true;
            }
            this.nqdj_btn = is_nqdj;
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
      }
      //检查小组
      var _this = this;
      getdmb("/dmbgl/jcxzcx", "", function(res) {
        _this.jcxz_dmb = res.returnData.jcxzlb;
      });
      // 复选框赋值
      $.get("/dmbgl/dmblbCx", {
        params: {
          table_name: "ldjg_d_ccnr"
        }
      })
        .then(res => {
          const _res = res.returnData;
          if (_res.executeResult === "1") {
            var target = _res.dmblb.filter(current => {
              return current.dmmc !== null &&
                current.dmmc !== undefined &&
                current.dmmc !== "" &&
                current.sfky == 1
                ? current
                : "";
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
    },
    // 保存
    save() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.LoadOn();
              this.formInline.ajdjbid = this.$route.query.ajdjbid || "";
              this.formInline.ajh = this.$route.query.ajh || "";
              $({
                url: "/nqdj/djbc",
                method: "post",
                data: this.formInline
              }).then(res => {
                var _res = res.returnData;
                this.LoadClose();
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  // this.$refs["ref_form"].clearValidate();
                  this.$refs["ref_form"].resetFields();
                  this.dbNum();
                  // this.$router.push({
                  //   name: "Tsjbsx"
                  // });
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
    // 提交
    submit() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.LoadOn();
              this.formInline.ajdjbid = this.$route.query.ajdjbid || "";
              this.formInline.ajh = this.$route.query.ajh || "";
              $({
                url: "/nqdj/djtj",
                method: "post",
                data: this.formInline
              }).then(res => {
                this.LoadClose();
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  if (
                    this.formInline.ajly == "01" ||
                    this.formInline.ajly == "02"
                  ) {
                    this.$router.push({
                      name: "Tsjbsx"
                    });
                  }
                  this.$refs["ref_form"].clearValidate();
                  this.$refs["ref_form"].resetFields();
                  this.dbNum();
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
    // 审核通过
    sh_save() {
      this.sh_event(31, "是否确认审核通过？");
    },
    // 审核不通过
    sh_cancel() {
      this.sh_event(32, "是否确认审核退回？");
    },
    sh_event(num, str) {
      this.$refs["sh_form"].validate(valid => {
        if (valid) {
          this.$confirm(str, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.LoadOn();
              $({
                url: "/lasp/laqspSp",
                method: "post",
                data: {
                  ajdjbid: this.$route.query.ajdjbid,
                  ajh: this.$route.query.ajh,
                  ajzt: num,
                  shyj: this.shForm.shyj
                }
              }).then(res => {
                this.LoadClose();
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.goBack();
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
    // 获取案件来源(代码表)
    getajly() {
      $({
        url: "/dmbgl/dmblbCx",
        method: "get",
        params: {
          table_name: "ldjg_ajly"
        }
      }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
          this.formdmb.ajly_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 获取案由(代码表)
    getay() {
      $({
        url: "/dmbgl/dmblbCx",
        method: "get",
        params: {
          table_name: "ldjg_ay"
        }
      }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
          this.formdmb.ay_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    downLond(id) {
      window.location.href = "wsgl/downloadWs?id=" + id;
      // window.location.href = "hrldjc/wsgl/downloadWs?id=" + id;
    },
    getnum() {
      if (this.formInline.ay) {
        this.ayTitle = this.formdmb.ay_dmb.find(item => {
          return item.dmid == this.formInline.ay;
        }).dmmc;
      }
      // this.ayTitle = this.formInline.ay
    },
    //改变外勤页面事件
    check_page() {
      // if (this.formInline.ajly == "01" || this.formInline.ajly == "02") {
      //   // this.wqxs = "0";
      //   this.sureNo()
      // } else {
      //   // this.wqxs = "1";
      // }
      console.log(this.formInline.ajly);
      
      if (this.formInline.ajly == "03" || this.formInline.ajly == "04" || this.formInline.ajly == "05") {
        this.wqxs = "1";
        } else {
        this.wqxs = "0";
        this.sureNo()
      }
    },
    // 外勤提交
    wq_submit() {
      if (this.formInline.ay !== "") {
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
      } else {
        this.$alert("案由不能为空", {
          center: true,
          confirmButtonText: "确定"
        });
      }
    },
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
      _obj.ajly = this.formInline.ajly;
      _obj.ay = this.formInline.ay;
      this.LoadOn();
      $.post("/wqdj/wqajtjSave", _obj).then(res => {
        this.LoadClose();
        if (res.returnData.executeResult != 1) {
          this.$message.warning(res.returnData.message);
        } else {
          this.$message.success("提交成功");
          // this.xcdjForm = {};
          // this.formInline = {};
          // this.jcnr=[]
          // this.$refs["xcdjForm"].resetFields();
          // this.$refs["ref_form"].resetFields();
          this.$router.go(0);
          this.dbNum();
        }
      });
    },
    ready(flag) {
      if (
        (this.xcdjForm.sfywt == 1 && this.xcdjForm.sfffdcxws != null) ||
        this.xcdjForm.sfywt == 0
      ) {
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
        this.$alert("请选择是否发放调查询问书", {
          center: true,
          confirmButtonText: "确定"
        });
      }
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
    //检查小组改变，对应检查员变
    // changes() {
    //   this.xcdjForm.zbjcy= "",
    //   this.xcdjForm.zbjczh= "",
    //   this.xcdjForm.xbjcy1= "",
    //   this.xcdjForm.xbjcy2= "",
    //   this.xcdjForm.xbjczh1= "",
    //   this.xcdjForm.xbjczh2= "",
    //   this.$nextTick(_=>{
    //     this.$refs.xcdjForm.clearValidate();
    //   })
    //   // 主办监察
    //   $.get("/dmbgl/jcxzry", {
    //     params: { jcxzid: this.xcdjForm.jcxz }
    //   }).then(res => {
    //     // console.log(res);
    //     this.zbjc_dmb = res.returnData.jcxzlb;
    //   });
    //   this.disable = false;
    // },
    change_peo(){
        //监察员信息置灰
      this.targetObj = this.zbjc_dmb.map(item=>{
          if (this.xcdjForm.zbjcy == item.ryid ) {
              item.disabled = true
              this.xcdjForm.zbjczh = item.jczh
          } else if(this.xcdjForm.xbjcy1 == item.ryid) {
              item.disabled = true
              this.xcdjForm.xbjczh1 = item.jczh
          } else if(this.xcdjForm.xbjcy2 == item.ryid) {
              item.disabled = true
              this.xcdjForm.xbjczh2 = item.jczh
          } else {
              item.disabled = false
          }
      }) 
    },
    // 改变监察员1
    changeJcone() {
        this.change_peo()
        if (this.xcdjForm.xbjcy1 != "" && this.xcdjForm.zbjcy == this.xcdjForm.xbjcy1) {
            this.xcdjForm.zbjcy = "";
            this.$message({
            type: "info",
            message: "主办监察员和协办监察员1不能选择相同的"
            });
        }
        if (this.xcdjForm.xbjcy2 != "" && this.xcdjForm.zbjcy == this.xcdjForm.xbjcy2) {
            this.xcdjForm.zbjcy = "";
            this.$message({
            type: "info",
            message: "主办监察员和协办监察员2不能选择相同的"
            });
        }
    },
    // 改变监察员2
    changeJctwo() {
        this.change_peo()
      if (this.xcdjForm.zbjcy != "" && this.xcdjForm.xbjcy1 == this.xcdjForm.zbjcy) {
        this.xcdjForm.xbjcy1 = "";
        this.$message({
          type: "info",
          message: "协办监察员1和主办监察员不能选择相同的"
        });
      }
      if (this.xcdjForm.xbjcy2 != "" && this.xcdjForm.xbjcy1 == this.xcdjForm.xbjcy2) {
        this.xcdjForm.xbjcy1 = "";
        this.$message({
          type: "info",
          message: "协办监察员1和协办监察员2不能选择相同的"
        });
      }
    },
    changeJcthree() {
        this.change_peo()
        if (this.xcdjForm.zbjcy != "" && this.xcdjForm.xbjcy2 == this.xcdjForm.zbjcy) {
        this.xcdjForm.xbjcy2 = "";
        this.$message({
          type: "info",
          message: "协办监察员2和主办监察员不能选择相同的"
        });
        }
        if (this.xcdjForm.xbjcy1 != "" && this.xcdjForm.xbjcy2 == this.xcdjForm.xbjcy1) {
            this.xcdjForm.xbjcy2 = "";
            this.$message({
            type: "info",
            message: "协办监察员2和协办监察员1不能选择相同的"
            });
        }
    },
    //检查小组改变，对应检查员变
    changes() {
      this.xcdjForm.zbjcy = "";
      this.xcdjForm.xbjcy = "";
      this.xcdjForm.zbjczh = "";
      this.xcdjForm.xbjczh = "";
      // 主办监察
      $.get("/dmbgl/jcxzry", {
        params: { jcxzid: this.xcdjForm.jcxz }
      }).then(res => {
        // console.log(res);
        this.zbjc_dmb = res.returnData.jcxzlb;
      });
      this.disable = false;
    },
    // 实现对应的检查账号
    getjcy(val) {
      if (val == this.xcdjForm.xbjcy && this.xcdjForm.xbjcy != "") {
        this.$message.warning("不能选择同一个监察员");
        this.xcdjForm.zbjcy = "";
      } else {
        if (val) {
          var targetObj = this.zbjc_dmb.find(item => {
            return item.ryid == val;
          });
          this.xcdjForm.zbjczh = targetObj.jczh;
        } else {
          this.xcdjForm.zbjczh = "";
        }
      }
    },
    getjcy1(val) {
      if (val == this.xcdjForm.zbjcy && this.xcdjForm.zbjcy != "") {
        this.$message.warning("不能选择同一个监察员");
        this.xcdjForm.xbjcy = "";
      } else {
        if (val) {
          var targetObj = this.zbjc_dmb.find(item => {
            return item.ryid == val;
          });
          this.xcdjForm.xbjczh = targetObj.jczh;
        } else {
          this.xcdjForm.xbjczh = "";
        }
      }
    },
    // 判断前后时间
    jieshu_time() {
      if (this.xcdjForm.jckssj == undefined || this.xcdjForm.jckssj == "") {
        return false;
      } else if (
        new Date(this.xcdjForm.jckssj).getTime() >
        new Date(this.xcdjForm.jcjssj).getTime()
      ) {
        this.$alert("开始时间不能大于结束时间", {
          center: true,
          confirmButtonText: "确定"
        });
      }
    },
    kaishi_time() {
      if (this.xcdjForm.jcjssj == undefined || this.xcdjForm.jcjssj == "") {
        return false;
      } else if (
        new Date(this.xcdjForm.jckssj).getTime() >
        new Date(this.xcdjForm.jcjssj).getTime()
      ) {
        this.$alert("开始时间不能大于结束时间", {
          center: true,
          confirmButtonText: "确定"
        });
        return false;
      }
    },
    // 投诉举报案由判断投诉举报人必填非必填
    sureNo(){
      if (this.formInline.ajly == "01") {
          this.isHaveTo = true;
          this.rules = {
            dwmc: [
              { validator: validator('64, "full", "单位名称/姓名", false') }
            ],
            ajly: [{ validator: validator('2, "full", "案件来源", false') }],
            ay: [{ validator: validator('2, "full", "案由", false') }],
            fddbr: [{ validator: validator('32, "full", "法定代表人", true') }],
            szdwid: [
              { validator: validator('256, "full", "注册或登记地址", true') }
            ],
            lzfzr: [{ validator: validator('32, "full", "劳资负责人", true') }],
            jyhbgdz: [
              { validator: validator('156, "full", "经营(办公)地址", false') }
            ],
            lxdh: [{ validator: validator('64, "phone", "联系电话", true') }],
            xm: [
              { validator: validator('32, "full", "投诉举报人姓名", false') }
            ],
            xb: [{ validator: validator('1, "full", "性别", false') }],
            // tsrlxdh: [
            //   { validator: validator('32, "phone", "投诉人联系电话", false') }
            // ],
            tsrlxdh: [
              { validator: validator('32, "phone", "投诉人联系电话", false') }
            ],
            sfzh: [
              {
                validator: validator(
                  '18, "sfzhm", "身份证号", false',
                  (rule, value, callback) => {
                    this.formInline.sfzh = value;
                    callback();
                  }
                )
              }
            ],
            txdz: [{ validator: validator('256, "full", "通讯地址", false') }],
            sfnh: [{ validator: validator('1, "full", "户籍性质", false') }],
            tsjbsj: [
              {
                type: "string",
                required: true,
                message: "请选择日期",
                trigger: "blur"
              }
            ],
            bz: [{ validator: validator('512, "bz", "备注", true') }],
            shyj: [{ validator: validator('512, "bz", "审核意见", false') }],
            tj_nr: [
              {
                validator: validator('512, "bz", "投诉(举报)事项及要求", true')
              }
            ],
            lstjsj: [
              {
                type: "string",
                required: false,
                message: "请选择历史投诉(举报)时间",
                trigger: "change"
              }
            ],
            lstjdw: [
              {
                validator: validator('128, "full", "历史投诉(举报)单位", true')
              }
            ],
            lstjcljg: [
              { validator: validator('256, "full", "处理结果", true') }
            ],
            lstjcl: [{ validator: validator('128, "full", "相关材料", true') }]
          };
          this.$nextTick(_=>{
            this.$refs.ref_form.clearValidate();
          })
        } else {
          this.rules.xm = [];
          this.rules.xb = [];
          this.rules.sfzh = [];
          this.rules.tsrlxdh = [];
          this.rules.txdz = [];
          this.isHaveTo = false;
          this.rules.tsjbsj[0].required = false;
        }
    }
  }
};
</script>
<style scoped lang="scss">
.sfnh {
  padding-left: 30px;
}
.tsjbsxyq .el-form-item .el-form-item__label {
  width: 0px !important;
}
.el-breadcrumb-item {
  color: #5d5d5d;
}
.person {
  color: #089fb1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}
.input_width {
  width: 150px;
}
.txdz_input {
  width: 400px !important;
}
.jbinput_width {
  width: 430px !important;
}
.yq_input {
  // width: 343px;
  width: 395px;
}
.el-textarea {
  display: block;
  // margin-left: 30px;
}
.txt {
  font-size: 14px;
  color: #606266;
  line-height: 32px;
}
.el-textarea {
  .el-textarea__inner {
    resize: none !important;
  }
}
.three {
  margin: 15px 80px 0 80px;
}

.three .el-input {
  margin-bottom: 15px;
}
.xcOpinion .box1,
.cbOpinion .box2,
.xcRemarks .box3 {
  border-radius: 4px;
  margin-left: 80px;
  width: 80%;
  height: 100%;
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
.shijian {
  margin-left: 25%;
  position: absolute;
}

.xcOpinion,
.cbOpinion,
.xcRemarks,
.xjdj_jcnr {
  margin-top: 35px;
}
</style>
