<template>
  <div class="tab-bar-item" @click="jumpRoute" :style="activeStyle">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="font">
      <slot name="font"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpRoute(){
      if(this.path == this.$route.path){
        alert('您已经在了~~~')
        return;
      }
      this.$router.push(this.path);
    }
  },
  props: {
    path: String
  },
  computed: {
    activeStyle(){
      if(this.$route.path == this.path){
        return 'color: hotpink';
      }else{
        return '';
      }
    }
  }
}
</script>

<style>
  .tab-bar-item {
    padding: 5px 0;
    flex: 1;
    cursor: pointer;
  }
  .icon,.font {
    text-align: center;
    font-size: 16px;
    margin: 0 auto;
  }
  .icon {
    font-size: 20px;
  }

</style>