import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('views/Home')
const category = () => import('views/Category')
const shopcart = () => import('views/Shopcart')
const profile = () => import('views/Profile')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/category',
      component: category
    },
    {
      path: '/shopcart',
      component: shopcart
    },
    {
      path: '/profile',
      component: profile
    }
  ]
})
