<docs>
  ## 详显信息流
</docs>
<template>
  <div class="card">
    <div class="info">
      <i class="top"></i>
      <p class="text" v-html="text"></p>
      <i class="bottom"></i>
    </div>
    <div class="img-wrapper">
      <img v-lazy="item"
      class="image" alt="" v-for="(item, index) in imgs" :key="index">
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  props: {
    text: {
      type: String,
      default: ''
    },
    imgs: {
      type: Array,
      default: []
    }
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/variable.scss';
  $icon-height: 35px;
  .card {
    padding: $padding-base $padding-base * 2/3;
    .info {
      border: 1px solid $color-help;
      padding: $padding-base 10px;
      position: relative;
      .text {
        font-size: $font-size-small;
        line-height: $line-height;
        text-indent: $font-size-small * 2;
      }
      .top {
        background-color: $color-help;
        width: 60%;
        height: $icon-height * 2;
        position: absolute;
        top: -$icon-height;
        left: 20%;
        box-sizing: border-box;
        border: 15px solid #fff;
        border-radius: 70px;
      }
      .bottom {
        background: url('~@/pages/help/common/arrow-down.png') 50% 0 no-repeat;
        background-size: 82px 69px;
        background-color: #fff;
        position: absolute;
        bottom: -$icon-height;
        width: 34%;
        height: $icon-height * 2;
        left: 33%;
      }
    }
    .img-wrapper {
      padding-top: $padding-base * 2;
      text-align: center;
      .image {
        width: 800px;
        height: 1423px;
        margin-bottom: 20px;
      }
    }
  }
</style>
