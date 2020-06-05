<template>
  <div class="wrap">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: {}
    };
  },
  props: {
    isEnableClick: {
      type: Boolean,
      default: true
    },
    isPullUpLoad: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.makeScroll();
  },
  methods: {
    makeScroll() {
      this.scroll = new BScroll(this.$el, {
        click: this.isEnableClick,
        pullUpLoad: this.isPullUpLoad,
        probeType: this.probeType
      });
      this.scroll.on('scroll',this.onScroll);
      this.scroll.on('pullingUp',this.onPullUp);
    },
    onScroll(obj){
      this.$emit('onScroll',obj);
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    onPullUp() {
      this.$emit('onPullUp');
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    getPositionY() {
      return this.scroll.y;
    },
    scrollTo(x,y,time) {
      this.scroll.scrollTo(x,y,time);
    }
  }
};
</script>

<style></style>
