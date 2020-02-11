<template>
  <div>
我是首页
<button @click="go">新闻</button>
<router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  methods: {
    go(){
      this.$router.push({path:'/home/news',params:{name:1,age:2}})
    }
  }
};
</script>

<style  scoped>

</style>
