<template>
  <div class="top">
      <div class="top_text">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'top',
  props:['msg'],
  data () {
    return {
    }
  },
  methods:{
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top {
    width: 100%;
    height: 88px;
    line-height: 88px;
    background: url('../assets/img/上方导航栏.png') no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
    .top_text {
      text-align: center;
      color: #fff;
      font-size: 34px;

    }
}
</style>
