<template>
  <div class="login">
    <div class="title">怀柔劳动保障行政执法案件监管平台</div>
    <div class="tables">
      <h3>账户登录</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name" style="width:440px;margin:10px auto 33px">
          <el-input v-model="ruleForm.name" placeholder="账户" ref="name"></el-input>
        </el-form-item>
        <el-form-item prop="pass" style="width:440px;margin:0 auto">
          <el-input v-model="ruleForm.pass" type="password" placeholder="密码" ref="pass"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item style="width:440px;margin:10px auto 33px">
            <el-col :span="20">
              <el-checkbox v-model="checked" label="记住密码"></el-checkbox>
            </el-col>
            <!-- <el-col :span="4">
              <el-button type="text">忘记密码</el-button>
            </el-col>-->
          </el-form-item>
        </el-row>
      </el-form>
      <el-button
        type="primary"
        native-type="submit"
        :loading="logining"
        class="btn-login"
        @click.prevent="submitFrom"
        @keyup.enter.native="submitFrom"
      >登录</el-button>
    </div>
    <div class="bottom">
      <div>北京北控三兴信息技术有限公司</div>
    </div>
  </div>
</template>
<script>
// import { validator } from '@/common/js/valid';
import $ from "@/common/js/axios";
import calcMD5 from "@/common/js/md5.js";

export default {
  name: "",
  data() {
    return {
      // 防止重复点击
      checked: false,
      logining: false,
      ruleForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号" }],
        pass: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  //页面加载调用获取cookie值
  // mounted() {
  //   this.getCookie();
  // },
  created() {
    var _self = this;
    document.onkeydown = function(e) {
      if (window.event == undefined) {
        var key = e.keyCode;
      } else {
        var key = window.event.keyCode;
      }
      if (key == 13) {
        _self.submitFrom("loginData");
      }
    };
    this.getCookie();
  },
  methods: {
    // 提交表单
    submitFrom() {
      
      var remeberFlag;
      if (this.checked == true) {
        remeberFlag = "true";
      }
      if (this.checked == false) {
        remeberFlag = "false";
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.checked == false) {
            this.clearCookie();
            this.setCookie(this.ruleForm.name,"",7, remeberFlag);
            this.getData();
          } else {
            //调用配置
            this.clearCookie();
            //传入账号名，密码，和保存天数,记住密码状态4个参数
            this.setCookie(
              this.ruleForm.name,
              this.ruleForm.pass,
              7,
              remeberFlag
            );
            this.getData();
          }
        }
      });
    },
    getData() {
      $.post("/login/login", {
        username: this.ruleForm.name,
        userpwd: calcMD5(this.ruleForm.pass)
        // userpwd: this.ruleForm.pass
      })
        .then(res => {
          // 在请求成功后把document.onkeydown置为undefined
          document.onkeydown = undefined;
          if (res.returnData.executeResult == "1") {
            window.location.href = "./index.html";
          } else {
            this.$message.warning(res.returnData.message);
          }
        })
        .catch(() => {});
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays, remeberFlag) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "remeberFlag" + "=" + remeberFlag +  ";path=/;expires=" + exdate.toGMTString();
        // "remeberFlag" + "=" + remeberFlag;
    },
    //读取cookie
    getCookie: function() {
      // console.log(document.cookie);
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm.name = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            arr[2].split("=")[1] === "false"
              ? (this.ruleForm.pass = "")
              : (this.ruleForm.pass = arr2[1]);
          } else if (arr2[0] == "remeberFlag") {
            this.checked = arr2[1] == "false" ? false : true;
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  // min-height: 1080px;
  background: url("./bg.png") no-repeat;
  .title {
    width: 945px;
    margin: 0 auto;
    padding: 5% 0 72px;
    font-size: 56px;
    color: #fef4eb;
  }
  .tables {
    width: 740px;
    height: 480px;
    margin: 0 auto;
    background-color: #fff;
    h3 {
      width: 100%;
      text-align: center;
      height: 26px;
      margin: 0 auto;
      padding: 48px 0 57px;
      font-size: 26px;
      font-weight: bold;
      color: rgba(39, 182, 199, 1);
      line-height: 18px;
    }
    .btn-login {
      width: 440px;
      margin: 65px 150px 0;
      background-color: #27b6c7;
      border-color: #27b6c7;
    }
  }
  .bottom {
    height: 50px;
    width: 100%;
    background-color: #1c9ead;
    position: relative;
    bottom: 0;
    margin-top: 165px;
    div {
      width: 254px;
      margin: 0 auto;
      line-height: 50px;
      color: #000;
      font-size: 16px;
      font-weight: 600;
      text-align: right;
      background: url("./bksx.png") 0px 17px no-repeat;
    }
  }
}
</style>