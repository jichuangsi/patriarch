<template>
  <div class="News">
    <top
      :msg="msg"
      :back="back"
    ></top>
    <div class="center">
        <h3 v-html="news.title"></h3>
        <div class="text" v-html="news.content"></div>
    </div>
    <div class="foot" v-if="!iptshow">
        <div class="foot_box" @click="iptshow = true">评论</div>
        <div class="foot_box iconfont icon-dianzan"></div>
        <div class="foot_box iconfont icon-shoucang"></div>
    </div>
      <div class="ipt" v-if="iptshow">
        <input type="text" v-model="messagetext">
        <div class="iptbtn" @click="btn">发布评论</div>
      </div>
  </div>
</template>
<script>
import top from "@/components/top";
import {details,query} from '@/api/api'
export default {
  name: "News",
  components: {
    top
  },
  data() {
    return {
      msg: "教育头条",
      back: true,
      id:'',
      news:'',
      iptshow:false,
      messagetext:''
    };
  },
  mounted() {
      this.id = this.$route.query.id
      this.getdata()
  },
  methods: {
      getdata(){
          details(this.id).then(res=>{  
              console.log(res)
              this.news = res.data[0]
          })
      },
      btn(){
          this.iptshow = false
      }
  }
};
</script>
<style lang="scss">
.News {
  width: 100%;
  margin-top: 118px;
  margin-bottom: 100px;
  .center {
      padding: 10px 20px;
      h3 {
          padding: 10px 40px;
          font-size: 28px;
          font-weight: 700;
          line-height: 34px;
          letter-spacing: 5px;
      }
      .text {
          padding: 10px;
          font-size: 24px;
          line-height: 30px;
          text-indent: 0.5rem;
          letter-spacing: 2px;
          p{
            img {
                display: block;
                width: 100% !important;
            }
          }
      }
            img {
                display: block;
                width: 100% !important;
            }
  }
  .foot {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 88px;
    padding: 14px 57px 0px 0px;
    box-shadow: 0px 0px 15px #999;
    background-color: #fff;
    .foot_box {
        width: 120px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        border-radius: 30px;
        background-color: #3d72fe;
        float: right;
    }
  }
  
    .ipt {
      width: 100%;
      position: fixed;
      bottom: 0px;
      padding: 14px 45px;
      background-color: #e8e8e8;
      box-shadow: 0px -4px 8px rgba(0,0,0,0.3);
      display: flex;
      input {
        flex: 1;
        border-radius: 10px;
        // box-shadow: inset 6px 10px 16px #999;
        background-color: #fff;
        text-indent: 20px;
      }
      .iptbtn {
        font-size: 20px;
        padding: 20px 40px;
        color: #fff;
        border-radius: 30px;
        background-color: #3d72fe;
        margin-left: 20px;
      }
    }
}
</style>

