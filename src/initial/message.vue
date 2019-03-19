<template>
  <div class="message">
    <top :msg ="msg"></top>
    <div class="center">
        <div class="center_box" v-for="(item,index) in message_nav" :key="index">
            <div class="left" :class="{'orange':item.color == 0,'cyan':item.color == 1,'blue':item.color == 2}">
                <div class="iconfont" :class="item.icon"></div>
            </div>
            <div class="right">
                <div class="title">系统通知:弓长张同学离校签到</div>
                <div class="text">2019年3月7日星期四18：06</div>
                <div class="details">查看详情</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
export default {
  name: 'message',
  components: {
    top
  },
  data () {
    return {
      msg:'信息通知',
      message_nav:[
          {icon:'icon-tongzhi',color:'0'},
          {icon:'icon-liaotian',color:'1'},
          {icon:'icon-xiaoyuanzhuanqu',color:'2'},
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message {
  width: 100%;
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
              background-color: #ef7c3d;
              div {
                font-size: 52px;
                text-align: center;
                color: #fff;
              }
          }
          .orange {
              background-color: #ef7c3d;
          }
          .cyan {
              background-color: #69d4c4;
          }
          .blue {
              background-color: #464fd2;
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
