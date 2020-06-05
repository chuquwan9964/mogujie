<template>
  <div>
    <recommend>
      <recommend-item v-for="(item,index) in recommend" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" class="recommend-img">
          <span class="recommend-title">{{item.title}}</span>
        </a>
      </recommend-item>
    </recommend>
  </div>
</template>

<script>
import Recommend from "@/components/common/recommend/Recommend";
import RecommendItem from "@/components/common/recommend/RecommendItem";
export default {
  components: {
    Recommend,
    RecommendItem
  },
  props: {
    recommend: {
      type: Array
    }
  }
};
</script>

<style>
  .recommend-img {
    width: 80px;
    height: 80px;
    margin: 10px 0;
  }
  .recommend-title {
    text-decoration: none;
    font-size: 14px;
    color: #999999;
  }
</style>
