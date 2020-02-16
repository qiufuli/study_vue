<template>
  <div class="jsgl">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px">
        <el-col :span="22">
          <el-breadcrumb-item>权限维护</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>重置密码</el-breadcrumb-item> -->
        </el-col>
        <el-col :span="2">
          <el-button @click="Edits()">新增角色</el-button>
        </el-col>
      </el-breadcrumb>
    </div>
    <div class="common titles">
      <el-row class="table_row">
        <el-col :span="8">序号</el-col>
        <el-col :span="8">名称</el-col>
        <el-col :span="8">操作</el-col>
      </el-row>
      <el-form
        :inline="true"
        ref="rulesForm"
        :model="tableData"
        :rules="rulesnew"
        status-icon
        label-position="right"
        label-width="155px"
        size="small"
        class="demo-form-inline"
      >
        <el-row class="row_class" v-for="(index,item) in jslist" :key="item">
          <el-col :span="8">{{item + 1}}</el-col>
          <el-col :span="8">{{index.jsmc}}</el-col>
          <el-col :span="8">
            <span class="edits" @click="edit_js(index.jsid,index.jsmc)">
              <i class="iconfont iconbianji1 iconsnew"></i>编辑
            </span>
            <span class="complete" @click="Shouq(index.jsid)">授权</span>
            <span class="dels" @click="del_js(index.jsid)">
              <i class="iconfont iconshanchu2 iconsnew"></i>删除
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 新增角色弹出框 -->
    <el-dialog title="新增角色" center :visible.sync="table_flag">
      <el-form
        :model="xzjs"
        :rules="rule_jg"
        ref="ref_jgjs"
        label-position="right"
        size="small"
        label-width="120px"
      >
        <el-form-item label="角色名称：" prop="jsmc" required>
          <el-input v-model="xzjs.jsmc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Xzbc()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色弹出框 -->
    <el-dialog title="编辑角色" center :visible.sync="bj_flag">
      <el-form
        :model="bjjs"
        :rules="rule_jg"
        ref="ref_bjjs"
        label-position="right"
        size="small"
        label-width="120px"
      >
        <el-form-item label="角色名称：" prop="jsmc" required>
          <el-input v-model="bjjs.jsmc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Bjbc()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 授权弹出框 -->
    <el-dialog title="授权" center :visible.sync="sq_flag">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="defaultProps"
        :default-expanded-keys="[1]"
        empty-text="数据加载中请等待"
        :expand-on-click-node="false"
        @check="handleCheckChange"
        class="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer" v-show="treeData.length>0">
        <el-button type="primary" @click="getCheckedKeys">保 存</el-button>
        <el-button @click="transform1(treeData,'tree')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";

export default {
  name: "",
  data() {
    return {
      dacx: "", //档案查询
      dagl: "", //档案管理
      yxxx: "", //影像信息
      yxdy: "", //影像信息
      resourceCheckedKey: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeData: [],
      tableData: {},
      rulesnew: {},
      table_flag: false,
      xzzy: {},
      rule_jg: {
        jsmc: [{ validator: validator('32,"full","角色名称",false') }]
      },
      jslist: [],
      xzjs: {
        jsmc: ""
      },
      bjjs: {
        jsmc: "",
        jsid: ""
      },
      bj_flag: false,
      sq_flag: false,
      sqid: ""
    };
  },
  created() {
    this.Search();
  },
  methods: {
    // tree 选中状态变化方法
    handleCheckChange(data, checked, indeterminate) {
      var arr_key = this.$refs.tree.getCheckedKeys();
      this.$refs.tree.getCheckedNodes().map(item => {
        // 影像，数据信息  必须勾选档案查询
        if (this.$refs.tree.getHalfCheckedKeys().indexOf(this.dagl) != -1) {
          if (item.id != this.dacx) {
            if (item.id != this.yxxx && item.id == this.yxdy) {
              arr_key.push(this.yxxx);
            }
            return arr_key.push(this.dacx);
          }
        }
      });
      this.$refs.tree.setCheckedKeys(arr_key);
    },
    // 显示弹框
    Edits() {
      this.table_flag = true;
    },
    // 表单重置
    transform1(data, ele) {
      this.$refs[ele].setCheckedNodes([]);
    },
    // 查询所有角色
    Search() {
      $.get("/xtwh/js/list").then(res => {
        var result = res.returnData;
        if (result.executeResult == "1") {
          this.jslist = result.jslist;
        }
      });
    },
    // 新增功能保存
    Xzbc() {
      $.post("/xtwh/js/add", this.xzjs).then(res => {
        var result = res.returnData;
        if (result.executeResult == "1") {
          this.table_flag = false;
          this.xzjs.jsmc = "";
          this.$nextTick(() => {
            this.$refs.ref_jgjs.clearValidate();
          });
          this.Search();
          this.$message({
            message: result.message,
            type: "success"
          });
        } else {
          this.$message({
            message: result.message,
            type: "warning"
          });
        }
      });
    },
    // 删除角色
    del_js(id) {
      this.$confirm("是否删除该角色？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $.post("/xtwh/js/delete", { jsid: id }).then(res => {
          var result = res.returnData;
          if (result.executeResult == "1") {
            this.Search();
            this.$message({
              message: result.message,
              type: "success"
            });
          }
        });
      });
    },
    // 编辑框显示
    edit_js(id, name) {
      this.bjjs.jsmc = name;
      this.bjjs.jsid = id;
      this.bj_flag = true;
    },
    // 编辑保存
    Bjbc() {
      $.post("/xtwh/js/update", this.bjjs).then(res => {
        var result = res.returnData;
        if (result.executeResult == "1") {
          this.bj_flag = false;
          this.Search();
          this.$message({
            message: result.message,
            type: "success"
          });
        } else {
          this.$message({
            message: result.message,
            type: "warning"
          });
        }
      });
    },
    // 授权功能
    Shouq(id) {
      this.sq_flag = true;
      this.sqid = id;
      this.getDataMenu();
    },
    // 获取左侧树列表
    getDataMenu: function() {
      var _this = this;
      _this.treeData = [];
      $.get("/xtwh/js/getJsGn", { params: { jsid: this.sqid } }).then(res => {
        if (res.returnData.executeResult == "1") {
          if (res.returnData.gnTree.length > 0) {
            var result = res.returnData.gnTree;
            for (let i in result) {
              var firstNode = {};
              firstNode.id = result[i].gnid;
              firstNode.label = result[i].gnmc;
              firstNode.parentId = "";
              firstNode.children = [];
              if (firstNode.label == "档案管理") {
                this.dagl = firstNode.id;
              }
              _this.treeData.push(firstNode);
              if (result[i].childrens) {
                for (let k in result[i].childrens) {
                  var secNode = {};
                  secNode.id = result[i].childrens[k].gnid;
                  secNode.label = result[i].childrens[k].gnmc;
                  if (secNode.label == "档案查询") {
                    this.dacx = secNode.id;
                  } else if (secNode.label == "影像信息") {
                    this.yxxx = secNode.id;
                  } else if (secNode.label == "影像打印") {
                    this.yxdy = secNode.id;
                  }
                  secNode.parentId = result[i].gnid;
                  secNode.children = [];
                  _this.treeData[i].children.push(secNode);
                  if (result[i].childrens[k].childrens) {
                    for (let j in result[i].childrens[k].childrens) {
                      var treNode = {};
                      treNode.id = result[i].childrens[k].childrens[j].gnid;
                      treNode.label = result[i].childrens[k].childrens[j].gnmc;
                      treNode.parentId = result[i].childrens[k].gnid;
                      treNode.sjdwbz =
                        result[i].childrens[k].childrens[j].sjdwbz;
                      _this.treeData[i].children[k].children.push(treNode);
                    }
                  }
                }
              }
            }
            var tar_arr = [];
            res.returnData.gnids.forEach(item => {
              var tar_obj = {};
              tar_obj["id"] = item;
              tar_arr.push(tar_obj);
            });
            _this.$nextTick(() => {
              _this.$refs.tree.setCheckedNodes(tar_arr);
            });
          }
        }
      });
    },
    setCurrentKey: function() {
      this.$refs.tree.setCurrentKey(2);
      this.back = true;
    },
    getCheckedKeys() {
      var gnids = this.$refs.tree.getCheckedKeys();
      var parent = this.$refs.tree.getHalfCheckedKeys(); //获取半选中状态的数组的ID值
      for (var i = 0; i < parent.length; i++) {
        gnids.push(parent[i]);
      }
      $.post("/xtwh/js/addGnForJs", { jsid: this.sqid, gnids: gnids }).then(
        res => {
          var result = res.returnData;
          if (result.executeResult == "1") {
            this.sq_flag = false;
            // var gns = JSON.stringify(result.gns);
            // sessionStorage.setItem("power", gns);
            var jsids = result.jsids;
            if (jsids.indexOf(this.sqid) !== -1) {
              this.$alert("您的权限已修改，请重新登录！", {
                center: true,
                confirmButtonText: "确定"
              })
                .then(() => {
                  window.location.href = "login.html";
                })
                .catch(() => {
                  window.location.href = "login.html";
                });
            } else {
              this.Search();
              this.$message({
                message: result.message,
                type: "success"
              });
            }
          }
        }
      );
    }
  }
};
</script>
<style scoped lang="scss">
.common {
  width: 98%;
  margin: 10px auto;
  background-color: #fff;
}
.titles {
  .icons {
    margin-right: 5px;
  }
  .table_row {
    height: 50px;
    background-color: #ffffff;
    color: #015cb1;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    padding: 15px 0;
    .el-col {
      height: 30px;
    }
  }
  .edits {
    cursor: pointer;
    color: #009cff;
    .iconsnew {
      font-size: 14px;
      margin-right: 4px;
    }
  }
  .complete {
    margin-left: 10px;
    padding-left: 18px;
    background: url("../../assets/images/sq.png") left 0 no-repeat;
    color: #ff9900;
    cursor: pointer;
  }
  .dels {
    cursor: pointer;
    margin-left: 10px;
  }
  .row_class,
  .row_class2 {
    background-color: #ffffff;
    color: #606266;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    // padding: 20px 0 0;
    > .el-col {
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .row_class2 {
    background: #fafafa;
  }
}
.csfw {
  margin-left: 50px;
}
</style>