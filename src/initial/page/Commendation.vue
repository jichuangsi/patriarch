<template>
  <div class="Commendation">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
        <div class="center_nav">
            <div v-for="(item,index) in center_nav" :key="index" :class="{center_color:navindex==index}">{{item}}</div>
        </div>
        <div class="center_box" v-for="(item,index) in message_nav" :key="index" @click="jump(item)">
            <div class="left">
                <img src="../../assets/img/语文_03.png" alt="" v-if="item.color==0">
                <img src="../../assets/img/数学_03.png" alt="" v-if="item.color==1">
                <img src="../../assets/img/英语_03.png" alt="" v-if="item.color==2">
                <img src="../../assets/img/物理_03.png" alt="" v-if="item.color==3">
                <img src="../../assets/img/地理_03.png" alt="" v-if="item.color==4">
                <img src="../../assets/img/政治_03.png" alt="" v-if="item.color==5">
                <img src="../../assets/img/历史_03.png" alt="" v-if="item.color==6">
                <img src="../../assets/img/生物_03.png" alt="" v-if="item.color==7">
                <img src="../../assets/img/化学_03.png" alt="" v-if="item.color==9">
            </div>
            <div class="right">
                <div class="title">{{item.message}}</div>
                <div class="text">2019年3月7日星期四18：06</div>
                <div class="details">
                    查看详情
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
export default {
  name: 'Commendation',
  components: {
    top
  },
  data () {
    return {
      msg:'教师评语',
      back:true,
      navindex:0,
      center_nav:['期末评语'], //'课堂嘉奖','习题嘉奖','考试嘉奖',
      message_nav:[
          {color:'0',message:'期末评语：初一上学期'},
          {color:'0',message:'期末评语：初一下学期'},
      ]
    }
  },
  mounted () {

  },
  methods:{
      jump(item){
        this.$router.push({
            path:'/evaluation',
            query:{
                text:item.message
            }
        })
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Commendation {
  width: 100%;
  margin-top: 88px;
  .center {
      padding: 30px 45px;
      padding-bottom: 100px;
      .center_nav {
          width: 100%;
          margin-bottom: 30px;
          font-weight: 700;
          div {
              display: inline-block;
              font-size: 20px;
              line-height: 24px;
              padding: 5px 20px;
              border-radius: 15px;
          }
          .center_color {
              color:#fff;
              background-color: #3d72fe;
          }
      }
      .center_box {
          width: 100%;
          height: 140px;
          border-radius: 20px;
          box-shadow: inset 0px 0px 6px rgba(102,102,102,0.5), 0px 0px 8px rgba(0,0,0,0.3);
          padding: 25px 20px;
          padding-bottom: 15px;
          display: flex;
          margin-bottom: 30px;
          .left {
              width: 100px;
              height: 100px;
              line-height: 100px;
              border-radius: 20px;
              img {
                  width: 100%;
                  height: 100%;
              }
          }
          .right {
              flex: 1;
              margin-left: 21px;
              position: relative;
              .title {
                  width: 80%;
                  font-size: 28px;
                  height: 40px;
                  line-height: 40px;
                  color: #333333;
                  font-weight: 700;
                  margin-top: 10px;
                  margin-bottom: 16px;
                  white-space: nowrap;
                  text-overflow:ellipsis;
                  overflow: hidden;
              }
              .text {
                  font-size: 20px;
                  color: #666666;
                  font-weight: 700;
              }
              .details {
                  position: absolute;
                  top: 39px;
                  right: 0px;
                  padding: 5px 20px;
                  border-radius: 15px;
                  background-color: #3d72fe;
                  color: #fff;
                  font-size: 20px;
                  font-weight: 500;
              }
          }
      }
  }
}
</style>
