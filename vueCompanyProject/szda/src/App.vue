<template>
  <div id="app">
    <!-- @contextmenu.prevent -->
    <div class="head noPrint">
      <p>数字人事档案综合管理系统</p>
      <ul class="model">
        <li :class="{on:cur==0}" @click="tab('/dafw')">
          <i class="iconfont icondangan"></i>
          <span>档案服务</span>
        </li>
        <li :class="{on:cur==1}" @click="tab('/dagl')">
          <i class="iconfont iconbi"></i>
          <span>档案管理</span>
        </li>
        <li :class="{on:cur==2}" @click="tab('/datj')">
          <i class="iconfont icontongji"></i>
          <span>档案统计</span>
        </li>
        <li :class="{on:cur==3}" @click="tab('/xtwh')">
          <i class="iconfont iconxitong"></i>
          <span>系统维护</span>
        </li>
      </ul>
      <ul class="right_tab">
        <li>
          <span class="on" @click="Logout" title="退出">
            <i class="iconfont icontuichu icon_com"></i>
          </span>
        </li>
        <li>
          <!-- <i class="iconfont iconyonghutouxiang icon_com"></i>{{czyInfo.czyxm}} -->
          <el-dropdown
            class="user-name"
            trigger="click"
            @command="handleCommand"
            :title="czyInfo.czyxm"
          >
            <span class="on">
              <i
                class="iconfont iconyonghutouxiang icon_com"
                style="margin-right: -2px;float: left;margin-left: 10px;"
              ></i>
              <!-- {{czyInfo.czyxm}} -->
              <span class="_user">{{czyInfo.czyxm}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="ChangePassword">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <span class="on" @click="index" title="首页">
            <i class="iconfont iconshouye1-copy icon_com" style="float:left;margin-left:12px;"></i>
            <span style="margin-right: 30px;">首页</span>
          </span>
        </li>
      </ul>
      <!-- 弹出框 -->
      <el-dialog title :visible.sync="ChangePassword_flag" @close="closeDialog">
        <div class="login xgmm">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-row>
              <i class="iconfont iconyonghu icons"></i>
              <el-form-item label="用户名：">
                <el-input v-model="ruleForm.dlyhm" class="inputs" readonly></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <i class="iconfont iconsuo iconlock"></i>
              <span class="onlyYou">*</span>
              <el-form-item label="原密码：" prop="dlmm">
                <el-input v-model="ruleForm.dlmm" show-password maxlength="32"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <i class="iconfont iconsuo iconlocks"></i>
              <span class="onlyYou">*</span>
              <el-form-item label="新密码：" prop="xdlmm">
                <el-input v-model="ruleForm.xdlmm" show-password maxlength="32"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <i class="iconfont iconsuo iconlocks"></i>
              <span class="onlyYou" style="left: 43px;">*</span>
              <el-form-item label="确认新密码：" prop="xdlmms">
                <el-input v-model="ruleForm.xdlmms" show-password maxlength="32"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-button type="primary" class="deng" @click.prevent="getData">修改密码</el-button>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div class="main" :style="{'min-height': height + 'px'}">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Index from "./views/index/index";
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import "./common/scss/index.scss";
import "./common/scss/variable.scss";
import calcMD5 from "@/common/js/md5.js";
import { setInterval } from "timers";

export default {
  name: "app",
  components: {},
  data() {
    return {
      isRouterAlive: true,
      ChangePassword_flag: false, //修改密码弹框标识
      flag: true,
      height: window.innerHeight - 66,
      cur: 1,
      gnlj: [],
      czyInfo: {},
      rules: {
        // dlyhm: [{ validator: validator('10, "full", "用户名", false') }],
        dlmm: [{ validator: validator('32, "less", "原密码", false') }],
        xdlmm: [{ validator: validator('32, "less", "新密码", false') }],
        xdlmms: [{ validator: validator('32, "less", "确认新密码", false') }]
      },
      ruleForm: {
        dlyhm: JSON.parse(sessionStorage.getItem("czyInfo")).dlyhm,
        dlmm: "",
        xdlmm: "",
        xdlmms: ""
      }
    };
  },
  // updated() {
  //   this.cur = this.$store.state.cur
  // },
  created() {
    // let power = JSON.parse(sessionStorage.getItem("power"));
    // var a = [];
    // if (power) {
    //   for (let i = 0; i < power.length; i++) {
    //     a.push(power[i].gnlj);
    //   }
    //   this.gnlj = a;
    // } else {
    //   this.gnlj = [];
    // }
    // 禁用F12
    document.onkeydown = function(e) {
      var currKey = 0,
        evt = e || window.event;
      currKey = evt.keyCode || evt.which || evt.charCode;
      if (currKey == 123) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }
    };
    this.czyInfo = JSON.parse(sessionStorage.getItem("czyInfo"));
  },
  methods: {
    // 导航栏切换
    tab(res) {
      var _this = this;
      if (res == "/dafw") {
        this.powerCheck("/dafw", function() {
          JSON.parse(sessionStorage.getItem("power")).forEach(item => {
            if (item.gnlj == "/dafw") {
              if (item.childrens) {
                _this.$router.push({ path: item.childrens[0].gnlj });
              }
            }
          });
        });
      } else if (res == "/dagl") {
        this.powerCheck("/dagl", function() {
          _this.$router.push({ path: "/dagl/daSearch" });
        });
      } else if (res == "/datj") {
        this.powerCheck("/datj", function() {
          _this.$router.push({ path: "/datj" });
        });
      } else if (res == "/xtwh") {
        this.powerCheck("/xtwh", function() {
          _this.$router.push({ path: "/xtwh/czy" });
        });
      }
      // this.$store.commit("changeValue", res);
      // if (this.gnlj.length != 0) {
      //   if (res == "/dafw" && this.gnlj.indexOf("/dafw") != "-1") {
      //     this.$router.push({ path: "/dafw/dajs" });
      //   } else if (res == "/dagl" && this.gnlj.indexOf("/dagl") != "-1") {
      //     this.$router.push({ path: "/dagl/daSearch" });
      //   } else if (res == "/datj" && this.gnlj.indexOf("/datj") != "-1") {
      //     this.$router.push({ path: "/datj" });
      //   } else if (res == "/xtwh" && this.gnlj.indexOf("/xtwh") != "-1") {
      //     this.$router.push({ path: "/xtwh/czy" });
      //   }
      // } else {
      //   this.$message({
      //     message: "该用户无此功能权限",
      //     type: "warning"
      //   });
      //   window.location.href = "./index.html";
      // }
    },
    // 退出接口
    Logout() {
      this.$confirm("是否要退出当前账号？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          $.post("/logout").then(res => {
            if (res.returnData.executeResult == "1") {
              window.location.href = "./login.html";
            }
          });
        })
        .catch(() => {});
    },
    //点击首页
    index() {
      this.$router.push({ path: "/index" });
    },
    //修改密码
    handleCommand(command) {
      if (command == "ChangePassword") {
        this.ChangePassword_flag = true;
      }
    },
    // 修改密码接口
    getData() {
      // if (this.ruleForm.xdlmm === this.ruleForm.dlmm) {
      //   this.$message.warning("新密码不能与原密码相同！");
      //   return false
      // }
      this.$refs.ruleForm.validate(valid => {
        if (this.ruleForm.dlmm && this.ruleForm.xdlmm && this.ruleForm.xdlmms) {
          this.ruleForm.dlmm = calcMD5(this.ruleForm.dlmm.toString());
          this.ruleForm.xdlmm = calcMD5(this.ruleForm.xdlmm.toString());
          this.ruleForm.xdlmms = calcMD5(this.ruleForm.xdlmms.toString());
          var data = this.ruleForm;
          $.post("/xtwh/czy/changePwd", data)
            .then(res => {
              if (res.returnData.executeResult == "1") {
                this.$message({
                  type: "success",
                  center: true,
                  message: res.returnData.message
                });
                window.setTimeout(function() {
                  window.location.href = "./login.html";
                }, 1000);
              } else {
                this.$refs.ruleForm.resetFields();
                this.$message({
                  type: "warning",
                  center: true,
                  message: res.returnData.message
                });
                this.$nextTick(_ => {
                  this.$refs.form.clearValidate();
                });
              }
            })
            .catch(() => {});
        } else {
          this.$message.warning("密码不能为空！");
        }
      });
    },
    closeDialog() {
      this.ruleForm = {
        dlyhm: JSON.parse(sessionStorage.getItem("czyInfo")).dlyhm,
        dlmm: "",
        xdlmm: "",
        xdlmms: ""
      };
      this.$nextTick(_ => {
        this.$refs.ruleForm.clearValidate();
      });
    }
  },
  watch: {
    $route: {
      handler: function(val, old) {
        let _path = this.$route.path.substring(0, 5);
        let power = JSON.parse(sessionStorage.getItem("power"));
        if (power) {
          // console.log(_path)
          // let _num = power.findIndex(item => {
          //   return item.gnlj == _path;
          // });
          // this.cur = _num;

          if (_path == "/dafw") {
            this.cur = 0;
          } else if (_path == "/dagl") {
            this.cur = 1;
          } else if (_path == "/datj") {
            this.cur = 2;
          } else if (_path == "/xtwh") {
            this.cur = 3;
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped lang="scss">
.onlyYou {
  color: red;
  position: absolute;
  top: -11px;
  left: 70px;
}
#app {
  min-width: 1024px;
  // overflow: auto;
}
.index {
  background: url("./assets/images/bg.png") no-repeat center center;
  background-size: 100%;
  // background-attachment: fixed;
}
.head {
  height: 66px;
  line-height: 66px;
  width: 100%;
  background: url("./assets/images/header.png") no-repeat 0 100%;
  background-color: #1a6cc8;
  p {
    float: left;
    font-size: 22px;
    color: #fff;
    margin: 0 7% 0 20px;
    letter-spacing: 8px;
    font-weight: 600;
  }
  .model {
    li {
      float: left;
      width: 118px;
      background: url("./assets/images/dafw.png") 25% 68% no-repeat;
      cursor: pointer;
      position: relative;
      .user-name {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      i {
        font-size: 22px;
        color: #fff;
        position: absolute;
        left: 28px;
        top: 3%;
      }
      span {
        width: 32px;
        line-height: 18px;
        font-weight: 600;
        vertical-align: middle;
        display: inline-block;
        word-break: break-all;
        margin-left: 65px;
        color: #fff;
      }
    }
    li:hover {
      background-color: #277dd8;
    }
    .on {
      background-color: #277dd8;
    }
  }
  .right_tab {
    li {
      float: right;
      width: 110px;
      height: 66px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      .icon_com {
        font-size: 24px;
        color: #baecff;
        margin-right: 10px;
      }
    }
    .on {
      cursor: pointer;
      font-size: 16px;
      color: #fff;
    }
  }
}
.overSl {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#app {
  height: 100%;
}
.login {
  position: relative;
  margin: 0 110px;
  .icons {
    position: absolute;
    height: 40px;
    top: -18%;
    font-size: 16px;
    color: #0177cc;
  }
  .iconlock,
  .iconlocks {
    position: absolute;
    top: -22%;
    height: 40px;
    font-size: 16px;
    color: #0177cc;
  }
  .demo-ruleForm label {
    color: #0177cc;
  }
  .inputs input {
    border: none;
    background: #ccc !important;
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
._user {
  display: inline-block;
  width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>