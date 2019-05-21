<template>
  <div class="Situation">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
        <div class="center_nav">
           <div v-for="(item,index) in center_nav" :key="index" :class="{center_color:navindex==index}" @click="subject(index)">{{item}}</div>
        </div>
        <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="center_box" v-for="(item,index) in message_nav" :key="index">
            <div class="left">
                <img src="../../assets/img/语文_03.png" alt="" v-if="item.subjectName=='语文'">
                <img src="../../assets/img/数学_03.png" alt="" v-if="item.subjectName=='数学'">
                <img src="../../assets/img/英语_03.png" alt="" v-if="item.subjectName=='英语'">
                <img src="../../assets/img/物理_03.png" alt="" v-if="item.subjectName=='物理'">
                <img src="../../assets/img/地理_03.png" alt="" v-if="item.subjectName=='地理'">
                <img src="../../assets/img/政治_03.png" alt="" v-if="item.subjectName=='政治'">
                <img src="../../assets/img/历史_03.png" alt="" v-if="item.subjectName=='历史'">
                <img src="../../assets/img/生物_03.png" alt="" v-if="item.subjectName=='生物'">
                <img src="../../assets/img/化学_03.png" alt="" v-if="item.subjectName=='化学'">
            </div>
            <div class="right">
                <div class="title">{{item.subjectName}}：{{item.courseName}}</div>
                <div class="text" v-if="navindex != 1">{{item.courseEndTime}}</div>
                <div class="text" v-if="navindex == 1">{{item.testEndTime}}</div>
                <div class="details">
                    <span v-if="navindex == 1">考试结束</span>
                    <span v-if="navindex == 0">课堂结束</span>
                    <div class="status"  v-if="navindex == 2">优</div>
                    <div class="statustext"  v-if="navindex == 2">课堂表现</div>
                </div>
            </div>
        </div>
        <div class="more" v-if="!pageshow">---上拉加载更多---</div>
        <div class="more" v-if="pageshow">---没有更多---</div>
        </mt-loadmore>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
import {getTestHistory, getCourseHistory,getCourseCommend} from '@/api/api'
export default {
  name: 'Situation',
  components: {
    top
  },
  data () {
    return {
      msg:'在校情况',
      back:true,
      navindex:0,
      center_nav:['课堂情况','考试情况','嘉奖情况'], //'全部',
      message_nav:[],
      student:[],
      pageNum: 1,
      pageSize: 10,
      allLoaded: false,
      pageshow: false
    }
  },
  
  mounted () {
    this.student = JSON.parse(localStorage.getItem('student'))?JSON.parse(localStorage.getItem('student')):[]
    this.getCoursedata()
  },
  methods:{
      subject(index){
          this.navindex = index
          this.pageshow = false
          this.allLoaded = false
          if(index == 0) {
              this.getCoursedata()
          }
          if(index == 1) {
              this.getTestdata()
          }
          if (index == 2) {
              this.getCommenddata()
          }
      },
      loadBottom(){
          console.log(123)
          if(this.pageshow){
            this.allLoaded = true
            this.$refs.loadmore.onBottomLoaded()
          }else{
            this.pagenum++
            if(this.navindex == 0) {
                this.getCoursedata()
            }
            if(this.navindex == 1) {
                this.getTestdata()
            }
            if (this.navindex == 2) {
                this.getCommenddata()
            }
            this.$refs.loadmore.onBottomLoaded()
            return
          }
      },
      //课堂情况
      getCoursedata(){
          getCourseHistory(this.student[0].studentId).then(res=>{
              console.log(res)
              if(res.data.code == '0010'){
                  this.message_nav.push(...res.data.data.content)
                  for (let i = 0; i<this.message_nav.length;i++){
                      this.message_nav[i].courseEndTime = this.getLocalTime(this.message_nav[i].courseEndTime)
                  }
                  if(res.data.data == ''){
                      this.pageshow = true
                  }
              }
          })
      },
      //考试情况
      getTestdata(){
          getTestHistory(this.student[0].studentId,this.pageNum,this.pageSize,'3').then(res=>{
                if(res.data.code == '0010'){
                    this.message_nav.push(...res.data.data.content)
                    for (let i = 0; i<this.message_nav.length;i++){
                        this.message_nav[i].testEndTime = this.getLocalTime(this.message_nav[i].testEndTime)
                    }
                  if(res.data.data == ''){
                      this.pageshow = true
                  }
                }
              })
      },
      //课堂点赞情况
      getCommenddata(){
          getCourseCommend(this.student[0].studentId,this.pageSize,this.pageNum).then(res=>{
                  if(res.data.code == '0010'){
                    this.message_nav.push(...res.data.data.content)
                    for (let i = 0; i<this.message_nav.length;i++){
                        this.message_nav[i].courseEndTime = this.getLocalTime(this.message_nav[i].courseEndTime)
                    }
                  if(res.data.data == ''){
                      this.pageshow = true
                  }
                }
              })
      },
    getLocalTime(nS) {     
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
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
                  top: 0px;
                  right: 0px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  span {
                    font-size: 30px;
                    margin-top: 30px;
                  }
                  .status {
                      width: 33px;
                      height: 33px;
                      line-height: 33px;
                      text-align: center;
                      font-size: 24px;
                      color: #fff;  
                      border-radius: 50%;
                      background-color: #69d4c4;
                  }
                  .statustext {
                      margin-top: 10px;
                      color: #666;
                  }
                .orange {
                    background-color: #ef7c3d;
                }
              }
          }
      }
  }
}
.more {
    text-align: center;
}
</style>
