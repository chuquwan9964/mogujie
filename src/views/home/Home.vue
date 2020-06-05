<template>
  <div id="home">
    <nav-bar class="bg-pink">
      <span slot="center" class="center-font">首页</span>
    </nav-bar>
    <tab-control
      :titles="titles"
      class="tab-control-fixed"
      @changeDisplayData="changeDisplayData"
      v-show="enableTabControlFixed"
      ref="tabControl1">
    </tab-control>
    <go-top v-show="isShowGoTop" @click.native="goTop"></go-top>
    <scroll-component
      class="wrapper"
      :probeType="3"
      :isPullUpLoad="true"
      @onScroll="onScroll"
      @onPullUp="onPullUp"
      ref="scroll"
    >
      <home-swiper :banners="this.banners" @imageLoad="imageLoad" ref="swiper"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <popular-this-week></popular-this-week>
      <tab-control
        :titles="titles"
        @changeDisplayData="changeDisplayData"
        ref="tabControl2"
      >
      </tab-control>
      <goods-list :goodsList="displayData[currentType].list"></goods-list>
    </scroll-component>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { getBanners, getDisplayData } from "@/network/home/homeNetwork";
import HomeSwiper from "./childcomponents/HomeSwiper";
import HomeRecommend from "./childcomponents/JHHomeRecommend";
import PopularThisWeek from "./childcomponents/PopularThisWeek";
import TabControl from "@/components/content/tabcontrol/TabControl";
import ScrollComponent from "@/components/common/scrollcomponent/ScrollComponent";
import GoodsList from "./childcomponents/GoodsList";
import GoTop from '@/components/common/gotop/GoTop'
export default {
  data() {
    return {
      banners: [],
      recommend: [],
      titles: ["流行", "新款", "精选"],
      displayData: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: "pop",
      enableTabControlFixed: false,
      scrollOffsetTop: 0,
      atPositionY: 0, //离开时的Y轴的位置
      isShowGoTop: false  //是否显示返回顶部按钮
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    PopularThisWeek,
    TabControl,
    ScrollComponent,
    GoodsList,
    GoTop
  },
  created() {
    this.getBannersData();
    this.getDisplayData("pop", 1);
    this.getDisplayData("new", 1);
    this.getDisplayData("sell", 1);
  },
  mounted() {
    this.$bus.$on("goodsImageLoadFinished",() => {
      if (this.$route.path.indexOf('/home') != -1)
          this.$refs.scroll.refresh();
    })
  },
  deactivated() {
    //保存位置
    this.atPositionY = this.$refs.scroll.getPositionY();
    console.log(this.$refs.scroll.scroll);
    this.$refs.swiper.$refs.swiper.stopScroll();
  },
  activated() {
    //跳转位置,跳转时间为0
    // if(this.atPositionY)
    this.$refs.scroll.scrollTo(0,this.atPositionY,1);
    this.$refs.swiper.$refs.swiper.startScroll();
    this.$refs.scroll.refresh();
  },
  methods: {
    getBannersData() {
      getBanners().then(data => {
        this.getBannersSwiper(data);
        this.getRecommend(data);
      });
    },
    getBannersSwiper(data) {
      this.banners = data.data.data.banner.list;
    },
    getRecommend(data) {
      this.recommend = data.data.data.recommend.list;
    },
    getDisplayData(type, page) {
      getDisplayData(type, page).then(ret => {
        this.displayData[type].page++;
        this.displayData[type].list.push(...ret.data.data.list);
      });
    },
    changeDisplayData(index) {
      if (index == 0) {
        this.currentType = "pop";
      } else if (index == 1) {
        this.currentType = "new";
      } else if (index == 2) {
        this.currentType = "sell";
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.scroll.refresh();
    },
    onScroll(position) {
      if (Math.abs(position.y) > this.scrollOffsetTop) {
        this.enableTabControlFixed = true;
      } else {
        this.enableTabControlFixed = false;
      }
      if(Math.abs(position.y) > 200){
        this.isShowGoTop = true;
      }else{
        this.isShowGoTop = false;
      }
    },
    initTabControlOffset() {
      const t2 = this.$refs.tabControl2;
      this.scrollOffsetTop = t2.$el.offsetTop;
    },
    imageLoad(arg) {
      console.log(arg);
      this.initTabControlOffset();
    },
    onPullUp() {
      this.loadMore();
      this.$refs.scroll.finishPullUp();
    },
    loadMore() {
      this.getDisplayData(this.currentType,this.displayData[this.currentType].page+1);
    },
    goTop() {
      this.$refs.scroll.scrollTo(0,0,500);
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
  height: calc(100vh - 93px);
}
#home {
  position: relative;
}
.bg-pink {
  background-color: #ff8198;
}
.center-font {
  color: #fff;
  font-size: 16px;
  letter-spacing: 10px;
}
.tab-control-fixed {
  position: absolute;
  top: 44px;
  width: 100%;
}
</style>
