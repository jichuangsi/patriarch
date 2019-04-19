<template>
  <div class="Situation">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
        <div class="center_box" v-for="(item,index) in message_nav" :key="index">
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
                    课堂结束
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
export default {
  name: 'Situation',
  components: {
    top
  },
  data () {
    return {
      msg:'在校情况',
      back:true,
      message_nav:[
          {color:'0',message:'习题：背影课文预习',status:0},
          {color:'1',message:'习题：背影课文预习',status:0},
          {color:'2',message:'习题：背影课文预习',status:1},
      ]
    }
  },
  mounted () {

  },
  methods:{
      subject(index){
          this.navindex = index
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Situation {
  width: 100%;
  margin-top: 88px;
  .center {
      padding: 30px 45px;
      padding-bottom: 100px;
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
                  height: 28px;
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
                  top: 30px;
                  right: 0px;
                  font-size: 30px;
                  color: #3d72fe;
                  font-weight: 700;
                  letter-spacing:1px;
              }
          }
      }
  }
}
</style>
