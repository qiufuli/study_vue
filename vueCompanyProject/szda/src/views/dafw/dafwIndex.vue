<template>
  <div>
    <div class="left">
      <ul class="left_menu">
        <li class="level_01" :class="{on:check==index}" @click="tab(index)" v-for="(item,index) in menuList" :key="index">
            <router-link :to="item.gnlj">
              <p><i class="iconfont" :class="item.tblj"></i>{{item.gnmc}}</p>
            </router-link>
        </li>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import Tree from '@/components/tree/tree.vue'
export default {
  name: '',
  // components: { Tree },
  data() {
    return {
      menuList: [],
      check: 0,
    }
  },
  created() {
    let power = JSON.parse(sessionStorage.getItem('power'));
    for(var i =0; i < power.length; i++) {
      if (power[i].gnlj == "/dafw") {
        this.menuList = power[i].childrens;
      }
    }
  },
  methods: {
    tab: function(res) {
      this.check = res;
    },
  },
 watch:{
   $route:{
     handler:function(val,old){
       var _this = this;
       var _path = val.val;
       this.$nextTick(()=>{
         var _num = this.menuList.findIndex((item)=>{
           return item.gnlj == _this.$route.path;
        })
       _this.check = _num;
       });
     },
     immediate:true,
     deep:true
   }
 }
};
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
  background: none;
}
</style>