<template>
  <div class="announcement">
    <top
      :msg="msg"
      :back="back"
    ></top>
    <div class="image">
      <div
        class="left blue"
      >
        <div
          class="iconfont icon-xiaoyuanzhuanqu"
        ></div>
      </div>
      <div class="nav_notice">
        <span class="notice">{{text}}</span>
        <br />
        <span class="date">{{date}}</span>
      </div>
    </div>
    <div class="notice_text" v-html="announcement"></div>
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
      date: "",
      announcement: "",
      back: true,
    };
  },
  mounted() {
    this.text = '校园通知:'+this.$store.state.message.title
    this.date = this.getLocalTime(this.$store.state.message.createdTime/1000).split(' ')[0].split('/')[0]+'年'+this.getLocalTime(this.$store.state.message.createdTime/1000).split(' ')[0].split('/')[1]+'月'+this.getLocalTime(this.$store.state.message.createdTime/1000).split(' ')[0].split('/')[2]+'日'+' '+this.getLocalTime(this.$store.state.message.createdTime/1000).split(' ')[1]
    this.announcement = this.$store.state.message.content
  },
  methods: {
    getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    }
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
    .left {
      margin-left: 80px;
      width: 100px;
      height: 100px;
      line-height: 100px;
      border-radius: 20px;
      background-color: #ef7c3d;
      div {
        font-size: 52px;
        text-align: center;
        color: #fff;
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
    .nav_notice {
      margin-left: 20px;
      .notice {
        line-height: 50px;
        font-size: 28px;
        font-weight: 700;
      }
      .date {
        line-height: 34px;
        font-size: 20px;
        color: #666;
      }
    }
  }
  .notice_text {
    width: 100%;
    padding: 29px 45px;
    line-height: 40px;
    font-size: 22px;
    text-indent: 40px;
  }
}
</style>

