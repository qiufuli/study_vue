<docs>
  ## messageCard 组件
  ## props
  * type <info|success|fail> type 的取值
  * btnText 按钮文字
  * title 标题
  * btnType <gray|primary> btn 类型
  * visible <false|true> 控制显示隐藏.sync
  ## slot
  * message 详情
  ## event
  * btnClick message 按钮点击事件（父组件使用时，也是驼峰形式）
  * iconCloseClick iconClose 图标点击事件
</docs>
<template>
  <div>
    <transition name="mess-fade">
      <div class="mess" v-show="visible">
        <div class="mess-wrapper">
          <div class="mess-content">
            <i v-if="type === 'success' || type === 'fail'"
            @click="iconCloseClick"
            class="i-close iconfont icon-close-round"></i>
            <div class="title" :class="titleClass">{{title}}</div>
            <div class="mess-detail">
              <slot></slot>
            </div>
            <div class="operate">
              <button class="btn"
              @click="btnClick"
              :class="`btn-${btnType}`">{{btnText}}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'messageCard',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    btnText: {
      type: String,
      default: '知道了'
    },
    btnType: {
      type: String,
      default: 'gray'
    },
    title: {
      type: String,
      default: '这是一个提示'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  computed: {
    // 标题class
    titleClass() {
      let className;
      if (this.type === 'success') {
        className = 'state success';
      } else if (this.type === 'fail') {
        className = 'state fail';
      } else {
        className = '';
      }
      return className;
    }
  },
  methods: {
    // 按钮点击
    btnClick() {
      this.$emit('update:visible', false);
      this.$emit('btnClick');
    },
    iconCloseClick() {
      this.$emit('update:visible', false);
      this.$emit('iconCloseClick');
    }
  }
};
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import '~common/scss/variable.scss';
  .mess{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: $color-cover-bg;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    &.mess-fade-enter-active{
      animation: mess-fadein 0.3s;
      .mess-content {
        animation: mess-zoom 0.3s;
      }
    }
    &.mess-fade-leave-active{
      opacity: 0;
      .mess-content {
        opacity: 0;
      }
    }
    .mess-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }
    .mess-content {
      position: relative;
      width: 984px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: $radius-base2;
      padding: $padding-base;
    }
    .i-close{
      position: absolute;
      right: 30px;
      top: 42px;
      color: #fff;
      font-size: 60px;
    }
    .title {
      line-height: 1;
      font-size: $font-size-large;
      text-align: center;
      padding: $padding-base/2 0 $padding-base;
      border-bottom: 1px solid $color-border;
      font-weight: bolder;
      &.state{
        height: 300px - $padding-base;
        font-size: $font-size-ultra-plus;
        color: #fff;
        margin: -$padding-base;
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: 0;
        line-height: 160px;
      }
      &.state:before{
        font-family: 'iconfont';
        position: relative;
        padding-right: $padding-base / 2;
      }
      &.success{
        background: url('~common/imgs/success-bg.png') 0 0 no-repeat;
        background-size: auto 300px;
      }
      &.success:before{
        top: 30px;
        font-size: $font-size-ultra-plus * 2;
        content: '\e60d';
      }
      &.fail{
        line-height: 200px;
        background: url('~common/imgs/fail-bg.png') 0 0 no-repeat;
        background-size: auto 300px;
      }
      &.fail:before{
        content: '\e607';
        font-size: $font-size-ultra-plus * 1.2;
      }
    }
    .mess-detail {
      max-height: 940px;
      padding: $padding-base/2 0 $padding-base;
      overflow: auto;
    }
    .operate {
      text-align: center;
      padding-top: $padding-base;
    }
  }

  @keyframes mess-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1
    }
  }
  @keyframes mess-zoom {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(1.1)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
