<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:48px">
        <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">
          <router-link
            :to="item.link"
            v-if="item.link"
            :class="[{'mb_active':item.target}]"
          >{{item.name}}</router-link>
          <span v-else :class="[{'mb_active':item.target}]">{{item.name}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: ''
};
</script>
<style scoped lang="scss">

</style>