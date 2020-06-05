<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <span slot="icon" class="iconfont icon-home"></span>
      <span slot="font">主页</span>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <span slot="icon" class="iconfont icon-categorynormal"></span>
      <span slot="font">分类</span>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <span slot="icon" class="iconfont icon-gouwuche"></span>
      <span slot="font">购物车</span>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <span slot="icon" class="iconfont icon-profile"></span>
      <span slot="font">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./TabBar";
import TabBarItem from "./TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style></style>
