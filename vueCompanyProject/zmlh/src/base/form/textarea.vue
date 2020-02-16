<docs>
  ## input输入元素
</docs>
<template>
   <div class="form-group border-b">
      <label class="input-label" for="">{{label}}</label>
      <textarea @input="$emit('input', $event.target.value)" @blur="validItem" @focus="resetValid" id="" 
      :maxlength="maxLength" class="form-control" :placeholder="placeholder"></textarea>
    </div>
  <!-- <div :class="`weui-cell ${valid === status.REJECTED ? 'weui-cell_warn' : ''}`">
    <div class="weui-cell__hd">
      <label class="weui-label">{{label}}</label>
    </div>
    <div class="weui-cell__bd">
      <input :type="type" class="weui-input" @input="$emit('input', $event.target.value)"
        :value="value" @blur="validItem" @focus="resetValid"
        :maxlength="maxLength" :placeholder="placeholder">
    </div>
    <div class="weui-cell__ft" v-show="valid === status.REJECTED">
      <i class="weui-icon-warn"></i>
    </div>
  </div> -->
</template>
<script>
import { mixinValid } from 'common/mixins/mixins';

export default {
  name: 'co-textarea',
  props: {
    label: String,
    placeholder: String,
    maxLength: String,
    prop: String,
    rules: Object,
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String,
  },
  mixins: [mixinValid]
};
</script>
<style scoped lang="scss">
@import '~common/scss/variable.scss';
.form-group{
  position: relative;
  .form-control {
    text-align: right;
  }
  .max-label{
    flex: 1 1 77%;
  }
  .dw{
    position: absolute;
    right: -48px;
    font-size:$font-size-base;
    top: 66px;
  }
  textarea{
    text-align: right;
    height: 500px;
    overflow-y: auto;
    margin:64px 70px 64px 0;
    padding: 0;
    font-family: "微软雅黑";
  }
}

</style>
