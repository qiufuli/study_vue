<docs>
  ## 首页
</docs>
<template>
  <div class="index">
    <mheader type="index" title="灵活就业-就业状况报告"></mheader>
    <!-- 申请须知 开始 -->
    <div class="list">
      <div class="title">
        <h3 class="title-h3">须知</h3>
      </div>
      <div class="content">
        享受人自批准享受灵活就业社会保险补贴次月起，应每三个月通过互联网渠道或街道（乡镇）社会保障事务所，如实报告本人工作内容、工作地点、工作时间和工作收入等灵活就业情况。享受人逾期不报告的，停止其享受灵活就业社会保险补贴。
      </div>
    </div>
    <!-- 申请须知 结束 -->
    <!-- 消息开始 -->
    <div class="notice" @click="xxList">
      <i class="iconfont icon-notice icon-before"></i>
      <p class="content">{{xxnr}}</p>
      <i class="iconfont icon-arrow icon-after"></i>
    </div>
    <!-- 消息 结束 -->
     <!-- 报告记录开始 -->
    <div class="notice" @click="sqList">
      <i class="iconfont icon-tuixiu icon-before"></i>
      <p class="content">{{jyzk.bgrq}}<span :class="jyzk.jyzk == '暂无数据'?'':'jyzk_nr'">{{jyzk.jyzk}}</span></p>
      <i class="iconfont icon-arrow icon-after"></i>
    </div>
    <!-- 报告记录开始结束 -->
    <!-- 申请按钮 开始 -->
    <div class="apply">
      <div class="info">
        <div class="info-cont1" >
          <p class="info-cont1-name">{{grxx.xm}}</p>
          <p class="info-cont1-phone">电话：{{grxx.sjhm}}</p>
        </div>
        <p class="info-cont2">身份证号：{{grxx.sfzhm}}</p>
      </div>
      <div class="apply-btn" @click="reverseBtn">记载</div>
    </div>
  </div>
</template>
<script>
import Mheader from '@/components/mheader/mheader';
import $ from '@/common/js/axios';

export default {
  components: { Mheader },
  name: 'index',
  data() {
    return {
      grxx: {
        sfzhm: '',
        xm: '',
        dh: ''
      },
      jyzk:{
        bgrq:'',
        jyzk:'暂无数据'
      },
      xxnr:''
    };
  },
  methods: {
    // 基本信息查询
    GET_baseInfo() {
      this.$loading = true;
      $.get('/jyzk/jbxxCx').then((res) => {
        const data = res.returnData;
        if(data.xx == ""){
          this.xxnr = "暂无消息"
        }else{
          this.xxnr = data.xx.xxnr;
        }
        this.grxx = data.grxx;
        if(data.jyzk.length!=0){
          this.jyzk.bgrq = data.jyzk[0].bgrq;
          this.jyzk.jyzk = data.jyzk[0].jyzk;
        }
      }).finally(() => {
        this.$loading = false;
      });
    },

    // 报告记录页面跳转
    sqList(){
      if(this.jyzk.jyzk != '暂无数据'){
        this.$router.push({ name: 'search' })
      }
    },
    // 消息列表页面跳转
    xxList(){
      if(this.xxnr != "暂无消息" ){
        this.$router.push({ name: 'infor' })
      }
    },
    // 检查按钮是否可用
    reverseBtn() {
      this.$loading = true;
      $.get('/jyzk/jyzkBcValid').then((res) => {
         const flag = parseInt(res.returnData.executeResult, 10);
       if (flag === 1) {
          this.$router.push({ name: 'reverseOne' });
        }else{
          this.$alert({
            type: 'warning',
            message: res.returnData.message
          });
        }
      }).finally(() => {
        this.$loading = false;
      });
    }
  },
  created() {
    this.GET_baseInfo();
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/variable.scss';

//竖屏  CSS
@media screen and (orientation: portrait) {
  .index {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .apply {
    position: absolute;
    bottom: 0;
  }
}
@media screen and (orientation: landscape) {

//横CSS

}
// 申请须知
.list {
  // margin-top: $margin-base;
  border: $border;
  background-color: #fff;
  .title {
    display: flex;
    padding: 28px 48px;
    border-bottom: $border;
  }
  .title-h3 {
    font-size: $font-size-large;
    color: $color-text-title;
    flex: 1 1 auto;
    line-height: 80px;
  }
  .content {
    padding: 36px 48px;
    font-size: $font-size-base;
    line-height: 70px;
    text-indent: 82px;
  }
}
// 消息提示
.notice {
  padding: 36px 48px;
  // margin-bottom: 240px + $margin-base;
  margin-bottom: $margin-base;
  background-color: #fff;
  border: $border;
  margin-top: $margin-base;
  display: flex;
  align-items: center;
  
  .iconfont {
    font-size: 48px * 1.5;
  }
  .icon-before {
    color: $color-base;
  }
  .icon-after {
    color: $color-text-label;
  }
  .content {
    flex: 1 1 auto;
    padding: 0 30px;
    line-height: 1.5;
    overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  }
  .jyzk_nr{
    margin-left: 48px;
  }
}
// 申请按钮
.apply {

  display: flex;
  width: $width-100;
  margin-top: $margin-base;
  line-height: 1.5;
  .info-cont1 {
    display: flex;
    line-height: 2;
    padding-bottom: $padding-base-half;
    align-items: center;
  }
  .info-cont1-name {
    flex: 1 1 50%;
    font-size: $font-size-large;
    color: $color-text-title;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info-cont1-phone {
    flex: 1 0 65%;
    text-align: right;
    font-size: $font-size-base;
  }
  .info-cont2 {
    font-size: $font-size-base;
  }
  .info {
    width: 75%;
    border: $border;
    border-right: 0;
    background-color: #fff;
    padding: $padding-base/2 $padding-base/2;
  }
  .apply-btn {
    width: 25%;
    background-color: $color-base;
    text-align: center;
    color: #fff;
    height: 240px;
    font-size: $font-size-large;
    line-height: 240px;
  }
}
// messagebox
.material {
  line-height: 1.5;
  .m-title {
    color: $color-base;
    line-height: 2;
  }
  .m-content{
    color: $color-text-primary;
  }
}
</style>
