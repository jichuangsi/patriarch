<template>
  <div class="index">
    <top :msg="msg"></top>
    <div class="center">
      <div class="nav">
        <div class="nav_box">
          <div class="left"></div>
          <div class="right">
            <div class="name">老师姓名：金灿灿</div>
            <div class="subject">任教科目：数学</div>
            <div class="label">班主任</div>
            <div class="message">给老师留言 ></div>
          </div>
        </div>
      </div>
    </div>
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
      msg: "留言"
    };
  }
};
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
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
          }
          .message {
            position: absolute;
            top: 50%;
            right: 10px;
            padding: 5px 12px;
            border-radius: 15px;
            background-color: #3d72fe;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
