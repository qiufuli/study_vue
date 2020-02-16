<template>
  <div class="index" @contextmenu.prevent>
    <!-- <ul>
      <li class="logout"><i class="iconfont icontuichu iconcommon"></i></li>
      <li><i class="iconfont iconyonghutouxiang iconcommon"></i>Admin</li>
    </ul> -->
           <!-- placeholder="请输入用户名" -->
           <!-- placeholder="请输入密码" -->
    <p class="numbers">数字人事档案综合管理系统</p>
    <div class="login1 login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <i class="iconfont iconyonghu icons"></i>
        <el-form-item label=" 用 户 名" prop="name">
          <el-input v-model="ruleForm.name" class="inputs" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <i class="iconfont iconsuo iconlock"></i>
        <el-form-item label="　密 　 码" prop="pass" class="pass">
          <el-input v-model="ruleForm.pass" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <!-- <p class="remenber">记住密码?</p> -->
      <el-button type="primary" class="deng change_btn" @click="getData" @keyup.enter="getData">登录</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import "@/common/scss/index.scss";
import calcMD5 from "@/common/js/md5.js";
import { watch } from 'fs';

export default {
  name: '',
  data() {
    return {
      logining: false,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [{ validator: validator('14, "full", "用户名", false') }],
        pass: [{ validator: validator('32, "full", "密码", false') }],
      }
    }
  },
  mounted(){
    document.onkeydown = e =>{
      // let body = document.getElementsByTagName('body')[0]
      // if (e.keyCode === 13 && e.target.baseURI.match(/inputbook/) && e.target === body) {
      //   this.getData()
      // }
      var _this = this;
      var currKey=0,evt=e||window.event;
      currKey=evt.keyCode||evt.which||evt.charCode;
      if (currKey == 123) {
          window.event.cancelBubble = true;
          window.event.returnValue = false;
      }
      if (window.event == undefined) {
        var key = e.keyCode;
      } else {
        var key = window.event.keyCode;
      }
      if (key == 13) {
        _this.getData();
      }
    }
  },
  methods: {
    // 登录接口
    getData() {
      this.$refs.ruleForm.validate(valid => {
        if(valid){
        var loading = Vue.prototype.$loading({
            lock: false,
            text: "Loading...",
            target: document.querySelector(".loading-area") //设置加载动画区域
        });
        $.post("/logining", {
          dlyhm: this.ruleForm.name,
          dlmm: calcMD5(this.ruleForm.pass.toString())
          // userpwd: this.ruleForm.pass
        })
          .then(res => {
            loading.close()
            // 在请求成功后把document.onkeydown置为undefine
            if (res.returnData.executeResult == "1") {
              this.$message.success(res.returnData.message);
              var czyInfo = JSON.stringify(res.returnData.czyInfo);
              var gns = JSON.stringify(res.returnData.gns);
              sessionStorage.setItem("czyInfo", czyInfo);
              sessionStorage.setItem("power", gns);
              document.onkeydown = e =>{
                var currKey=0,evt=e||window.event;
                currKey=evt.keyCode||evt.which||evt.charCode;
                if (currKey == 123) {
                    window.event.cancelBubble = true;
                    window.event.returnValue = false;
                }
              };
              setTimeout(() => {
                window.location.href = "./index.html";
              }, 500);
              // this.$router.push({ path: "/index" });
            } else {
              this.$message.warning(res.returnData.message);
            }
          })
          .catch(() => {});      
        }
      })
    },
  }
};
</script>
<style scoped lang="scss">
.numbers {
  font-size: 45px;
  margin: 5% 0 0 5%;
  color: #fff;
  font-family:SourceHanSansCN-Heavy;
  font-weight:800;
  letter-spacing: 5px;
}
.index {
  background: url('../assets/images/bg.png') no-repeat center center;
  background-size: 100% 100%;
  // background-attachment: fixed;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  position:fixed;
  top: 0;
  left:0;
  ul {
    margin-top: 70px;
    li {
      float: right;
      width: 100px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
      .iconcommon {
        font-size: 25px;
        margin-right:10px;
      }
    }
    .logout {
      margin: 0 2% 0 0;
    }
  }
  .login {
    position: absolute;
    right: 10%;
    top: 40%;
    .icons {
      position: absolute;
      top: 8%;
      left: 1%;
      font-size: 16px;
      color: #0177cc;
    }
    .iconlock {
      position: absolute;
      top: 44%;
      left: 1%;
      font-size: 16px;
      color: #0177cc;
    }
    .demo-ruleForm label {
      color: #0177cc;
    }
    .inputs input {
      border:none;
    }
    .remenber {
      text-align: right;
      margin-bottom: 20px;
      cursor: pointer;
    }
    .deng {
      width: 100%;
    }
  }
}
</style>