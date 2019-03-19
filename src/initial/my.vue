<template>
  <div class="my">
    <top :msg ="msg"></top>
    <div class="data_box">
      <div class="left"></div>
      <div class="right">
        <div class="name">关联学生：张长弓</div>
        <div class="school">在读学校：广州市一中</div>
        <div class="class">所在班级：初一二班下学期</div>
        <div class="follow">更换关注</div>
      </div>
    </div>
    <div class="nav">
      <div style="backgroundColor:#47a4cd;"><i class="iconfont icon-shoucang"></i><span>我的收藏</span></div>
      <div style="backgroundColor:#f17849;"><i class="iconfont icon-pinglun"></i><span>我的评论</span></div>
      <div style="backgroundColor:#66d3c0;"><i class="iconfont icon-dianzan"></i><span>我的点赞</span></div>
      <div style="backgroundColor:#66d3c0;"><i class="iconfont icon-lishi"></i><span>浏览历史</span></div>
      <div style="backgroundColor:#f15f5f;"><i class="iconfont icon-shezhi"></i><span>我的设置</span></div>
      <div style="backgroundColor:#509ef3;"><i class="iconfont icon-chengchang"></i><span>成长记录</span></div>
      <div style="backgroundColor:#fcc837;"><i class="iconfont icon-huiyuandefuben"></i><span>购买会员</span></div>
      <div style="backgroundColor:#454fd2;"><i class="iconfont icon-lianxiwomen"></i><span>联系我们</span></div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
export default {
  name: 'my',
  components: {
    top
  },
  data () {
    return {
      msg:'我的'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my {
  width: 100%;
  .data_box {
    width: 100%;
    height: 260px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
    padding: 20px 30px 20px 50px;
    position: relative;
    display: flex;
    .left {
      width: 220px;
      height: 220px;
      border-radius: 20px;
      background-color: #666;
    }
    .right {
      margin-left: 21px;
      .name {
        font-size: 28px;
        font-weight: 700;
        color: #333;
        margin-top: 20px;
      }
      .school {
        font-size: 20px;
        font-weight: 700;
        color: #666;
        margin: 20px 0px;
      }
      .class {
        font-size: 20px;
        font-weight: 700;
        color: #666;
      }
      .follow {
        padding: 5px 20px;
        background-color: #3d72fe;
        color: #fff;
        border-radius: 15px;
        position: absolute;
        right: 30px;
        bottom: 25px;
      }
    }
  }
  .nav {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div {
      width: 160px;
      height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      margin-left: 22px;
      margin-bottom: 50px;
      box-shadow: inset 0px 0px 16px rgba(102, 102, 102, 0.5), 0px 0px 8px rgba(0, 0, 0, 0.5);
      i {
        color: #fff;
        font-size: 80px;
      }
      span {
        font-size: 28px;
        font-weight: 700;
        color: #fff;
      }
    }
    div:first-child{
      margin-left: 0px;
    }
    div:nth-child(5){
      margin-left: 0px;
    }
  }
}
</style>
