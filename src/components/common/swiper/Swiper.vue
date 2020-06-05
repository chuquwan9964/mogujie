<template>
  <div class="swiper-wrap">
    <div
      class="swiper"
      @touchstart="touchstart"
      @touchend="touchend"
      @touchmove="touchmove"
      ref="swiper"
    >
      <slot></slot>
    </div>
    <div class="circle-list">
      <span
        v-for="(item, index) in itemsCount"
        :key="index"
        class="circle"
        :class="{ 'circle-active': currentIndex == item }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalWidth: 0,
      currentIndex: 1, //当前图的索引,从1开始
      swiperStyle: {},
      swiperPlayer: null, //定时器
      startPositionX: 0,
      endPositionX: 0,
      scrolling: false,
      shouldStartTransition: true
    };
  },
  watch: {
    swiperPlayer: function(oldV, newV) {}
  },
  props: {
    scrollDuration: {
      type: Number,
      default: 2
    },
    transitionDuration: {
      type: Number,
      default: 0.5
    },
    itemsCount: {
      type: Number,
      default: 0
    },
    offsetRadio: {
      type: Number,
      default: 0.22222
    }
  },
  mounted() {
    setTimeout(() => {
      this.addItems();
      this.startScroll();
    }, 1000);
  },
  methods: {
    setTransform(offset) {
      this.swiperStyle.transform = `translateX(${offset}px)`;
    },
    addItems() {
      const swiper = this.$refs.swiper;
      const items = swiper.querySelectorAll('.swiper-item');
      const len = items.length;
      if (len > 1) {
        const firstEle = items[0].cloneNode(true);
        const lastEle = items[len - 1].cloneNode(true);
        swiper.insertBefore(lastEle, items[0]);
        swiper.appendChild(firstEle);
        this.totalWidth = swiper.clientWidth;
        this.swiperStyle = swiper.style;
      }

      this.setTransform(-this.totalWidth);
    },
    startScroll() {
      if(this.swiperPlayer)
        return;
      const internal = setInterval(() => {
        this.scrollContent(-++this.currentIndex * this.totalWidth);
      }, this.scrollDuration * 1000);

      this.swiperPlayer = internal;
    },
    stopScroll() {
      // console.log(this.swiperPlayer)
      const ret = window.clearInterval(this.swiperPlayer);
      // console.log(ret);
      this.swiperPlayer = null;
    },
    scrollContent: function(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;
      // 1.开始滚动动画
      if (this.shouldStartTransition) {
        this.startTransition();
      }
      this.setTransform(currentPosition);
      // 2.判断滚动到的位置
      this.checkIndex();
      // 4.滚动完成
      setTimeout(() => {
        this.scrolling = false;
      }, this.transitionDuration * 1000);
    },
    checkIndex() {
      this.$el.addEventListener("transitionend", () => {
        if (this.currentIndex >= this.itemsCount + 1) {
          this.stopTransition();
          this.setTransform(-this.totalWidth);
          this.currentIndex = 1;
        }
        if (this.currentIndex <= 0) {
          this.stopTransition();
          this.setTransform(-this.itemsCount * this.totalWidth);
          this.currentIndex = this.itemsCount;
        }
      });
      // setTimeout(() => {
      //   if (this.currentIndex >= this.itemsCount + 1) {
      //     this.stopTransition();
      //     this.setTransform(-this.totalWidth);
      //     this.currentIndex = 1;
      //   }
      //   if (this.currentIndex <= 0) {
      //     this.stopTransition();
      //     this.setTransform(-this.itemsCount * this.totalWidth);
      //     this.currentIndex = this.itemsCount;
      //   }
      //   // this.startTransition();
      // }, this.transitionDuration * 1000);
    },
    startTransition() {
      this.swiperStyle.transition = `transform ${this.transitionDuration}s`;
    },
    stopTransition() {
      this.swiperStyle.transition = "transform 0s";
    },
    touchstart(e) {
      // if(this.scrolling){
      //   return;
      // }
      this.stopScroll();
      this.endPositionX = 0;
      this.startPositionX = e.changedTouches[0].clientX;
    },
    touchend(e) {
      // if(this.scrolling){
      //   return;
      // }
      this.endPositionX = e.changedTouches[0].clientX;
      const offset = this.endPositionX - this.startPositionX;
      let newIndex = 0;
      if (offset > 0) {
        if (offset >= this.totalWidth * this.offsetRadio) {
          newIndex = this.currentIndex - 1;
        } else {
          newIndex = this.currentIndex;
        }
      } else if (offset < 0) {
        if (Math.abs(offset) > this.totalWidth * this.offsetRadio) {
          newIndex = this.currentIndex + 1;
        } else {
          newIndex = this.currentIndex;
        }
      }
      this.currentIndex = newIndex;
      this.shouldStartTransition = true;
      this.scrollContent(-newIndex * this.totalWidth);
      if (!this.swiperPlayer) {
        this.startScroll();
      }
    },
    touchmove(e) {
      const offset = e.changedTouches[0].clientX - this.startPositionX;
      this.shouldStartTransition = false;
      this.stopTransition();
      this.scrollContent(-(this.currentIndex * this.totalWidth - offset));
      // console.log(this.swiperPlayer);
    }
  }
};
</script>

<style>
.swiper-wrap {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}
.circle-list {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}
.circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  margin: 0 2px;
}
.circle-active {
  background-color: #f0f;
}
</style>
