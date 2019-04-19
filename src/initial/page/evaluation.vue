<template>
  <div class="index">
    <top :msg="msg" :back="back"></top>
    <div class="center">
      <div class="nav">
        <div class="nav_box">
          <div class="left"></div>
          <div class="right">
            <div class="name">老师姓名：金灿灿</div>
            <div class="subject">任教科目：数学</div>
            <div class="label">班主任</div>
          </div>
        </div>
      </div>
      <div class="teacher_evaluation">
        <div class="nav_top">班主任批语</div>
        <div
          class="text_box"
        >有一定的组织协调能力,工作认真负责。上课能认真听讲,及时完成老师布置的学习任务,但较主动发言,学习成绩较入学时还有很大距离,班主任相信你有这个能力夺回本该属于自己的位置,关健是要认真分析原因,针对性地解决问题。学校或班级的有些规定可能不太符合你的意愿,但对你及全体同学有益,希望你还是要不折不扣地执行。</div>
      </div>
    </div>
  </div>
</template>
<script>
import top from "@/components/top";
export default {
  name: "index",
  components: {
    top
  },
  data() {
    return {
      msg: "期末评语：初一上学期",
      back:true
    };
  }
};
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  margin-top: 88px;
  .center {
    padding: 30px 45px 100px 45px;
    .nav {
      width: 100%;
      .nav_box {
        width: 100%;
        height: 200px;
        margin-top: 30px;
        border-radius: 20px;
        box-shadow: 0px 0px 8px #999;
        padding: 18px 20px;
        display: flex;
        .left {
          width: 164px;
          height: 164px;
          border-radius: 20px;
          background-color: #666;
        }
        .right {
          flex: 1;
          vertical-align: top;
          position: relative;
          padding-left: 20px;
          .name {
            font-size: 28px;
            font-weight: 700;
            color: #333;
            margin-top: 11px;
          }
          .subject {
            font-size: 20px;
            font-weight: 700;
            color: #666;
            margin: 20px 0px;
          }
          .label {
            display: inline-block;
            font-size: 20px;
            padding: 5px 30px;
            border-radius: 15px;
            background-color: #3d72fe;
            color: #fff;
            border: 0px;
          }
        }
      }
    }
    .teacher_evaluation {
      padding-top: 50px;
      .nav_top {
        font-size: 24px;
        line-height: 50px;
        background-color: #3d72fe;
        width: 160px;
        text-align: center;
        color: white;
        border-radius: 20px 20px 0px 0px;
      }
      .text_box{
          padding: 20px 20px 20px 20px;
          width: 100%;
          border: #3d72fe 3px solid;
          border-radius: 0px 20px 20px 20px;
          font-size: 20px;
          line-height: 30px;
          text-indent: 2em;
      }
    }
  }
}
</style>
