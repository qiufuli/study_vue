<template>
  <div class="index">
    <p class="numbers">数字人事档案综合管理系统</p>
    <ul class="tab">
      <li class="logout" @click="Logout" title="退出">
        <i class="iconfont icontuichu iconcommon"></i>
      </li>
      <li :title="czyInfo.czyxm">
        <i class="iconfont iconyonghutouxiang iconcommon" style="float: left;margin-right: -2px;"></i>
        <span class="_user">{{czyInfo.czyxm}}</span>
        
      </li>
    </ul>
    <div class="lis">
      <ul>
        <li @click="dafw('/dafw')">
          <img src="../../assets/images/index1.png" alt />档案服务
        </li>
        <li @click="dagl('/dagl')">
          <img src="../../assets/images/gagl.png" alt />档案管理
        </li>
        <li @click="datj('/datj')">
          <img src="../../assets/images/datj.png" alt />档案统计
        </li>
        <li @click="xtwh('/xtwh')">
          <img src="../../assets/images/xtwh.png" alt />系统维护
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from "@/common/js/axios";

export default {
  name: "",
  data() {
    return {
      czyInfo: {},
      gnlj: []
    };
  },
  created() {
    this.czyInfo = JSON.parse(sessionStorage.getItem("czyInfo"));
    let power = JSON.parse(sessionStorage.getItem("power"));
    var a = [];
    if (power) {
      for (let i = 0; i < power.length; i++) {
        a.push(power[i].gnlj);
      }
      this.gnlj = a;
    } else {
      this.gnlj = [];
    }
    //禁用F12
    document.onkeydown = function(e) {
      var currKey = 0,
        evt = e || window.event;
      currKey = evt.keyCode || evt.which || evt.charCode;
      if (currKey == 123) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }
    };
  },
  methods: {
    dafw: function(name) {
      this.$store.commit("changeValue", 0);
      if (this.gnlj.indexOf(name) != "-1") {
        JSON.parse(sessionStorage.getItem("power")).forEach(item => {
          if (item.gnlj == "/dafw") {
            if (item.childrens) {
              this.$router.push({ path: item.childrens[0].gnlj });
            }
          }
        });
        // this.$router.push({ path: "/dafw/dajs" });
      } else {
        this.$message({
          message: "该用户无此功能权限",
          type: "warning"
        });
        return false;
      }
    },
    dagl: function(name) {
      this.$store.commit("changeValue", 1);
      if (this.gnlj.indexOf(name) != "-1") {
        this.$router.push({ path: "/dagl/daSearch" });
      } else {
        this.$message({
          message: "该用户无此功能权限",
          type: "warning"
        });
        return false;
      }
    },
    datj: function(name) {
      this.$store.commit("changeValue", 2);
      if (this.gnlj.indexOf(name) != "-1") {
        this.$router.push({ path: "/datj" });
      } else {
        this.$message({
          message: "该用户无此功能权限",
          type: "warning"
        });
        return false;
      }
    },
    xtwh: function(name) {
      this.$store.commit("changeValue", 3);
      if (this.gnlj.indexOf(name) != "-1") {
        this.$router.push({ path: "/xtwh/czy" });
      } else {
        this.$message({
          message: "该用户无此功能权限",
          type: "warning"
        });
        return false;
      }
    },
    // 退出接口
    Logout() {
      this.$confirm("是否退出当前账号？", "提示", {
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
    }
  }
};
</script>
<style scoped lang="scss">
._user {
  display: inline-block;
  width: 75px;
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.numbers {
  font-size: 45px;
  color: #fff;
  font-family: SourceHanSansCN-Heavy;
  font-weight: 800;
  letter-spacing: 5px;
  position: fixed;
  top: 5%;
  left: 5%;
}
.index {
  background: url("../../assets/images/bg.png") no-repeat center center;
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .tab {
    margin-top: 50px;
    li {
      float: right;
      width: 100px;
      line-height: 25px;
      text-align: center;
      .iconcommon {
        font-size: 25px;
        margin-right: 10px;
      }
    }
    .logout {
      margin: 0 2% 0 0;
      cursor: pointer;
    }
  }
  .lis ul {
    position: absolute;
    right: 9%;
    top: 16%;
    li {
      height: 94px;
      line-height: 94px;
      width: 258px;
      border: 1px solid #a0d0f1;
      background-color: #c7e9ff;
      margin-bottom: 34px;
      text-align: center;
      font-size: 22px;
      color: #333;
      border-radius: 5px;
      cursor: pointer;
      img {
        vertical-align: middle;
        width: 62px;
        height: 62px;
        margin-right: 10px;
      }
      a {
        color: #333;
      }
    }
    li:hover {
      background-color: #fff;
      box-shadow: 5px 5px 27px #c7e9ff;
    }
  }
}

</style>