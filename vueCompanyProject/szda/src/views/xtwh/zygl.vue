<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px">
        <el-col :span="22">
          <el-breadcrumb-item>权限维护</el-breadcrumb-item>
          <el-breadcrumb-item>功能管理</el-breadcrumb-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="Edits()">新增功能</el-button>
        </el-col>
      </el-breadcrumb>
    </div>
    <div class="common titles">
      <ul class="lists table_row" style="background-color:#fff;overflow:hidden;width:100%;">
        <li class="on" style="width:10%;">序号</li>
        <li class="on" style="width:30%;">名称</li>
        <li class="on" style="width:15%;">功能路径</li>
        <li class="on" style="width:15%;">图片路径</li>
        <li class="on" style="width:10%;">功能类型</li>
        <li class="on" style="width:20%;">操作</li>
      </ul>
      <div class="over_div_con" ref="over_div_con">
      <ul v-for="(item,index) in gnlist" :key="index" class="lists row_class">
        <li style="width:10%;">{{index+1}}</li>
        <li style="width:30%;">{{item.gnmc}}</li>
        <li style="text-align:left;width:15%">{{item.gnlj}}</li>
        <li style="width:15%;">{{item.tblj}}</li>
        <li style="width:10%;">{{item.gnlx == '0' ? '模块' : (item.gnlx == '1' ? '链接' : '功能')}}</li>
        <li style="width:20%;">
          <span class="edits" @click="Editnew(item)" style="cursor:pointer"><i class="iconfont iconbianji1 iconsnew"></i>编辑</span>
          <span class="dels" style="cursor:pointer" @click="Delnew(item.gnid)"><i class="iconfont iconshanchu2 iconsnew"></i>删除</span>
        </li>
        <ul v-for="(item2,index2) in item.childrens" :key="index2" class="twoclass">
          <li style="width:10%;">{{index +1}}-{{index2+1}}</li>
          <li style="width:30%;">{{item2.gnmc}}</li>
          <li style="text-align:left;width:15%">{{item2.gnlj}}</li>
          <li style="width:15%;">{{item2.tblj}}</li>
          <li style="width:10%;">{{item2.gnlx == '0' ? '模块' : (item2.gnlx == '1' ? '链接' : '功能')}}</li>
          <li style="width:20%;">
            <span class="edits" @click="Editnew(item2)"><i class="iconfont iconbianji1 iconsnew"></i>编辑</span>
            <span class="dels" @click="Delnew(item2.gnid)"><i class="iconfont iconshanchu2 iconsnew"></i>删除</span>
          </li>
          <ul v-for="(item3,index3) in item2.childrens" :key="index3" class="threeclass">
            <li style="width:10%;">{{index+1}}-{{index2+1}}-{{index3+1}}</li>
            <li style="width:30%;">{{item3.gnmc}}</li>
            <li style="text-align:left;width:15%">{{item3.gnlj}}</li>
            <li style="width:15%;">{{item3.tblj}}</li>
            <li style="width:10%;">{{item3.gnlx == '0' ? '模块' : (item3.gnlx == '1' ? '链接' : '功能')}}</li>
            <li style="width:20%;">
              <span class="edits" @click="Editnew(item3)"><i class="iconfont iconbianji1 iconsnew"></i>编辑</span>
              <span class="dels" @click="Delnew(item3.gnid)"><i class="iconfont iconshanchu2 iconsnew"></i>删除</span>
            </li>
          </ul>
        </ul>
      </ul>
         
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="title" center :visible.sync="table_flag">
      <el-form :model="xzgn" :rules="rule_xz" ref="ref_jgzy" 
      label-position="right" size="small" label-width="120px">
        <el-form-item label="功能名称：" prop="gnmc">
          <el-input v-model="xzgn.gnmc"></el-input>
        </el-form-item>
        <el-form-item label="上级功能id" prop="fjgnid">
          <el-select v-model="xzgn.fjgnid" @change="Gnlj()">
            <el-option v-for="item in gongneng" :key="item.gnid" :label="item.gnmc" :value="item.gnid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能路径：" prop="gnlj">
          <el-input v-model="xzgn.gnlj"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="功能类型：" prop="gnlx">
              <el-select v-model="xzgn.gnlx" @change="Tblj()">
                <el-option label="模块" value="0"></el-option>
                <el-option label="链接" value="1"></el-option>
                <el-option label="功能" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="序号：" prop="xh">
              <el-input v-model="xzgn.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图标路径：" prop="tblj" v-show="tplj">
          <el-input v-model="xzgn.tblj"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Baocun">保 存</el-button>
        <!-- <el-button @click="transform('ref_jgzy')">重 置</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { validator } from "@/common/js/valid";
import $ from '@/common/js/axios';

export default {
  name: '',
  data() {
    return {
      tableData: [],
      rulesnew: {},
      table_flag: false,
      xzzy: {},
      rule_jg:{},
      gnlist: [],
      gongneng: [],
      xzgn: {
        gnmc: '',
        gnlx: '',
        gnlj: '',
        fjgnid: '',
        tblj: '',
        xh: ''
      },
      rule_xz: {
        gnmc: [{ validator: validator('32,"least","功能名称",false') }],
        gnlx: [{ validator: validator('32,"full","功能类型",false') }],
        gnlj: [{ validator: validator('128,"least","功能路径",false') }],
        fjgnid: [{ validator: validator('32,"full","父级功能id",false') }],
        tblj: [{ validator: validator('128,"least","图标路径",true') }],
        xh: [{ validator: validator('2,"full","序号",false') }]
      },
      title: '新增功能',
      tplj: false,
    }
  },
  created() {
    this.Search();
    this.FatherTree();
  },
  mounted(){
    this.$refs['over_div_con'].style.height = (document.body.clientHeight-66-48-48-78-20)+'px';
  },
  methods: {
    // 显示弹框
    Edits() {
      this.$nextTick(()=>{
        if (this.$refs['ref_jgzy']!==undefined) {
          this.$refs['ref_jgzy'].resetFields();
        }
        this.xzgn ={
        gnmc: '',
        gnlx: '',
        gnlj: '',
        fjgnid: '',
        tblj: '',
        xh: ''
      };
      });
      this.table_flag = true;
      this.title = "新增功能";
      if (this.xzgn.gnlx != '2') {
        this.tplj = true;
      } else {
        this.tplj = false;
      }
    },
    // 表单重置
    // transform(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // 查询所有功能树
    Search() {
      this.LoadOn();
      $.get('/xtwh/gn/listGnTree').then(res => {
        var result = res.returnData;
        if (result.executeResult == '1') {
          this.LoadClose();
          this.gnlist = result.gnlist;
        }
      })
    },
    // 查询父功能树
    FatherTree() {
      $.get('/xtwh/gn/listUpGn').then(res => {
        var result = res.returnData;
        if (result.executeResult == '1') {
          this.gongneng = result.gnlist;
        }
      })
    },
    Tblj() {
      if (this.xzgn.gnlx != '2') {
        this.tplj = true;
      } else {
        this.tplj = false;
      }
    },
    // 根据上级功能ID带回功能路径
    Gnlj() {
      for(var i =0; i < this.gongneng.length; i++) {
        if(this.gongneng[i].gnid == this.xzgn.fjgnid) {
          this.xzgn.gnlj = this.gongneng[i].gnlj
        }
      }
    },
    // 编辑功能
    Editnew(id) {
      this.xzgn= id;
      this.xzgn.gnid = id.gnid;
      this.table_flag = true;
      this.title = "编辑功能";
      if (this.xzgn.gnlx != '2') {
        this.tplj = true;
      } else {
        this.tplj = false;
      }
    },
    // 删除功能
    Delnew(id) {
      this.$confirm('是否删除该功能？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.post('/xtwh/gn/delete', {gnid: id}).then(res => {
          var result = res.returnData;
          if (result.executeResult == '1') {
            this.table_flag = false;
            this.Search();
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        })
      })
    },
    // 保存功能
    Baocun() {
      if (this.xzgn.gnlx == '2') {
        this.rule_xz.tblj = [{ validator: validator('128,"least","图标路径",true') }]
      } else {
        [{ validator: validator('128,"least","图标路径",false') }]
      }
      if (this.xzgn.gnlx == '0') {
        this.rule_xz.fjgnid = [{ validator: validator('32,"full","父级功能id",true') }]
      } else {
        [{ validator: validator('32,"full","父级功能id",false') }]
      }
      if(this.title == '新增功能') {
        this.$refs["ref_jgzy"].validate(valid => {
          if (valid) {
            $.post('/xtwh/gn/add', this.xzgn).then(res => {
              var result = res.returnData;
              if (result.executeResult == '1') {
                this.table_flag = false;
                this.Search();
                this.$message({
                  message: result.message,
                  type: 'success'
                });
              }
            })
          }
        })
      } else {
        this.$refs["ref_jgzy"].validate(valid => {
          if (valid) {
            $.post('/xtwh/gn/update', this.xzgn).then(res => {
              var result = res.returnData;
              if (result.executeResult == '1') {
                this.table_flag = false;
                this.Search();
                this.$message({
                  message: result.message,
                  type: 'success'
                });
              }
            })
          }
        })
      }
    },
  },
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
    background-color: #ffffff;
    color: #015CB1;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  .edits {
    cursor: pointer;
    color: #009CFF;
    margin-right:10px;
    .iconsnew {
      font-size: 14px;
      margin-right: 4px;
    }
  }
  .dels {
    cursor: pointer;
  }
  .complete {
    margin-left: 10px;
    padding-left: 18px;
    background: url('../../assets/images/sq.png') left 0 no-repeat;
    color: #FF9900;
  }
  .row_class {
    margin-bottom: 5px;
    .twoclass {
      padding-bottom: 0;
      li {
        background-color: #eee;
        margin-bottom: 0px;
      }
      .twoLevel {
        padding-left:80px;
      }
    }
    .threeclass {
      li {
        background-color: #fff;
        line-height: 48px;
        margin-bottom: 0px;
      }
    }
  }
}
.csfw {
  margin-left: 50px;
}
.lists {
  li {
    float: left;
    height: 48px;
    line-height: 48px;
    background-color: #ddd;
    text-align: center;
    margin-bottom: 5px;
  }
  .on {
    background-color: #fff;
    margin-bottom: 0;
  }
}
.over_div_con{
   overflow: hidden;
   overflow-y: auto;
   width: 100%;
   height: 500px;
  }
.over_div_con::-webkit-scrollbar {
  width: 8px;
  height: 4px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角 */

.over_div_con::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/

.over_div_con::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #009CFF;
}
</style>