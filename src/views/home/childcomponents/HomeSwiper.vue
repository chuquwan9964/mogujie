<template>
      <swiper :scrollDuration="parseInt('2')" :itemsCount="parseInt(this.banners.length)" ref="swiper">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageFinishLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper.vue"
import SwiperItem from "@/components/common/swiper/SwiperItem.vue"
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array
    }
  },
  methods: {
    swiperImageFinishLoad() {
      this.$emit('imageLoad');
    }
  }
}
</script>
<style>
</style>