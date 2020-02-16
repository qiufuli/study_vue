<template>
  <div>
我是首页
<button @click="go">新闻</button>
<router-view></router-view>
  </div>
</template>

<script>
import $ from 'axios'
export default {
  data () {
    return {
    };
  },
  methods: {
    go(){
      this.$router.push({path:'/home/news',params:{name:1,age:2}})
    },
    init(){
      // get请求 参数 params
      $({
        url:'https://httpbin.org/headers',
        method:'get',
        params:{
          age:11
        }
      }).then(res=>{
        console.log(res);
      })
       // post请求 参数 data
      $({
        url:'https://httpbin.org/headers',
        method:'post',
        data:{
          age:11
        }
      }).then(res=>{
        console.log(res);
      })
    }
  },
  created(){
    this.init();
  },
};
</script>

<style  scoped>

</style>
