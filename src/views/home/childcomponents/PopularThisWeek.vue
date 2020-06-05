<template>
  <popular>
    <popular-item>
      <a href="https://act.mogujie.com/zzlx67">
        <img src="@/assets/img/recommend_bg.794b6628.jpg" alt="" class="popular-bg">
      </a>
    </popular-item>
  </popular>
</template>

<script>
import Popular from "@/components/content/popular/Popular.vue"
import PopularItem from "@/components/content/popular/PopularItem.vue"
export default {
  components: {
    Popular,
    PopularItem
  }
}
</script>

<style>
  .popular-bg {
    width: 100%;
  }
</style>