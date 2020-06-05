<template>
  <div class="wrapper">
    <ul class="content">
      <li v-for="item in count" :key="item">{{ item }}</li>
      <li class="loading" v-show="isShowLoading">Loading......</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      pullUpLoad: true
    });
    this.scroll.on("pullingUp", () => {
      this.isShowLoading = !this.isShowLoading;
      setTimeout(() => {
        this.count += 20;
        this.scroll.finishPullUp();
        this.scroll.refresh();
        this.isShowLoading = !this.isShowLoading;
      },1000) 
    });
  },
  data() {
    return {
      count: 20,
      scroll: {},
      isShowLoading: false
    };
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul li {
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid #eeeeee;
  padding: 10px;
  text-align: center;
}
.wrapper {
  height: 80vh;
  border: 2px solid #cccccc;
  border-radius: 30px;
  margin: 10px;
  overflow: hidden;
  position: relative;
}
</style>
