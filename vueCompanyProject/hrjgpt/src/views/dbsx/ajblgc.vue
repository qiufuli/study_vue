<template>
  <div class="main ajblgc">
    <div class="forms">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="person">立案号：{{lah}}</div>
        </el-col>
        <el-col :span="19">
          <div class="check_title" v-show="dztz">
            <el-button @click="xa()">销案</el-button>
            <el-button @click="ja()">结案</el-button>
            <el-button type="primary" @click="add()">新增调查行为</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="result_table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :header-cell-style="{background:'#27B6C7'}"
        >
          <!-- <el-table-column prop="move" label="调查检查行为" min-width="20%" align="center"></el-table-column> -->
          <el-table-column label="调查检查行为" min-width="20%" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span
                class="btn2-bell-badge"
                v-if="scope.row.ajblztid == '10' || scope.row.ajblztid == '13' || scope.row.ajblztid == '20' ||scope.row.ajblztid == '30' || scope.row.ajblztid == '36'"
              ></span>
              <span class="btn1-bell-badge" v-else></span>
              <span
                class="move_space ajh_class"
                @click="detail(scope.row.wsbm,scope.row.id,scope.row.wsid)"
              >{{ scope.row.wsname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kssj"
            label="创建时间"
            min-width="15%"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="jssj"
            label="到期时间"
            min-width="15%"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="zxsj"
            label="执行时间"
            min-width="15%"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column prop="result" label="执行结果" min-width="20%" align="center"></el-table-column> -->
          <el-table-column label="执行结果" min-width="15%" align="center">
            <template slot-scope="scope">
              <span
                class="result_txt2"
                v-if="scope.row.ajblztid == '10' || scope.row.ajblztid == '13' || scope.row.ajblztid == '20' ||scope.row.ajblztid == '30' || scope.row.ajblztid == '36'"
              >
                <span class="btn-bell-badge2"></span>
                {{ scope.row.ajblzt }}
              </span>
              <span class="result_txt" v-else>
                <span class="btn-bell-badge"></span>
                {{ scope.row.ajblzt }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%" align="center">
            <template slot-scope="scope" align="center">
              <el-button
                type="primary"
                size="mini"
                @click="implement(scope.row)"
                v-if="scope.row.ajblztid == '10'"
                style="margin: 0"
                v-show="dztz"
              >执行</el-button>
              <!-- <span>|</span> -->
              <el-button
                type="primary"
                size="mini"
                @click="delay(scope.row)"
                v-if="scope.row.ajblztid == '10'"
                style="margin: 0"
                v-show="dztz"
              >延期</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="download(scope.row.id)"
                style="margin: 0"
              >下载</el-button>
              <!-- <el-button type="primary" size="mini" @click="check(scope.id)" v-else>查看</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btn">
        <el-button type="primary" class="backC" @click="goBack1()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import "../../common/scss/public.scss";
import $ from "@/common/js/axios";
export default {
  data() {
    return {
      tableData: [],
      lasqbid: "",
      dztz: true,
      lah: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    goBack1() {
      const _disable = this.$route.query.disable;
      if (_disable) {
        this.$router.push({ name: "JaxaCx" });
      } else {
        this.$router.push({ name: "Ajbl" });
      }
    },
    init() {
      if (this.$route.query.lasqbid) {
        this.lasqbid = this.$route.query.lasqbid;
      } else {
        this.lasqbid = sessionStorage.getItem("lasqbid");
      }
      this.LoadOn();
      if (this.$route.query.name == "ajbl") {
        this.dztz = false;
      }
      $({
        url: "/ajbl/ajblcx",
        method: "get",
        params: {
          lasqbid: this.lasqbid
        }
      }).then(res => {
        this.LoadClose();
        var _res = res.returnData;
        if (+_res.executeResult === 1) {
          this.tableData = _res.jcxwlb;
          this.lah = _res.jcxwlb[0].lah;
        } else {
          this.$alert(_res.message, {
            center: true,
            confirmButtonText: "确定"
          });
        }
      });
    },
    detail(name, item, wsid) {
      // 详情 跳转到文书
      this.$router.push({
        name: name,
        query: { id: item, wsid: wsid, wslx: 1 }
      });
    },
    add() {
      // 新增调查行为
      // this.lasqbid  // 跳转到文书
      this.$router.push({ name: "Wsgl", query: { id: this.lasqbid } });
    },
    ja() {
      //结案
      $.get("/wsgl/wstxPd", {
        params: { wsid: "00000000000010", lasqbid: this.lasqbid }
      }).then(res => {
        if (res.returnData.sfkt == "1") {
          this.$router.push({
            name: "ldjg_ws_jabgb",
            query: { id: this.lasqbid, wsid: "00000000000010" }
          });
        } else {
          this.$alert(res.returnData.msg, {
            center: true,
            confirmButtonText: "确定"
          });
          return false;
        }
      });
    },
    xa() {
      //销案
      $.get("/wsgl/wstxPd", {
        params: { wsid: "00000000000009", lasqbid: this.lasqbid }
      }).then(res => {
        if (res.returnData.sfkt == "1") {
          this.$router.push({
            name: "ldjg_ws_cxlaspb",
            query: { id: this.lasqbid, wsid: "00000000000009" }
          });
        } else {
          // this.$router.push({name: 'ldjg_ws_cxlaspb', query: { id: this.lasqbid, wslx: 1}})
          this.$alert(res.returnData.msg, {
            center: true,
            confirmButtonText: "确定"
          });
          return false;
        }
      });
    },
    // 下载功能
    download(item) {
      window.location.href = "wsgl/downloadWs?id=" + item;
    },
    implement(item) {
      //点击执行事件
      this.$confirm("是否执行", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          $({
            url: "/ajbl/zx",
            method: "post",
            data: {
              ajblid: item.ajblid,
              lasqbid: item.lasqbid
            }
          }).then(res => {
            const _res = res.returnData;
            if (+_res.executeResult === 1) {
              this.init();
            } else {
              this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
              });
            }
          });
        })
        .catch(() => {});
    },
    delay(item) {
      this.$router.push({
        name: "Layq",
        query: {
          ajdjbid: item.ajdjbid,
          lasqbid: item.lasqbid,
          disable: true,
          flag: "yq",
          ajblid: item.ajblid
        }
      });
      // 点击延期事件
    }
  }
};
</script>
<style lang="scss">
.ajblgc {
  .check_title {
    height: 40px;
    margin-bottom: 10px;
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
  .btn1-bell-badge,
  .btn2-bell-badge {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid #1daf6f;
    background-color: #ffffff;
    color: #fff;
  }
  .btn2-bell-badge {
    border: 2px solid #ff6d5e;
  }
  .ajh_class {
    text-decoration: underline;
    color: #089fb1;
    cursor: pointer;
    padding-left: 20px;
    margin-left: -20px;
    box-sizing: border-box;
  }
  .el-table .cell {
    position: relative;
  }
  .btn {
    margin: 30px 0;
    text-align: center;
  }
}
/* .ajbl .el-table__body .el-table__row .el-table_3_column_17 {
    text-align: left !important;
  } */

/* .el-table td.is-center, .el-table th.is-center {
    text-align: left !important;
  } */
</style>