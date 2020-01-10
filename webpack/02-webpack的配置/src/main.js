// commonJS
const {add} = require('./js/mathUtils');
// es6 Module
import {name} from './js/info'
// css
require('./css/index.css');
require('./css/index2.less');

add(20,30);
console.log(name);

import Vue from 'vue';
 new Vue({
  el:'#app',
  data:{
    mes:'hello Vue'
  }
})