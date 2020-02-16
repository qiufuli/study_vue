/**
 * 提供了alert的封装
 * @author jinglf000
 *
 */
import Vue from 'vue';
import alert from './alert';

const AlertConstructor = Vue.extend(alert);
let instance;

const initInstance = () => {
  instance = new AlertConstructor({
    el: document.createElement('div')
  });
};

/**
 * $alert 方法的封装
 * @param {Object} options
 * @param {String} type 提示类型：<success|warning|error>
 * @param {String} message 提示内容
 * @param {String} btnText 提示按钮的文字
 * @param {Function} cb 点击的回调函数
 */
const $alert = function alertFn(options, cb) {
  if (!instance) {
    initInstance();
  }
  // 传值
  instance.type = options.type;
  instance.message = options.message;
  instance.btnText = options.btnText;
  instance.$on('close', () => {
    if (typeof cb === 'function') {
      cb();
    }
  });
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
};

export default $alert;
