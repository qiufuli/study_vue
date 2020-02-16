<template>
  <div class="forms">
    <div class="check">
      <div class="check_top">
        <span>查询条件</span>
      </div>

      <el-form
        :rules="rules"
        :inline="true"
        label-position="right"
        :model="formInline"
        label-width="120px"
        ref="laspForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件号" prop="ajh">
              <el-input v-model="formInline.ajh" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当事人" prop="bjcdw">
              <el-input v-model="formInline.bjcdw" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件来源" prop="ajly">
              <el-select v-model="formInline.ajly" value-key="value" placeholder="请选择" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ajly_dmbb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="审批状态" prop="ajzt">
              <el-select v-model="formInline.ajzt" value-key="value" placeholder="请选择" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ajzt_dmbb"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="submit" @click="query(1, 1)">查询</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="check_result">
      <div class="check_top">
        <i class="icon-ali-wenben"></i>
        <span>查询结果</span>
      </div>
      <div class="result_table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :header-cell-style="{background:'#27B6C7'}"
        >
          <el-table-column label="案件号" min-width="10%" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span class="jcdw_class" @click="see(scope.row, true)">{{ scope.row.ajh }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bjcdw"
            label="当事人"
            min-width="10%"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="案件来源" min-width="10%" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.ajly | ly(ajly_dmbb) }}</span> -->
              <span>{{ scope.row.ajly }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主办监察员" min-width="10%" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.zbjcy | zbr(zbjcy_dmbb) }}</span> -->
              <span>{{ scope.row.zbjcy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="协办监察员" min-width="10%" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.xbjcy | zbr(zbjcy_dmbb) }}</span> -->
              <span>{{ scope.row.xbjcy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审批状态" min-width="10%" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.ajzt | zt(ajzt_dmbb) }}</span>
              <!-- <span>{{ scope.row.ajzt }}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="10%" align="center">
            <template slot-scope="scope" align="center">
              <el-button
                type="primary"
                size="mini"
                @click="link(scope.row.lasqbid, false)"
                v-if="scope.row.ajzt === '31' && name === scope.row.zbjcy"
              >提交</el-button>
              <!-- <span>|</span> -->
              <!-- <el-button type="primary" size="mini" @click="del(scope.id)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="pageSize"
      layout=" prev, pager, next, total"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
      v-if="this.total !== 0"
    ></el-pagination>
  </div>
</template>

<script>
import "../../common/scss/public.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { deepClone, getdmb } from "@/common/js/common";
export default {
  data() {
    return {
      // 判断主办人控制名
      name: "",
      pageNum: 1,
      // 表单数据
      formInline: {
        ajh: "", //	选填	14,full,案件号,true
        bjcdw: "", //	选填	64,full,单位名称,true
        ajly: "", //	选填	2,full,案件来源,true（ldjg_ajly）
        xbjcy: "", //选填	  6,full,协办监察员,true
        zbjcy: "", //	选填	6,,full,主办监察员,true
        ajzt: "", //	选填	2,full,案件登记状态,true
        pageNum: 1
      },
      formInline_page: {
        ajh: "", //	选填	14,full,案件号,true
        bjcdw: "", //	选填	64,full,单位名称,true
        ajly: "", //	选填	2,full,案件来源,true（ldjg_ajly）
        xbjcy: "", //选填	  6,full,协办监察员,true
        zbjcy: "", //	选填	6,,full,主办监察员,true
        ajzt: "", //	选填	2,full,案件登记状态,true
        pageNum: 1
      },
      // 表格数据

      tableData: [
        {
          ajdjbid: "", //类型：String  必有字段  备注：案件登记id
          ajh: "", //类型：String  必有字段  备注：案件号
          bjcdw: "", //类型：String  必有字段  备注：被检查单位
          ajly: "", //类型：String  必有字段  备注：案件来源（ldjg_ajly）
          // ccsx: "", //类型：String  必有字段  备注：抽查内容(ldjg_ay)
          // jckssj: "", //类型：String  必有字段  备注：到达现场时间
          // jcjssj: "", //类型：String  必有字段  备注：离开现场时间
          zbjcy: "", //类型：String  必有字段  备注：主办监察员
          xbjcy: "", //类型：String  必有字段  备注：协办监察员
          ajzt: "" //类型：String  必有字段  备注：巡检事项状态（ldjg_ajzt）
          // djr: "" //类型：String  必有字段  备注：登记人
        }
      ],
      pagenum: "",

      //分页
      total: 0,
      pageSize: 12,
      //代码表
      ajly_dmbb: "", //案件来源
      ajzt_dmbb: "", //状态
      zbjcy_dmbb: "", //主办
      xbjcy_dmbb: "", //协办
      // 校验
      rules: {
        ajh: [{ validator: validator("9, \"full\", \"案件号\", true") }],
        ajly: [{ validator: validator("2, \"full\", \"案件来源\", true") }],
        bjcdw: [{ validator: validator("64, \"full\", \"单位名称\", true") }],
        zbjcy: [{ validator: validator("6, \"full\", \"主办监察员\", true") }],
        xbjcy: [{ validator: validator("6, \"full\", \"抽查事项\", true") }],
        ajzt: [{ validator: validator("13, \"full\", \"案件状态\", true") }]
      }
    };
  },
  methods: {
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    getGoodsCate() {},
    // 点击查询
    query(num, flag) {
      this.$refs["laspForm"].validate(valid => {
        if (valid) {
          // 分页点击带参数问题处理
          if (flag == 1) {
            this.formInline_page = deepClone(this.formInline);
          }
          var _form = this.formInline_page;
          _form.pageNum = num || this.pageNum;
          this.LoadOn();
          this.dbNum();
          $({
            url: "/lasp/lasqCx",
            method: "get",
            params: _form
          }).then(res => {
          this.LoadClose();
            // console.log(res);
            const _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.tableData = res.returnData.vbs;
              // this.tableData = Group(_res.vbs);
              this.total = parseInt(res.rowsCount);
              this.pagenum = num;
              // 主办人权限控制操作按钮
              this.name = this.$store.state.djname;
            } else {
              (this.tableData = []), (this.total = 0);
            }
          });
        }
      });
    },
    // 来源
    ajly_dmb() {
      var _this = this;
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
          _this.ajly_dmbb = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    //主办人
    zbjcy_dmb() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        // console.log(res);
        _this.zbjcy_dmbb = res.returnData.dmblb;
        _this.xbjcy_dmbb = res.returnData.dmblb;
      });
    },
    //状态
    ajzt_dmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_lczt", function(res) {
        // console.log(res);
        var ajzt_dmblb = res.returnData.dmblb.filter(item => {
          return (
            item.dmid == "31" ||
            item.dmid == "40" ||
            item.dmid == "42" ||
            item.dmid == "43"
          );
        });
        _this.ajzt_dmbb = ajzt_dmblb;
      });
    },
    //提交跳转
    see(id, num) {
      // console.log(id);
      if (id.ajzt > 40) {
        this.$router.push({
          name: "Ladj",
          query: { lasqbid: id.lasqbid, disable: true, flag: "sp", flag_sh:'sh', lasqsp: num }
        });
      } else {
        this.$router.push({
          name: "Ladj",
          query: { lasqbid: id.lasqbid, disable: true, flag_sh: "sh", lasqsp: num }
        });
      }
    },
    link(id) {
      this.$router.push({
        name: "Ladj",
        query: { lasqbid: id, disable: false }
      });
    }
  },
  created() {
    var _this = this;
    this.$nextTick(() => {
      _this.query();
    });
    // 来源
    this.ajly_dmb();
    //主办
    this.zbjcy_dmb();
    // 状态
    this.ajzt_dmb();
    // getdmb( this.ajly_dmbb)
  }
};
</script>
<style scoped>
.jcdw_class {
  text-decoration: underline;
  color: #089fb1;
  cursor: pointer;
}
.check_top i {
  margin-right: 5px;
}
.last_label {
  margin-left: 15px;
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
</style>
