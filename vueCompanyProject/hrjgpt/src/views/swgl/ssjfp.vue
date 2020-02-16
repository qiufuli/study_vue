<template>
  <div>
    <router-view></router-view>
    <el-container>
      <div class="forms">
        <el-row>
          <div class="person">查询条件</div>
        </el-row>
        <el-form :inline="true" status-icon :model="form" label-position="right" label-width="155px" size="medium" style="margin-bottom:20px" class="demo-form-inline">
          <el-row>
            <!-- <el-col class="search">查询条件</el-col> -->
            <el-col :span="10">
              <el-form-item>
                <el-select placeholder="抽查事项" clearable v-model="form.ccsx" style="width:30%;margin:0 10px 0 0">
                  <el-option
                    v-for="item in ccsx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid"
                  :disabled="item.disabled">
                  </el-option>
                </el-select>
                <el-select placeholder="抽查类型" clearable v-model="form.cclx" style="width:30%;margin:0 10px 0 0">
                  <el-option
                    v-for="item in cclx_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
                <el-select placeholder="状态" clearable v-model="form.cczt" style="width:30%">
                  <el-option
                    v-for="item in zt_dmb"
                    :key="item.dmid"
                    :label="item.dmmc"
                    :value="item.dmid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              创建时间
              <el-date-picker size="medium"
                v-model="form.jckssj"
                type="date"
                value-format="yyyy-MM-dd"
                :editable="false"
                :picker-options="pickerOptionsStart"
                placeholder="开始日期" style="width:32%;margin: 0 5px">
              </el-date-picker>至
              <el-date-picker size="medium"
                v-model="form.jcjssj"
                type="date"
                value-format="yyyy-MM-dd"
                :editable="false"
                :picker-options="pickerOptionsEnd"
                placeholder="结束日期" style="width:32%;margin-left: 5px">
              </el-date-picker>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" @click="query(1, 1)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-button type="primary" style="margin-bottom:0" class="xjssjbtn" @click="selectSinger">新建双随机</el-button>
        </el-row>
        <el-row>
          <div class="result_table">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#27B6C7'}">
              <el-table-column width="50"></el-table-column>
              <el-table-column prop="cjsj" label="创建时间" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="cclx" label="抽查类型" min-width="15%" align="center"></el-table-column>
              <el-table-column prop="ccsx" label="抽查事项" min-width="15%" align="center"></el-table-column>
              <el-table-column prop="ccyj" label="抽查依据" min-width="15%" align="center"></el-table-column>
              <el-table-column prop="ccfx" label="抽查方向" min-width="15%" align="center"></el-table-column>
              <el-table-column prop="ccztName" label="状态" min-width="10%" align="center"></el-table-column>
              <el-table-column label="操作" min-width="15%" align="center">
                <template slot-scope="scope" align="center">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="sub(scope.row)"
                    class="btns"
                    v-if="scope.row.cczt != '20'"
                  >分配</el-button>
                  <el-popover
                    placement="left"
                    width="970"
                    offset="100"
                    trigger="click"
                    style="overflow-x:hidden;">
                    <el-table :data="gridData" style="height:500px;overflow-y:auto;" :header-cell-style="{background:'#27B6C7',color:'#fff'}" >
                      <el-table-column width="160" property="bjcdw" label="被检查单位" align="center"></el-table-column>
                      <el-table-column width="130" property="jcdz" label="检查地址" align="center"></el-table-column>
                      <el-table-column width="130" property="frdb" label="法定代表人" align="center"></el-table-column>
                      <el-table-column width="130" property="jcxz" label="监察小组" align="center"></el-table-column>
                      <el-table-column width="130" property="zbjcy" label="主办监察员" align="center"></el-table-column>
                      <el-table-column width="130" property="xbjcy" label="协办监察员" align="center"></el-table-column>
                      <el-table-column width="160" property="scczsj" label="抽查时间" align="center"></el-table-column>
                    </el-table>
                    <el-button
                      type="primary"
                      size="mini"
                      slot="reference"
                      class="btns"
                      @click="looking(scope.row.sjccid)"
                      v-if="scope.row.cczt == '20'"
                    >查看</el-button>
                  </el-popover>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="del(scope.row)"
                    class="btns"
                    v-if="scope.row.cczt != '20'"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <div class="result_button">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            layout=" prev, pager, next, total"
            :total="total"
            :page-size="pageSize"
            prev-text="上一页"
            next-text="下一页"
            v-if="this.total !== 0"
          ></el-pagination>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
// import { validator } from '@/common/js/valid';
import $ from "@/common/js/axios";
import "../../common/scss/public.scss";
import { deepClone, getdmb } from "@/common/js/common";

export default {
  name: "",
  data () {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.jcjssj;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.jckssj;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      total: 0,
      pageNum: 1,
      pageSize: 12,
      form: {
        ccsx: "",
        cclx: "",
        cczt: "",
        jckssj: "",
        jcjssj: "",
        pageNum: 1
      },
      form_page: {
        ccsx: "",
        cclx: "",
        cczt: "",
        jckssj: "",
        jcjssj: "",
        pageNum: ""
      },
      gridData: [],
      options: [],
      tableData: [],
      ccsx_dmb: [],
      cclx_dmb: [],
      zt_dmb: [
        {
          dmid: "10",
          dmmc: "待分配"
        },
        {
          dmid: "20",
          dmmc: "已分配"
        },
        {
          dmid: "30",
          dmmc: "已完成"
        }
      ]
    };
  },
  methods: {
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    query(num, flag) {
      // 分页点击带参数问题处理
      if (flag == 1) {
        this.form_page = deepClone(this.form);
      }
      var _form = this.form_page;
      this.pagenum = num;
      _form.pageNum = num || this.pagenum;
      this.LoadOn();
      $.get("/ssj/sjccxxCx", {params: this.form_page}).then(res => {
      this.LoadClose();
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.tableData = res.returnData.vbs;
          this.total = parseInt(res.rowsCount);
        } else {
          this.tableData = res.returnData.vbs;
          this.total = parseInt(res.rowsCount);
          if (_res.message != "无查询结果") {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        }
      }); 
    },
    // 跳转到新建双随机页面
    selectSinger() {
      this.$router.push({path: "/ssjfp/first"});
    },
    // 分配功能
    sub(id) {
      this.$router.push({name: "Second", query: { id: id.sjccid }});
    },
    // 删除功能
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $.post("/ssj/ssjDelete", {sjccid: id.sjccid}).then(res => {
          var _res = res.returnData;
          if (_res.executeResult == "1") {
            this.$message({
              type: "success",
              center: true,
              message: res.returnMsg
            });
            this.query(1,1);
          } else {
            this.$alert(_res.message, {
              center: true,
              confirmButtonText: "确定"
            });
          }
        });
      });
    },
    // 获取查看详情
    looking(val) {
      $.get('/ssj/ccdwxxCx', {params: {sjccid: val}}).then(res => {
        this.gridData = res.returnData.vbs;
      })
    },
    // 获取代码表
    Search_dmb () {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ccnr", function(res) {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
        _this.ccsx_dmb = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", function(res) {
        // console.log(res);
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
          _this.cclx_dmb = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
  },
  created() {
    this.Search_dmb();
    this.query();
  },
  watch: {
    $route(to, from) {
    // console.log(this.$route.meta);
    }
  },
};
</script>
<style scoped lang="scss">

.person {
  color: #089FB1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
}
button {
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}
.search {
  color: #089FB1;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
  font-weight: 600;
}
.check_top i {
  margin-right: 5px;
}
.last_label {
  margin-left: 28px;
}
.el-form {
  padding-left: 30px;
}
.submit {
  width: 80px;
  height: 30px;
  background: #0a9daf;
  opacity: 0.9;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  float: left;
  margin-left: 50%;
  transform: translate(-50%);
  cursor: pointer;
}

.result_table {
  margin-top: 20px;
}

.el-pagination {
  text-align: center;
  padding: 40px 0;
}
.btns {
  margin: 5px 5px 0;
  padding: 9px 15px;
}
.xjssjbtn{
    width: 125px;
    margin-bottom: 20px;
    height: 36px;
    background: #27B6C7;
    color: #fff;
}
.qiehuan ul {
  margin: 0 !important;
}
.el-button:hover {
  color: none !important;
}
</style>