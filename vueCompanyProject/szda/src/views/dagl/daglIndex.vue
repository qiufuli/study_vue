<template>
  <div @click="hidePanel">
    <!-- <div class="left">
      <el-menu
      @select="menuSelect"
      background-color="#263b54"
      text-color="#fff"
      active-text-color="#38B5FD" >

        <el-submenu v-for="(item ,index) in menuTree" popper-class="submenu"
        :key="index" 
        :index="(index + 1) + ''">

          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.dwmc}}</span>
          </template>
          <el-menu-item-group class="menu_level2" 
          v-for="(itemOne ,oneIndex) in item.oneZjgs" 
          :key="oneIndex" 
          :index="(index + 1) + '-' + (oneIndex + 1)">

            <template slot="title">
              
              <span>{{itemOne.dwmc}}</span>
              <span class="operate" :id="itemOne.show ? 'operate' : ''" 
              @click="handle(index,oneIndex)">

                <i class="iconfont icongengduoxinxi"></i>
              </span>
            </template>
            <div class="pop-handle" :id="itemOne.show ? 'show' : ''" 
            v-show="itemOne.show">

              <ul>
                <li @click="addFxjg(itemOne.dwid)"><i class="iconfont iconshanchu1"></i>新建</li>
                <li @click="deleteFxjg(itemOne)"><i class="iconfont iconshanchu1"></i>删除</li>
                <li @click="editFxjg(itemOne)"><i class="iconfont iconbianji1"></i>重命名</li>
              </ul>
            </div>
            <el-menu-item v-for="(item ,twoIndex) in itemOne.twoZjgs" 
            class="menu_level3" :key="twoIndex"
            :index="item.dwid">
              
              <template slot="title">
                <div style="padding-left: 40px;">
                  <i class="el-icon-location"></i>
                  <span>{{item.dwmc}}</span>
                </div>
              </template>
              
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu> 
      
    </div> -->
    <!-- <div class="right">
      
    </div> -->
    <router-view></router-view>
    <!-- 弹出框 -->
    <!-- <el-dialog title="机构转移" center :visible.sync="addTableFlag">
      <el-form :model="formAdd" :rules="rulesMenu" ref="ref_form"  
      label-position="right" size="small" label-width="120px">
        <el-form-item label="机构名称：" prop="dwmc" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dwmc"></el-input>
        </el-form-item>
        <el-form-item label="社会信用代码：" prop="shxydm" :label-width="formLabelWidth">
          <el-input v-model="formAdd.shxydm"></el-input>
        </el-form-item>
        <el-form-item label="单位类型：" prop="dwlx" :label-width="formLabelWidth">
          <el-select
            v-model="formAdd.dwlx"
            value-key="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dwlx_dmb"
              :label="item.dmmc"
              :value="item.dmid"
              
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位经济类型：" :label-width="formLabelWidth">
          <el-select
            v-model="formAdd.dwjjlx"
            value-key="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dwjjlx_dmb"
              :label="item.dmmc"
              :value="item.dmid"              
              :key="item.dmid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册地行政区划：" prop="zcdxzqh" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            v-model="hjd_arr"
            @change="handleChange('hjd')"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="注册地址：" prop="zcdz" :label-width="formLabelWidth">
          <el-input v-model="formAdd.zcdz"></el-input>
        </el-form-item>
        <el-form-item label="经营地行政区划：" prop="jydxzqh" :label-width="formLabelWidth">
          <el-cascader
            :options="options"
            v-model="csd_arr"
            @change="handleChange('jydxzqh')"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="经营地地址：" prop="zcdz" :label-width="formLabelWidth">
          <el-input v-model="formAdd.jydz"></el-input>
        </el-form-item>
        <el-form-item label="单位发人：" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dwfr"></el-input>
        </el-form-item>
        <el-form-item label="单位联系电话：" :label-width="formLabelWidth">
          <el-input v-model="formAdd.dwlxdh"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTableFlag = false">取 消</el-button>
        <el-button type="primary" @click="addFormBtn">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import { getData } from "@/common/js/common";
export default {
  name: '',
  data() {
    return {
      currentShow: {},
      options:[], //行政区划
      hjd_arr: [],
      csd_arr: [],
      userClick: false,
      menuTree: [],
      dwlx_dmb: [],
      dwjjlx_dmb: [],
      addTableFlag: false,
      formAdd: { 
        dwmc: '',
        shxydm: '',
        dwlx: '',
        dwjjlx: '',
        zcdxzqh: '',
        zcdz: '',
        jydxzqh: '',
        jydz: '',
        dwfr: '',
        dwlxdh: '',
        sjdwid: ''
      }, 
      formInitAdd: { //清空form表单使用
        dwmc: '',
        shxydm: '',
        dwlx: '',
        dwjjlx: '',
        zcdxzqh: '',
        zcdz: '',
        jydxzqh: '',
        jydz: '',
        dwfr: '',
        dwlxdh: '',
        sjdwid: ''
      },
      rulesMenu: {
        dwmc: [{ validator: validator('128, "full", "单位名称", false') }],
        shxydm: [{ validator: validator('18,"full","社会信用代码",false') }],
        dwlx: [{ validator: validator('2,"full","单位类型",true') }],
        dwjjlx: [{ validator: validator('3,"full","单位经济类型",true') }],
        zcdxzqh: [{ validator: validator('12,"full","注册地行政区划",true') }],
        zcdz: [{ validator: validator('128,"full","注册地址",true') }],
        jydxzqh: [{ validator: validator('12,"full","经营地行政区划",true') }],
        jydz: [{ validator: validator('128,"full","经营地址",true') }],
        dwfr: [{ validator: validator('32,"full","单位法人",true') }],
        dwlxdh: [{ validator: validator('32,"full","单位联系电话",true') }]
      },
      dialogFormVisible: false,
      formLabelWidth: '240px',
      currentMenuSeId:''
    }
  },
  created(){
    var _this = this;
    this.$nextTick(()=>{
      this.xzqhCx();
      this.dmbCx();
      this.getDataMenu();
      
      // this.xzqh_arr(_res.csd,this.csd_arr)
      // this.xzqh_arr(_res.hjxzqh,this.hjd_arr)
      // this.xzqh_arr(_res.xzzxzqh,this.xzz_arr)
    })
    
  },
  methods: {
    getDataMenu: function () {
      var _this = this;
      $.get("/dagl/dwjgCx").then((res)=>{
        
        if(res.returnData.executeResult == '1'){
         
          if (res.returnData.dwjbxx.length > 0) {
            for (let i in res.returnData.dwjbxx) {
              for(let k in res.returnData.dwjbxx[i].oneZjgs){
                res.returnData.dwjbxx[i].oneZjgs[k].show = false;
              }
            }
          }
           _this.menuTree = res.returnData.dwjbxx;
        }
      });
    },
    // 菜单树 的编辑操作 框 显示
    handle: function (index1,index2) {
      this.currentShow = this.menuTree[index1].oneZjgs[index2];
      this.menuTree[index1].oneZjgs[index2].show = true;
    },
    // 点击其余地方隐藏 菜单树 的编辑操作 框
    hidePanel: function(event){
      
      var sp = document.getElementById("show");
      var bt = document.getElementById("operate");
      if(sp){

        if(!sp.contains(event.target) && !bt.contains(event.target)){
          this.currentShow.show = false;

        }

      }

    },
    // 行政区划查询
    xzqhCx(){
       $.get("/xzqh.json").then((res)=>{
        this.options = res.returnData.xzqhlb;
      });
    },
    // 添加 弹出输入框
    addFxjg: function (id) {
      this.addTableFlag = true;
      this.formAdd.sjdwid = id;
    },
    // 添加单位机构 提交按钮
    addFormBtn: function () {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
          $.post('/dagl/dwjgAdd', this.formAdd).then(res => {
            var result = res.returnData;
            if (result.executeResult == '1') {
              this.getDataMenu();
              this.addTableFlag = false;
              this.formAdd = this.formInitAdd;
              this.$message.warning('添加成功！');
            } else {
              this.$message.warning(result.returnData.message);
            }
          })
        }
      })
    },
    // 删除单位机构 提交删除
    deleteFxjg: function (item) {
      if (this.currentMenuSeId != '') {
        var deleteDwmc = '';
        for (let i in item.twoZjgs) {
          if (item.twoZjgs[i].dwid == this.currentMenuSeId) {
            deleteDwmc = item.twoZjgs[i].dwmc;
          }
        }
        
        this.$alert('确定要删除“'+deleteDwmc+'”吗？', '删除提醒', {
          confirmButtonText: '确定',
          callback: action => {
            $.post('/dagl/dwjgDelete', {'dwid': this.currentMenuSeId}).then(res => {
              var result = res.returnData;
              if (result.executeResult == '1') {
                this.getDataMenu();
                this.$message.warning('删除成功！');
              } else {
                this.$message.warning(result.returnData.message);
              }
            })
          }
        });
        
      } else {
        this.$message.warning('请选择分支机构');
        
      }
    },
    // 编辑单位机构 弹出修改输入框
    editFxjg: function (item) {
      var _this = this;
      if (_this.currentMenuSeId != '') {

        for (let i in item.twoZjgs) {

          if (item.twoZjgs[i].dwid == _this.currentMenuSeId) {

            $.get("/dagl/dwjgxxCx",{params: {"dwid": item.twoZjgs[i].dwid}}).then((res)=>{

            if(res.returnData.executeResult == '1'){

              _this.formAdd = res.returnData.jgxx;

            }
          });
          }
        }
        
        _this.addTableFlag = true;
        _this.formAdd.sjdwid = item.dwid;
        
      } else {
        _this.$message.warning('请选择分支机构');
        
      }
    },
    // 代码表查询
    dmbCx(){
      var _this = this;
      getData("/dmbgl/dmblbCx", {table_name:'szdayy_d_dwxz'}, function(res) {
        _this.dwlx_dmb = res.returnData.dmblb;
      });
      getData("/dmbgl/dmblbCx", {table_name:'szdayy_d_dwjjlx'}, function(res) {
        _this.dwjjlx_dmb = res.returnData.dmblb;
      });
      
    },
    menuSelect: function (id) {
      this.currentMenuSeId = id;
    },
    // 获取行政区划最后一级传给后台
    handleChange(obj){
      if(obj == 'jydxzqh'){
        this.formAdd.jydxzqh = this.csd_arr[this.csd_arr.length-1]
      }else if(obj == 'hjd'){
        this.formAdd.zcdxzqh = this.hjd_arr[this.hjd_arr.length-1]
      }else if(obj == 'xzz'){
        this.formAdd.xzzxzqh = this.xzz_arr[this.xzz_arr.length-1]
      }
    },
    // 行政区划回显
    xzqh_arr(str,arr){
      var xzqh_dl = str.substring(0,2)+'0000000000';
      var xzqh_zl = str.substring(0,6)+'000000';
      arr.push(xzqh_dl)
      arr.push(xzqh_zl)
      if(str.substring(8,9) != '0'){
        arr.push(str)
      }
    }
  }
};
</script>
<style scoped lang="scss">
.submenu {
  color: red;
}
.menu_level2 {
  position:relative;
}
.menu_level3 {
  padding-left: 40px;
}
.operate {
  float: right;
  margin-right: 25px;
  color: #fff;
}
.pop-handle {
  position: absolute;
  top: 25px;
  right: 20px;
  color: #fff;
  background: #1459A7;
  z-index: 5;
  li {
    padding: 8px 10px;
    font-size: 13px;
    cursor: pointer;
    .iconfont {
      margin-right: 8px;
      font-size: 14px;
    }
  }
  li:hover {
    background: #548ECF;
  }
}
</style>