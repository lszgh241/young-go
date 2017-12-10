<template>
  <yg-container>
    <yg-header title="YOUNG-GO!" left="reply" right="save"></yg-header>
    <yg-card :cardInfos="cardInfos"></yg-card>
  </yg-container>
</template>

<script>
import ygCard from "../yg-card/yg-card";
import ygHeader from "../yg-header/yg-header";
import ygContainer from "../yg-container/yg-container";
export default {
  name: "ygCardEditor",
  data() {
    return {
      cardInfos: {}
    };
  },
  components: {
    "yg-container": ygContainer,
    "yg-header": ygHeader,
    "yg-card": ygCard
  },
  created() {
    this.$http.get("/api/getCardInfo").then(function(res) {
      // 这里在回调中进行了set，所以这个cardInfo势必会因为请求成功进行一次改变
      this.$set(this, "cardInfos", res.data);
    });
  }
};
</script>

<style scoped lang="less">

</style>
