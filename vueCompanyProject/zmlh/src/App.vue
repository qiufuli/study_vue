<template>
  <div id="app">
    <!-- <keep-alive include="reverseOne"> -->
      <router-view :info.sync="info"/>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      info: {
        kyyts: '',
        mtkfs: ''
      }
    };
  }
};
</script>

<style scoped>
</style>
