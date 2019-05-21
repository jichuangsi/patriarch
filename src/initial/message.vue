<template>
  <div class="message">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
        <div class="center_nav">
            <div v-for="(item,index) in center_nav" :key="index" :class="{center_color:navindex==index}" @click="subject(index)">{{item}}</div>
        </div>
        <div class="center_box" v-for="(item,index) in message_nav" :key="index" @click="jump(item)" v-if="status == item.noticeType || status ==''"
           @touchstart='touchStart($event, index)'
           @touchmove='touchMove'>
            <div class="left" :class="{'orange':item.noticeType == 'S','cyan':item.noticeType == 'X','blue':item.noticeType == 'C'}">
                <div class="iconfont" :class="{'icon-tongzhi':item.noticeType == 'S','icon-liaotian':item.noticeType == 'X','icon-xiaoyuanzhuanqu':item.noticeType == 'C'}"></div>
                <i v-if="item.read == '0'"></i>
            </div>
            <div class="right">
                <div class="title">
                    <span v-if="item.noticeType=='S'">系统通知：{{item.content}}</span>
                    <span v-if="item.noticeType=='X'">老师消息：</span>
                    <span v-if="item.noticeType=='C'">校园通知：{{item.title}}</span>
                </div>
                <div class="text">{{item.createdTime}}</div>
                <div class="details" v-if="!delshow||startindex!=index||item.noticeType!='S'">查看详情</div>
                <div class="del" :class="{delbox:delshow&&startindex==index}" @click.stop="del(item.id)"></div>
            </div>
        </div>
    </div>
    <foot :current="current"></foot>
  </div>
</template>

<script>
import top from '@/components/top'
import foot from '@/components/foot'
import {parentGetNewNotices,getNoticeByNoticeId,deleteParentNotice} from '@/api/api'
export default {
  name: 'message',
  components: {
    top,foot
  },
  data () {
    return {
      msg:'信息通知',
      back:false,
      current: 1,
      navindex:0,
      center_nav:['全部','系统通知','校园通知','家校通'],
      message_nav:[],
      status:'',
      startX:'',
      endX:'',
      delshow:false,
      startindex:''
    }
  },
  mounted () {
      this.getdata()
  },
  methods:{
      jump(item){
          console.log(item)
        getNoticeByNoticeId(item.id).then(res=>{
            console.log(res)
            if(res.data.code == '0010'){
                this.$store.commit('MESSAGE',res.data.data)
                this.$router.push({path:'/announcement'})
            }else {
                this.getdata()
            }
        })
      },
      subject(index){
          this.navindex = index
          if(index == 0){
            this.status = ''
          } else if(index == 1){
            this.status = 'S'
          } else if(index == 2){
            this.status = 'C'
          } else if(index == 3){
            this.status = 'X'
          }
      },
      getdata(){
          parentGetNewNotices().then(res=>{
              console.log(res)
              if(res.data.code == '0010'){
                  this.message_nav = res.data.data
                  for(let i = 0; i<this.message_nav.length;i++){
                      this.message_nav[i].createdTime = this.getLocalTime(this.message_nav[i].createdTime/1000).split(' ')[0].split('/')[0]+'年'+this.getLocalTime(this.message_nav[i].createdTime/1000).split(' ')[0].split('/')[1]+'月'+this.getLocalTime(this.message_nav[i].createdTime/1000).split(' ')[0].split('/')[2]+'日'+' '+this.getLocalTime(this.message_nav[i].createdTime/1000).split(' ')[1]
                  }
              }
          })
      },
      touchStart(e,index){
          this.startindex = index
          if(e.touches.length == 1){
          // 记录开始位置
          this.startX = e.touches[0].clientX;
        }
      },
      touchMove(e){
          if(e.touches.length == 1){
          // 记录开始位置
          this.endX = e.touches[0].clientX;
          let x = this.startX-this.endX
          if(x>10){
              this.delshow = true
          }else {
              this.delshow = false
          }
        }
      },
      del(id){
          deleteParentNotice(id).then(res=>{
              console.log(res)
              if(res.data.code =='0010'){
                  this.delshow = false
                this.startindex = ''
                this.getdata()
              }
          })
      },
    getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message {
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
          overflow: hidden;
          .left {
              width: 100px;
              height: 100px;
              line-height: 100px;
              border-radius: 20px;
              background-color: #ef7c3d;
              position: relative;
              div {
                font-size: 52px;
                text-align: center;
                color: #fff;
              }
              i {
                  width: 15px;
                  height: 15px;
                  display: inline-block;
                  position: absolute;
                  right: 5px;
                  top: 5px;
                  border-radius: 50%;
                  background-color: red;
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
              .del {
                width: 140px;
                height: 140px;
                background: url('../assets/img/按钮.png') no-repeat;
                background-position: -277px -6178px;
                background-size: 1920px 8000px;
                position: absolute;
                top: -24px;
                right: -160px;
                transition: right 1s;
              }
              .delbox {
                  right: -20px;
              }
          }
      }
  }
}
</style>
