<template>
  <div class="top">
      <div class="fl iconfont icon-fanhui2" v-if="back" @click="backgo"></div>
      <div class="top_text">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'top',
  props:{
      msg: {
          type: String,
          default: function () {
              return {}
          }
      },
      back:{
          type: Boolean,
          default: function () {
              return {}
          }
      }
  },
  data () {
    return {
    }
  },
  methods:{
      backgo() {
        this.$router.go(-1)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top {
    width: 100%;
    height: 88px;
    line-height: 88px;
    position: fixed;
    top: 0px;
    left: 0px;
    background: url('../assets/img/上方导航栏.png') no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
    z-index: 100;
    .top_text {
      text-align: center;
      color: #fff;
      font-size: 34px;
    }
    .iconfont {
      color: #fff;
      font-size: 39px;
      position: absolute;
      padding: 0 20px;
    }
}
</style>
