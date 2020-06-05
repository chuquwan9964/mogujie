<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" @click="tabClick(index)">
      <span :class="{ 'tab-control-active': index == currentIndex }">{{
        item
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('changeDisplayData',index);
    }
  }
};
</script>

<style>
.tab-control {
  height: 40px;
  display: flex;
  line-height: 40px;
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.tab-control div {
  flex: 1;
  text-align: center;
}
.tab-control div span {
  padding: 5px;
  color: #999999;
  transition: all 0.3s;
}
.tab-control .tab-control-active {
  border-bottom: 2px solid pink;
  color: pink;
}
</style>
