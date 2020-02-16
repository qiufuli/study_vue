<template>
  <div class="main">
    <div class="forms">
      <el-form
        :model="form_data"
        :rules="rules"
        label-width="100px"
        label-position="right"
        :inline="true"
        ref="form_data"
      >
        <el-row>
          <div class="check_top">查询条件</div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="立案号" prop="lah">
              <el-input v-model="form_data.lah"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当事人" prop="dwmc">
              <el-input v-model="form_data.dwmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件来源" prop="ajly">
              <el-select v-model="form_data.ajly" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in form_dmb.ajly"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="案由" prop="ay">
              <el-select v-model="form_data.ay" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in form_dmb.ay"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="lxr">
              <el-input v-model="form_data.lxr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="form_data.lxdh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="立案时间" prop="lasj">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form_data.lasj"
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="主办监察员：" prop="zbjcy">
              <el-select v-model="form_data.zbjcy" clearable>
                <el-option
                  :label="item.xm"
                  :value="item.ryid"
                  v-for="item in form_dmb.zbjcy"
                  :key="item.ryid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row class="page_class">
          <span class="submit" @click="query(1, 1)">查询</span>
        </el-row>
      </el-form>
      <el-row>
        <div class="person">查询结果</div>
      </el-row>
      <el-row class="table_row">
        <el-col :span="2">立案号</el-col>
        <el-col :span="4">当事人</el-col>
        <el-col :span="5">案由</el-col>
        <el-col :span="2">联系人</el-col>
        <el-col :span="3">联系电话</el-col>
        <el-col :span="2">审批状态</el-col>
        <el-col :span="2">立案时间</el-col>
        <el-col :span="4">操作</el-col>
      </el-row>
      <el-row
        :class="index%2 == 0 ?'row_class':'row_class2'"
        v-for="(item,index) in table_data"
        :key="index"
      >
        <el-row v-if="item.index == 1" class="ajh_div">
          <el-col :span="20" class="gg_class">
            <span>案件号:{{item.ajh}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;立案人:{{item.lar}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</span>
            <span>案件来源:{{item.ajly}}</span>
          </el-col>
          <el-col :span="4">
            <el-button size="mini" plain round @click="zla(item)">再立案</el-button>
          </el-col>
        </el-row>

        <el-col :span="2">{{item.lah?item.lah:'--'}}</el-col>
        <el-col :span="4" :title="item.dwmc">{{item.dwmc?item.dwmc:'--'}}</el-col>
        <el-col :span="5" :title="item.ay">{{item.ay?item.ay:'--'}}</el-col>
        <el-col :span="2">{{item.lxr?item.lxr:'--'}}</el-col>
        <el-col :span="3">{{item.lxdh?item.lxdh:'--'}}</el-col>
        <el-col :span="2">{{item.ajzt?item.ajzt:'--'}}</el-col>
        <el-col :span="2">{{item.lasj?item.lasj:'--'}}</el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="ajbl(item)">案件办理</el-button>
        </el-col>
      </el-row>
      <el-row class="zwsj" v-if="this.total == 0">暂无数据</el-row>
      <el-row class="page_class">
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
      </el-row>
    </div>
  </div>
</template>
<script>
import $ from "@/common/js/axios";
import "../../common/scss/public.scss";
import { validator } from "@/common/js/valid";
import {
  getdmb,
  Group,
  deepClone
} from "@/common/js/common";
export default {
  data() {
    var _this = this;
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      pageSize: 12,
      total: 0,
      pageNum: 1, //	无
      form_dmb: {
        ajly: [],
        ay: [],
        zbjcy: []
      },
      form_data: {
        lah: "", //	14,full,立案号,true
        dwmc: "", //	64,full,单位名称,true
        ajly: "", //	2,full,案件登记状态,true（案件来源：ldjg_ajly）
        ay: "", //	2,full,案由,true（案由：ldjg_ay）
        lxr: "", //	32,full,联系人,true
        lxdh: "", //	32,lxdh,联系电话,true
        lasj: "", //	10,rq_8,立案时间,true
        zbjcy: "" //	6,full,主办监察员,true
      },
      form_data_page: {
        lah: "", //	14,full,立案号,true
        dwmc: "", //	64,full,单位名称,true
        ajly: "", //	2,full,案件登记状态,true（案件来源：ldjg_ajly）
        ay: "", //	2,full,案由,true（案由：ldjg_ay）
        lxr: "", //	32,full,联系人,true
        lxdh: "", //	32,lxdh,联系电话,true
        lasj: "", //	10,rq_8,立案时间,true
        zbjcy: "" //	6,full,主办监察员,true
      },
      rules: {
        lah: [{ validator: validator("9, \"full\", \"立案号\", true") }], //	14,full,立案号,true
        dwmc: [{ validator: validator("64, \"full\", \"单位名称\", true") }], //	64,full,单位名称,true
        ajly: [{ validator: validator("2, \"full\", \"案件来源\", true") }], //	2,full,案件登记状态,true（案件来源：ldjg_ajly）
        ay: [{ validator: validator("2, \"full\", \"案由\", true") }], //	2,full,案由,true（案由：ldjg_ay）
        lxr: [{ validator: validator("32, \"full\", \"联系人\", true") }], //	32,full,联系人,true
        lxdh: [{ validator: validator("32, \"number\", \"联系电话\", true") }], //	32,lxdh,联系电话,true
        lasj: [{ validator: validator("10, \"full\", \"立案时间\", true") }], //	10,rq_8,立案时间,true
        zbjcy: [{ validator: validator("6, \"full\", \"主办监察员\", true") }] //	6,full,主办监察员,true
      },
      table_data: []
    };
  },
  created() {
    this.getFormDmb();
    var _this = this;
    this.$nextTick(()=>{
      _this.query();
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.query(val);
    },
    getFormDmb() {
      //获取案件来源代码表
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", res => {
        // console.log(res);
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
        // 循环dmb查询结果当sfky字段=0时下拉不可选
          for(let i in _res.dmblb){
            if(_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
        this.form_dmb.ajly = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
        // this.form_dmb.ajly = res.returnData.dmblb;
      });
      //获取案由代码表
      getdmb("/dmbgl/dmblbCx", "ldjg_ay", res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
        this.form_dmb.ay = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
      // 主办检查员
      // $({
      //   url: "/dmbgl/ryxxcx",
      //   method: "get",
      //   params: {
      //     ryid: ""
      //   }
      // }).then(res => {
      //   var _res = res.returnData;
      //   if (+_res.executeResult === 1) {
      //     this.form_dmb.zbjcy = _res.dmblb;
      //   } else {
      //     this.$alert(_res.message, {
      //       center: true,
      //       confirmButtonText: "确定"
      //     });
      //   }
      // });
    },
    // 查询
    query(num, flag) {
      this.$refs["form_data"].validate(valid => {
        if (valid) {
      if (flag == 1) {
        this.form_data_page = deepClone(this.form_data);
      }
      var _form = this.form_data_page;
      _form.pageNum = num || this.pageNum;
      this.LoadOn();
      this.dbNum();
      $({
        url: "/ajbl/ajlbcx",
        method: "get",
        params: _form
      }).then(res => {
      this.LoadClose();
        // console.log(res);
        var _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.table_data = Group(_res.ajxxlb);
          this.total = parseInt(res.rowsCount);
          this.pageNum = parseInt(res.startNum);
        } else {
          (this.table_data = []), (this.total = 0);
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
      }
      });
    },
    // 案件办理
    ajbl(item) {
      var lasqbid = item.lasqbid;
      sessionStorage.setItem('lasqbid', item.lasqbid);
      this.$router.push({ name: "Ajblgc", query: { lasqbid: lasqbid } });
    },
    // 再立案
    zla(item) {
      this.$confirm("是否再立案", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          $({
            url: "/lasp/laqspSp",
            method: "post",
            data: {
              ajdjbid: item.ajdjbid,
              ajh: item.ajh,
              ajzt: "31"
            }
          }).then(res => {
            var _res = res.returnData;
            if (+_res.executeResult === 1) {
              var lasqbid = _res.lasqbid;
              this.$router.push({ name: "Ladj", query: { lasqbid: lasqbid } });
            } else {
              this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped lang="scss">
.check_title {
  height: 40px;
}
.check_title h5 {
  float: left;
  margin-left: 50px;
}

.check_title .el-button {
  float: right;
  margin: 0 10px;
}

.result_txt {
  position: relative;
  left: 5px;
  color: #1daf6f;
}
.result_txt2 {
  left: 5px;
  position: relative;
  color: #ff6d5e;
}
.btn-bell-badge {
  position: absolute;
  left: -15px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #1daf6f;
  color: #fff;
}
.btn-bell-badge2 {
  position: absolute;
  left: -15px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #ff6d5e;
  color: #fff;
}

.move_txt {
  position: relative;
}

.btn1-bell-badge {
  position: absolute;
  left: -30px;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: 8px;
  border: 2px solid #1daf6f;
  color: #fff;
}
.btn2-bell-badge {
  position: absolute;
  left: -30px;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: 8px;
  border: 2px solid #ff6d5e;
  color: #fff;
}
.table_row {
  background-color: #27b6c7;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding: 20px 0;
}
.row_class,
.row_class2 {
  background-color: #ffffff;
  color: #606266;
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
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

.gg_class {
  display: block;
  background: #68dbe645;
  border-radius: 20px;
  font-size: 12px;
  color: #9f9a9a;
  margin-top: 7px;
  .nBorder {
    border-right: none;
  }
  span {
    float: left;
    margin-left: 20px;
  }
}
.el-button--mini {
  padding: 7px 10px;
}
.ajh_div {
  margin: 0 0 10px 0;
}
.el-select, .el-input{
  width: 200px;
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
</style>