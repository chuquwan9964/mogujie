<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goodsList" :key="index" :goods="item"></goods-list-item>
    <div class="loading">Loading~~~~~~</div>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components: {
    GoodsListItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .goods-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .loading {
    text-align: center;
    font-size: 15px;
    color: #f45555;
  }
</style>