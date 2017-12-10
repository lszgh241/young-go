<template>
  <div class="yg-header">
    <h1 class="title">{{title}}</h1>
    <span class="left-icon fa" :class="leftClassObj"></span>
    <span class="right-icon fa" :class="rightClassObj"></span>
  </div>
</template>

<script>
export default {
  name: "ygHeader",
  data() {
    return {};
  },
  props: ["title", "left", "right"],
  computed: {
    leftClassObj() {
      return "fa-" + this.left;
    },
    rightClassObj() {
      return "fa-" + this.right;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.yg-header {
  position: fixed;
  box-sizing: border-box;
  top:0;
  width: 100%;
  height: 0.78rem;
  line-height: 0.78rem;
  background-color: rgba(0, 0, 0, 0.3);
  .title {
    color: #fff;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
  }
  .left-icon {
    position: absolute;
    top: 0.2rem;
    left: 0.15rem;
    color: #fff;
    font-size: .35rem;
  }
  .right-icon {
    position: absolute;
    top: 0.2rem;
    right: 0.15rem;
    color: #fff;
    font-size: .35rem;
  }
}
</style>
