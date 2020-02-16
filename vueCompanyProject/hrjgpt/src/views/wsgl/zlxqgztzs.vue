<template>
  <div>
    <div class="ay_content">
      <div class="nr_content">
        <h1>北京市怀柔区人力资源和社会保障局责令（限期）改正通知书</h1>
        <div class="newadd_table">
          <div class="content">
            <el-form
              :model="form_data"
              :inline="true"
              ref="ref_form"
              :rules="rules"
              :disabled="disabled"
            >
              <el-row class="clearfix">
                <el-col :span="8" :offset="10">
                  <el-form-item prop="zi" required>京怀人社劳监责字〔
                    <el-input v-model="form_data.zi" style="width:64px"></el-input>〕
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="hao" required>第
                    <el-input v-model="form_data.hao" style="width:64px"></el-input>号
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="require">
                <!-- <div class="person">案件基本情况及涉及违反的法律法规名称：</div> -->
                <el-form-item label class="only box1" prop="nr" required>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 20, maxRows: 40}"
                    placeholder="请输入内容"
                    v-model="form_data.nr"
                    class="noresize"
                  ></el-input>
                </el-form-item>
              </div>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="时间：" prop="djsj">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form_data.djsj"
                      :picker-options="pickerOptions0"
                      value-format="yyyy-MM-dd"
                      style="width:207px"
                      :disabled="disabled"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9" style="line-height:40px">北京市怀柔区人力资源和社会保障局</el-col>
              </el-row>
            </el-form>
            <p class="bz">注：本文书一式两份</p>
            <el-row type="flex" justify="center" align="middle">
              <el-button type="primary" size="medium" @click="save()" v-if="isShow">保存</el-button>
              <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
            </el-row>
          </div>
        </div>
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
      form_data: {
        zi: "",
        hao: "",
        nr: "",
        djsj: ""
      },
      rules: {
        zi: [{ validator: validator('14, "full", "字", false') }],
        hao: [{ validator: validator('32, "full", "号", false') }],
        nr: [{ validator: validator('1000, "less", "内容", false') }],
        djsj: [
          {
            type: "string",
            required: true,
            message: "请选择日期不能为空",
            trigger: "blur"
          }
        ]
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      }
    };
  },
  created() {
    this.query();
  },
  methods: {
    // 回显 
    query() {
      if (this.$route.query.wslx == 1) {
        this.isShow = false;
        this.disabled = true;
        this.LoadOn()
        Search(this.$route.query.id).then(res => {
          this.LoadClose()
          this.form_data = res;
        });
      }
    },
    // 保存
    save () {
      this.form_data.djsj = reviseTime(this.form_data.djsj);
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
.content {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}
.common_bt .el-form-item__label {
  width: 140px;
}
.small_title,
.bottom_gsxx {
  text-align: right;
  padding-right: 10px;
}
.nr_content {
  width: 70%;
  height: 100%;
  // border: 1px solid #cccccc;
  margin: 0 auto;
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
.textnr {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
.el-form--inline .el-form-item {
  width: 100%;
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}
.require {
  margin-top: 35px;
}
.require::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.require .box1 {
  border-radius: 4px;
  // margin-left: 80px;
  width: 100%;
  height: 100%;
}
</style>
