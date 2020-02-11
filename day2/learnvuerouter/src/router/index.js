import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/home'
// import About from '../components/about'

// 路由懒加载
const Home = () => import(/* webpackChunkName: "home" */ '../components/home')
const About = () => import( '../components/about')
const HomeNews = () => import( '../components/homeNews')

Vue.use(Router)

export default new Router({
  mode:'history',
  linkActiveClass:'aActive',
  // routes: 配置路由和组件之间的映射关系
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component: Home,
      children:[
        {
          // 子组件path不用加'/'
          path:'news/:name/:age',
          name:'news',
          component:HomeNews
        }
      ]
    },
    {
      path:'/about',
      component: About
    }
  ]
})
