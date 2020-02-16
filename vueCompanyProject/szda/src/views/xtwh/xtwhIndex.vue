<template>
  <div>
    <div class="header">
      <p>权限维护</p>
      <ul>
        <li v-show="yhgl"><button @click="tab(1)" :class="{on:check==1}">用户管理</button></li>
        <li v-show="jsgl"><button @click="tab(2)" :class="{on:check==2}">角色管理</button></li>
        <li v-show="gngl"><button @click="tab(3)" :class="{on:check==3}">功能管理</button></li>
        <li v-show="czmm"><button @click="tab(4)" :class="{on:check==4}">重置密码</button></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
// import Tree from '@/components/tree/tree.vue'
export default {
  name: '',
  // components: { Tree },
  data() {
    return {
      yhgl: false,
      jsgl: false,
      gngl: false,
      czmm:false,
      check: 1,
    }
  },
  created() {
    // 判断按钮是否显示
    let power = JSON.parse(sessionStorage.getItem('power'));
    for(var i =0; i < power.length; i++) {
      if (power[i].gnlj == "/xtwh") {
        var menuList = power[i].childrens;
        for (var j =0; j < menuList.length; j++) {
          if (menuList[j].gnlj == '/xtwh/czy') {
            this.yhgl = true;
          } else if (menuList[j].gnlj == '/xtwh/js') {
            this.jsgl = true;
          } else if (menuList[j].gnlj == '/xtwh/gn') {
            this.gngl = true;
          } else if (menuList[j].gnlj == '/xtwh/mmcz') {
            this.czmm = true;
          }
        }
      }
    }
  },
  methods: {
    tab(num) {
      if (num == '1') {
        this.check = 1;
        this.$router.push({path: '/xtwh/czy'});
      } else if(num == '2') {
        this.check = 2;
        this.$router.push({path: '/xtwh/js'});
      } else if(num == '3') {
        this.check = 3;
        this.$router.push({path: '/xtwh/gn'});
      } else{
        this.check = 4;
        this.$router.push({path: '/xtwh/mmcz'});
      }
    },
  },
  watch:{
    $route:{
      handler:function(n,o){
       if(n.name == 'yhgl'){
         this.check = 1;
       }else if(n.name == 'jsgl'){
         this.check = 2;
       }else if(n.name == 'gngl'){
         this.check = 3;
       }else if(n.name == 'mmcz'){
         this.check = 4;
       }
      },
      deep:true,
      immediate:true
    }
  }
};
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
  background: none;
}
.header {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #1459A7;
  p {
    width: 14%;
    background: url('../../assets/images/zcd.png') no-repeat;
    color: #71CBFF;
    font-weight: 600;
    padding-left: 60px;
    float: left;
  }
  ul {
    li {
      float: left;
      width: 108px;
      margin: 0 20px;
      button {
        background-color: #000;
        color: #00A9F5;
        width: 100%;
        height: 30px;
        border-radius: 15px;
        cursor: pointer;
      }
      button:hover {
        background-color: #3D92F2;
        color: #fff;
      }
      .on {
        background-color: #3D92F2;
        color: #fff;
      }
    }
  }
}
</style>