<docs>
  ## 灵活保险补贴预约第一步
</docs>
<template>
  <div>
    <mheader type="detail" title="报告详情"></mheader>
    <!-- 详情信息开始 -->
    <div class="choice">
      <div class="form-group border-b">
				<label class="input-label">报告日期</label>
				<span class="form-control">{{data.bgrq}}</span>
			</div>
			<div class="form-group border-b">
				<label class="input-label">月度累计工作时间</label>
				<span class="form-control">{{data.ydljgzsj}}（天）</span>
			</div>
			<div class="form-group border-b">
				<label class="input-label">工作收入</label>
				<span class="form-control">{{data.gzsr}}（元）</span>
			</div>
			<div class="form-group border-b">
				<label class="input-label">工作地点</label>
				<span class="form-control">{{data.gzdd}}</span>
			</div>
			<div class="form-group">
				<label class="input-label">工作内容</label>
				<span class="form-control">{{data.jyzk}}</span>
			</div>
    </div>
    <!-- 详情信息结束 -->
  </div>
</template>
<script>
import Mheader from '@/components/mheader/mheader';
import $ from 'common/js/axios';

export default {
  components: { Mheader },
  name: 'detail',
  data() {
    return {
      data: {}
    };
  },
  methods: {
    // 查询申请详情
    GET_sqxqCx() {
      this.$loading = true;
      $.get('/jyzk/jyzkxxCx',{ params: { jyzkid: this.$route.query.jyzkid} }).then((res) => {
        this.data = res.returnData.jyzkxx;
      }).finally(() => {
        this.$loading = false;
      });
    }
  },
  created() {
    this.GET_sqxqCx();
  }
};
</script>
<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  .choice {
    border: $border;
    padding:0 $padding-base;
    background-color: #fff;
    margin-top: $margin-base;
    border: $border;
    .form-group{
        padding:$padding-base 0;
        align-items:flex-start;
        .input-label{
            flex: 1 1 77%;
            padding: 0;
        }
        .form-control{
            box-sizing: border-box;
            display: block;
            width: 100%;
            font-size: $font-size-base;
            line-height: 1.5;
            color: $color-text-primary;
            background-color: #fff;
            background-clip: padding-box;
            border: none;
            appearance: none;
        }
    }
  }
</style>
