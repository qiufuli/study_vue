<template>
  <div>
    <div class="forms">
      <div class="check_top">
        <span>查询条件</span>
      </div>
      <el-form
        :rules="rules"
        :model="xcdjForm"
        ref="xcdjForm"
        label-position="right"
        class="demo-ruleForm"
        :inline="true"
        label-width="110px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件号" prop="ajh">
              <el-input v-model="xcdjForm.ajh" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查内容" prop="ccsx">
              <!-- <i class="icon-ali-xiajiantou"></i> -->
              <el-select v-model="xcdjForm.ccsx" value-key="value" placeholder="请选择" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ccnr_dmbb"
                  :key="item.dmid"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现场检查日期" prop="tsjbsj">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                v-model="xcdjForm.tsjbsj"
                placeholder="选择日期"
                :picker-options="pickerOptionsStart"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="被检查单位/人" prop="dwmc">
              <el-input v-model="xcdjForm.dwmc" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审批状态" prop="ajzt">
              <el-select v-model="xcdjForm.ajzt" value-key="value" placeholder="请选择" clearable>
                <!-- <el-option></el-option> -->
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in ajzt_dmb"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
        <el-form-item label="主办监察员：" prop="zbjcy">
          <el-select v-model="xcdjForm.zbjcy" value-key="value" placeholder="请选择" clearable>
            <el-option
              :label="item.xm"
              :value="item.ryid"
              v-for="item in zbjcy_dmbb"
              :key="item.ryid"
            ></el-option>
          </el-select>
        </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="案件来源" prop="ajly">
              <!-- <i class="icon-ali-xiajiantou"></i> -->
              <el-select v-model="xcdjForm.ajly" value-key="value" placeholder="请选择" clearable>
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
          <el-col :span="24">
            <span class="submit" @click="getlist(1,1)">查询</span>
          </el-col>
        </el-row>
      </el-form>

      <div class="xjdjsx_table">
        <div class="check_top">
          <i class="icon-ali-wenben"></i>
          <span>查询结果</span>
        </div>
        <div class="result_table">
          <el-table
            :data="xjdjsx_table"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#27B6C7'}"
          >
            <el-table-column label="案件号" min-width="12%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="jcdw_class" @click="see(scope.row, 'true')">{{scope.row.ajh}}</span>
              </template>
            </el-table-column>
            <el-table-column label="被检查单位/人" min-width="12%" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.bjcdw }}</span>
              </template>
            </el-table-column>
            <el-table-column label="案件来源" min-width="8%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.ajly | ly(ajly_dmbb) }}</span> -->
                <span>{{ scope.row.ajly }}</span>
              </template>
            </el-table-column>
            <el-table-column label="检查内容" min-width="15%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.ccsx">
                  <span v-for="(item,i) in scope.row.ccsx" :key="i" class="p">{{item}}</span>
                </div>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column label="到达现场时间" min-width="11%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.jckssj ? scope.row.jckssj : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="离开现场时间" min-width="11%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.jcjssj ? scope.row.jcjssj : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="主办监察员" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span>{{ scope.row.zbjcy | zbr(people) }}</span> -->
                <span>{{ scope.row.zbjcy ? scope.row.zbjcy : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="协办监察员" min-width="10%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.xbjcy ? scope.row.xbjcy : "--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审批状态" min-width="8%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.ajzt | zt(ajzt_dmb) }}</span>
                <!-- <span>{{ scope.row.ajzt }}</span> -->
              </template>
            </el-table-column>
            <!-- <el-table-column prop="djr" label="登记人" min-width="10%" align="center" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="登记人" min-width="9%" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.djr?scope.row.djr:"--" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <template slot-scope="scope" align="center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="link(scope.row.ajdjbid, 'false')"
                  v-if="scope.row.ajzt == '10'"
                >提交</el-button>
                <!-- <span>|</span> -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="del(scope.row.ajdjbid,scope.row.ajh)"
                  v-if="scope.row.ajzt == '10'"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      <!-- </div> -->
    </div>
  </div>
</template>

<script scoped>
import $ from "@/common/js/axios";
import { mapActions, mapState } from "vuex";
import { validator } from "@/common/js/valid";
import { deepClone, getdmb } from "@/common/js/common";
export default {
  data() {
    var _this = this;
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          return time.getTime() > new Date(_this.$store.state.djtime).getTime();
        }
      },
      // 主办人
      arrNeirong: "",
      people: "",
      total: Number(0),
      pagenum: 1,
      pageSize: 12,
      ajly_dmbb: "", // "",
      ccnr_dmbb: "", //抽查内容
      // zbjcy_dmbb: "",
      xcdjForm: {
        ajh: "", // "案件号",
        ccsx: "", // "抽查内容",
        tsjbsj: "",
        dwmc: "", // "单位名称",
        ajzt: "", // "案件登记状态",
        zbjcy: "", // "full",
        ajly: "", // "案件来源",
        pageNum: 1 // ""
      },
      xcdjForm_page: {
        ajh: "", // "案件号",
        ccsx: "", // "抽查内容",
        tsjbsj: "",
        dwmc: "", // "单位名称",
        ajzt: "", // "案件登记状态",
        zbjcy: "", // "full",
        ajly: "", // "案件来源",
        pageNum: 1 // ""
      },
      xjdjsx_table: [
        {
          ajdjbid: "", //  案件登记id
          ajh: "", //  案件号
          bjcdw: "", //  被检查单位
          ajly: "", //  案件来源（ldjg_ajly）
          ccsx: "", //  抽查内容(ldjg_ay)
          jckssj: "", //  到达现场时间
          jcjssj: "", //  离开现场时间
          zbjcy: "", //  主办监察员
          xbjcy: "", //  协办监察员
          ajzt: "", //  巡检事项状态（ldjg_ajzt）
          djr: "" //  登记人
        }
      ],
      rules: {
        ajh: [{ validator: validator('9, "full", "案件号", true') }],
        ccsx: [{ validator: validator('50, "full", "检查内容", true') }],
        tsjbsj: [
          {
            type: "string",
            required: false,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        dwmc: [{ validator: validator('13, "full", "当事人", true') }],
        ajzt: [{ validator: validator('13, "full", "审批状态", true') }],
        zbjcy: [{ validator: validator('13, "full", "主办监察员", true') }],
        ajly: [{ validator: validator('2, "full", "案件来源", true') }]
      }
    };
  },
  computed: {
    ...mapState(["ajzt_dmb"])
  },
  methods: {
    ...mapActions(["ajdjzt_dmb"]),
    del(id, num) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $.post("/wqdj/wqajSave", {
            flag: 2,
            ajdjbid: id,
            ajh: num
          }).then(res => {
            // console.log(res);
            if (res.returnData.executeResult == 1) {
              this.$message({
                type: "success",
                center: true,
                message: res.returnMsg
              });
              this.dbNum();
              this.getlist();
            } else {
              this.$message.warning(res.returnMsg);
            }
          });
        })
        .catch(() => {});
    },
    // 点击查询
    getlist(num, flag) {
      this.$refs["xcdjForm"].validate(valid => {
        if (valid) {
          // 分页点击带参数问题处理
          if (flag == 1) {
            this.xcdjForm_page = deepClone(this.xcdjForm);
          }
          var _form = this.xcdjForm_page;
          _form.pageNum = num || this.pagenum;
          this.LoadOn();
          this.dbNum();
          $({
            url: "/wqdj/wqajCx",
            method: "get",
            params: _form
          }).then(res => {
            this.LoadClose();
            // console.log(res);
            const _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.xjdjsx_table = res.returnData.vbs;
              this.xjdjsx_table.map(item => {
                if (item.ccsx !== null) {
                  item.ccsx = item.ccsx.split(",");
                }
              });
              this.total = parseInt(res.rowsCount);
              this.pagenum = num;
            } else {
              (this.xjdjsx_table = []), (this.total = 0);
            }
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.getlist(val);
    },
    see(id, disable) {
      if (id.ajzt > 20) {
        this.$router.push({
          name: "Bjxjdj",
          query: {
            ajdjbid: id.ajdjbid,
            flag_sh: "sh",
            disable: disable,
            xjdjsx: true
          }
        });
      } else {
        this.$router.push({
          name: "Bjxjdj",
          query: { ajdjbid: id.ajdjbid, disable: disable, xjdjsx: true }
        });
      }
    },
    // 提交
    link(id, disable) {
      this.$router.push({
        name: "Bjxjdj",
        query: { ajdjbid: id, disable: disable }
      });
    },

    // 案件来源
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
    // 抽查内容
    ccnr_dmb() {
      var _this = this;
      getdmb("/dmbgl/dmblbCx", "ldjg_d_ccnr", function(res) {
        // console.log(res);
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          // 循环dmb查询结果当sfky字段=0时下拉不可选
          for (let i in _res.dmblb) {
            if (_res.dmblb[i].sfky == 0) {
              _res.dmblb[i].disabled = true;
            }
          }
          _this.ccnr_dmbb = res.returnData.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    // 主办人
    zbr_dmb() {
      var _this = this;
      getdmb("/dmbgl/ryxxcx", "", function(res) {
        _this.people = res.returnData.dmblb;
      });
    }
  },
  created() {
    var _this = this;
    this.$nextTick(() => {
      _this.getlist();
    });

    // this.zbjcy_select();
    // 案件来源
    this.ajly_dmb();
    this.ccnr_dmb();
    this.ajdjzt_dmb();
    this.zbr_dmb();
  }
};
</script>

<style scoped>
.p {
  margin: 0;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.jcdw_class {
  text-decoration: underline;
  color: #089fb1;
  cursor: pointer;
}
.el-button {
  margin: 5px 5px 0 5px !important;
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
.el-select {
  width: 200px;
}
</style>

