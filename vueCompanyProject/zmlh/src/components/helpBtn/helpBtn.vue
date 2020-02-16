<docs>
  ## 帮助按钮组件
</docs>
<template>
  <a class="help" href="./help.html">帮助</a>
</template>
<script>
export default {
  name: 'helpBtn'
};
</script>
<style scoped lang="scss">
  @import '~common/scss/variable.scss';
  .help {
    position: fixed;
    z-index: 100;
    right: 50px;
    // bottom: 300px;
    top: 77%;
    box-shadow: 2px 2px 10px #448aca;
    width: 154px;
    height: 154px;
    border-radius: 50%;
    text-align: center;
    line-height: 154px;
    background-color: #448aca;
    color: #f0f1f5;
    font-size: 38px;
  }
</style>
