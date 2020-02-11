<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item link="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
        <img src="~assets/img/tabbar/home_active.svg" slot="active-icon" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
        <img src="~assets/img/tabbar/category_active.svg" slot="active-icon" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item link="/shopcart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="active-icon" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link="profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
        <img src="~assets/img/tabbar/profile_active.svg" slot="active-icon" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
    <router-view />
  </div>
</template>

<script>
import TabBar from "components/tabbar/tabbar";
import TabBarItem from "components/tabbar/tabBarItem";
export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>
