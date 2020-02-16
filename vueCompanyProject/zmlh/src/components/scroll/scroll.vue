<docs>
  ## scroll 滚动
</docs>
<template>
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="(item, index) in list" class="li-item"
        :key="index">{{item}}</li>
      </ul>
    </div>
</template>
<script>
import Bscroll from 'better-scroll';

export default {
  name: 'scroll',
  props: {
    info: {
      type: Object
    }
  },
  data() {
    const list = [];
    for (let i = 0; i < 50; i += 1) {
      list.push(i * Math.random() * 1000000000);
    }

    return {
      list
    };
  },
  methods: {
    _initScroll() {
      /* eslint-disable no-new */
      new Bscroll(this.$refs.wrapper);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  }
};
</script>
<style lang="scss" scoped>
  @import '~common/scss/variable.scss';
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
  }
  .content {
    line-height: 2;
    font-size: $font-size-large;
    padding-left: $padding-base;
  }
</style>
