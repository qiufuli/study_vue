<template>
  <el-container>
    <div class="forms" :style="{'height':height+'px','padding':0}">
      <div class="bgimg">
      </div>
    </div>
  </el-container>
</template>
<script>
export default {
  name: "",
  data(){
    return {
      height: window.innerHeight - 80
    };
  }
};
</script>
<style scoped lang="scss">
.bgimg {
  width: 100%;
  height: 100%;
  background: url('./backimg.png') no-repeat center center;
  background-size:cover;
}
</style>