// commonJS
const {add} = require('./js/mathUtils');
// es6 Module
import {name} from './js/info'
// css
require('./css/index.css');
require('./css/index2.less');

// add(20,30);
// console.log(name);

// const app = {
//   template:`
//   <div>{{mes}}</div>
//   `,
//   data(){
//     return{
//       mes:'hello Vue'
//     }
//   }
// }
// import app from './vue/app'
import app from './vue/app.vue'

import Vue from 'vue';
 new Vue({
  el:'#app',
  template:`<app/>`,
  components:{
    app
  }
})