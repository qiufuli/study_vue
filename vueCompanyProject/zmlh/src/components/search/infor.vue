<docs>
  ## 推送消息查询
  ## props
</docs>
<template>
  <div class="infor" v-if="isShow">
    <div class="infor-wrap" v-for="(item, index) in list" :key="index">
      <p class="infor-date">消息{{index+1}}</p>
      <div class="infor-text-wrap">
        <!-- <p class="infor-text-tit">{{item.sjhm}}</p> -->
        <div class="infor-text-nr">{{item.xxnr}}</div>
      </div>
    </div>
    <div class="cont-item loading" v-show="showLoading">{{loadTxt}}</div>
    <div class="no-text" v-show="list.length===0">暂无数据</div>
  </div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
  name: 'infor',
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
  //如果是点击加载的话注销滚动事件
     window.addEventListener('scroll', this.initEvent);
  },
  methods: {
    // 获取申请列表
    GET_reverseList() {
      var self = this;
      self.pageNum++;
      if(self.pageNum > self.pageCount && self.pageCount != 0) return false;
      this.$loading = true;
      $.get("/jyzk/xxlbCx",{params: { pageNum:self.pageNum, pageSize:self.pageSize}})
        .then(res => {
          self.$loading = false;
          if(res.returnData.executeResult == "1"){
            self.pageCount = parseInt(res.pageCount);
            if(self.list.length > 0){
              self.list = self.list.concat(res.returnData.xxlb);
            }else{
              self.list = res.returnData.xxlb;
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
    // // 获取申请列表
    // GET_reverseList() {
    //   $.get('/jyzk/xxlbCx').then((res) => {
    //     this.list = res.returnData.xxlb;
    //   }).catch(() => {});
    // }
  },
  // created() {
  //   this.GET_reverseList();
  // }
};
</script>
<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  .infor{
    .no-text{
      width: 984px;
      height: 300px;
      margin:84px auto 0;
      border: $border;
      background: #fff;
      text-align: center;
      line-height: 300px;
    }
    .infor-wrap{
      width: 984px;
      margin: auto;
      .infor-date{
        width: 320px;
        height: 66px;
        background: #D3D5DB;
        border-radius:32px;
        margin: 60px auto 40px;
        color: #fff;
        text-align: center;
        line-height: 66px;
      }
      .infor-text-wrap{
        padding: $padding-base;
        box-sizing: border-box;
        border: $border;
        background: #fff;
        .infor-text-tit{
          padding-left: 84px;
          margin-bottom: 46px;
          background: url('~imgs/xx.png') 0 0 no-repeat;
          background-size:48px 48px;
          font-size: $font-size-base;
          font-weight: bold;
          color: $color-text-title;
          line-height: 54px;
        }
        .infor-text-nr{
          font-size: $font-size-base;
          color: $color-text-title;
          line-height: 54px;
          text-indent: 2em;
        }
      }
    }
  }
</style>
