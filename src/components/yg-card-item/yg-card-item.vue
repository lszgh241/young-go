<template>
  <div class="yg-card-item" 
    @touchstart="startEvent"
    @touchmove="moveEvent"
    @touchend="endEvent"
    :style="itemStyle.style" 
    ref="item">
    <img class="yg-item-img" 
      :src="serverHost + product.src">
    <div class="yg-tool-list" v-if="menuStatu">
      <div class="yg-tool-button yg-rotate-button">
        <i class="fa fa-mail-reply"></i>
        旋转
      </div>
      <div class="yg-tool-button yg-scale-button">
        <i class="fa fa-arrows-h"></i>
        缩放
      </div>
      <div class="yg-tool-button yg-up-button">
        <i class="fa fa-angle-up"></i>
        上移
      </div>
      <div class="yg-tool-button yg-down-button">
        <i class="fa fa-angle-down"></i>
        下移
      </div>
    </div>
    <i class="yg-rotate fa fa-mail-reply"
      @touchmove="rotateEvent"
      v-if="buttonStatu === 'rotate'"
    ></i>
    <i class="yg-scale fa fa-arrows-h"
      @touchmove="scaleEvent"
      v-if="buttonStatu === 'scale'"
    ></i>
  </div>
</template>

<script>
export default {
  name: "ygCardItem",
  data() {
    return {
      itemStyle: this.product,
      position: {
        clientX: 0,
        clientY: 0,
        startX: 0,
        startY: 0
      },
      middlePoint: {
        x: 0,
        y: 0
      },
      menuStatu: false,
      buttonStatu: false
    };
  },
  props: ["product", "serverHost", "index"],
  methods: {
    directJudge(e) {
      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;
      var direct = {
        X: 0,
        Y: 0
      };
      if (currentX > this.position.clientX) {
        direct.X = 1;
      } else if (currentX < this.position.clientX) {
        direct.X = -1;
      }
      if (currentY > this.position.clientY) {
        direct.Y = 1;
      } else if (currentY < this.position.clientY) {
        direct.Y = -1;
      }
      this.position.clientX = currentX;
      this.position.clientY = currentY;
      return direct;
    },
    startEvent(e) {
      if (e.target.className === "yg-item-img") {
        // 给data赋值
        this.position.clientX = e.touches[0].clientX;
        this.position.clientY = e.touches[0].clientY;
        this.position.startX = e.touches[0].clientX;
        this.position.startY = e.touches[0].clientY;
        this.$emit("startEvent", this.index);
        // 计算出中点在哪里
        this.middlePoint.x = e.target.x + e.target.width / 2;
        this.middlePoint.y = e.target.y + e.target.height / 2;
      }
    },
    moveEvent(e) {
      var direct = this.directJudge(e);
      if (e.target.className === "yg-item-img") {
        this.$emit("moveEvent", this.index, direct.X, direct.Y);
      }
    },
    endEvent(e) {
      if (
        this.position.startX === e.changedTouches[0].clientX &&
        this.position.startY === e.changedTouches[0].clientY
      ) {
        if (e.target.nodeName === "IMG") {
          this.menuStatu = !this.menuStatu;
          this.buttonStatu = false;
        }
      } else if (e.target.classList.contains("yg-rotate-button")) {
        this.buttonStatu = "rotate";
        this.menuStatu = false;
      } else if (e.target.classList.contains("yg-scale-button")) {
        this.buttonStatu = "scale";
        this.menuStatu = false;
      } else if (e.target.classList.contains("yg-up-button")) {
        this.$emit("zIndexEvent", this.index, 1);
        this.menuStatu = false;
      } else if (e.target.classList.contains("yg-down-button")) {
        this.menuStatu = false;
        this.$emit("zIndexEvent", this.index, -1);
      }
    },
    rotateEvent(e) {
      var direct = this.directJudge(e);
      if (e.target.classList.contains("yg-rotate")) {
        var rotateDirect = 0;
        var touchX = e.touches[0].clientX;
        var touchY = e.touches[0].clientY;
        var middleX = this.middlePoint.x;
        var middleY = this.middlePoint.y;
        // 根据象限去划分位置
        // 这个是如果在右下角
        if (touchX > middleX && touchY > middleY) {
          if (
            (direct.X > 0 && direct.Y <= 0) ||
            (direct.X >= 0 && direct.Y < 0)
          ) {
            rotateDirect = -1;
          } else if (
            (direct.X < 0 && direct.Y >= 0) ||
            (direct.X <= 0 && direct.Y >= 0)
          ) {
            rotateDirect = 1;
          }
          // 这个是在右上角
        } else if (touchX > middleX && touchY < middleY) {
          if (
            (direct.Y > 0 && direct.X >= 0) ||
            (direct.Y >= 0 && direct.X > 0)
          ) {
            rotateDirect = 1;
          } else if (
            (direct.Y < 0 && direct.X <= 0) ||
            (direct.Y <= 0 && direct.X < 0)
          ) {
            rotateDirect = -1;
          }
          // 这个是在左上角
        } else if (touchX < middleX && touchY < middleY) {
          if (
            (direct.X > 0 && direct.Y <= 0) ||
            (direct.X >= 0 && direct.Y < 0)
          ) {
            rotateDirect = 1;
          } else if (
            (direct.X < 0 && direct.Y >= 0) ||
            (direct.X <= 0 && direct.Y > 0)
          ) {
            rotateDirect = -1;
          }
          // 这个是左下角
        } else if (touchX < middleX && touchY > middleY) {
          if (
            (direct.X > 0 && direct.Y >= 0) ||
            (direct.X >= 0 && direct.Y > 0)
          ) {
            rotateDirect = -1;
          } else if (
            (direct.X < 0 && direct.Y <= 0) ||
            (direct.X <= 0 && direct.Y < 0)
          ) {
            rotateDirect = 1;
          }
        }
        this.$emit("rotateEvent", this.index, rotateDirect);
      }
    },
    scaleEvent(e) {
      var direct = this.directJudge(e);
      var scale = 0;
      if ((direct.X > 0 && direct.Y >= 0) || (direct.X >= 0 && direct.Y > 0)) {
        scale = 1;
      } else if (
        (direct.X < 0 && direct.Y <= 0) ||
        (direct.X <= 0 && direct.Y < 0)
      ) {
        scale = -1;
      }
      this.$emit("scaleEvent", this.index, scale);
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.button() {
  position: absolute;
  bottom: -0.4rem;
  right: -0.4rem;
  font-size: 0.25rem;
  transform: rotate(90deg);
  padding: 6px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.8);
}
.yg-card-item {
  position: absolute;
  padding: 0.05rem;
  transform-origin: center center;
  .yg-item-img {
    width: 100%;
  }
  .yg-rotate {
    .button();
  }
  .yg-scale {
    .button();
    transform: rotate(45deg);
  }
  .yg-tool-list {
    position: absolute;
    left: 100%;
    top: 0%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.2rem;
    text-align: center;
    .yg-tool-button {
      padding: 9px;
      color: rgba(255, 255, 255, 0.6);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
