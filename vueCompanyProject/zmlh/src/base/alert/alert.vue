<docs>
  ## 消息弹出框组件
  ## props
  * type <success|warning|error> 提示类型
  * message 提示内容
  * btnText 按钮文案
</docs>
<template>
  <transition name="alert">
    <div class="alert" v-show="visible" >
      <div class="container-wrap">
        <div class="container">
          <div class="icon-wrap">
            <i class="icon" :class="'icon--' + type || 'success'"></i>
          </div>
          <p>{{message}}</p>
          <button class="btn btn-round "  @click="close">{{btnText || '我知道了'}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'eAlert',
  props: {
    type: {
      default: 'success',
      type: String
    },
    message: {
      type: String
    },
    btnText: {
      default: '我知道了',
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    }
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/variable.scss';
  @import '~common/scss/base.scss';
  .alert {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    background: $color-cover-bg;
    &.alert-enter-active{
      animation: cover-fadein 0.3s;
      .container {
        animation: content-zoom 0.3s;
      }
    }
  }
  .container-wrap{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -30%);
    width: 70%;
  }
  .container{
    border-radius: $radius-base2;
    padding: $padding-base;
    padding-top:  $padding-base + 90px;
    background-color: $color-white;
    position: relative;
    text-align: center;
    font-size: $font-size-large;
    color: $color-text-primary;
    line-height: 1.5;
  }
  .container .icon-wrap{
    position: absolute;
    border-radius: 50%;
    top: -144px;
    left: 50%;
    transform: translateX(-50%);
    width: 228px;
    padding: 24px;
    height: 228px;
    background-color: $color-white;
  }
  .container .icon{
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
    font-style: normal;
    &:after{
      font-family: 'iconfont';
      font-size: $font-size-ultra-plus * 2;
      color: #fff;
      position: relative;
      // left: -10px;
    }
  }
  .container .icon--success{
    background-color: $color-success;
    &:after{
      content: '\e60d';
    }
  }
  .container .icon--warning{
    background-color:$color-warning;
    &:after{
      content: '\e601';
    }
  }
  .container .icon--error{
    // background: url('../assets/icons.png') 0 -350px no-repeat;
    background-size: 243px auto;
    background-color: $color-error;
    &:after {
      content: '\e607';
    }
  }
  .btn-round{
    width: 50%;
    margin-top: $margin-base;
  }
</style>
