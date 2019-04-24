<template>
  <div class="Report">
    <top
      :msg="msg"
      :back="back"
    ></top>
    <div class="center">
      <div class="center_nav">
        <div
          v-for="(item,index) in center_nav"
          :key="index"
          :class="{center_color:navindex==index}"
          @click="nav(index)"
        >{{item}}</div>
      </div>
      <div class="subject_nav" @click="subjectshow=!subjectshow" :class="{subject_nav_color:subjectshow}">
        {{subject_navtext}}
        <span></span>
          <ul :class="{ulheight:subjectshow}">
             <li
              v-for="(item,index) in subject_nav"
              :key="index"
              @click.stop="subjectnav(index,item)"
            >{{item}}</li>
          </ul>
      </div>
      <div class="echart">
        <div
          id="myChart"
          :style="{width: '300px', height: '300px'}"
        ></div>
      </div>
      <div class="time_nav">
        <div
          v-for="(item,index) in time_nav"
          :key="index"
          @click="timenav(item)"
        ><span><i v-if="time_text.indexOf(item) != -1"></i></span>{{item}}</div>
      </div>
      <div class="table">
        <table>
          <tr>
            <th>知识点</th>
            <th>占比</th>
            <th>正确率</th>
            <th>班级平均正确率</th>
          </tr>
          <tr>
            <td>这是一段很长很长很长很长很长很长很长很长的文字</td>
            <td>30%</td>
            <td>40%</td>
            <td>50%</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
export default {
  name: "Report",
  components: {
    top
  },
  data() {
    return {
      msg: "学情报表",
      back: true,
      navindex: 0,
      subjectshow: false,
      center_nav: ["课堂", "习题", "考试"],
      subject_navtext:'语文',
      subject_nav: [
        "语文",
        "数学",
        "英语",
        "物理",
        "地理",
        "政治",
        "生物",
        "历史",
        "化学"
      ],
      dataname:['语文','数学','这是一段很长很长很长很长很长很长很长很长的文字','这是一段x很长很长很长很长很长很长很长很长的文字'],
      datalist:[
        {value:10,name:'语文'},
        {value:20,name:'数学'},
        {value:30,name:'这是一段很长很长很长很长很长很长很长很长的文字'},
        {value:30,name:'这是一段x很长很长很长很长很长很长很长很长的文字'}
      ],
      time_text:'',
      time_nav:[]
    };
  },
  mounted() {
    this.drawLine();
    this.getdata()
  },
  methods: {
    getdata(){
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      this.time_text = month+'月'+day+'日'
      this.time_nav = [month+'月'+day+'日',month+'月'+(Number(day)-1)+'日',month+'月'+(Number(day)-2)+'日',month+'月'+(Number(day)-3)+'日',month+'月'+(Number(day)-4)+'日']
      console.log(this.time_nav)
    },
    nav(index) {
      this.navindex = index;
    },
    subjectnav(index,val) {
      this.subjectshow = false;
      this.subject_navtext = val;
    },
    timenav(val){
      if(this.time_text){
        if(this.time_text.indexOf(val) != -1){
          this.time_text = this.time_text.split(val)[0]+this.time_text.split(val)[1]
        }else{
          this.time_text += val
        }
      }else{
        this.time_text += val
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
          x: 'center',
          y: 'bottom',
              textStyle: {
                fontSize: 14
              },
              icon: 'circle',
          data: self.dataname
        },
        toolbox: {
          show: true,
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
            type: 'pie',
            radius: [50, 80],
            center: ['50%', '40%'],
            data: self.datalist,
            color:['#347cf9','#58ce52','#ffc051','#4ba8ff','#ff7d8b','#ba61e8','#c622e5','#2feaf6','#ff7f8b']
          }
        ]
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Report {
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
        color: #fff;
        background-color: #3d72fe;
      }
    }
    .subject_nav {
      width: 140px;
      height: 40px;
      font-size: 24px;
      line-height: 40px;
      color:#fff;
      text-align: center;
      margin: 0px auto;
      margin-bottom: 30px;
      font-weight: 700;
      border-radius: 20px;
      background: url('../../assets/img/按钮.png') no-repeat;
      background-position: -277px -6050px;
      background-size: 1920px 8000px;
      position: relative;
      ul {
        width: 110px;
        height: 0px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        display: inline-block;
        font-size: 20px;
        text-align: center;
        position: absolute;
        z-index: 100;
        background-color: #63d4c0;
        top: 38px;
        left: 15px;
        overflow: hidden;
        transition: height 0.5s linear; 
        li{
        line-height: 34px;
        }
      }
      .ulheight {
        height: 308px;
      }
    }
    .subject_nav_color {
      background-position: -1069px -6050px;
    }
    .echart{
      width: 100%;
      height: 500px;
      margin: 0px auto;
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
      table {
        width: 100%;
        border-radius: 20px;
        border: 4px solid #3d72fe;
        border-collapse:separate;
        overflow: hidden;
        tr {
          width: 100%;
          height: 100px;
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
            flex: 1;
            height: 100px;
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
  }
}
</style>
