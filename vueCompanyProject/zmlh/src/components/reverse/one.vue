<docs>
  ## 灵活保险补贴预约第一步
</docs>
<template>
  <div>
    <mheader type="one_title" title="灵活就业"></mheader>
    <!-- 选择地区开始 -->
    <div class="choice">
      <co-form :model="data" :rules="rules" ref="form">
        <co-input prop="ydljgzsj" label="月度累计工作时间" dw="天" max-length="8"
        v-model="data.ydljgzsj" placeholder="请输入天数"></co-input>
        <co-input prop="gzsr" label="工作收入" dw="元" max-length="8"
        v-model="data.gzsr" placeholder="请输入工作收入"></co-input>
        <co-input prop="gzdd" label="工作地点" max-length="64"
        v-model="data.gzdd" placeholder="请输入工作地点"></co-input>
        <co-textarea prop="jyzk" label="工作内容" max-length="250"
        v-model="data.jyzk" placeholder="请输入工作内容"></co-textarea>
      </co-form>
    </div>
    <!-- 选择地区结束 -->
    <!-- 下一步 开始 -->
    <div class="next-step">
      <button class="btn btn-primary" @click="bc">保存</button>
    </div>
    <!-- 下一步 结束 -->
  
  </div>
</template>
<script>
import Mheader from '@/components/mheader/mheader';
import coForm from '@/base/form/form';
import coInput from '@/base/form/input';
import coTextarea from '@/base/form/textarea';
import coLoading from '@/base/loading/loading';
import $ from 'common/js/axios';
import { validator } from 'common/js/valid';
import { mixinValid } from 'common/mixins/mixins';
import MessageCard from '@/components/messageCard/messageCard';

export default {
  components: { coForm, MessageCard, coInput, coTextarea, Mheader ,coLoading},
  name: 'reverseOne',
  mixins: [mixinValid],
  data() {
    return {
      data: {
        ydljgzsj: '',
        gzsr: '',
        gzdd: '',
        jyzk: '',
        sjly:'03'
      },
      rules: {
        ydljgzsj: validator('8,"num","月度累计工作时间",false',function(rule,value,callback){
            var _reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            if(_reg.test(value)){
              callback(new Error(`月度累计工作时间含有表情格式不正确`));
            }else{
              callback();
            }
        }),
        gzsr: validator('8,"posdouble","工作收入",false',function(rule,value,callback){
            var _reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            if(_reg.test(value)){
              callback(new Error(`工作收入含有表情格式不正确`));
            }else{
              callback();
            }
        }),
        gzdd: validator('64,"full","工作地点",false',function(rule,value,callback){
            var _reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            if(_reg.test(value)){
              callback(new Error(`工作地点含有表情格式不正确`));
            }else{
              callback();
            }
        }),
        jyzk: validator('250,"full","工作内容",false',function(rule,value,callback){
            var _reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            if(_reg.test(value)){
              callback(new Error(`工作内容含有表情格式不正确`));
            }else{
              callback();
            }
        })
      }
    };
  },
  methods: {
    // 保存操作
    bc() {
      this.$refs.form.validate(() => {
      this.$confirm('确定要保存吗？', '提示',{confirmButtonText:"确认", cancelButtonText:"取消"})
        .then(() => {
          this.POST_reverse();
        })
        .catch(() => {
        });
      });
    },
    // 保存接口
    POST_reverse() {
      this.$loading = true;
      $.post('/jyzk/jyzkBc', this.data).then((res) => {
        const flag = parseInt(res.returnData.executeResult, 10);
       if (flag === 1) {
          this.$alert({
            type: 'success',
            message: "保存成功！"
          },() => {
            this.msgBtn();
          });
        }else{
          this.$alert({
            type: 'warning',
            message: res.returnData.message
          });
        }
      }).finally(() => {
        this.$loading = false;
      });
    },
    // 返回消息按钮点击处理
    msgBtn() {
      // 成功
      this.$router.push({ name: 'index' });
    },
    // 点击×返回到首页
    iconCloseClick() {
      this.$router.push({ name: 'index' });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  .choice {
    border: $border;
    padding:0 $padding-base;
    background-color: #fff;
    // margin-top: $margin-base;
    border: $border;
    
  }
  .next-step {
    margin-top: $margin-base * 2;
    width: 100%;
    box-sizing: border-box;
    padding: $padding-base;
    .btn {
      width: 100%;
    }
  }
</style>
