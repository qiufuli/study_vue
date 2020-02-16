<template>
  <div class="mmcz">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px">
        <el-col :span="24">
          <el-breadcrumb-item>权限维护</el-breadcrumb-item>
          <el-breadcrumb-item>重置密码</el-breadcrumb-item>
        </el-col>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="form" :model="formData" :rules="rules" class="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位名称：" prop="dwmc" class="dajs_ssdw">
              <el-autocomplete
                v-model="formData.dwmc"
                :fetch-suggestions="querySearch2"
                :trigger-on-focus="false"
                @select="handleSelect1"
                @blur="on_blur2"
                style="width: 50%;"
                :title="formData.dwmc"
              ></el-autocomplete>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="操作员姓名：" prop="czyxm">
              <el-input v-model="formData.czyxm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录用户名：" prop="dlyhm">
              <el-input v-model="formData.dlyhm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="btn_parent">
            <el-button type="primary" size="medium" @click="handleSub(1, 1)" class="base_btn">查询</el-button>
            <el-button
              size="medium"
              class="base_btn"
              style="margin-left:20px;"
              @click="form_reset"
            >重置</el-button>
          </div>
        </el-row>
      </el-form>
    </div>
    <!-- 列表信息 -->
    <div class="table_div" v-if="table_flag1">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="xh" label="序号" min-width="7%" align="center"></el-table-column>
        <el-table-column prop="dwmc" label="单位名称" min-width="20%" align="center"></el-table-column>
        <el-table-column prop="czyxm" label="操作员姓名" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="dlyhm" label="登录用户名" min-width="15%" align="center"></el-table-column>
        <el-table-column label="操作" min-width="10%" align="center">
          <template slot-scope="scope">
            <span style="color: #1488f5;cursor: pointer;" @click="reset_mm(scope.row.czyid)">重置</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 单位数据分页 -->
    <el-row class="btn_parent page_style" v-if="dw_flag1">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        layout=" prev, pager, next, total, jumper"
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
import "@/common/scss/common.scss";
import { validator } from "@/common/js/valid";
import $ from "@/common/js/axios";
import { getData, deepClone } from "@/common/js/common";

export default {
  name: "",
  data() {
    return {
      pageNum: 1,
      total: "",
      pageSize: 12,
      formData: { czyxm: "", dwmc: "", dlyhm: "" },
      tableData: [],
      dw_flag1: false,
      table_flag1: false,
      rules: {
        dwmc: [{ validator: validator('128, "less", "单位名称", true') }], 
        czyxm: [{ validator: validator('14, "full", "操作员姓名", true') }],
        dlyhm: [{ validator: validator('10, "full", "登录用户名", true') }]
      }
    };
  },
  created() {},
  methods: {
    handleCurrentChange(val) {
      this.changePageCoreRecordData();
      this.handleSub(val);
    },
    form_reset() {
      //重置
      this.formData = {};
    },
    // x查询
    handleSub(num, flag) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var _this = this;
          if (flag == 1) {
            this.form_data_page = deepClone(this.formData);
          }
          var data = this.form_data_page;
          data.pageNum = num || _this.pageNum;
          getData("/xtwh/czy/selczy", data, function(res) {
            var result = res.returnData;
            if (result.executeResult == "1") {
              if (result.czys.length >= 0) {
                _this.tableData = result.czys;
                _this.dw_flag1 = true;
                _this.table_flag1 = true;
                res.rowsCount == 0
                  ? (_this.dw_flag1 = false)
                  : (_this.total = res.rowsCount);
                for (var i = 0; i < result.czys.length; i++) {
                  //序号赋值
                  _this.tableData[i].xh = parseInt(res.startNum) + i;
                }
              }
            } else {
              this.$message({
                message: result.message,
                type: "warning"
              });
            }
          });
        }
      });
    },
    reset_mm(id) {
      var _id = {czyid : id}
      this.$confirm("确定要重置此用户密码为'0'吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          $({
            url: "/xtwh/czy/czmm",
            method: "post",
            data: _id
          }).then(res => {
            var _data = res.returnData;
            if (+_data.executeResult == 1) {
              this.$message({
                type: "success",
                center: true,
                message: res.returnMsg
              });
            } else {
              this.$alert(_data.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        })
        .catch(() => {});
    },
    querySearch2(queryString, cb) {
      //模糊查询
      var list = [{}];
      $({
        url: "/dafw/cxdw",
        method: "get",
        params: {
          dwmc: this.formData.dwmc
        }
      }).then(res => {
        var _data = res.returnData;
        if (+_data.executeResult == 1) {
          if (_data.dws) {
            if (_data.dws.length == 0) {
              this.$message.error("没有单位信息！");
            }
            for (let i of _data.dws) {
              i.value = i.dwmc; //将想要展示的数据作为value
            }
            list = _data.dws;
            cb(list);
          }
        }
      });
    },
    handleSelect1(item) {
      this.formData.dwid = item.dwid;
      this.formData.dwmc = item.dwmc;
    },
    on_blur2() {
      if (!this.formData.dwid) {
        this.formData.dwmc = "";
      }
      if (!this.formData.dwmc) {
        this.formData.dwid = "";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.formData {
  margin: 10px;
  padding: 10px;
  background-color: #fff;
}
.table_div {
  padding: 0 10px;
}
.el-pagination {
  padding-top: 20px;
}
</style>