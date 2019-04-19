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
      <div class="subject_nav">
        <div
          v-for="(item,index) in subject_nav"
          :key="index"
          :class="{subject_color:subjectindex==index}"
          @click="subjectnav(index)"
        >{{item}}</div>
      </div>
      <div
        id="myChart"
        :style="{width: '300px', height: '300px'}"
      ></div>
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
      subjectindex: 0,
      center_nav: ["课堂", "习题", "考试"],
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
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    nav(index) {
      this.navindex = index;
    },
    subjectnav(index) {
      this.subjectindex = index;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
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
      width: 100%;
      margin-bottom: 30px;
      font-weight: 700;
      background-color: aquamarine;
      div {
        display: inline-block;
        font-size: 20px;
        line-height: 24px;
        padding: 5px 20px;
        border-radius: 15px;
      }
      .subject_color {
        color: #fff;
        background-color: #3d72fe;
      }
    }
  }
}
</style>
