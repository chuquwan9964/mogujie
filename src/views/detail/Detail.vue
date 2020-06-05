<template>
  <div>
    <nav-bar>
      <div slot="left" @click="back">
        <i class="iconfont icon-leftarrow"></i>
      </div>
      <div slot="center" class="detail-center">
        <span v-for="(item,index) in topFonts" 
        :key="index" 
        :class="{'detail-active': index === currentIndex}"
        @click="currentIndex = index">{{item}}</span>
      </div>
      <div slot="right"></div>
    </nav-bar>
    <detail-swiper :itemsCount="getItemCount">
      <detail-swiper-item v-for="(item,index) in detailData.swiperImages" :key="index" class="detail-swiper-item">
        <img :src="item" alt="">
      </detail-swiper-item>
    </detail-swiper>

    <!--good girl-->
    <div v-for="(item,index) in detailData.detailImages" :key="index" style="margin-top: 100px;">
      <img :src="item" alt="" width="100%">
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"; 
import DetailSwiper from "@/components/common/swiper/Swiper.vue"; 
import DetailSwiperItem from "@/components/common/swiper/SwiperItem.vue"; 
import {getDetailData,DetailData} from "@/network/detail/detailNetwork.js"
export default {
  name: 'detail',
  created() {
    this.handleId();
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailSwiperItem
  },
  data() {
    return {
      iid: this.$route.query.iid,
      topFonts: ['商品','参数','评论','推荐'],
      currentIndex: 0,
      detailData: {}
    }
  },
  computed: {
    getItemCount() {
      const images = this.detailData.swiperImages;
      return images?images.length:0;
    }
  },
  methods: {
    handleId() {
      getDetailData(this.iid).then(ret => {
        console.log(ret);
        this.detailData = this.handleData(ret);
      })
    },
    handleData(data) {
      return new DetailData(data.data.result.itemInfo.topImages,
                            data.data.result.detailInfo.detailImage[0].list,
                            );
    },
    back() {
      this.$router.back();
    }
  }
}
</script>

<style>
  .detail-center {
    display: flex;
    justify-content: space-around;
    padding: 0 25px;
  }
  .detail-center span {
    color: #666666;
    font-size: 14px;
  }
  .detail-active {
    color: #ff5777!important;
  }
  .detail-swiper-item {
    height: 40vh;
    overflow: hidden;
  }
</style>