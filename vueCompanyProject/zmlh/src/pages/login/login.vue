<docs>
  ## 登陆页面
</docs>
<template>
    <div class="login">
      <!-- 输入项 开始-->
      <div class="form-wrap">
        <div class="form-cell">
          <div class="cell-label">
            <label for="" class="form-label">证件类型</label>
          </div>
          <div class="cell-input">
            <input type="text" class="form-input"
            v-model="form.zjlx"
            placeholder="证件类型为01时可以登录">
          </div>
        </div>
        <div class="form-cell">
          <div class="cell-label">
            <label for="" class="form-label">userid</label>
          </div>
          <div class="cell-input">
            <input type="text" class="form-input"
            v-model="form.userid"
            placeholder="请输入userid">
          </div>
        </div>
        <div class="form-cell">
          <div class="cell-label">
            <label for="" class="form-label">身份证号</label>
          </div>
          <div class="cell-input">
            <input type="text" class="form-input"
            v-model="form.sfzhm" maxlength="18"
            placeholder="请输入身份证号">
          </div>
        </div>
        <div class="form-cell">
          <div class="cell-label">
            <label for="" class="form-label">姓名</label>
          </div>
          <div class="cell-input">
            <input type="text" class="form-input"
            v-model="form.xm" maxlength="18"
            placeholder="请输入姓名">
          </div>
        </div>
        <div class="form-cell">
          <div class="cell-label">
            <label for="" class="form-label">电话</label>
          </div>
          <div class="cell-input">
            <input type="text" class="form-input"
            v-model="form.lxdh" maxlength="11"
            placeholder="请输入电话">
          </div>
        </div>
        <div class="form-cell">
          <div class="cell-label">
            <label for="" class="form-label">类型</label>
          </div>
          <div class="cell-input">
            <select name="" id="" v-model="form.zmlh"
            class="form-input">
              <option value="1">自谋</option>
              <option value="2">灵活</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 输入项 结束 -->
      <div class="btn-wrap">
        <button class="btn btn-primary" type="button" name="btn"
        @click="login">登陆</button>
      </div>
    </div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
  name: 'login',
  data() {
    return {
      form: {
        zjlx: '01',
        userid: '1232456777',
        sfzhm: '420625199210050073',
        xm: '仇小争',
        lxdh: '155668989565',
        zmlh: '1'
      }
    };
  },
  methods: {
    login() {
      $.post('/login/login', this.form).then((res) => {
        if (parseInt(res.returnCode, 10) === 1) {
          window.location.href = './index.html';
        }
      }).catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/variable.scss';
  .login {

    .title {
      font-size: $font-size-ultra;
      color: $color-text-title;
      text-align: center;
      padding: $padding-base 0;
    }
    .form-wrap {
      margin: $margin-base 0;
      background-color: #fff;
    }
    .form-cell {
      padding: 20px 30px;
      position: relative;
      display: flex;
      align-items: center;
      border-bottom: $border;
      .cell-label {
        text-align: right;
        color: $color-text-title;
        font-size: $font-size-base;
        flex: 0 0 20%;
      }
      .cell-input {
        flex: 1;
        color: $color-text-primary;
      }
      .form-input {
        width: 100%;
        border: 0;
        outline: 0;
        appearance: none;
        // line-height: 48px;
        line-height: 1;
        // height: 48px;
        padding: 30px;
        font-size: $font-size-base;
      }
    }
  }
  .btn-wrap {
    // position: fixed;
    // bottom: 120px;
    margin-top: $margin-base * 5;
    width: 100%;
    box-sizing: border-box;
    padding: $padding-base;
    .btn {
      width: 100%;
    }
  }
</style>
