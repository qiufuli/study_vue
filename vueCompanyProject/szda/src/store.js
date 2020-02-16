import Vue from "vue";
import Vuex from "vuex";
import $ from "@/common/js/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cur: '',
  },
  mutations: {
    changeValue(state, newVal) {
      state.cur = newVal
    }
  },
  actions: {}

});