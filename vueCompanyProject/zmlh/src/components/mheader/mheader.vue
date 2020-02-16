<docs>
  ## mheader 组件，通用头部组件
  ## props
  * type <index|common> 标题类型
  * title 主标题
  * titleSub 副标题
</docs>
<template>
  <div class="header" :class="type">
    <h3 class="title">{{title}}</h3>
    <!-- <h4 class="title-sub">{{titleSub}}</h4> -->
  </div>
</template>
<script>
export default {
  name: 'mheader',
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    titleSub: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  .header {
    width: $width-100;
    height: 300px;
    color: #fff;
    box-sizing: border-box;
    padding: $padding-base;
    padding-top: 0;
    background: url('~imgs/step-bg.jpg') 0 0 no-repeat;
    background-size: $width-100 300px;
    &.index {
      background: url('~imgs/index-bg.jpg') 0 0 no-repeat;
      background-size: $width-100 300px;
      .title{
        padding: $padding-base 0 $padding-base * 2 / 3  0;
        text-align: center;
        font-size: 60px;
        font-weight: bold;
      }
    }
    &.one_title,&.detail{
      background: url('~imgs/lhjy_tit.png') 0 0 no-repeat;
      background-size: $width-100 300px;
    }
    .title {
      padding-top: 120px;
      font-size: $font-size-ultra;
      line-height: 1;
      // padding: $padding-base 0 $padding-base * 2 / 3  0;
    }
    // .title-sub {
    //   font-size: $font-size-base;
    //   line-height: $font-size-ultra;
    // }
  }
</style>

