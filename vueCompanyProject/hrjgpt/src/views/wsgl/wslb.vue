<template>
  <div class="wslb">
    <div class="search">
      <el-form label-position="right" :rules="rules" :model="ruleForm" :inline="true">
      <el-row :gutter="20">
        <el-col :span="11">
          <span class="searching" style="margin-right:15px">文书关键字</span>
          <el-form-item prop="wsnames">
            <el-input v-model="ruleForm.wsnames" placeholder="请输入文书关键字"  style="width:300px;line-height:60px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" class="backC" @click="getList()">查询</el-button>
        </el-col>
      </el-row>
      </el-form>
    </div>
    <div class="clearfix">
      <div v-for="item in wslb" :key="item.wsname" :value="item.wsid" :wsbm="item.wsbm" @click="wsxq(item.wsid,item.wsbm)" class="item">
        <span class="circle"></span>
        <span class="wsxq">{{item.wsname}}</span>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" class="backC" @click="goBack()">返回</el-button>
    </div>
  </div>
</template>
<script>
import { validator } from "@/common/js/valid";
import "@/common/scss/public.scss";
import $ from "@/common/js/axios";
export default {
  name: "",
  data() {
    return { 
      wslb: [],
      ruleForm: {
        wsnames: "",
      },
      rules: {
        wsnames: [{ validator: validator('32, "full", "文书关键字", true')}]
      }
    };
  },
  methods: {
    // 获取文书列表
    getList() {
      this.LoadOn();
      $.get("/wsgl/getWslb", {params: {wsname: this.ruleForm.wsnames}}).then(res => {
      this.LoadClose();
        if (res.returnData.executeResult == "1") {
          this.wslb = res.returnData.wslb;
        }
        this.wslb = res.returnData.wslb;
      });
    },
    //跳转文书详情页面
    wsxq(value,name) {
      $.get('/wsgl/wstxPd', {params: {wsid: value, lasqbid: this.$route.query.id}}).then(res => {
        if (res.returnData.sfkt == '1') {
          this.$router.push({name: name, query: {wsid: value, id : this.$route.query.id}});
        } else {
          this.$alert(res.returnData.msg,{
            center: true,
            confirmButtonText: "确定"
          })
          return false
        }
      })
      // this.$router.push({name: name, query: {wsid: value, id : this.$route.query.id}});
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style scoped lang="scss">
.wslb {
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
  .search {
    width: 92%;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    margin: 0 auto 10px;
    .searching {
      font-size: 14px;
      margin-left: 5%;
    }
    .backC {
      text-align: center;
    }
  }
  .clearfix {
    clear: both;
  }
  .item {
    float: left;
    width: 28%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    margin: 10px 0 10px 4%;
    cursor: pointer;
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #27b6c7;
      margin-left: 20px;
    }
    .wsxq {
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .item:hover {
    background-color: #68dbe645;
  }
  .btn {
    text-align: center;
    margin: 100px auto 100px;
  }
}
</style>