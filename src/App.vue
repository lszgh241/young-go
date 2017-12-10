<template>
  <!-- 整个app -->
  <div id="app">
    <div class="yg-background"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  .yg-background {
    width: 100vw;
    height: 100vh;
    background: url("../static/bg.jpg") no-repeat;
    position: fixed;
    z-index: -9999;
  }
}
</style>
