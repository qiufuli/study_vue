<template>
  <el-container style="min-height: 700px;">
    <el-aside width="100%" style="background-color: #fff">
      <el-menu :default-active="$route.path">
        <el-submenu v-for="(item, index) in menu[0].children" :key="index" :index="String(index)">
          <template slot="title">
            <i class="el-icon-document"></i>
            {{item.name}}
          </template>
          <el-menu-item :index="items.url" v-for="(items, indexs) in item.children" :key="indexs">
            <!-- <router-link v-if="item.hasChild" :to="items.url">{{items.name}}</router-link> -->
            <router-link v-if="item.hasChild" :to="{path:items.url}">{{items.name}}</router-link>
            <!-- 1.树需要返回代办的名称 
            2.调用接口后获取代办个数
            3.给state里的值 commit 添加这个个数
            4.计算属性 返回一个数组对象 都是跟代办名称一个样的 都是state里面的
            5. 通过v-for循环 对比 代办名称 来渲染代办个数
             -->
            <el-badge v-if="$store.state[items.sxbz] != '0'" v-bind:value="$store.state[items.sxbz]" class="item"></el-badge>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>
</template>
<script>
import $ from "@/common/js/axios";
import "../../common/scss/public.scss";

export default {
  data() {
    return {
      isShow: false,
      dNum: "1"
    };
  },
  props: {
    menu: Array
  },
  created() {
    this.dbNum();
  },
  methods: {}
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.el-menu {
  border-right: none;
}
.el-menu-item {
  position: relative;
}
.el-menu-item a {
  display: block;
  position: absolute;
  box-sizing: border-box;
  padding-left: 50px;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #666;
}
</style>
