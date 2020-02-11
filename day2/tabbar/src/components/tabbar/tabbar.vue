<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  data () {
    return {
    };
  },
  methods: {}
};
</script>

<style scoped>
@import '../../assets/css/base.css';
#tab-bar{
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  background-color: #f6f6f6;
  box-shadow: 0 -2px 1px rgba(100,100,100,0.1);
}

</style>
