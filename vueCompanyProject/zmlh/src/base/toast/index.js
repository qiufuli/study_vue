import Vue from 'vue';
import Toast from './toast';

const ToastConstructor = Vue.extend(Toast);

export default function $toast(params) {
  let data = {};
  if (typeof params === 'string') {
    data.message = params;
  } else {
    data = params;
  }
  const div = document.createElement('div');
  document.body.appendChild(div);

  const instance = new ToastConstructor(
    {
      $el: div,
      data,
    }
  ).$mount(div);

  instance.$on('destroy', () => {
    instance.show = false;
  });
}
