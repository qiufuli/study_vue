<docs>
  ## 错误页面
</docs>
<template>
  <div class="error">
    <div class="content">
      <i class="icon" :class="info.iconClass"></i>
      <p class="text">{{info.msg}}</p>
      <button class="btn btn-round" @click="btnClick">{{info.btnText}}</button>
    </div>
  </div>
</template>
<script>
/*
  联系电话为空code=3
  证件类型不是身份证   code=1
  身份证号码不合法     code=2
  姓名不合法   code=5
  登录超时     code=4
  其他异常     code=0
  3 -> 用户定制中心
  01245 -> 重新登录
  errorPage 可能会对应自谋和灵活两个，因此需要添加参数判断
*/
/* eslint-disable no-undef */
const offline = {
  msg: '',
  path: './index.html',
  btnText: '重新登录',
  iconClass: 'offline'
};

const warning = {
  msg: '',
  path: 'http://www.bjrbj.gov.cn/mplatform/main.ht',
  btnText: '绑定手机号码',
  iconClass: 'warning'
};

const exception = {
  msg: '',
  path: 'http://www.bjrbj.gov.cn/mplatform/main.ht',
  btnText: '重新登录',
  iconClass: 'exception'
};

const confMsg = {
  0: '服务起开小差了，请稍后重试！',
  4: '登陆超时，请重新登录',
  1: '证件类型不是身份证，请重新登录！',
  2: '身份证号码不合法，请重新登录！',
  3: '联系电话为空，请重新绑定！',
  5: '姓名不合法，请重新登录！'
};

export default {
  name: 'errorpage',
  data() {
    return {
      info: {
        msg: '',
        path: '',
        btnText: '',
        iconClass: ''
      }
    };
  },
  methods: {
    // 获取query参数
    getUrlCode() {
      const str = window.location.search;
      const strArr = str.slice(1).split('=');
      const obj = {};
      for (let i = 0; i < strArr.length; i += 1) {
        if (i % 2 === 0) {
          obj[strArr[i]] = strArr[i + 1];
        }
      }
      return obj;
    },
    // 点击按钮
    btnClick() {
      window.location.href = this.info.path;
    },
    _initialMsg() {
      const flag = this.getUrlCode().code;
      if (flag === '3') {
        this.info = warning;
        this.info.msg = confMsg[flag];
      } else if (flag === '1' || flag === '2' || flag === '4' || flag === '5') {
        this.info = exception;
        this.info.msg = confMsg[flag];
      } else {
        this.info = exception;
        this.info.msg = confMsg[0];
      }
    }
  },
  created() {
    this._initialMsg();
  }
};
</script>
<style>
body {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  .error {
    padding-top: 360px;
    font-size: $font-size-large;
    .content {
      text-align: center;
      margin-bottom: $margin-base * 4;
    }
    .text {
      padding:  $padding-base;
    }
    .icon {
      display: inline-block;
      height: 342px;
      width: 303px;
      text-align: center;
      background-size: 115px auto;
      // 登陆超时
      &.offline {
        background: url('./offline.png') 0 0 no-repeat;
        background-size: 303px auto;
      }
      // 登陆，信息异常
      &.warning {
        background: url('./warning.png') 0 0 no-repeat;
        background-size: 303px auto;
      }
      // 后台报错
      &.exception {
        background: url('./exception.png') 0 0 no-repeat;
        background-size: 303px auto;
      }
    }
    .btn {
      font-size: $font-size-large;
      padding: $padding-base/2 $padding-base * 2;
      width: auto;
      line-height: 1;
    }
  }
</style>
