<docs>
  ## toast 组件
  ## props
  * message 弹出消息内容
  * duration 持续时间

</docs>
<template>
  <transition name="fade">
    <div class="toast-wrap" v-if="show">
      <div class="toast">{{message}}</div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  data() {
    return {
      message: '',
      duration: 1200,
      show: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.$emit('destroy');
    }, this.duration);
  }
};
</script>
<style scoped lang="scss">
@import '~common/scss/variable.scss';
@import '~common/scss/base.scss';

.toast-wrap {
  z-index: 1001;
  font-size: $font-size-base;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.2;
  .toast {
    padding: $padding-base / 2 $padding-base ;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: $radius-base2;
    transition: all ease 5s;
  }
  &.fade-enter {
    .toast {
      opacity: 0;
      transform: scale(0);
    }
  }
  &.fade-enter-active {
    .toast {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  &.fade-leave {
    .toast {
      transform: scale(1);
      transform-origin: 50% 50%;
    }
  }
  &.fade-leave-active {
    .toast {
      transition: all ease 5s;
      transform: scale(0.1);
    }
  }
}

</style>
