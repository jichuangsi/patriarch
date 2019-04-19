<template>
  <div class="foot">
    <div class="foot_box" v-for="(item,index) in footnav" :key="index" :class="{'color':current == index}">
      <router-link :to="item.to">
        <div class="up iconfont" :class="item.icon"></div>
        <div class="down">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot',
  props:{
      current:{
          type: Number,
          default: function () {
              return {}
          }
      }
  },
  data () {
    return {
      footnav:[
        {icon:'icon-tongxunlu',text:'家校通',to:'/'},
        {icon:'icon-pinglun',text:'信息通知',to:'message'},
        {icon:'icon-zixun',text:'教育头条',to:'education'},
        {icon:'icon-zhanghuzonglan',text:'学情总览',to:'overview'},
        {icon:'icon-wodeyong',text:'我的',to:'my'}
      ]
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.foot {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 108px;
  display: flex;
  box-shadow: 0px 0px 15px #999;
  background-color: #fff;
  .foot_box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
    a {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .up {
      font-size: 48px;
      margin-bottom: 10px;
    }
    .down {
      font-size: 24px;
    }
  }
  .color {
    color: #3d72fe !important;
  }
}
</style>
