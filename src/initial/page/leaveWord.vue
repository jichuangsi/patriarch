<template>
  <div class="index">
    <top
      :msg="msg"
      :back="back"
    ></top>
    <div class="center">
      <div class="nav">
        <div class="nav_box">
          <div class="left"></div>
          <div class="right">
            <div class="name">老师姓名：{{teacher.name}}</div>
            <div class="subject">任教科目：{{teacher.subject}}</div>
            <div class="label" v-if="teacher.headMaster == '班主任'">班主任</div>
            <!-- <div class="message">给老师留言 ></div> -->
          </div>
        </div>
      </div>
      <div class="message clearfix">
        <div class="messagebox">
          <div class="userimg"></div>
          <div class="message_box"></div>
        </div>
      </div>
    </div>
      <div class="ipt">
        <input type="text" v-model="messagetext">
        <div class="iptbtn" @click="btn">留言</div>
      </div>
  </div>
</template>
<script>
import top from "@/components/top";
import {leaveParentMessageBoard} from '@/api/api'
export default {
  name: "announcement",
  components: {
    top
  },
  data() {
    return {
      msg: "家校通",
      back: true,
      teacher:'',
      messagelist:[],
      messagetext:''
    };
  },
  mounted() {
    this.teacher = this.$store.state.teacher
    console.log(this.$store.state.teacher)
  },
  methods:{
    btn(){
      console.log(this.messagetext)
      leaveParentMessageBoard(this.messagetext).then(res=>{
        console.log(res)
      })
    }
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
    .message {
      width: 100%;
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
