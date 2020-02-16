<docs>
  ## 申请信息查询
  ## props
</docs>
<template>
  <div class="search" v-if="isShow">
    <h3 class="title">我的报告</h3>
    <ul class="item-wrap">
      <li class="item" v-for="(item, index) in list" :key="index" @click="detailCx(item.jyzkid)">
        <div class="item-title-wrap">
          <p class="item-title-text">报告时间：{{item.bgrq}}</p>
        </div>
        <div class="item-detail-wrap">
          <p class="item-detail" >{{item.jyzk}}</p>
        </div>
      </li>
      <li class="cont-item loading" v-show="showLoading">{{loadTxt}}</li>
    </ul>
    <div class="no-text" v-show="list.length===0">暂无数据</div>
  </div>
</template>
<script>
import $ from "@/common/js/axios";
// import MessageCard from "@/components/messageCard/messageCard";

export default {
  // components: { MessageCard },
  name: "search",
  data() {
    return {
      pageNum: 0, //当前页码
      pageSize: 5, //每页加载条数
      pageCount:0, //总页数
      loadTxt:"",
      list: [],
      showLoading:false,
      flag:true,
      isShow:false
    };
  },
  created() {
    this.$nextTick(() => (this.showLoading = false));
  },
  mounted() {
    var self = this;
    self.init();
    window.addEventListener('scroll', this.initEvent);
  },
  methods: {
    // 获取申请列表
    GET_reverseList() {
      var self = this;
       self.pageNum++;
      if(self.pageNum > self.pageCount && self.pageCount != 0) return false;
      this.$loading = true;
      $.get("/jyzk/jyzjjlCx",{params: { pageNum:self.pageNum, pageSize:self.pageSize}})
        .then(res => {
           self.$loading = false;
          if(res.returnData.executeResult == "1"){
            self.pageCount = parseInt(res.pageCount);
            if(self.list.length > 0){
              self.list = self.list.concat(res.returnData.jyzk);
            }else{
              self.list = res.returnData.jyzk;
            }
            if(self.pageNum >= self.pageCount&&self.pageNum!=1){
              self.showLoading = true;
              self.loadTxt = "我也是有底线的";
            }
            self.flag = false;
            self.isShow = true;
          }else{
            this.$alert({
              type: 'warning',
              message: res.returnData.message
            });
          }
        }).finally(() => {
          this.$loading = false;
        });
    },
    init: function(){
      var self = this;
      self.GET_reverseList();
    },
    initEvent: function(){
      var self = this;
      self.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (self.scroll + window.innerHeight+20>= document.documentElement.offsetHeight) {
        if(self.pageNum > self.pageCount){ 
          return false;
        }
        if(!self.flag){
          self.flag = true;
          self.GET_reverseList();
        }
      }
    },
    // 申请详情查询
    detailCx(item) {
      const jyzkid = item;
      this.$router.push({ name: "detail", query: { jyzkid } });
    }
  },
  // created() {
  //   this.GET_reverseList();
  // }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/variable.scss";
.search {
  .no-text {
    width: 984px;
    height: 300px;
    margin: 84px auto 0;
    border: $border;
    background: #fff;
    text-align: center;
    line-height: 300px;
  }
  .title {
    font-size: $font-size-large;
    color: $color-text-title;
    line-height: 1;
    padding: $padding-base;
  }
  .loading{
    color: $color-text-title;
    font-size: $font-size-small;
    text-align: center;
    padding: 20px 0 48px 0;
  }
  .item {
    border: $border;
    background-color: #fff;
    margin-bottom: $margin-base;
    border: $border;
    font-size: $font-size-base;
    .item-title-wrap,
    .item-detail-wrap {
      border-bottom: $border;
      padding: $padding-base;
      color: $color-text-label;
      display: flex;
    }
    .item-title-text{
      // flex: 0 1 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-detail-zt {
      flex: 0 1 30%;
      text-align: right;
      line-height: 2;
      font-size: $font-size-small;
    }
    .zt-btg {
      color: red;
    }
    .zt-dqy {
      color: #98bef6;
    }
    .item-title-btn {
      flex: 0 1 30%;
      color: $color-blue-light;
      text-align: right;
      font-size: $font-size-small;
      &:before {
        content: "\e608";
        font-family: "iconfont";
        font-size: $font-size-large;
        padding-right: 20px;
      }
    }
    
    .item-detail {
      flex: 0 1 70%;
      color: $color-text-title;
      
      padding-left: $padding-base * 2;
      position: relative;
      line-height: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:before {
        position: absolute;
        left: 0;
        top: -35px;
        vertical-align: middle;
        padding-right: 20px;
        color: $color-blue-light;
        content: "\e60c";
        font-family: "iconfont";
        font-size: $font-size-ultra-plus;
      }
    }
  }
  .comments {
    color: $color-warning;
    font-size: $font-size-small;
    margin-left: $margin-base;
    margin-bottom: $margin-base;
  }
}
</style>
