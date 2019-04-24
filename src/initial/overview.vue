<template>
  <div class="overview">
    <top :msg="msg" :back="back"></top>
    <div class="nav">
      <router-link to="Situation"><div class="div1"></div></router-link>
      <router-link to="Schedule"><div class="div2"></div></router-link>
      <router-link to="homework"><div class="div3"></div></router-link>
      <router-link to="Commendation"><div class="div4"></div></router-link>
      <router-link to="Report"><div class="div5"></div></router-link>
      <router-link to="library"><div class="div6"></div></router-link>
    </div>
    <foot :current="current"></foot>
  </div>
</template>

<script>
import top from "@/components/top";
import foot from '@/components/foot'
export default {
  name: "overview",
  components: {
    top,foot
  },
  data() {
    return {
      msg: "学情总览",
      back:false,
      current:3
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overview {
  width: 100%;
  margin-top: 128px;
  .nav {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 128px;
    padding: 0px 45px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div {
      margin: 0px;
      width: 314px;
      height: 314px;
      // margin-bottom: 50px;
    }
    div:active {
      width: 300px;
      height: 300px;
      margin: 7px;
    }
    .div1{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -163px;
      background-size: 1920px 8000px;
    }
    .div1:active{
      background-position: -1069px -163px;
    }
    .div2{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -594px;
      background-size: 1920px 8000px;
    }
    .div2:active{
      background-position: -1069px -594px;
    }
    .div3{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -2317px;
      background-size: 1920px 8000px;
    }
    .div3:active{
      background-position: -1069px -2317px;
    }
    .div4{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -1886px;
      background-size: 1920px 8000px;
    }
    .div4:active{
      background-position: -1069px -1886px;
    }
    .div5{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -1455px;
      background-size: 1920px 8000px;
    }
    .div5:active{
      background-position: -1069px -1455px;
    }
    .div6{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -1025px;
      background-size: 1920px 8000px;
    }
    .div6:active{
      background-position: -1069px -1025px;
    }
  }
}
</style>
