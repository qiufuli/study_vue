<template>
  <div>
    <div class="ay_content">
      <h1>北京市怀柔区人力资源和社会保障局劳动保障监察结案报告</h1>
      <div class="newadd_table">
        <el-form
          :model="form_data"
          label-width="195px"
          label-position="right"
          style="align:right"
          :inline="true"
          :rules="rules"
          ref="ref_form"
        >
          <el-row>
            <el-col>
              <el-form-item label="当事人：" prop="dsr" required>
                <el-input v-model="form_data.dsr" class="wd" :disabled="disableds"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="行政处罚决定书文号：" prop="wsh" required>
                <el-input v-model="form_data.wsh" class="wd" :disabled="wsdis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="送达日期：" prop="sdrq">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form_data.sdrq"
                  :picker-options="pickerOptions0"
                  value-format="yyyy-MM-dd"
                  class="wd"
                  :disabled="wsdis"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="案件办理过程及结果：" prop="gcjjg" required>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  v-model="form_data.gcjjg"
                  :disabled="wsdis"
                  class="wbwd noresize"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="行政处罚决定执行情况：" prop="zxqk" required>
                <el-input
                  type="textarea"
                  v-model="form_data.zxqk"
                  :disabled="wsdis"
                  class="wbwd noresize"
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
                    v-model="form_data.cbryj"
                    :disabled="wsdis"
                    class="wbwd noresize"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="劳动保障监察员：" prop="jcy" required>
                  <el-select
                    v-model="form_data.jcy"
                    value-key="value"
                    placeholder="请选择"
                    clearable
                    class="wd"
                    :disabled="disableds"
                  >
                    <el-option
                      :label="item.xm"
                      :value="item.ryid"
                      v-for="item in xwr_dmbb"
                      :key="item.ryid"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="劳动保障监察员：" prop="jcy" required>
                  <el-input v-model="form_data.jcy" class="wd"></el-input>
                </el-form-item>-->
              </el-col>
              <el-col :span="12">
                <el-form-item label="日期：" prop="jcydjsj" required>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form_data.jcydjsj"
                    :picker-options="pickerOptions1"
                    value-format="yyyy-MM-dd"
                    class="wd"
                    :disabled="disableds"
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
                    v-model="form_data.spyj"
                    class="wbwd noresize"
                    :disabled="sfdis"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="劳动保障监察机构负责人：">
                  <el-input v-model="form_data.jgfzr" class="wd" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="日期：">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form_data.jgfzrdjsj"
                    :picker-options="pickerOptions2"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    class="wd"
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
                  :disabled="wsdis"
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
import {
  getdmb,
  Group,
  deepClone,
  select,
  selectPerson
} from "@/common/js/common";
export default {
  data() {
    var _this = this;
    return {
      isShow: true,
      shShow: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      xwr_dmbb: "",
      form_data: {
        dsr: "",
        wsh: "",
        sdrq: "",
        gcjjg: "",
        zxqk: "",
        cbryj: "",
        jcy: this.$store.state.djname,
        jcydjsj: this.$store.state.djtime,
        spyj: "",
        jgfzr: "",
        jgfzrdjsj: "",
        bz: ""
      },
      disableds: false,
      wsdis: false,
      sfdis: true,
      rules: {
        dsr: [{ validator: validator('32, "full", "当事人", false') }],
        wsh: [
          { validator: validator('32, "full", "行政处罚决定书文号", false') }
        ],
        sdrq: [
          {
            type: "string",
            required: true,
            message: "送达日期不能为空",
            trigger: "blur"
          }
        ],
        gcjjg: [
          { validator: validator('1000, "less", "案件办理过程及结果", false') }
        ],
        zxqk: [
          { validator: validator('512, "less", "行政处罚决定执行情况", false') }
        ],
        cbryj: [{ validator: validator('256, "less", "承办人意见", false') }],
        jcy: [{ validator: validator('14, "full", "劳动保障监察员", false') }],
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
          {
            validator: validator('14, "full", "劳动保障监察机构负责人", false')
          }
        ],
        jgfzrdjsj: [
          {
            type: "string",
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ],
        bz: [{ validator: validator('256, "less", "备注", true') }]
      }
    };
  },
  created() {
    this.query();
    this.xwr();
  },
  methods: {
    // 回显 wslx=1 是从文书列表跳转，2是从结案销案审批进
    query() {
      if (this.$route.query.wslx == 1 || this.$route.query.wslx == 2) {
        this.isShow = false;
        this.disableds = true;
        this.wsdis = true;
        this.LoadOn();
        Search(this.$route.query.id).then(value => {
          this.LoadClose();
          this.form_data = value;
        });
      } else {
        $.get("/lasp/lasqxxCx", {
          params: { lasqbid: this.$route.query.id }
        }).then(res => {
          this.form_data.dsr = res.returnData.vb.dwmc;
          this.disableds = true;
          this.sfdis = true;
        });
      }
      if (this.$route.query.wslx == 2) {
        this.shShow = true;
        this.sfdis = false;
        Search(this.$route.query.id).then(value => {
          this.form_data = value;
          this.form_data.jgfzr = this.$store.state.djname;
          this.form_data.jgfzrdjsj = this.$store.state.djtime;
        });
        this.rules.spyj = [
          {
            validator: validator(
              '256, "less", "劳动保障监察机构审批意见", false'
            )
          },
          { required: true }
        ];
      }
    },
    // 劳动保障监察员
    xwr() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        const _res = res.returnData;
        if (+_res.executeResult == 1) {
          _this.xwr_dmbb = _res.dmblb;
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
      this.form_data.sdrq = reviseTime(this.form_data.sdrq);
      this.form_data.jcydjsj = reviseTime(this.form_data.jcydjsj);
      this.form_data.jgfzrdjsj = reviseTime(this.form_data.jgfzrdjsj);
      this.form_data.jcy = this.$store.state.djid;
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          const arr = [];
          for (let i in this.form_data) {
            arr.push(this.form_data[i]);
          }
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }).then(() => {
            this.LoadOn();
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