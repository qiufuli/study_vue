<template>
  <div>
    <div class="ay_content">
      <h1>北京市怀柔区人力资源和社会保障局劳动保障监察询问笔录</h1>
      <div class="newadd_table">
        <el-form
          :model="form_data"
          label-width="150px"
          label-position="right"
          :inline="true"
          :rules="rules"
          ref="ref_form"
          :disabled="disabled"
        >
          <el-row>
            <el-form-item label="询问时间：" required>
              <el-col :span="11">
                <el-form-item prop="xwkssj">
                  <el-date-picker
                    type="datetime"
                    :editable="false"
                    placeholder="请选择开始时间"
                    value-format="yyyy-MM-ddHH:mm:ss"
                    v-model="form_data.xwkssj"
                    :picker-options="pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align:center;">至</el-col>
              <el-col :span="11">
                <el-form-item prop="xwjssj">
                  <el-date-picker
                    v-model="form_data.xwjssj"
                    value-format="yyyy-MM-ddHH:mm:ss"
                    type="datetime"
                    :editable="false"
                    placeholder="请选择结束时间"
                    :picker-options="pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="询问地点：" prop="xwdd" required>
                <el-input v-model="form_data.xwdd" style="width:435px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="询问人：" prop="xwr1" required>
                <el-select
                  v-model="form_data.xwr1"
                  value-key="value"
                  placeholder="请选择"
                  clearable
                  class="wd"
                  @change="changeJcone"
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
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位及职务：" prop="xwr1dwjzw" required>
                <el-input v-model="form_data.xwr1dwjzw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="询问人：" prop="xwr2" required>
                <el-select
                  v-model="form_data.xwr2"
                  value-key="value"
                  placeholder="请选择"
                  clearable
                  class="wd"
                  @change="changeJctwo"
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
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位及职务：" prop="xwr2dwjzw" required>
                <el-input v-model="form_data.xwr2dwjzw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="记录人：" prop="jlr" required>
                <el-input v-model="form_data.jlr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位及职务：" prop="jlrdwjzw" required>
                <el-input v-model="form_data.jlrdwjzw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="被询问人：" prop="bxwr" required >
                <el-input v-model="form_data.bxwr" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证号：" prop="sfzh" required  label-width="93px">
                <el-input v-model="form_data.sfzh"  @blur="changeSfz"></el-input>
              </el-form-item>
            </el-col>
              
            <!-- <el-col :span="6">
              <el-form-item label="性别：" prop="xb" required>
                <el-select v-model="form_data.xb" placeholder="请选择">
                  <el-option
                    v-for="item in xboption"
                    :key="item.cd_id"
                    :label="item.cd_name"
                    :value="item.cd_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="年龄：" prop="nl" required  label-width="100px" >
                <el-input v-model="form_data.nl" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别：" prop="xb" required label-width="70px" >
                <el-input v-model="form_data.xb" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工作单位：" prop="gzdw" required>
                <el-input v-model="form_data.gzdw" style="width:435px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职务：" prop="zw" required label-width="100px">
                <el-input v-model="form_data.zw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话：" prop="lxdh" required label-width="93px"> 
                <el-input v-model="form_data.lxdh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="住址或单位地址：" prop="zzhdwdz" required>
                <el-input v-model="form_data.zzhdwdz" style="width:435px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="require">  
            <el-row>
            <el-col>
                <el-form-item label="询问内容：" prop="xwnr" required class="box1">
                <el-input type="textarea" v-model="form_data.xwnr" class="noresize" style="margin-left:150px;margin-top: -36px;" :autosize="{ minRows: 20, maxRows: 50}"></el-input>
                </el-form-item>
                
            </el-col>         
            </el-row>   
          </div>
            <el-row>
            <el-col :span="12">
              <el-form-item label="询问人：" prop="xwr1" required>
                <el-select
                  v-model="form_data.xwr1"
                  value-key="value"
                  placeholder="请选择"
                  clearable
                  class="wd"
                  :disabled="true"
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
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期：" prop="xwr1djsj">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form_data.xwr1djsj"
                  :picker-options="pickerOptions0"
                  value-format="yyyy-MM-dd"
                  style="width:207px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="被询问人：" prop="bxwr" required>
                <el-input v-model="form_data.bxwr" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期：" prop="bxwsj">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form_data.bxwsj"
                  :picker-options="pickerOptions1"
                  value-format="yyyy-MM-dd"
                  style="width:207px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        <div class="require">  
            <el-row>
            <el-col>
                <el-form-item label="被询问人意见：" prop="bxwryj" required class="box1">
                <el-input type="textarea" v-model="form_data.bxwryj" class="noresize" style="margin-left:150px;margin-top: -36px;" :autosize="{ minRows: 5, maxRows: 8}"></el-input>
                </el-form-item>
                
            </el-col>         
            </el-row>   
        </div>
      
          <!-- <el-row>
            <el-col>
              <el-form-item label="被询问人意见：" prop="bxwryj" required>
                <el-input type="textarea" v-model="form_data.bxwryj" class="wbwd noresize"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-form>
        <el-row type="flex" justify="center" align="middle">
          <el-button type="primary" size="medium" @click="save()" v-if="isShow">保存</el-button>
          <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
    <script>
import $ from "@/common/js/axios";
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
      disabled: false,
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
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = _this.form_data.xwjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = _this.form_data.xwkssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      xb_dmbb: "",
      xwr_dmbb: [],
      form_data: {
        xwkssj: "",
        xwjssj: "",
        xwdd: "",
        xwr1: "",
        xwr1dwjzw: "",
        xwr2: "",
        xwr2dwjzw: "",
        jlr: "",
        jlrdwjzw: "",
        bxwr: "",
        xb: "",
        nl: "",
        sfzh: "",
        gzdw: "",
        zw: "",
        lxdh: "",
        zzhdwdz: "",
        xwnr: "",
        // xwr:"",
        xwr1djsj: "",
        bxwsj: "",
        bxwryj: "",
        bxwr: ""
      },
      rules: {
        xwkssj: [
          {
            type: "string",
            required: true,
            message: "询问开始时间不能为空",
            trigger: "blur"
          }
        ],
        xwjssj: [
          {
            type: "string",
            required: true,
            message: "询问结束时间不能为空",
            trigger: "blur"
          }
        ],
        xwdd: [{ validator: validator('128, "full", "询问地点", false') }],
        xwr1: [{ validator: validator('32, "full", "询问人", false') }],
        xwr1dwjzw: [
          { validator: validator('32, "full", "单位及职务", false') }
        ],
        xwr2: [{ validator: validator('32, "full", "询问人", false') }],
        xwr2dwjzw: [
          { validator: validator('128, "full", "单位及职务", false') }
        ],
        jlr: [{ validator: validator('32, "full", "记录人", false') }],
        jlrdwjzw: [
          { validator: validator('128, "full", "单位及职务", false') }
        ],
        bxwr: [{ validator: validator('32, "full", "被询问人", false') }],
        xb: [{ validator: validator('1, "full", "性别", false') }],
        nl: [{ validator: validator('3, "full", "年龄", false') }],
        sfzh: [{ validator: validator('18, "sfzhm", "身份证号", false') }],
        gzdw: [{ validator: validator('128, "full", "工作单位", false') }],
        zw: [{ validator: validator('128, "full", "职务", false') }],
        lxdh: [{ validator: validator('32, "lxdh", "联系电话", false') }],
        zzhdwdz: [
          { validator: validator('128, "full", "住址或单位地址", false') }
        ],
        xwnr: [{ validator: validator('10000, "less", "询问内容", false') }],
        // xwr: [{ validator: validator('32, "full", "询问人", false') }],
        bxwsj: [
          {
            type: "string",
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ],
        xwr1djsj: [
          {
            type: "string",
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ],
        bxwryj: [{ validator: validator('128, "full", "被询问人意见", false') }]
      }
    };
  },
  created() {
    this.query();
    this.xwr();
  },
  methods: {
    // 回显
    query() {
      if (this.$route.query.wslx == 1) {
        this.isShow = false;
        this.disabled = true;
        this.LoadOn();
        Search(this.$route.query.id).then(res => {
          this.LoadClose();
          this.form_data = res;
          if (this.form_data.xb == '1') {
            this.form_data.xb = '男';
          } else {
            this.form_data.xb = '女';
          }
        });
      }
    },
    // 询问人下拉
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
    // 改变询问人1
    changeJcone($event) {
      if (
        this.form_data.xwr2 != "" &&
        this.form_data.xwr1 == this.form_data.xwr2
      ) {
        this.form_data.xwr1 = "";
        this.$message({
          type: "info",
          message: "询问人1和询问人2不能选择相同的"
        });
      }
    },
    //  改变询问人2
    changeJctwo($event) {
      if (
        this.form_data.xwr1 != "" &&
        this.form_data.xwr2 == this.form_data.xwr1
      ) {
        this.form_data.xwr2 = "";
        this.$message({
          type: "info",
          message: "询问人2和询问人1不能选择相同的"
        });
      }
    },
    // 保存
    save() {
      this.form_data.xwkssj = reviseTime(this.form_data.xwkssj);
      this.form_data.xwjssj = reviseTime(this.form_data.xwjssj);
      this.form_data.bxwsj = reviseTime(this.form_data.bxwsj);
      this.form_data.xwr1djsj = reviseTime(this.form_data.xwr1djsj);
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
            this.LoadOn()
            baocun(this.$route.query.wsid, arr, this.$route.query.id).then(
              value => {
                this.LoadClose()
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
          }).catch(e => {
            return false;
          });
        }
      });
    },
    // 询问人下拉
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
    // 改变询问人1
    changeJcone($event) {
      console.log(this.form_data);
      if (
        this.form_data.xwr2 != "" &&
        this.form_data.xwr1 == this.form_data.xwr2
      ) {
        this.form_data.xwr1 = "";
        this.$message({
          type: "info",
          message: "询问人不能选择相同的"
        });
      }
    },
    //  改变询问人2
    changeJctwo($event) {
      if (
        this.form_data.xwr1 != "" &&
        this.form_data.xwr2 == this.form_data.xwr1
      ) {
        this.form_data.xwr2 = "";
        this.$message({
          type: "info",
          message: "询问人不能选择相同的"
        });
      }
    }, 
    // 身份证失去焦点
    changeSfz(){
      // 获取性别
      if(this.form_data.sfzh!= null && this.form_data.sfzh != ''){
        if (parseInt(this.form_data.sfzh.substr(16, 1)) % 2 == 1) {
              this.form_data.xb = "男";
          } else {
              this.form_data.xb = "女";
          }
          //获取年龄 
          var myDate = new Date();
          var month = myDate.getMonth() + 1;
          var day = myDate.getDate();
          var age = myDate.getFullYear() - this.form_data.sfzh.substring(6, 10) - 1;
          if (this.form_data.sfzh.substring(10, 12) < month || this.form_data.sfzh.substring(10, 12) == month && this.form_data.sfzh.substring(12, 14) <= day) {
              age++;
          }
          this.form_data.nl = age;
      }
    },
    // 保存
    save() {
      this.form_data.xwkssj = reviseTime(this.form_data.xwkssj);
      this.form_data.xwjssj = reviseTime(this.form_data.xwjssj);
      this.form_data.bxwsj = reviseTime(this.form_data.bxwsj);
      this.form_data.xwr1djsj = reviseTime(this.form_data.xwr1djsj);
      if(this.form_data.xb == '男') {
        this.form_data.xb = '1'
      } else {
        this.form_data.xb = '2'
      }
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
            baocun(this.$route.query.wsid, arr, this.$route.query.id).then(value => {
              if (value.executeResult == "1") {
                this.$alert(value.msg, {
                  center: true,
                  confirmButtonText: "确定"
                }).then(() => {
                  this.$router.push({
                    name: "Ajblgc",
                    query: { lasqbid: this.$route.query.id }
                  });
                });
              } else {
                this.$alert(value.msg, {
                  center: true,
                  confirmButtonText: "确定"
                });
              }
            });
          })
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
  padding: 50px 5px 35px 60px;
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
.xwsj {
  font-size: 14px;
  color: #606266;
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
.wbwd {
  width: 1000px;
}
// .require {
  // margin-top: 35px;
// }
.require::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
// .require{
//   width: 100%;
//   height: 50%;
//   border: 1px solid red;
// }

.require .el-textarea,
.require .el-col,
.require .el-form-item__content
{
  height: 100%;
  width: 79%;
//   resize: none;
}
.box1 {
  border-radius: 4px;
  // margin-left: 80px;
  width: 100%;
  height: 60%;
  display:inline-block;
}
</style>