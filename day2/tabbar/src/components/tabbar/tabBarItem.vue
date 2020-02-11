<template>
  <div class="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive">
      <slot name="item-icon" ></slot>
    </div>
    <div class="active-icon" v-show="isActive">
      <slot name="active-icon"></slot>
    </div>
    <div class="item-text" :style="activeStyle" >
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  data() {
    return {};
  },
  props:{
    link:{
      type:String,
      required:true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.link) != -1
    },
    activeStyle(){
      return this.isActive ? {'color': 'red'} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.link)
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  height: 49px;
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>
