<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .tab-bar {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0px;
    display: flex;
    border-top: 1px solid rgba(99,99,99,.3);
    background-color: #eee;
    color: #000;
  }
</style>