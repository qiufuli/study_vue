<template>
  <div>
    <div class="ay_content">
      <h1>北京市怀柔区人力资源和社会保障局劳动保障监察立案审批表</h1>
      <div class="newadd_table">
        <el-form
          :model="form_data"
          label-width="195px"
          label-position="right"
          style="align:right;padding: 30px; "
          :inline="true"
          ref="ref_form"
          :disabled="true"
        >
          <el-row>
            <el-col>
              <el-form-item label="案件来源：">
                <el-input v-model="form_data.ajly" class="wd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="cbrbk">
            <el-row>
              <el-col>
                <el-form-item label="当事人：">
                  <el-input v-model="form_data.dwmc" class="wd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="地址：">
                  <el-input v-model="form_data.dwdz" class="wd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="联系人：">
                  <el-input v-model="form_data.lxr" class="wd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="联系电话：">
                  <el-input v-model="form_data.lxdh" class="wd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="证件类型：">
                  <el-input v-model="form_data.zjlx" class="wd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="证件号码：">
                  <el-input v-model="form_data.zjhm" class="wd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="ldbzbk">
            <el-row>
              <el-col>
                <el-form-item label="案件基本情况及涉嫌违反的法律法规：" class="line_height">
                  <el-input type="textarea" v-model="form_data.ajjbqk" class="wbwd noresize"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="ldbzbk">
            <el-row>
              <el-col>
                <el-form-item label="承办意见：">
                  <el-input type="textarea" v-model="form_data.cbyj" class="wbwd noresize"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="劳动保障监察员：">
                  <el-input v-model="form_data.jcy" class="wd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="日期：">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form_data.jcydjsj"
                    value-format="yyyy-MM-dd"
                    class="wd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="ldbzbk">
            <el-row>
              <el-col>
                <el-form-item label="审批意见：">
                  <el-input type="textarea" v-model="form_data.spyj" class="wbwd noresize"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="劳动保障监察机构负责人：">
                  <el-input v-model="form_data.spr" class="wd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="日期：">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form_data.spsj"
                    value-format="yyyy-MM-dd"
                    class="wd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form_data.bz" class="wbwd noresize"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
        <el-row type="flex" justify="center" align="middle">
          <!-- <el-button type="primary" size="medium" @click="save()" v-if="isShow">保存</el-button> -->
          <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
        </el-row>
    </div>
  </div>
</template>
    <script>
import $ from "@/common/js/axios";
import "../../common/scss/public.scss";
import { Search, baocun, reviseTime } from "./ws.js";
import { validator } from "@/common/js/valid";
export default {
  data() {
    return {
      isShow: true,
      disabled: false,
      form_data: {},
    };
  },
  created() {
    this.query();
  },
  methods: {
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
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 50px 5px 0px 30px;
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
  width: 800px;
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