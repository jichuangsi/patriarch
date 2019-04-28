<template>
  <div class="homework">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
        <div class="center_nav">
            <div v-for="(item,index) in center_nav" :key="index" :class="{center_color:navindex==index}" @click="subject(index,item)">{{item}}</div>
        </div>
        <div class="center_box" v-for="(item,index) in message_nav" :key="index" v-if="center_text==item.subjectName||center_text=='全部'">
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
                <div class="title">习题：{{item.homeWorkName}}</div>
                <div class="text">{{item.endTime}}</div>
                <div class="details" v-if="item.status == '提交'">
                    <div class="status">✔</div>
                    <div class="statustext">已提交</div>
                </div>
                <div class="details" v-if="item.status == '未提交'">
                    <div class="status orange">!</div>
                    <div class="statustext">未提交</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
import {getStudentHomeWork} from '@/api/api'
export default {
  name: 'homework',
  components: {
    top
  },
  data () {
    return {
      msg:'当天作业',
      back:true,
      navindex:0,
      center_text:'全部',
      center_nav:['全部','语文','数学','英语','物理','地理','政治','生物','历史','化学'],
      id:'',
      message_nav:[]
    }
  },
  mounted () {
      this.getdata()
  },
  methods:{
      subject(index,val){
          this.navindex = index
          this.center_text = val
      },
      getdata() {
        this.id = JSON.parse(localStorage.getItem('student'))[0].studentId
        getStudentHomeWork(this.id).then(res=>{
            console.log(res)
            if(res.data.code == '0010'){
                this.message_nav = res.data.data
                for(let i = 0; i<this.message_nav.length;i++){
                    this.message_nav[i].endTime = this.getLocalTime(this.message_nav[i].endTime)
                }
                console.log(this.message_nav)
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
.homework {
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
                  .status {
                      width: 33px;
                      height: 33px;
                      line-height: 33px;
                      text-align: center;
                      font-size: 30px;
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
</style>
