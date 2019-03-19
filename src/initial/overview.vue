<template>
  <div class="overview">
    <top :msg="msg"></top>
    <div class="nav">
      <div style="backgroundColor:#2a8cf7;"><i class="iconfont icon-xuexiaoqingkuang"></i><span>在校情况</span></div>
      <div style="backgroundColor:#ef7b42;"><i class="iconfont icon-kechengbiao"></i><span>课程表</span></div>
      <div style="backgroundColor:#4da2c7;"><i class="iconfont icon-zuoye"></i><span>当天作业</span></div>
      <div style="backgroundColor:#63d4c0;"><i class="iconfont icon-jiajiang"></i><span>获得嘉奖</span></div>
      <div style="backgroundColor:#d15fbf;"><i class="iconfont icon-baobiao"></i><span>学情报表</span></div>
      <div style="backgroundColor:#4c48e5;"><i class="iconfont icon-tushuguan"></i><span>家长图书馆</span></div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
export default {
  name: "overview",
  components: {
    top
  },
  data() {
    return {
      msg: "学情总览"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overview {
  width: 100%;
  .nav {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div {
      width: 300px;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      margin-right: 50px;
      margin-bottom: 30px;
      box-shadow: inset 0px 0px 32px rgba(102, 102, 102, 1), 0px 0px 16px rgba(0, 0, 0, 0.5);
      i {
        color: #fff;
        font-size: 160px;
      }
      span {
        font-size: 34px;
        font-weight: 700;
        color: #fff;
      }
    }
    div:nth-child(2n){
      margin-right: 0px;
    }
  }
}
</style>
