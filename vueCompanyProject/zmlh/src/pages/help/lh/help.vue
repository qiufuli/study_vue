<docs>
  ## 灵活补贴帮助页面
</docs>
<template>
  <div class="help">
    <h1 class="title">灵活就业网络预约</h1>
    <div class="card-container">
      <card v-for="(item, index) in list" :key="index"
      :text="item.text" :imgs="item.imgs">
      </card>
    </div>
  </div>
</template>
<script>
import Card from '@/pages/help/common/card';

/* eslint-disable global-require */
export default {
  name: 'help',
  components: { Card },
  data() {
    return {
      list: [
        {
          text: '1、在预约界面点击“材料说明”，查看现场办理业务时所需要携带的材料。',
          imgs: [require('./1.jpg')]
        },
        {
          text: '2、携带材料分为两部分：申请材料和签协议材料。',
          imgs: [require('./2.jpg')]
        },
        {
          text: '3、查看完所需要的材料后，点击下方“立即预约”，进入选择办理社保所界面。',
          imgs: [require('./3.jpg')]
        },
        {
          text: '4、在“户籍所在区”和“户籍地所在街乡”里选择对应的区和街乡。',
          imgs: [require('./4.jpg')]
        },
        {
          text: '5、选择“办理日期”和“办理业务”，每个社保所每天开放20个预约号，业务分为“申请业务”和“签协议业务”。之后点击下方“预约”。',
          imgs: [require('./5.jpg')]
        },
        {
          text: '6、预约成功后，界面显示出“预约成功”提示，并且显示出具体的办理日期和办理地点以及携带的相关材料。',
          imgs: [require('./6.jpg')]
        },
        {
          text: '<p>7、返回到预约界面，在下方可以查看已经预约成功的提示，本人到达社保所后，向社保所业务人员出示此页面办理相关业务。</p><p>如想取消预约，点击此处进入取消界面。</p>',
          imgs: [require('./7.jpg')]
        },
        {
          text: '8、取消预约仅可以取消明天及以后的预约，点击右侧“取消预约”，可以取消对应的业务预约。',
          imgs: [require('./8.jpg')]
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
  @import '~common/scss/variable.scss';
  .help {
    padding: $padding-base;
    padding-top: $padding-base * 3/2;
    .title {
      font-size: $font-size-large;
      margin: 0;
      font-weight: bold;
      padding-bottom: 30px;
    }
    .card-container {
      padding: $padding-base;
      background: url('~@/pages/help/common/bgtop.png') 0 0 no-repeat;
      background-size: 100% 40px;
      border-radius: $radius-base2;
      background-color: #fff;
    }
  }
</style>
