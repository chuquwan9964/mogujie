<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  height: 44px;
  width: 100%;
  display: flex;
  box-shadow: 0 0 3px rgba(66, 66, 66, 0.3);
  line-height: 44px;
  text-align: center;
  z-index: 9;
  position: relative;
}
.left,
.right {
  width: 40px;
}
.left {
}
.center {
  flex: 1;
}
.right {
}
</style>
