<template>
  <div id="app">
    <span>{{$store.state.count}}</span>
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.aActive{
  color: red;
}
</style>
