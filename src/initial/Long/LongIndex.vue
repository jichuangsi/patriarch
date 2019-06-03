<template>
  <div class="index">
    <div class="top">
      <div class="left" @click="leftshow = !leftshow">
        <div></div>
        <ul :class="{'leftul':leftshow}">
          <li v-for="(item,index) in student" :key="index" @click.stop="switchId(item)">{{item.studentName}}</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item,index) in nav" :key="index" @click="Selection(index,item)" :class="{'licolor':current == index}">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="center">
      <div class="title">{{navtext}}</div>
      <div class="subjectnavup subjectnav">
        <div @click="subject = '语文'" :class="{'d1':subject == '语文'}"></div>
        <div @click="subject = '数学'" :class="{'d2':subject == '数学'}"></div>
        <div @click="subject = '英语'" :class="{'d3':subject == '英语'}"></div>
        <div @click="subject = '政治'" :class="{'d4':subject == '政治'}"></div>
      </div>
      <div class="subjectnavdown subjectnav">
        <div @click="subject = '物理'" :class="{'d5':subject == '物理'}"></div>
        <div @click="subject = '化学'" :class="{'d6':subject == '化学'}"></div>
        <div @click="subject = '生物'" :class="{'d7':subject == '生物'}"></div>
        <div @click="subject = '历史'" :class="{'d8':subject == '历史'}"></div>
      </div>
      
      <div class="echart" v-show="current != 3">
        <div
          id="myChart"
        ></div>
      </div>
      <div class="time_nav">
        <div
          v-for="(item,index) in time_nav"
          :key="index"
          @click="timenav(item)"
        ><span><i v-if="time_text.indexOf(item.text) != -1"></i></span>{{item.text}}</div>
      </div>
       <div class="table" v-show="current != 3">
        <table>
          <tr>
            <th>知识点</th>
            <th>占比</th>
            <th>正确率</th>
            <th>班级平均正确率</th>
          </tr>
          <tr v-for="(item,index) in tabletd" :key="index">
            <td v-for="(val,valindex) in item.value" :key="valindex">{{val}}</td>
          </tr>
        </table>
      </div> 
      <div class="good">
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
                  <div class="right_title">{{item.subjectName}}：{{item.courseName}}</div>
                  <div class="text">{{item.courseEndTime}}</div>
                  <div class="details">
                      <div class="status">优</div>
                      <div class="statustext">课堂表现</div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getStudentCourseScore,getStudentHomeworkScore,getStudentTestScore,getCourseCommendTime} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      current:0,
      subject:'语文',
      student:'',
      studentId:'',
      leftshow:true,
      navtext:'课堂统计',
      nav:['课堂统计','习题统计','考试统计','获得嘉奖'],
      dataname:[],
      datalist:[],
      time_text:'',
      time_nav:[],
      stamp_text:'',
      stamp_arr:[],
      tabletd:[],
      pageSize:10,
      pageNum:1,
      message_nav:[]
    }
  },
  watch:{
    subject(val){
      console.log(this.subject)
      if(this.current == 0){
        this.CourseScore()
      }
      if(this.current == 1) {
        this.HomeworkScore()
      }
      if(this.current == 2){
        this.StudentTestScore()
      }
    }
  },
  mounted(){
      localStorage.setItem('position','长图')
    this.getdata()
  },
  methods:{
    GetDateStr(AddDayCount) { 
        var date = new Date(); 
        date.setDate(date.getDate()+AddDayCount);//获取AddDayCount天后的日期 
        var month = date.getMonth()+1;//获取当前月份的日期 
        var day = date.getDate(); 
        return month+'月'+day+'日'; 
    },
    getdata(){
      this.time_text = this.GetDateStr(0)
      this.time_nav = [{text:this.GetDateStr(0)},{text:this.GetDateStr(-1)},{text:this.GetDateStr(-2)},{text:this.GetDateStr(-3)},{text:this.GetDateStr(-4)}]
      this.student = localStorage.getItem('student')?JSON.parse(localStorage.getItem('student')):''
      this.studentId = localStorage.getItem('student')?JSON.parse(localStorage.getItem('student'))[0].studentId:''
      for(let i = 0 ; i < this.time_nav.length; i++){
        this.time_nav[i].stamp = this.timestamp(i)
      }
      this.stamp_text = this.timestamp(0)+','
      this.stamp_arr = [this.timestamp(0)]
      this.CourseScore()
    },
    Selection(index,val) {
      this.navtext = val
      this.current = index
      if(index == 0) {
        this.CourseScore()
      }
      if(index == 1) {
        this.HomeworkScore()
      }
      if(index == 2) {
        this.StudentTestScore()
      }
      if(index == 3) {
        this.CourseCommend()
      }
    },
    switchId(val) {
      this.studentId = val.studentId
      this.leftshow = true
      if(this.current == 0){
        this.CourseScore()
      }else if(this.current == 1){
        this.HomeworkScore()
      }else if(this.current == 2) {
        this.StudentTestScore()
      }else if(this.current == 3){
        this.CourseCommend()
      }
    },
    timenav(val){
      if(this.time_text){
        if(this.time_text.indexOf(val.text) != -1){
          this.time_text = this.time_text.split(val.text)[0]+this.time_text.split(val.text)[1]
        }else{
          this.time_text += val.text
        }
      }else if(!this.time_text){
        this.time_text += val.text
      }
      if(this.stamp_text){
        if(this.stamp_text.indexOf(val.stamp) != -1){
          this.stamp_text = this.stamp_text.split(val.stamp+ ',')[0]+this.stamp_text.split(val.stamp+ ',')[1]
        }else{
        this.stamp_text += val.stamp + ','
        }
      }else if(!this.stamp_text){
        this.stamp_text += val.stamp + ','
      }
      this.stamp_arr = this.stamp_text.split(',').splice(0,this.stamp_text.split(',').length-1)
      // console.log(arr)
      // console.log(this.stamp_arr)
      if(this.current == 0){
        this.CourseScore()
      }else if(this.current == 1){
        this.HomeworkScore()
      }else if(this.current == 2) {
        this.StudentTestScore()
      }else if(this.current == 3){
        this.CourseCommend()
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let self = this
      let myChart = self.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          // formatter: '{b} <br/>{c} ({d}%)'，
          formatter: function(params) {
            var data = params.name.slice(0,5)
            for(let i = 0; i < params.name.length; i++) {
              if(i%5==0&&i!=0){
                data += '<br>'+params.name.slice(i,i+5)
              }
            }
            return data
          }
        },
        legend: {
            left: 0,
            bottom:0,
              textStyle: {
                fontSize: 14
              },
              // orient: 'vertical',
              icon: 'circle',
          data: self.dataname,
        },
        toolbox: {
          show: false,
          feature: {
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            }
          }
        },
        // calculable: true,
        series: [
          {
            label: {
              normal: {
                position: 'inner',
                show : false
              }
            },
            y:'top',
            type: 'pie',
            radius: [50, 80],
            center: ['50%', '20%'],
            data: self.datalist,
            color:['#347cf9','#58ce52','#ffc051','#4ba8ff','#ff7d8b','#ba61e8','#c622e5','#2feaf6','#ff7f8b']
          }
        ]
      })
    },
    timestamp(n){
      return new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000*n
    },
    CourseScore(){
      getStudentCourseScore(this.studentId,this.stamp_arr,this.subject).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          let arr1= []
          let arr2= []
          let arr3= []
          for(let j = 0 ;j<res.data.data.length;j++){
            arr1.push({id:j+1,value:[res.data.data[j].knowledgeName,(Number(res.data.data[j].knowledgeRate)*100).toFixed()+'%',(Number(res.data.data[j].studentRightRate)*100).toFixed()+'%',(Number(res.data.data[j].classRightAvgRate)*100).toFixed()+'%']}) 
            arr2.push(res.data.data[j].knowledgeName)
            arr3.push({value:(Number(res.data.data[j].knowledgeRate)*100).toFixed(),name:res.data.data[j].knowledgeName})
          }
          this.tabletd = arr1
          this.dataname = arr2
          this.datalist = arr3
          this.drawLine()
        }
      })
    },
    HomeworkScore(){
      getStudentHomeworkScore(this.studentId,this.stamp_arr,this.subject).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          let arr1= []
          let arr2= []
          let arr3= []
          for(let j = 0 ;j<res.data.data.length;j++){
            arr1.push({id:j+1,value:[res.data.data[j].knowledgeName,(Number(res.data.data[j].knowledgeRate)*100).toFixed()+'%',(Number(res.data.data[j].studentRightRate)*100).toFixed()+'%',(Number(res.data.data[j].classRightAvgRate)*100).toFixed()+'%']}) 
            arr2.push(res.data.data[j].knowledgeName)
            arr3.push({value:(Number(res.data.data[j].knowledgeRate)*100).toFixed(),name:res.data.data[j].knowledgeName})
          }
          this.tabletd = arr1
          this.dataname = arr2
          this.datalist = arr3
          this.drawLine()
        }
      })
    },
    CourseCommend(){
      // this.stamp_arr = [1553129100000]
      // this.studentId = '430c242713e2466fa87717beca952b910'
      getCourseCommendTime(this.studentId,this.stamp_arr).then(res=>{
        console.log(res)
        this.message_nav.push(...res.data.data)
        for (let i = 0; i<this.message_nav.length;i++){
            this.message_nav[i].courseEndTime = this.getLocalTime(this.message_nav[i].courseEndTime)
        }
      })
    },
    StudentTestScore(){
      getStudentTestScore(this.studentId,this.stamp_arr,this.subject).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          let arr1= []
          let arr2= []
          let arr3= []
          for(let j = 0 ;j<res.data.data.length;j++){
            arr1.push({id:j+1,value:[res.data.data[j].knowledgeName,(Number(res.data.data[j].knowledgeRate)*100).toFixed()+'%',(Number(res.data.data[j].studentRightRate)*100).toFixed()+'%',(Number(res.data.data[j].classRightAvgRate)*100).toFixed()+'%']}) 
            arr2.push(res.data.data[j].knowledgeName)
            arr3.push({value:(Number(res.data.data[j].knowledgeRate)*100).toFixed(),name:res.data.data[j].knowledgeName})
          }
          this.tabletd = arr1
          this.dataname = arr2
          this.datalist = arr3
          this.drawLine()
        }
      })
    },
    getLocalTime(nS) {     
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
    }
  },
  destroyed: function () { 
      localStorage.removeItem('position')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;
  background:  url('../../assets/img/背景.png');
  .top {
    width: 100%;
    height: 88px;
    display: flex;
    background-color: #d9d9d9;
    .left {
      width: 76px;
      height: 100%;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      div {
      width: 36px;
      height: 30px;
      background: url('../../assets/img/按钮1.png') no-repeat;
      background-size: 700px 1334px;
      background-position: -78px -600px;
      }
      ul {
        position: absolute;
        top: 88px;
        left: 0px;
        // height: 0px;
        overflow: hidden;
        background-color: #fff;
        z-index: 101;
        // transition: height 0.2s linear;
        li {
          padding: 15px 15px;
          margin-top: 10px;
        }
      }
      .leftul {
        // height: 200px;
        height: 0px;
      }
    }
    .right {
      flex: 1;
      height: 100%;
      ul {
        display: flex;
        li {
          flex: 1;
          font-size: 24px;
          line-height: 88px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .licolor {
          color: #3d72fe;
        }
      }
    }
  }
  .center {
    width: 100%;
    // height: 100%;
    background: url('../../assets/img/背景.png');
    // overflow: hidden;
    position: absolute;
    .title {
      text-align: center;
      padding-top: 40px;
      margin-bottom: 20px;
      font-size: 34px;
      letter-spacing: 5px;
      font-weight: 600;
      color: #3d72fe;
    }
    .subjectnav {
      width: 100%;
      padding: 0px 80px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      div {
        width: 125px;
        height: 42px;
      }
      
      .d1{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -64px !important;
      }
      .d2{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -189px !important;
      }
      .d3{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -314px !important;
      }
      .d4{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -453px !important;
      }
      .d5{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -126px !important;
      }
      .d6{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -251px !important;
      }
      .d7{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -366px !important;
      }
      .d8{
        background: url('../../assets/img/按钮1.png') no-repeat !important;
        background-size: 700px 1334px !important;
        background-position: -376px -505px !important;
      }
    }
    .subjectnavup {
      div:nth-child(1){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -64px;
      }
      div:nth-child(2){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -189px;
      }
      div:nth-child(3){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -314px;
      }
      div:nth-child(4){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -453px;
      }
    }
    .subjectnavdown {
      margin-top: 10px;
      div:nth-child(1){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -126px;
      }
      div:nth-child(2){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -251px;
      }
      div:nth-child(3){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -366px;
      }
      div:nth-child(4){
        background: url('../../assets/img/按钮1.png') no-repeat;
        background-size: 700px 1334px;
        background-position: -78px -505px;
      }
    }
    
    .echart{
      width: 100%;
      height: 1000px;
      margin: 0px auto;
      padding: 0px 10px;
      #myChart {
        width: 100% !important;
        height: 100% !important;
        div {
          margin: 0 auto !important;
        }
      }
    }
    .time_nav {
      width: 100%;
      display: flex;
      margin: 20px 0px;
      padding: 0px 40px;
      div {
        flex: 1;
        span {
          display: inline-block;
          width: 25px;
          height: 25px;
          border: 4px solid #63d4c0;
          vertical-align: middle;
          margin-right: 10px;
          position: relative;
          overflow: hidden;
          i {
            display: inline-block;
            width: 200%;
            height: 200%;
            background-color: #3d72fe;
            position: absolute;
            top: -50%;
            left: -50%;
          }
        }
      }
    }
    .table {
      width: 100%;
      margin-top: 20px;
      padding: 0px 70px;
      table {
        width: 100%;
        border-radius: 20px;
        border: 4px solid #3d72fe;
        border-collapse:separate;
        overflow: hidden;
        tr {
          width: 100%;
          // height: 100px;
            border: 1px solid #f2f2f2;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          th {
            flex: 1;
            height: 60px;
            border-left: 4px solid #fff;  
            display: flex;
            justify-content: center;
            align-items: center;
          }
          td {
            padding: 5px 5px;
            flex: 1;
            // height: 100px;
            line-height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          th:first-child {
            border: none;
          }
        }
        tr:first-child {
            background-color: #defff9;
        }
      }
    }
    .good {
      width: 100%;
      padding: 0px 40px;
      margin-top: 20px;
    }
      .center_box {
          width: 100%;
          height: 140px;
          border-radius: 20px;
          background-color: #fff;
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
              .right_title {
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
</style>
