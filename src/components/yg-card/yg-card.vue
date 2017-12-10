<template>
  <div class="yg-card">
    <div class="yg-card-header">
      <i class="yg-user-icon" :style="iconStyle"></i>
      <div class="yg-user-text-box">
       <h1 class="yg-user-name">{{cardInfos.author}}</h1>
       <h2 class="yg-user-details">{{cardInfos.date}}</h2>
      </div>
    </div>
    <yg-card-item 
      v-for="(product, index) in cardInfos.products" 
      :product="product" :serverHost="cardInfos.serverHost" 
      :index="index"
      @startEvent="startEvent"
      @moveEvent="moveEvent"
      @endEvent="endEvent"
      @rotateEvent="rotateEvent"
      @scaleEvent="scaleEvent"
      @zIndexEvent="zIndexEvent"
      :key="product.name"></yg-card-item>
    <!-- <div class="yg-card-tool">
      <div class="yg-card-info-content">
        <h4 class="yg-card-title"></h4>
        <span class="yg-card-text"></span>
      </div>
    </div> -->
  </div>
</template>

<script>
import ygCardItem from "../yg-card-item/yg-card-item";
export default {
  name: "ygCard",
  data() {
    return {
      iconStyle: {
        backgroundImage:
          "url(" + this.cardInfos.serverHost + this.cardInfos.icon + ")"
      }
    };
  },
  props: ["cardInfos"],
  // 我真是操你大爷了居然是还得去监听他改变才能获取，这是周期的问题吧
  watch: {
    cardInfos: function(newVal, oldVal) {
      this.iconStyle.backgroundImage =
        "url(" + newVal.serverHost + newVal.icon + ")";
    }
  },
  components: { ygCardItem },
  methods: {
    startEvent(index) {},
    moveEvent(index, x, y) {
      var product = this.cardInfos.products[index];
      var left = this.cardInfos.products[index].style.left;
      var top = this.cardInfos.products[index].style.top;
      if (x > 0) {
        left = parseFloat(left.split("%")[0]) + 0.1 + "%";
        product.style.left = left;
      } else if (x < 0) {
        left = parseFloat(left.split("%")[0]) - 0.1 + "%";
        product.style.left = left;
      }
      if (y > 0) {
        top = parseFloat(top.split("%")[0]) + 0.1 + "%";
        product.style.top = top;
      } else if (y < 0) {
        top = parseFloat(top.split("%")[0]) - 0.1 + "%";
        product.style.top = top;
      }
    },
    endEvent() {},
    rotateEvent(index, rotate) {
      var transform = this.cardInfos.products[index].style.transform;
      var transformRotate = transform.split(" ")[0];
      var transformScale = transform.split(" ")[1];
      var newDeg =
        "rotate(" +
        (parseFloat(transformRotate.split("(")[1].split("deg")[0]) +
          parseFloat(rotate) / 5) +
        "deg) " +
        transformScale;
      this.$set(this.cardInfos.products[index].style, "transform", newDeg);
    },
    scaleEvent(index, scale) {
      var transform = this.cardInfos.products[index].style.transform;
      var transformRotate = transform.split(" ")[0];
      var transformScale = transform.split(" ")[1];
      var newScale =
        transformRotate +
        " scale(" +
        (parseFloat(transformScale.split("(")[1].split(")")[0]) +
          parseFloat(scale / 200)) +
        ") ";
      this.$set(this.cardInfos.products[index].style, "transform", newScale);
    },
    zIndexEvent(index, zIndex) {
      console.log(index, zIndex);
      var ZI =
        parseInt(this.cardInfos.products[index].style["z-index"]) +
        parseInt(zIndex);
      console.log(ZI);
      this.$set(this.cardInfos.products[index].style, "z-index", ZI);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.yg-card {
  width: 80vw;
  height: 85vh;
  border-radius: 0.16rem;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 auto;
  position: relative;
  .yg-card-header {
    display: flex;
    .yg-user-icon {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 100%;
      border: 1px solid #333;
      margin: 0.2rem;
      background-size: 100%;
    }
    .yg-user-text-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .yg-user-name {
        font-weight: bold;
        font-size: 0.28rem;
      }
      .yg-user-details {
        margin-top: 0.05rem;
        font-size: 0.2rem;
      }
    }
  }
  .yg-card-tool {
    .yg-card-info-content {
    }
  }
}
</style>
