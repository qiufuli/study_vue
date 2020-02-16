<template>
  <div>
    <div class="ay_content">
      <h1>北京市怀柔区人力资源和社会保障局劳动保障监察撤销立案审批表</h1>
      <div class="newadd_table">
        <el-form
          :model="form_data"
          label-width="210px"
          label-position="right"
          :inline="true"
          :rules="rules"
          ref="ref_form"
        >
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="案件来源：" prop="ajly" required>
                <el-select
                  v-model="form_data.ajly"
                  value-key="value"
                  placeholder="请选择"
                  :disabled="disableds"
                  class="wd"
                >
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
            <el-col :span="12">
              <el-form-item label="立案时间：" prop="larq">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form_data.larq"
                  :picker-options="pickerOptions0"
                  value-format="yyyy-MM-dd"
                  class="wd"
                  :disabled="disableds"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="当事人：" prop="dsr" required>
                <el-input v-model="form_data.dsr" class="wd" :disabled="disableds"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法定代表人(负责人)：" prop="fddbr" required>
                <el-input v-model="form_data.fddbr" class="wd" :disabled="disedit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地址：" prop="dz" required>
                <el-input v-model="form_data.dz" class="wd" :disabled="disableds"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="lxdh" required>
                <el-input v-model="form_data.lxdh" class="wd" :disabled="disableds"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件类型：" prop="zjlx" required>
                <el-select
                  v-model="form_data.zjlx"
                  value-key="value"
                  placeholder="请选择"
                  :disabled="disableds"
                  class="wd"
                >
                  <el-option
                    :label="item.dmmc"
                    :value="item.dmid"
                    v-for="item in zjlx_dmb"
                    :key="item.dmid"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号：" prop="zjh" required>
                <el-input v-model="form_data.zjh" class="wd" :disabled="disableds"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="案件处理过程及结果：" prop="gcjjg" required>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  v-model="form_data.gcjjg"
                  class="wbwd noresize"
                  :disabled="disedit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="cbrbk">
            <el-row>
              <el-col>
                <el-form-item label="承办人意见：" prop="cbryj" required>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    v-model="form_data.cbryj"
                    class="wbwd noresize"
                    :disabled="disedit"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="劳动保障监察员：" prop="jcy">
                  <el-select
                    v-model="form_data.jcy"
                    value-key="value"
                    placeholder="请选择"
                    class="wd"
                    disabled
                  >
                    <el-option
                      :label="item.xm"
                      :value="item.ryid"
                      v-for="item in ldbzjcy_dmb"
                      :key="item.ryid"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-form-item
                        label="劳动保障监察员："
                        prop="jcy"
                        required
                    >
                        <el-input v-model="form_data.jcy" class="wd"></el-input>
                </el-form-item>-->
              </el-col>
              <el-col :span="12">
                <el-form-item label="日期" prop="jcydjsj">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form_data.jcydjsj"
                    :picker-options="pickerOptions0"
                    value-format="yyyy-MM-dd"
                    class="wd"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="ldbzbk">
            <el-row>
              <el-col>
                <el-form-item label="劳动保障监察机构审批意见：" prop="spyj">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    v-model="form_data.spyj"
                    class="wbwd noresize"
                    :disabled="dissp"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="劳动保障监察机构负责人：">
                  <el-input v-model="form_data.jgfzr" class="wd" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="日期：" prop="jgfzrdjsj">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form_data.jgfzrdjsj"
                    :picker-options="pickerOptions0"
                    value-format="yyyy-MM-dd"
                    class="wd"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col>
              <el-form-item label="备注：" prop="bz">
                <el-input
                  type="textarea"
                  v-model="form_data.bz"
                  class="wbwd noresize"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  :disabled="disedit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row type="flex" justify="center" align="middle">
          <el-button type="primary" size="medium" @click="Pass()" v-if="shShow">审核通过</el-button>
          <el-button type="primary" size="medium" @click="Return()" v-if="shShow">审核退回</el-button>
          <el-button type="primary" size="medium" @click="save()" v-if="isShow">保存</el-button>
          <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
        <script>
import $ from "@/common/js/axios";
// import "../../common/scss/public.scss";
import { Search, baocun, reviseTime } from "./ws.js";
import { validator } from "@/common/js/valid";
import { getdmb } from "@/common/js/common";
export default {
  data() {
    var _this = this;
    return {
      isShow: true,
      shShow: false,
      disableds: false,
      disedit: false,
      dissp: true,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      ajly_dmb: [],
      zjlx_dmb: [],
      ldbzjcy_dmb: [],
      zjhRegexp: "",
      form_data: {
        ajly: "",
        larq: "",
        dsr: "",
        fddbr: "",
        dz: "",
        lxdh: "",
        zjlx: "",
        zjh: "",
        gcjjg: "",
        cbryj: "",
        jcy: this.$store.state.djname,
        jcydjsj: this.$store.state.djtime,
        spyj: "",
        jgfzr: "",
        jgfzrdjsj: "",
        bz: ""
      },
      rules: {
        ajly: [{ validator: validator('14, "full", "案件来源", true') }],
        larq: [
          {
            type: "string",
            required: true,
            message: "立案时间不能为空",
            trigger: "blur"
          }
        ],
        dsr: [{ validator: validator('32, "full", "当事人", true') }],
        fddbr: [
          { validator: validator('32, "full", "法定代表人(负责人)", false') }
        ],
        dz: [{ validator: validator('128, "full", "地址", true') }],
        lxdh: [{ validator: validator('32, "full", "联系电话", true') }],
        zjlx: [{ validator: validator('32, "full", "证件类型", true') }],
        zjh: [{ validator: validator('32, "less", "证件号", true') }],
        // sfzh: [{validator: validator('18, "sfzhm", "身份证号", true')}],
        gcjjg: [
          { validator: validator('1000, "less", "案件处理过程及结果", false') }
        ],
        cbryj: [{ validator: validator('256, "less", "承办人意见", false') }],
        jcy: [
          { validator: validator('14, "full", "劳动保障监察员", false') },
          { required: true }
        ],
        jcydjsj: [
          {
            type: "string",
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ],
        spyj: [
          {
            validator: validator(
              '256, "less", "劳动保障监察机构审批意见", true'
            )
          }
        ],
        jgfzr: [
          { validator: validator('14, "full", "劳动保障监察机构负责人", true') }
        ],
        jgfzrdjsj: [{ validator: validator('19, "less", "日期", true') }],
        bz: [{ validator: validator('256, "less", "备注", true') }]
      }
    };
  },
  created() {
    this.query();
    this.ajly();
    this.zjlx();
    // this.ldbzjcy()//查 劳动保障监察员 的代码表
  },
  methods: {
    // 回显
    query() {
      this.$nextTick(() => {
        this.$refs.ref_form.clearValidate();
      });
      if (this.$route.query.wslx == 1 || this.$route.query.wslx == 2) {
        this.isShow = false;
        this.disableds = true;
        this.disedit = true;
        this.LoadOn();
        Search(this.$route.query.id).then(res => {
          this.LoadClose();
          this.form_data = res;
        });
      } else {
        $.get("/lasp/lasqxxCx", {
          params: { lasqbid: this.$route.query.id }
        }).then(res => {
          this.form_data.dsr = res.returnData.vb.dwmc;
          this.form_data.ajly = res.returnData.vb.ajly;
          this.form_data.larq = res.returnData.vb.lasj;
          this.form_data.dz = res.returnData.vb.dwdz;
          this.form_data.lxdh = res.returnData.vb.lxdh;
          this.form_data.zjlx = res.returnData.vb.zjlx;
          this.form_data.zjh = res.returnData.vb.zjhm;
          this.disableds = true;
          this.form_data.jcy = this.$store.state.djname; // 劳动保障监察员
          this.form_data.jcydjsj = this.$store.state.djtime; // 劳动保障监察员登记时间
        });
      }
      if (this.$route.query.wslx == 2) {
        this.dissp = false;
        this.shShow = true;
        Search(this.$route.query.id).then(res => {
          this.form_data = res;
          var name = JSON.parse(sessionStorage.getItem("usertime"));
          this.form_data.jgfzr = name.username;
          this.form_data.jgfzrdjsj = name.rq;
          this.rules.spyj = [
            {
              validator: validator(
                '256, "less", "劳动保障监察机构审批意见", false'
              )
            },
            { required: true }
          ];
        });
      }
    },
    // 案件来源下拉
    ajly() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
        const _res = res.returnData;
        if (+_res.executeResult == 1) {
          _this.ajly_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 证件类型下拉
    zjlx() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_zjlx", function(res) {
        const _res = res.returnData;
        if (+_res.executeResult == 1) {
          _this.zjlx_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 劳动保障监察员
    ldbzjcy() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        const _res = res.returnData;
        if (+_res.executeResult == 1) {
          _this.ldbzjcy_dmb = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 审核通过
    Pass() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否审批通过", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.LoadOn();
              $.post("/ajbl/jaxashtg", {
                lasqbid: this.$route.query.laspbid,
                wsid: this.$route.query.wsid,
                jaxaspyj: this.form_data.spyj
              }).then(res => {
                this.LoadClose();
                if (res.returnData.executeResult == "1") {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.$router.push({ name: "Jaxasp" });
                } else {
                  this.$message({
                    type: "error",
                    center: true,
                    message: res.returnData.message
                  });
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    // 审核退回
    Return() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否审批退回", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.LoadOn();
              $.post("/ajbl/jaxashth", {
                lasqbid: this.$route.query.laspbid,
                wsid: this.$route.query.wsid,
                jaxaspyj: this.form_data.spyj
              }).then(res => {
                this.LoadClose();
                if (res.returnData.executeResult == "1") {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.$router.push({ name: "Jaxasp" });
                } else {
                  this.$message({
                    type: "error",
                    center: true,
                    message: res.returnData.message
                  });
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    // 保存
    save() {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }).then(() => {
            this.LoadOn();
            const _form_data2 = Object.assign({},this.form_data);

            _form_data2.larq = reviseTime(this.form_data.larq);
            _form_data2.jcydjsj = reviseTime(this.form_data.jcydjsj);
            _form_data2.jgfzrdjsj = reviseTime(this.form_data.jgfzrdjsj);
            _form_data2.jcy = this.$store.state.djid;
            const arr = [];
            for (let i in _form_data2) {
              arr.push(_form_data2[i]);
            }
            baocun(this.$route.query.wsid, arr, this.$route.query.id).then(
              value => {
                this.LoadClose();
                if (value.executeResult == "1") {
                  this.$message({
                    type: "success",
                    center: true,
                    message: value.msg
                  });
                  this.$router.push({
                    name: "Ajblgc",
                    query: { lasqbid: this.$route.query.id }
                  });
                } else {
                  this.$message({
                    type: "error",
                    center: true,
                    message: value.msg
                  });
                }
              }
            );
          });
        }
      });
    }
  }
};
</script>
    <style scoped lang="scss">
.newadd {
  width: 80px;
  height: 30px;
  background: #0a9daf;
  opacity: 0.9;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  float: left;
  cursor: pointer;
  margin-bottom: 20px;
}
.newadd_table {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 50px 5px 35px 30px;
}
.ay_content {
  margin: 0;
  padding: 30px 20px 30px 20px;
  background-color: #ffffff;
  min-height: 620px;
}
.ay_content h1 {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  font-size: 33px;
  font-weight: 500;
}
.common_bt .el-form-item__label {
  width: 140px;
}
.bztext {
  width: 100%;
  height: 200px;
  border: 1px solid red;
}
.save {
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
  margin-top: 25px;
}
.wd {
  width: 250px;
}
.wbwd {
  width: 500px;
}
.cbrbk {
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  padding: 40px 0;
  margin: 30px 0;
}
.ldbzbk {
  border-bottom: 1px solid #cccccc;
  padding: 40px 0;
  margin: 30px 0;
  width: 100%;
}
</style>