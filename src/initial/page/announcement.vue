<template>
  <div class="announcement">
    <top :msg="msg" :back="back"></top>
    <div class="image">
      <div class="img"></div>
      <div class="nav_notice">
        <span class="notice">{{text}}</span>
        <br/>
        <span class="date">{{date}}</span>
      </div>
    </div>
    <div class="notice_text">{{announcement}}</div>
  </div>
</template>
<script>
import top from "@/components/top";
export default {
  name: "announcement",
  components: {
    top
  },
  data() {
    return {
      msg: "校园通知",
      text: "校园通知:植树节活动通知",
      date: "2019年3月6日星期三09：06",
      announcement:'中国古代在清明节时节就有插柳植树的传统，历史上最早在路旁植树是由一位叫韦孝宽的人于1400多年前从陕西首创的。韦孝宽（公元508—580年）是西魏、北周时期的一位名将，京兆杜陵（今西安市东南）人。据唐李延寿《北史》列传第五十二记载，西魏废帝二年（公元552年），韦孝宽因军功被授予雍州刺史。自古以来，官道上每隔一华里便在路边设置一个土台，作为标记，用以计算道路的里程，也就是现在的里程碑。韦孝宽上任后，发现土台的缺点很多，经风吹日晒，特别是雨水冲涮，很容易崩塌，需要经常进行维修，不但增加了国家的开支，也使百姓遭受劳役之苦，既费时费力又不方便。韦孝宽经过调查了解之后，毅然下令雍州境内所有的官道上设置土台的地方一律改种一棵槐树，用以取代土台。这样一来不仅不失其标记和计程作用，还能为往来行人遮风挡雨，并且不需要修补。韦孝宽的这一作法，无疑是造福桑梓，减轻家乡百姓负担、利国利民的重大举措。陕西作为历史上最早在官道上植树的地方，曾经是全国道路绿化的表率，而韦孝宽最早栽种的槐树千百年来一直受到人们的喜爱，特别是陕西人对这种槐树更是情有独钟，十分喜爱，并且广为种植，现在这种槐树已经作为西安市的象征，被确定为市树。而近代植树节则最早由美国的内布拉斯加州发起。19世纪以前，内布拉斯加州是一片荒芜的平原，树木稀少，黄沙漫天，人民深受其苦。1872年，美国著名农学家朱利叶斯·斯特林·莫尔顿提议在内布拉斯加州规定植树节，动员人民有计划地植树造林。当时州农业局通过决议采纳了这一提议，并由州长亲自规定今后每年4月份的第三个星期三为植树节。此后的16年间，又先后植树6亿棵，终于使内布拉斯加州10万公顷的荒野变成了茂密的森林。为了表彰莫尔顿的功绩，1885年州议会正式规定以莫尔顿先生的生日4月22日为每年的植树节，并放假一天。后来经商议，于1932年发行了世界上首枚植树节邮票，画面为两个儿童在植树。',
      back:true
    };
  }
};
</script>
<style scoped lang="scss">
.announcement {
  width: 100%;
  margin-top: 118px;
  margin-bottom: 100px;
  .image {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    .img {
      width: 100px;
      height: 100px;
      background-color: #464fd2;
      border-radius: 10px;
      margin-left: 65px;
    }
    .nav_notice {
      margin-left: 20px;
      .notice {
        line-height: 50px;
        font-size: 28px;
        font-weight: 700
      }
      .date {
        line-height: 34px;
        font-size: 20px;
        color:#666;
      }
    }
    
  }
  .notice_text{
      width: 100%;
      padding: 29px 45px;
      line-height: 40px;
      font-size: 22px;
      text-indent: 40px;
    }
}
</style>

