<template>
  <div class="header clearfix">
    <div class="header_name">怀柔劳动保障行政执法案件监管平台</div>
    <div class="user">
      <img src="./tx.png" class="image" alt="">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="dropdown_btn">
          {{djr}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
          <!-- <el-dropdown-item command="changePwd">修改密码</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import $ from "@/common/js/axios";
export default {
  data () {
    return {};
  },
  computed:{
    djr(){
      return this.$store.state.djname;
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case "logout":
          this.$confirm("确定要退出么？", "提示", {
            type: "warning"
          })
            .then(() => {
              $({
                url:"/logout",
                method:"post"
              }).then(res => {          
                if(res.returnData.executeResult == "1") {
                  window.sessionStorage.clear();
                  window.location.href = "./login.html";
                }
              });
            })
            .catch(() => {});
          break;
        case "changePwd":
          // this.$confirm('确定要修改密码吗？', '提示', {
          // 	type: 'warning'
          // }).then(() => {
          // this.visiblePwd = true;
          // });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: #27b6c7;
}
.header_name {
  float: left;
  font-size: 44px;
  color: #fef4eb;
  line-height: 80px;
  margin-left: 20px;
}
.user {
  float: right;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 20px;
  .image{
    float: left;
    
    margin-right: 10px;
    position: relative;
    top: -7px;
  }
}
.user .el-dropdown {
  color: #ffffff;
  line-height: 40px;
  cursor: pointer;
}
</style>
