/**
 * 提供了prompt的封装
 * @author jinglf000
 *
 */
import Vue from 'vue';
import confirm from './confirm';

const ConfirmConstructor = Vue.extend(confirm);
let instance;

const initInstance = () => {
  instance = new ConfirmConstructor({
    el: document.createElement('div')
  });
};

/**
 * $confirm 方法的封装
 * @param {String} content  内容
 * @param {String} title 标题
 * @param {Object} options 按钮文案 {confirmButtonText, cancelButtonText}
 */
const $confirm = function confirmFn(content, title, options) {
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    // 传值
    instance.title = title;
    instance.content = content;
    instance.confirmButtonText = options.confirmButtonText;
    instance.cancelButtonText = options.cancelButtonText;

    // 按钮
    instance.$on('confirm', () => {
      instance.visible = false;
      resolve();
    });
    instance.$on('cancle', () => {
      instance.visible = false;
      reject();
    });
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  });
};

export default $confirm;
