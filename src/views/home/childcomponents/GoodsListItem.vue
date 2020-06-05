<template>
  <div class="goods-list-item" @click="goDetail">
    <img :src="goods.show.img" alt="" @load="GoodsImageLoad">
    <p v-text="goods.title" class="goods-content"></p>
    <div>
      <span v-text="'￥'+goods.price" class="goods-price"></span>
      <span class="iconfont icon-star star"></span>
      <span v-text="goods.cfav" class="like-count"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    GoodsImageLoad() {
      this.$bus.$emit('goodsImageLoadFinished');
    },
    goDetail() {
      this.$router.push(
        {
          path: '/detail',
          query: {
            iid: this.goods.iid
          }
        }
      )
    }
  }
}
</script>

<style>
  .goods-list-item {
    width: 48%;
  }
  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-content {
    white-space: nowrap;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    margin-top: 5px;
    color: #777777;
  }
  .goods-list-item div {
    text-align: center;
    font-size: 10px; 
    margin-bottom: 5px;
  }
  .goods-list-item div span {
    margin: 0 5px;
  }
  .goods-price {
    color: #ff5777;
  }
  .like-count {
    color: #777777;
  }
  .star {
    color: #ff5777;
    margin-right: -5px!important;
  }
</style>