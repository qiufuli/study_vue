<docs>
  ## confirm 提示

</docs>
<template>
<transition name="confirm">
  <div class="confirm" v-show="visible">
    <div class="container-wrap">
      <div class="container">
        <h3 class="title">{{title}}</h3>
        <p class="title-sub">{{content}}</p>
        <div class="btn-wrap">
          <button @click="$emit('cancle')"
          class="btn btn-gray">{{cancleBtnText}}</button>
          <button @click="$emit('confirm')"
          class="btn btn-danger">{{confirmBtnText}}</button>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>

const defaultText = {
  cancleBtnText: '取消',
  confirmBtnText: '确认'
};

export default {
  name: 'confirm',
  data() {
    return {
      visible: false,
      title: '',
      content: '',
      cancleBtnText: defaultText.cancleBtnText,
      confirmBtnText: defaultText.confirmBtnText
    };
  }
};
</script>
<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  @import '~common/scss/base.scss';
  .confirm {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1003;
    background: $color-cover-bg;
    &.confirm-enter-active{
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
    width: 80%;
  }
  .container{
    border-radius: $radius-base;
    padding: $padding-base;
    background-color: $color-white;
    position: relative;
    text-align: center;
    line-height: 1.5;
    .title {
      color: $color-text-title;
      font-size: $font-size-large;
      border-bottom: 1px solid $color-border;
      padding: $padding-base/2 0;
    }
    .title-sub {
      font-size: $font-size-small;
      color: $color-text-primary;
      line-height: 2;
      padding: $padding-base/2 0;
    }
    .btn-wrap {
      padding: $padding-base/2 0;
      display: flex;
      justify-content: space-between;
      .btn {
        flex: 0 1 48%;
      }
    }
  }
  .btn-round{
    width: 50%;
    margin-top: $margin-base;
  }
</style>
