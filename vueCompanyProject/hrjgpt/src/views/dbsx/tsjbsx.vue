<template>
  <div>
    <div class="tsjb_content forms">
      <el-form
        :model="xcdjForm"
        :rules="rules"
        label-position="right"
        class="demo-ruleForm"
        :inline="true"
        label-width="120px"
        ref="xcdjForm"
      >
        <el-row>
          <div class="check_top">查询条件</div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件号" prop="ajh">
              <el-input v-model="xcdjForm.ajh" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被投诉(举报)人" prop="dwmc">
              <el-input v-model="xcdjForm.dwmc" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投诉人电话" prop="tsrlxdh">
              <el-input v-model="xcdjForm.tsrlxdh" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="审批状态" prop="ajzt">
              <el-select v-model="xcdjForm.ajzt" value-key="value" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in formdmb.ajzt_dmb"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投诉时间" value-key="value" prop="tsjbsj">
              <el-date-picker
                type="date"
                v-model="xcdjForm.tsjbsj"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions0"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- <el-form-item label="登记人" prop="djr">
            <el-select v-model="xcdjForm.djr" value-key="value" clearable>
              <el-option
                :label="item.dmmc"
                :value="item.dmid"
                v-for="item in formdmb.djr_dmb"
                :key="item.dmid"
              ></el-option>
            </el-select>
            </el-form-item>-->
            <el-form-item label="经营办公地址" prop="jyhbgdz">
              <el-input v-model="xcdjForm.jyhbgdz" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="clearfloat">
            <span class="submit" @click="check(1,1)">查询</span>
          </el-col>
        </el-row>
      </el-form>
      <!-- 查询结果table列表 -->
      <div class="tsjbsx_table">
        <el-row>
          <div class="person">查询结果</div>
        </el-row>
        <div class="result_table">
          <el-table
            :data="tsjbsx_tableData"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#27B6C7'}"
          >
            <el-table-column label="案件号" min-width="10%" align="center">
              <template slot-scope="scope">
                <div class="ajh_class" @click="see(scope.row, true)">{{scope.row.ajh}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="被投诉(举报)人"
              min-width="15%"
              :show-overflow-tooltip="true"
              align="center"
              prop="dwmc"
            ></el-table-column>
            <el-table-column
              prop="jyhbgdz"
              label="经营办公地址"
              min-width="10%"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="tsrlxdh"
              label="投诉人电话"
              min-width="13%"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="tsjbsj"
              label="投诉时间"
              min-width="12%"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column label="审批状态" min-width="10%" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.ajzt | zt(spzt_dmb) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="djr"
              label="登记人"
              min-width="10%"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="djsj"
              label="登记时间"
              min-width="10%"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <template slot-scope="scope" align="center">
                <el-button
                  type="primary"
                  size="mini"
                  v-if="scope.row.ajzt == '00'"
                  @click="golink(scope.row,false)"
                  class="bt1"
                >完善</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  v-if="scope.row.ajzt == '00'"
                  @click="del(scope.row)"
                  class="bt2"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
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
  </div>
</template>

<script>
import $ from "@/common/js/axios";
// import dateFormat from "@/common/js/utils";
import "../../common/scss/public.scss";
// import { mapActions, mapState } from "vuex";
import { validator } from "@/common/js/valid";
import { deepClone } from "@/common/js/common";
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
      pageNum: 1,
      spzt_dmb: "", //审批状态代码表(全) 过滤用的
      // 页面涉及到的代码表
      formdmb: {
        djr_dmb: [],
        ajzt_dmb: []
      },
      // form表单字段
      xcdjForm: {
        ajh: "",
        dwmc: "",
        ajzt: "",
        jyhbgdz: "",
        tsjbsj: "",
        djr: "",
        tsrlxdh: ""
      },
      // form表单存值字段
      xcdjForm_page: {
        ajh: "",
        dwmc: "",
        ajzt: "",
        jyhbgdz: "",
        tsjbsj: "",
        djr: "",
        tsrlxdh: ""
      },
      // 表单校验规则
      rules: {
        ajh: [{ validator: validator('9, "full", "案件号", true') }],
        dwmc: [{ validator: validator('64, "full", "当事人", true') }],
        ajzt: [{ validator: validator('2, "full", "审批状态", true') }],
        jyhbgdz: [
          { validator: validator('256, "full", "经营办公地址", true') }
        ],
        tsjbsj: [{ type: "string", message: "投诉举报时间", trigger: "blur" }],
        tsrlxdh: [
          { validator: validator('32, "number", "投诉人/举报人电话", true') }
        ],
        djr: [{ validator: validator('6, "full", "登记人", true') }]
      },
      tsjbsx_tableData: []
    };
  },
  created() {
    var _this = this;
    this.$nextTick(() => {
      _this.check();
    });
    this.select_dmb(); //审批状态代码表
    // this.select_djr();//登记人代码表
  },
  methods: {
    handleCurrentChange(val) {
      this.check(val);
    },
    // 点击查询
    check(num, flag) {
      this.$refs["xcdjForm"].validate(valid => {
        if (valid) {
          // 分页点击带参数问题处理
          if (flag == 1) {
            this.xcdjForm_page = deepClone(this.xcdjForm);
          }
          var _form = this.xcdjForm_page;
          _form.pageNum = num || this.pageNum;
          this.LoadOn();
          this.dbNum();
          $({
            url: "/nqdj/ajxxlbcx",
            method: "get",
            params: _form
          }).then(res => {
            this.LoadClose();
            const _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.tsjbsx_tableData = res.returnData.ajdjlbxx;
              this.total = parseInt(res.rowsCount);
              this.pageNum = num;
            } else {
              this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        }
      });
    },
    see(item, disable) {
      if (item.ajzt == 31 || item.ajzt == 32) {
        this.$router.push({
          name: "NqdjXqxs",
          query: {
            ajdjbid: item.ajdjbid,
            ajh: item.ajh,
            disable: disable,
            flag_sh: "sh"
          }
        });
      } else {
        this.$router.push({
          name: "NqdjXqxs",
          query: { ajdjbid: item.ajdjbid, ajh: item.ajh, disable: disable }
        });
      }
    },
    golink(item, disable) {
      this.$router.push({
        name: "NqdjXqxs",
        query: { ajdjbid: item.ajdjbid, ajh: item.ajh, disable: disable }
      });
    },
    // 审批状态代码表
    select_dmb() {
      $.get("/dmbgl/dmblbCx", {
        params: {
          table_name: "ldjg_d_lczt"
        }
      }).then(res => {
        this.spzt_dmb = res.returnData.dmblb;
        var aaa = res.returnData.dmblb.filter(item => {
          // return item.dmmc == "已分配" || item.dmmc == "待审核";
          return (
            item.dmmc == "已保存" ||
            item.dmmc == "审核通过" ||
            item.dmmc == "审核退回" ||
            item.dmmc == "已提交"
          );
        });
        this.formdmb.ajzt_dmb = aaa;
        return aaa;
      });
    },
    // 删除
    del(item) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $({
            url: "/nqdj/ajsc",
            method: "post",
            data: {
              ajdjbid: item.ajdjbid,
              ajh: item.ajh
            }
          }).then(res => {
            var _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.check();
              this.$message({
                type: "success",
                center: true,
                message: res.returnMsg
              });
              this.dbNum();
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

<style scoped>
.el-input {
  width: 200px !important;
}
.el-form--inline .el-form-item__content {
  width: 200px !important;
}
.el-select {
  width: 200px;
}
.ajh_class {
  text-decoration: underline;
  color: #089fb1;
  cursor: pointer;
}
.check_top i {
  margin-right: 5px;
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
.el-pagination {
  text-align: center;
  padding: 40px 0;
}
.el-button {
  margin-left: 0 !important;
}
.bt1,
.bt2 {
  margin: 5px 5px 0;
}
</style>
