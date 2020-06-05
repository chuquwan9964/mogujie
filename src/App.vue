<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <tab-bar-main></tab-bar-main>
  </div>
</template>

<script>
import css from "@/assets/fonts/iconfont.css"
import TabBarMain from "./components/common/tabbar/TabBarMain"
export default {
  data() {
    return {
      message: "HelloWorld"
    };
  },
  components: {
    TabBarMain
  }
};
</script>

<style>
  @import "./assets/css/base.css";
</style>
