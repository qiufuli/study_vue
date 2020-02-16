<template>
  <div>
    <div class="left">
      <div class="xtwh" style="height: 98%;">
        <el-tree ref="tree" class="menu-tree newBg over_div_con"
        :data="treeData"
        node-key="id"
        :default-expanded-keys="[1]"
        @node-click="clickMenuNode"
        :expand-on-click-node="false">
          <span class="custom-tree-node waiceng" :title="node.label" @click="setCurrentKey" slot-scope="{ node }">
            <span class="treeTitle"><i class="iconfont iconshebaojigou icon_two"></i>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="right">
      <div class="common titles">
        <div class="title common">
          <el-col :span="21">
            <p><i class="iconfont iconic_opt_feature icons"></i>用户列表</p>
          </el-col>
          <el-col :span="3">
            <!-- <el-button size="medium" type="primary" plain class="base_btn"><i class="iconfont iconpiliang-copy icons"></i>批量操作</el-button> -->
            <el-button size="medium" type="primary" plain class="base_btn" @click="Addper()"><i class="iconfont iconxinzengrenyuan1 icons"></i>新增人员</el-button>
          </el-col>
        </div>
      </div>
      <div class="ryList common">
        <ul>
          <li v-for="index in czyList" :key="index.czyid">
            <el-row class="borders">
              <el-col :span="18" class="czyxm">{{index.czyxm}}</el-col>
              <el-col :span="6">
                <el-button round size="medium" type="primary" @click="Bjjs(index.czyid,index.roles)" >编辑角色</el-button>
                <el-button round size="medium" type="danger" @click="delPer(index.czyid)" >注销人员</el-button>
              </el-col>
            </el-row>
            <el-row class="checks">
              <ul>
                <li v-for="items in index.roles" :key="items.jsid">{{items.jsmc}}</li>
              </ul>
            </el-row>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新增人员弹框 -->
    <el-dialog title="新增操作员" center :visible.sync="adder">
      <el-form :model="xzry" :rules="rule_czy" ref="ref_xzry" 
      label-position="right" size="small" label-width="120px">
        <el-form-item label="操作员姓名：" prop="czyxm" required>
          <el-input v-model="xzry.czyxm" placeholder="请输入操作员姓名"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名：" prop="dlyhm" required>
          <el-input v-model="xzry.dlyhm" placeholder="请输入登录用户名"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" prop="dlmm" required>
          <el-input v-model="xzry.dlmm" show-password placeholder="请输入登录密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Baocun">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色弹框 -->
    <el-dialog title="编辑角色" center :visible.sync="editCzy">
      <span>角色列表：</span>
      <el-select v-model="jsid" multiple placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in jsList"
          :key="item.jsid"
          :label="item.jsmc"
          :value="item.jsid">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Js_save()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validator } from "@/common/js/valid";
import $ from '@/common/js/axios';
import calcMD5 from "@/common/js/md5.js";

export default {
  name: '',
  data() {
    return {
      session_dlyhm:JSON.parse(sessionStorage.getItem('czyInfo')).dlyhm,
      editCzy: false,
      search: '',
      sfdj: false,
      flag: true,
      czyList: [],
      adder: false,
      treeData: [],
      pageNum: 0,
      dwid: '',
      xzry: {
        czyxm: '',
        dlyhm: '',
        dlmm: '',
        ssdwid: ''
      },
      rule_czy: {
        czyxm: [{ validator: validator('14,"full","操作员姓名",false') }],
        dlyhm: [{ validator: validator('10,"full","登录用户名",false') }],
        dlmm: [{ validator: validator('32,"full","登录密码",false') }],
        ssdwid: [{ validator: validator('14,"full","所属单位id",false') }]
      },
      jsList: [],
      jsid: [],
      czyid: '',
    }
  },
  created(){
    this.xzry.ssdwid = JSON.parse(sessionStorage.getItem('czyInfo')).ssdwid;
    this.getDataMenu(this.xzry.ssdwid);
  },
  methods: {
    //显示新增人员弹框
    Addper() {
      this.adder = true;
      // 重置表单
      this.$nextTick(()=>{
        this.$refs["ref_xzry"].resetFields();
      });
    },
    // 查询全部角色
    Searchjs() {
      $.get('/xtwh/js/listAllJs').then(res => {
        var result = res.returnData;
        if (result.executeResult == '1') {
          this.jsList = result.jslist;
        }
      })
    },
    // 查询某一单位操作员
    Search() {
      $.get('/xtwh/czy/list', {params: {ssdwid: this.xzry.ssdwid, pageNum: this.pageNum}}).then(res => {
        var result = res.returnData;
        if (result.executeResult == '1') {
          this.czyList = result.czylist;
        }
      })
    },
    // 编辑角色
    Bjjs(id,roles) {
      this.jsid = roles ? roles.map((item)=>{return item.jsid}): '';
      this.editCzy = true;
      this.czyid = id;
      this.Searchjs();
    },
    // 保存编辑角色
    Js_save() {
      $.post('/xtwh/czy/addJsForCzy', {czyid: this.czyid, jsids: this.jsid}).then(res => {
        var result = res.returnData;
        if (result.executeResult == '1') {
          // var gns = JSON.stringify(result.gns);
         var  session_id = JSON.parse(sessionStorage.getItem('czyInfo')).czyid;
          
          if(this.czyid == session_id){
            this.$alert('您的权限已修改，请重新登录！', {
                  center: true,
                  confirmButtonText: "确定"
            }).then(()=>{
            window.location.href="login.html";
            }).catch(()=>{
               window.location.href="login.html";
            });
          }else{
          this.$message({
            message: result.message,
            type: 'success'
          });
          this.Search();
          this.editCzy = false;
          this.jsid = [];
          }
         
          
          
        }
      })
    },
    // 新增操作员
    Baocun() {
      this.$refs["ref_xzry"].validate(valid => {
        if (valid) {
          this.xzry.dlmm = calcMD5(this.xzry.dlmm);
          $.post('/xtwh/czy/add', this.xzry).then(res => {
            var result = res.returnData;
            if (result.executeResult == '1') {
              this.adder = false;
              this.Search();
              this.$message({
                message: result.message,
                type: 'success'
              });
            }else{
               this.$alert(result.message, {
                  center: true,
                  confirmButtonText: "确定"
              });
            }
          })
        }
      })
    },
    // 获取左侧树列表
    getDataMenu: function (jgid) {
      var _this = this;
      _this.treeData = [];
      $.get("/dagl/dwjgCx", {params: {dwid: jgid}}).then((res)=>{
        if(res.returnData.executeResult == '1'){
          if (res.returnData.dwjbxx.length > 0) {
            var result = res.returnData.dwjbxx;
            for (let i in result) {
              var firstNode = {};
              firstNode.id= result[i].dwid;
              firstNode.label= result[i].dwmc;
              firstNode.parentId = ''; 
              firstNode.children= [];
              _this.treeData.push(firstNode);
                if (result[i].oneZjgs) {
                  for(let k in result[i].oneZjgs){
                    var secNode = {};
                    secNode.id = result[i].oneZjgs[k].dwid;
                    secNode.label = result[i].oneZjgs[k].dwmc;
                    secNode.parentId = result[i].dwid;
                    secNode.children= [];
                    _this.treeData[i].children.push(secNode);
                    if (result[i].oneZjgs[k].twoZjgs) {
                      for(let j in result[i].oneZjgs[k].twoZjgs){
                        var treNode = {}
                        treNode.id = result[i].oneZjgs[k].twoZjgs[j].dwid;
                        treNode.label = result[i].oneZjgs[k].twoZjgs[j].dwmc;
                        treNode.parentId = result[i].oneZjgs[k].dwid;
                        treNode.sjdwbz = result[i].oneZjgs[k].twoZjgs[j].sjdwbz;
                        _this.treeData[i].children[k].children.push(treNode);
                      }
                    }
                  }
                }
              
            }
            // this.xzry.ssdwid = result[0].dwid;
            this.Search();
          }          
        }
      });
    },
    setCurrentKey: function () {
       this.$refs.tree.setCurrentKey(2);
       this.back = true;
    },
    // 获取左侧 单位树的点击时的id
    clickMenuNode: function (data) {
      this.xzry.ssdwid = data.id;
      this.Search();
    },
    // 注销人员
    delPer(czyid) {
      this.$confirm('是否删除该操作员？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.post('/xtwh/czy/delete', {czyid:czyid}).then(res => {
          var result = res.returnData;
          if (result.executeResult == '1') {
            this.Search();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
  }
};
</script>
<style scoped lang="scss">
.left {
  position: absolute;
  top: 48px;
  .treeTitle {
    color: #fff;
  }
}
.right {
  position: absolute;
  top: 48px;
}
.common {
  width: 98%;
  margin: 10px auto;
  background-color: #fff;
}
.titles {
  height: 52px;
  line-height: 52px;
  .icons {
    margin-right: 5px;
  }
  .base_btn {
    line-height: 4px;
  }
}
.ryList {
  ul {
    height: 104px;
    li {
      background-color: #fff;
      margin: 10px auto;
    }
    .borders {
      border-bottom: 1px solid #e5e5e5;
      height: 52px;
      line-height: 52px;
      width: 98%;
      margin: 0px auto;
      .czyxm {
        color: #009CFF;
        font-size: 20px;
        font-weight: 500;
      }
    }
    .checks {
      line-height: 52px;
      width: 98%;
      margin: 0px auto;
      padding-bottom: 0;
      ul {
        height: 64px;
        li {
          float: left;
          margin-right: 40px;
          color: #333;
          font-size: 14px;
        }
      }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #ff9900 !important;
      border-color: #ff9900 !important;
    }
  }
}
.over_div_con{
   overflow: hidden;
   overflow-y: auto;
   width: 100%;
   height: 650px;
   cursor: pointer;
   background: none;
  }
.over_div_con::-webkit-scrollbar {
  width: 9px;
  height: 50px;
  background-color: #2A3D55;
}

/*定义滚动条轨道 内阴影+圆角 */

.over_div_con::-webkit-scrollbar-track {
  border-radius: 4px;
  height: 50px;
  background-color: #2A3D55;
}

/*定义滑块 内阴影+圆角*/

.over_div_con::-webkit-scrollbar-thumb {
  border-radius: 4px;
  height: 50px;
  background-color: #c1c1c1;
}
</style>