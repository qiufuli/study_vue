<template>
  <div>
    <div class="forms">
      <el-form
        :model="xcdjForm"
        :rules="rules"
        label-position="right"
        class="demo-ruleForm"
        :inline="true"
        label-width="100px"
        ref="ref_form"
      >
        <el-row>
          <div class="check_top">查询条件</div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="立案号" prop="lah">
              <el-input v-model="xcdjForm.lah"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当事人" prop="dwmc">
              <el-input v-model="xcdjForm.dwmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件来源">
              <el-select v-model="xcdjForm.ajly" value-key="value" clearable>
                <el-option
                  :label="item.dmmc"
                  :value="item.dmid"
                  v-for="item in formdmb.ajly"
                  :key="item.dmid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
          <el-form-item label="案由">
            <el-select v-model="xcdjForm.ay" value-key="value" clearable>
              <el-option
                :label="item.dmmc"
                :value="item.dmid"
                v-for="item in formdmb.ay"
                :key="item.dmid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主办监察员">
            <el-select v-model="xcdjForm.zbjcy" value-key="value" clearable>
              <el-option
                :label="item.xm"
                :value="item.ryid"
                v-for="item in formdmb.zbjcy"
                :key="item.dmid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="协办监察员">
            <el-select v-model="xcdjForm.xbjcy" value-key="value" clearable>
              <el-option
                :label="item.xm"
                :value="item.ryid"
                v-for="item in formdmb.xbjcy"
                :key="item.dmid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="clearfloat">
          <span class="submit" @click="query(1,1)">查询</span>
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
            <el-table-column label="立案号" min-width="10%" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div>{{scope.row.lah}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="当事人"
              min-width="15%"
              :show-overflow-tooltip="true"
              align="center"
              prop="dwmc"
            ></el-table-column>
            <el-table-column prop="ajly" label="案件来源" min-width="18%" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ay" label="案由" min-width="13%" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="zbjcy" label="主办监察员" min-width="12%" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="xbjcy" label="协办监察员" min-width="12%" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="lasj" label="立案时间" min-width="12%" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="审批状态" min-width="10%" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.ajzt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="15%" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope" align="center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="see(scope.row)"
                >查看</el-button>
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
import "../../common/scss/public.scss";
import $ from "@/common/js/axios";
import { validator } from "@/common/js/valid";
import { getdmb,deepClone } from "@/common/js/common";
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
      // 页面涉及到的代码表
      formdmb: {
        ajly: [],
        ay: [],
        zbjcy: [],
        xbjcy: []
      },
      // form表单字段
      xcdjForm: {
        lah: "", //	14,full,立案号,true
        dwmc: "", //	64,full,单位名称,true
        ajly: "", //	2,full,案件登记状态,true（案件来源：ldjg_ajly）
        ay: "", //	2,full,案由,true（案由：ldjg_ay）
        zbjcy: "", //	6,full,主办监察员,true
        xbjcy: "" //	6,full,协办监察员,true
      },
      // form表单存值字段
      xcdjForm_page: {
        lah: "", //	14,full,立案号,true
        dwmc: "", //	64,full,单位名称,true
        ajly: "", //	2,full,案件登记状态,true（案件来源：ldjg_ajly）
        ay: "", //	2,full,案由,true（案由：ldjg_ay）
        zbjcy: "", //	6,full,主办监察员,true
        xbjcy: "" //	6,full,协办监察员,true
      },
      // 表单校验规则
      rules: {
        lah: [{ validator: validator("9, \"full\", \"立案号\", true") }], //	14,full,立案号,true
        dwmc: [{ validator: validator("64, \"full\", \"单位名称\", true") }], //	64,full,单位名称,true
        ajly: [{ validator: validator("2, \"full\", \"案件登记状态\", true") }], //	2,full,案件登记状态,true（案件来源：ldjg_ajly）
        ay: [{ validator: validator("2, \"full\", \"案由\", true") }], //	2,full,案由,true（案由：ldjg_ay）
        zbjcy: [{ validator: validator("6, \"full\", \"主办监察员\", true") }], //	6,full,主办监察员,true
        xbjcy: [{ validator: validator("6, \"full\", \"协办监察员\", true") }] //	6,full,协办监察员,true
      },
      tsjbsx_tableData: []
    };
  },
  created() {
    this.getDmb();
    var _this = this;
    this.$nextTick(()=>{
      _this.query();
    });
  },
  methods: {
    // 分页的相关方法
    handleCurrentChange(val) {
      this.query(val);
    },
    getDmb() {
      getdmb("/dmbgl/dmblbCx", "ldjg_ajly", res => {
        //案件来源
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.formdmb.ajly = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
      getdmb("/dmbgl/dmblbCx", "ldjg_ay", res => {
        // 案由
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.formdmb.ay = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
      getdmb("/dmbgl/ryxxcx", "", res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.formdmb.zbjcy = _res.dmblb;
          this.formdmb.xbjcy = _res.dmblb;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    query(num, flag) {
      this.$refs["ref_form"].validate(valid => {
        if (valid) {
      // 分页点击带参数问题处理
      if (flag == 1) {
        this.xcdjForm_page = deepClone(this.xcdjForm);
      }
      var _form = this.xcdjForm_page;
      this.pageNum = num;
      _form.pageNum = num || this.pageNum;
      this.LoadOn();
      $({
        url: "/ajbl/jaxacx",
        method: "get",
        params: _form
      }).then(res => {
      this.LoadClose();
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.tsjbsx_tableData = res.returnData.jaxalb;
          this.total = parseInt(res.rowsCount);
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      }); }
      });
    },
    // 再立案
    see(item) {
      this.$router.push({name:"Ajblgc",query:{lasqbid:item.lasqbid,disable:true,lasqsp:true,name:"ajbl"}});
    }
  }
};
</script>

<style scoped>
.ajh_class {
  text-decoration: underline;
  color: #089fb1;
  cursor: pointer;
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
</style>

