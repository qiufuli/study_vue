<docs>
  ## select 组件
</docs>
<template>
<div class="form-group border-b">
  <label class="input-label" for="">{{label}}</label>
  <div class="form-control-wrap">
      <select dir="rtl" v-model="selectValue"
        @focus="resetValid">
        <option disabled value="">请选择</option>
        <option v-for="(item, i) in list" :key="i"
          :value="item.dmid">{{item.dmmc}}</option>
      </select>
    </div>
  
  <!-- <input prop="gznr" type="text" id="" :v-model="data.gznr" class="form-control" placeholder="请输入"> -->
</div>
<!-- <div @click="$emit('click', $event)"
  :class="`weui-cell weui-cell_select weui-cell_select-after
 ${valid === status.REJECTED ? 'weui-cell_warn' : ''}`">
  <div class="weui-cell__hd">
    <label class="weui-label">{{label}}</label>
  </div>
  <div class="weui-cell__bd">
    <select class="weui-select" v-model="selectValue"
      @focus="resetValid">
      <option disabled value="">请选择</option>
      <option v-for="(item, i) in list" :key="i"
        :value="item[alias.id]">{{item[alias.name]}}</option>
    </select>
  </div>
</div> -->
</template>
<script>
import { mixinValid } from 'common/mixins/mixins';

export default {
  name: 'co-select',
  props: {
    label: String,
    prop: String,
    value: String,
    rules: Object,
    list: Array
  },
  data() {
    return {
      selectValue: ''
    };
  },
  watch: {
    value(val) {
      this.selectValue = val;
    },
    selectValue(val) {
      this.$emit('input', val);
      this.$nextTick(() => {
        this.validItem();
      });
    },
    list() {
      this.$nextTick(() => {
        this.selectValue = this.value;
      });
    }
  },
  mixins: [mixinValid]
};
</script>
<style scoped lang="scss">
@import '~common/scss/variable.scss';
  select {
      direction: rtl;
  }
  select option {
      direction: ltr;
  }
</style>
