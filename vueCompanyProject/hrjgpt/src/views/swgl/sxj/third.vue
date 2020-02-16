<template>
  <el-container>
    <div class="forms">
      <el-row>
        <div class="steps">抽查步骤</div>
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
      <div class="third-step">
        <el-row class="title">
          <div class="steps">抽取条件</div>
        </el-row>
        <el-row class="title titnametj">
          <el-col :span="8" class="padding_lft">
            <div>执法对象名称：{{xxmsg.zfdx}}</div>
          </el-col>
          <el-col :span="8">
            <div>所属地区：{{xxmsg.ssdqName}}</div>
          </el-col>
          <el-col :span="8">
            <div>机构类型：{{xxmsg.jglxName}}</div>
          </el-col>
        </el-row>
        <el-row class="title titnametj">
          <el-col :span="8" class="padding_lft">
            <div>所属行业：{{xxmsg.sshyName}}</div>
          </el-col>
          <el-col :span="8">
            <div>登记注册类型：{{xxmsg.djzclxName}}</div>
          </el-col>
          <el-col :span="8">
            <div>从业人员总数：{{xxmsg.cyryzsq}}~{{xxmsg.cyryzsz}}</div>
          </el-col>
        </el-row>
        <el-row class="title">
          <div class="steps">抽查内容</div>
        </el-row>
        <el-row class="title titname">
          <span class="padding_lft ccnrsty" v-for="item in xxmsg.cczynr" :value="item" :key="item">{{item}}</span>
        </el-row>
        <el-row class="title on">
          <div class="person">抽取比例</div>
        </el-row>
        <el-row class="title">
          <el-form :inline="true" ref="ruleForm" :rules="rules" status-icon :model="xxmsg" label-position="right" label-width="155px" size="small" class="demo-form-inline">
            <el-col :span="6" class="padding_lft">
              <div class="cysjsl">参与随机抽取总数量：{{xxmsg.cycqzs}}</div>
            </el-col>
            <el-col :span="7">
              <el-form-item label="抽取比例：" label-width="110px">
                <el-form-item prop="date">
                  <el-input v-model="cqbl" style="width:120px" :disabled="true"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最终抽取数量：" label-width="110px">
                <el-form-item prop="cqsl">
                  <el-input v-model="search.cqsl" :disabled="disabled" style="width:120px" @blur="Cqbl()"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" :disabled="disabled" @click="Detail_list()">重新随机匹配</el-button>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="table_row">
          <el-col :span="5">执法对象名称</el-col>
          <el-col :span="4">所属地区</el-col>
          <el-col :span="3">法定代表人</el-col>
          <el-col :span="3">监察小组</el-col>
          <el-col :span="3">主办监察员</el-col>
          <el-col :span="3">协办监察员</el-col>
          <el-col :span="3">上次抽查时间</el-col>
        </el-row>
        <el-form :inline="true" ref="rulesForm" :model="tableData" :rules="rulesnew" status-icon label-position="right" label-width="155px" size="small" class="demo-form-inline">
          <el-row
            :class="index%2 == 0 ?'row_class':'row_class2'"
            v-for="(item,index) in tableData.returnData" :key="index" class="row_class">
            <el-col :span="5">{{item.bjcdw ? item.bjcdw : '--'}}</el-col>
            <el-col :span="4">{{item.ssdqName ? item.ssdqName : '--'}}</el-col>
            <el-col :span="3">{{item.frdb ? item.frdb : '--'}}</el-col>
            <el-col :span="3">
              <el-form-item style="width:100%;" :prop="'returnData.' + index + '.jcxz'" :rules="rulesnew.jcxz">
                <el-select v-model="item.jcxz" @focus="jcxzCx(item,'1')" style="width:110px">
                  <el-option
                    :label="items.jcxzmc"
                    :value="items.jcxzid"
                    v-for="items in jcxzDmb"
                    :key="items.jcxzid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item style="width:100%;" :prop="'returnData.' + index + '.zbjcy'" :rules="rulesnew.zbjcy">
                <el-select v-model="item.zbjcy" @focus="jcxzCx(item)" style="width:110px" @change="change1(item)">
                  <el-option
                    :label="item.xm"
                    :value="item.ryid"
                    v-for="item in zbjcyDmb"
                    :key="item.ryid"
                    :disabled="item.disabled == true ? true : false"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item style="width:100%;" :prop="'returnData.' + index + '.xbjcy'" :rules="rulesnew.xbjcy">
                <el-select v-model="item.xbjcy" @focus="jcxzCx(item)" style="width:110px" @change="change2(item)">
                  <el-option
                    :label="item.xm"
                    :value="item.ryid"
                    v-for="item in zbjcyDmb"
                    :key="item.ryid"
                    :disabled="item.disabled == true ? true : false">
                  </el-option> 
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">{{item.scczsj ? item.scczsj : '--'}}</el-col>
          </el-row>
        </el-form>
      </div>
      <el-row class="btn">
        <el-button type="primary" size="small" class="backC" @click="Pred()">上一步</el-button>
        <el-button type="primary" size="small" class="backC" :disabled="disabled" @click="Qrjg()">确认匹配结果</el-button>
      </el-row>
    </div>
  </el-container>
</template>
<script>
import { validator } from "@/common/js/valid";
import "../../../common/scss/public.scss";
import $ from "@/common/js/axios";
import { getdmb } from "@/common/js/common";
export default {
  name: "",
  data() {
    return {
      search: {
        sjccid:"",
        cqsl:""
      },
      xxmsg: {
        zfdx: "",   
        ssdq: "",   
        jglx: "",   
        sshy: "",   
        djzclx: "",   
        cyryzsq: "",   
        cyryzsz: "",  
        cczynr: "", 
        cycqzs: "",
        sjccid: ""
      },
      rules: {
        cqsl: [{validator: validator('2, "num", "最终抽取数量", true') }]
      },
      rulesnew: {
        jcxz: [{ validator: validator('20, "full", "监察小组", false') }],
        zbjcy: [{ validator: validator('20, "full", "主办监察员", false') }],
        xbjcy: [{ validator: validator('20, "full", "协办监察员", false')}],
      },
      cqbl: "",
      options: [],
      tableData: {
        returnData: []
      },// tableData 获取是异步的，所以tableData[1] 是undefined；由于form 是在内容获取之后的所以这个问题不用考虑
      disabled: false,
      save: {
        sjccid:"",
        dwids: [],
        jcxzs: [],
        zbjcys: [],
        xbjcys: []
      },
      jcxzDmb: [],
      zbjcyDmb: [],
      newZbjcy: [],
      xbjcyDmb: [],
      zbjcys: [],
      xbjcys: [],
    };
  },
  methods: {
    // 详细信息查询
    Table_search() {
      $.get("/ssj/cctjCx", {params: {sjccid: this.$route.query.id}}).then(res => {
        if (res.returnData.executeResult == "1") {
          this.xxmsg = res.returnData.vb;
          this.$refs.ruleForm.resetFields();
          this.$refs.rulesForm.resetFields();
          if (this.xxmsg.cycqzs == 0) {
            this.disabled = true;
            this.search.cqsl = 0;
            this.cqbl = 0;
          } else {
            this.disabled = false;
            this.search.cqsl = 10;
            this.cqbl = Math.floor(this.search.cqsl / this.xxmsg.cycqzs * 100) + "%";
            this.Detail_list();
            this.getDmb();
          }
        }
      });
    },
    // 计算抽取比例
    Cqbl() {
      if (this.search.cqsl > 10) {
        this.$alert('最终抽取数量值最大为10', {
          center: true,
          confirmButtonText: "确定"
        })
        this.search.cqsl = 1;
      }
      if (this.search.cqsl == '') {
        this.search.cqsl = 1;
      }
      this.cqbl = Math.floor(this.search.cqsl / this.xxmsg.cycqzs * 100) + "%";
    },
    getDmb () {
      // 检查小组查询
      $.get("/dmbgl/jcxzcx", {params: {jcxzid: ""}}).then(res => {
        if (res.returnData.executeResult == "1") {
          this.jcxzDmb = res.returnData.jcxzlb;
        }
      });
      $.get('/dmbgl/ryxxcx', {params: ''}).then(res => {
        const _res = res.returnData.dmblb;
        this.zbjcyDmb = _res;
      })
    },
    // 查询某监察小组的监察员
    jcxzCx(val,flag) {
      if (flag == '1') {
        val.zbjcy = '';
        val.xbjcy = '';
      }
      $.get('/dmbgl/jcxzry', {params: {jcxzid: val.jcxz}}).then(res => {
        this.zbjcyDmb = res.returnData.jcxzlb;
      })
    },
    // 下拉表change方法
    change1(item) {
      if (item.zbjcy == item.xbjcy) {
        item.xbjcy = '';
      }
      for (var i =0; i < this.zbjcyDmb.length; i++) {
        if (this.zbjcyDmb[i].ryid == item.zbjcy) {
          this.zbjcyDmb[i].disabled = true
        }
      }
    },
    change2(item) {
      if (item.zbjcy == item.xbjcy) {
        item.zbjcy = '';
      }
      for (var i =0; i < this.zbjcyDmb.length; i++) {
        if (this.zbjcyDmb[i].ryid == item.xbjcy) {
          this.zbjcyDmb[i].disabled = true
        }
      }
    },
    // 随机匹配
    Detail_list() {
      this.search.sjccid = this.$route.query.id;
      $.get("/ssj/sjppCx", {params: this.search}).then(res => {
        var data = res.returnData;
        if (data.executeResult == "1") {
          this.tableData.returnData = data.vbs;
          this.$refs.rulesForm.resetFields();
          // 控制变量法，只有一条的时候能不能校验。当有两条的时候能不能校验；两条可以，基本上就可以了
        }
      });
    },
    // 第三步保存
    Qrjg() {
      this.$refs["rulesForm"].validate(valid => {
        if (valid) {
          this.$confirm("确认匹配结果", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }).then(() => {
            for (let i =0; i < this.tableData.returnData.length; i++) {
              this.save.dwids.push(this.tableData.returnData[i].dwid);
              this.save.jcxzs.push(this.tableData.returnData[i].jcxz);
              this.save.zbjcys.push(this.tableData.returnData[i].zbjcy);
              this.save.xbjcys.push(this.tableData.returnData[i].xbjcy);
            }
            this.save.sjccid = this.$route.query.id;
            this.LoadOn()
            $.post("/ssj/dwfpSave", this.save).then(res => {
              this.LoadClose()
              if (res.returnData.executeResult == "1") {
                this.$message({
                  type: "success",
                  center: true,
                  message: res.returnMsg
                });
                this.$router.push({name: "Ssjfp"});
              }
            });
          })
        }
        this.save.sjccid = this.$route.query.id;
        this.LoadOn()
        $.post("/ssj/dwfpSave", this.save).then(res => {
          this.LoadClose()
          if (res.returnData.executeResult == "1") {
            this.$router.push({name: "Ssjfp"});
          }
        });
      })
    },
    // 上一步
    Pred() {
      this.$router.push({name: "Second", query: {id: this.$route.query.id}});
    }
  },
  created() {
    this.Table_search();
  }
};
</script>
<style scoped lang="scss">
.el-breadcrumb-item {
  color: #5D5D5D;
}
.person {
  background-color: #089FB1;
  color: #fff;
  font-size: 16px;
  line-height: 30px;
  padding-left: 20px;
  margin-bottom: 10px;
}
.steps {
  color: #089FB1;
  font-weight: bold;
}
.padding_lft {
  padding-left: 20px;
}
.btn {
  text-align: center;
  margin: 30px 0;
  .backC {
    background-color: #089FB1;
    margin-right: 20px;
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
}
.title {
  margin-top: 10px;
}
.title.on {
  margin-top: 30px;
}
.titname{
  color: #606266;
}
.titnametj{
  color: #606266;
  font-size:14px;
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
  background: url('../../../assets/images/02.png') 100% 100% no-repeat;
  background-size: 100% 100%;
  list-style:none;
  float: left;
  margin-right: 2%;
}
.table_row {
  background-color: #37B6C7;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding: 15px 0;
}
.row_class,
.row_class2 {
  background-color: #ffffff;
  color: #606266;
  font-size: 14px;
  text-align: center;
  padding: 20px 0 0;
  > .el-col {
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.row_class2 {
  background: #fafafa;
}
.ccnrsty {
  font-size: 14px;
}
.cysjsl {
  font-size: 14px;
  color: #606266;
  line-height: 30px;
}
</style>