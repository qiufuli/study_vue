/**
 * router
 */
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import ReverseOne from '@/components/reverse/one';
import Search from '@/components/search/search';
import Infor from '@/components/search/infor';
import Detail from '@/components/search/detail';
import Scroll from '@/components/scroll/scroll';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/reverseone',
      name: 'reverseOne',
      component: ReverseOne
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/infor',
      name: 'infor',
      component: Infor
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: Scroll
    }
  ]
});
