<template>
  <el-container>
    <div class="forms">
      <el-form :inline="true" status-icon :rules="rules" :model="formInline" ref="ref_form" label-position="right" label-width="155px" size="small" class="demo-form-inline">
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
            <li class="two_backs same">
              <p class="first">03</p>
              <p class="second">抽取结果确认</p>
            </li>
          </ul>
        </div>
        <div class="first-step">
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间" prop="cjsj">
                <el-input v-model="formInline.cjsj" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记人（创建人）">
                <el-input v-model="formInline.cjr" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="抽查类型" prop="cclx">
              <el-select v-model="formInline.cclx" placeholder="请选择案件来源" value-key="value">
                <el-option
                    v-for="item in cclx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid"
                    :disabled="item.disabled">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item v-model="jcnr">
                <span class="sxcc"><span class="xh">*</span>抽查事项</span>
                <el-checkbox-group v-model="jcnr" class="ccsx">
                  <el-checkbox
                    name="type"
                    v-for="item in options"
                    :label="item.dmmc"
                    :key="item.dmid"
                    :id="item.dmid"
                    :disabled = "item.sfky == '1' ? false : true"
                    class="checkboxs"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="抽查依据" prop="ccyj">
              <el-input type="textarea" v-model="formInline.ccyj" class="noresize" style="width:740px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="抽查方向" prop="ccfx">
              <el-input type="textarea" v-model="formInline.ccfx" class="noresize" style="width:740px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注" prop="bz">
              <el-input type="textarea" v-model="formInline.bz" class="noresize" style="width:740px"></el-input>
            </el-form-item>
          </el-row>
        </div>
        <el-row class="btn">
          <el-button type="primary" size="small" class="backC" @click="nextStep()">下一步</el-button>
          <el-button type="primary" size="small" class="backB" @click="back()" >返回</el-button>
        </el-row>
      </el-form>
    </div>
  </el-container>
</template>
<script>
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import { getdmb } from "@/common/js/common";
export default {
  name: "",
  data() {
    return {
      formInline: {
        sjccid: "",
        cjsj: "",
        cclx: "",
        ccsx: [],
        ccyj: "",
        ccfx: "",
        bz: "",
        cjr: ""
      },
      rules: {
        cclx: [{ required: true,validator: validator("2, \"full\", \"抽查类型\", false") }],
        ccsx: [{ required: true, validator: validator("32, \"full\", \"抽查事项\", false") }],
        ccyj: [{ validator: validator("128, \"full\", \"抽查依据\", true") }],
        ccfx: [{ required: true, validator: validator("128, \"full\", \"抽查方向\", false") }],
        bz: [{ validator: validator("1024, \"full\", \"备注\", true") }],
      },
      options: [],
      jcnr: [],
      update: [],
      cclx_dmb:[],
      new_update: "",
      new_checkbox: "",
    };
  },
  beforeMount() {
    var usertime = JSON.parse(sessionStorage.getItem("usertime"));
    this.formInline.cjsj = usertime.rq;
    this.formInline.cjr = usertime.username;
  },
  methods: {
    // 下一步
    nextStep() {
      this.$refs["ref_form"].validate(valid => {
        var aa = this.options.filter(item => {
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
        var id = this.formInline.sjccid;
        if (this.$route.query.id) {
          id = this.$route.query.id;
        }
        this.new_checkbox = this.new_update.join(",");
        if (valid) {
          if (this.new_checkbox == '') {
            this.$alert('请选择抽查事项',{
              center: true,
              confirmButtonText: "确定"
            })
            return false;
          }
          this.$confirm("是否保存", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              $.post("/ssj/sjccjbxxSave", {
                cjsj: this.formInline.cjsj,
                cjr: this.formInline.cjr,
                ccsx: this.new_checkbox,
                ccyj: this.formInline.ccyj,
                ccfx: this.formInline.ccfx,
                bz: this.formInline.bz,
                cclx: this.formInline.cclx,
                sjccid: id
              }).then(res => {
                var _res = res.returnData;
                if (+_res.executeResult === 1) {
                  this.$message({
                    type: "success",
                    center: true,
                    message: res.returnMsg
                  });
                  this.$router.push({name: "Second", query: { id: _res.sjccid }});
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
    // 基本信息查询
    Getmess() {
      var sjccid = this.formInline.sjccid;
      if (this.$route.query.id) {
        sjccid = this.$route.query.id;
      }
      $.get("/ssj/sjccjbxxCx", {params: { sjccid: sjccid }}).then((res) => {
        if (res.returnData.executeResult == "1") {
          var _res = res.returnData.vb;
          this.formInline.sjccid = _res.sjccid;
          this.formInline.cjsj =  _res.cjsj;
          this.formInline.cclx =  _res.cclx;
          this.formInline.ccsx =  _res.ccsx;
          this.formInline.ccyj =  _res.ccyj;
          this.formInline.ccfx =  _res.ccfx;
          this.formInline.bz =  _res.bz;
          this.formInline.cjr =  _res.cjr;
          // this.formInline = res.returnData.vb;
          this.jcnr = res.returnData.vb.ccsx.split(",");
          this.jcnr.map(item => {
            $.get("/dmbgl/dmblbCx", {
              params: {
                table_name: "ldjg_d_ccnr",
                dmid: item
              }
            }).then(res => {
              if (res.returnData.dmblb !== null) {
                const dmmc = res.returnData.dmblb[0].dmmc;
                this.jcnr.push(dmmc);
              } else {
                return;
              }
            });
          });
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    // 获取代码表
    ccnrdmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ccnr", function(res) {
        _this.options = res.returnData.dmblb;
      });
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
          _this.cclx_dmb = res.returnData.dmblb.filter(item => {
            return (
              item.dmid == "03" || item.dmid == "05" 
            );
          })
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
  },
  created() {
    this.Getmess();
    this.ccnrdmb();
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
  margin-bottom: 30px;
  .backC {
    background-color: #089FB1;
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
.qiehuan {
  width: 100%;
  height: 60px;
  margin: 0 auto 30px;
  ul {
    width: 100%;
  }
}
.ccsx {
  float: left;
  margin-left: 15%;
  .checkboxs {
    width: 40%;
    margin-left: 30px;
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
  background-size: 100% 100%;
  list-style:none;
  float: left;
  margin-right: 2%;
}
.two_backs {
  width: 31%;
  height: 60px;
  background: url('../../../assets/images/2.png') 100% 100% no-repeat;
  background-size: 100% 100%;
  list-style:none;
  float: left;
  margin-right: 2%;
}
.sxcc {
  color: #606266;
  margin-left: 77px;
  .xh {
    color: red;
    margin-right: 4px;
  }
}
.noresize {
  noresize: none;
}
</style>