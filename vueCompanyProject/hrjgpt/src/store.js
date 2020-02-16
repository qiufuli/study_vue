import Vue from "vue";
import Vuex from "vuex";
import $ from "@/common/js/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // namespaced: true,
  state: {
    // 初始化状态
    ajzt_dmb: "",
    djname: "", //登记名称
    djtime: "", // 登记时间 
    djid: "", //登记id
    nq_tsjbzs: "", //投诉举报事项总数
    wq_ajblzs: "", //案件办理总数
    wq_lasqzs: "", //立案申请总数
    wq_xjdjzs: "", //巡检登记总数
    // 下载数据
    download_data: ""
  },
  mutations: {
    // 处理状态
    getdj(state, obj) {
      state[obj._name] = obj.val;
    },
    setdata(state, payload) {

      var aaa = payload.lmb.filter(item => {
        return item.dmmc == "已分配" || item.dmmc == "待审核" || item.dmmc == "审核通过" || item.dmmc == "审核退回";
      });
      state.ajzt_dmb = aaa;
    },
    getzs(state, Obj) {
      state.nq_tsjbzs = Obj.nq_tsjbzs;
      for (var key in Obj) {
        state[key] = Obj[key];
      }
    },
    // 代码下载
    setDownLoad(state, payload) {
      state.download_data = payload.setDown;
    }
  },
  actions: {
    // 获取当前时间和登录人
    getComMes(context) {
      // return new Promise((resolve, reject) => {
      $({
        url: "/dmbgl/dqsj",
        method: "get"
      }).then((res) => {
        context.commit("getdj", {
          _name: "djtime",
          val: res.returnData.rq
        });
        context.commit("getdj", {
          _name: "djname",
          val: res.returnData.username
        });
        context.commit("getdj", {
          _name: "djid",
          val: res.returnData.userid
        });
        // resolve();
      });
      // })

    },
    // 提交改变后的状态
    ajdjzt_dmb(context) {
      $.get("/dmbgl/dmblbCx", {
        params: {
          table_name: "ldjg_d_lczt"
        }
      }).then(res => {
        // console.log(res);
        context.commit("setdata", {
          lmb: res.returnData.dmblb,
        });
      });
    },
  }

});