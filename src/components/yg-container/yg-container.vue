<template>
  <div class="yg-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ygContainer",
  data() {
    return {
      msg: "This is the yg container！"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.yg-container {
  position:fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow:hidden;
  &:before {
    content: " ";
    display:block;
  }
}
</style>
