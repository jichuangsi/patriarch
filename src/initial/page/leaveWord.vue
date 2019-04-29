<template>
  <div class="index">
    <top
      :msg="msg"
      :back="back"
    ></top>
    <div class="center">
      <div class="nav">
        <div class="nav_box">
          <div class="left">
            <img src="../../assets/img/男老师.png" alt="">
          </div>
          <div class="right">
            <div class="name">老师姓名：{{teacher.name}}</div>
            <div class="subject">任教科目：{{teacher.subject}}</div>
            <div class="label" v-if="teacher.headMaster == '班主任'">班主任</div>
            <!-- <div class="message">给老师留言 ></div> -->
          </div>
        </div>
      </div>
      <div id="content">
      <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="message clearfix" v-for="(item,index) in messagelist" :key="index">
        <div class="messagebox fr" :class="{fr:item.sendFrom == 'P',fl:item.sendFrom == 'T'}">
          <div class="userimg fr" v-if="item.sendFrom == 'P'"><img :src="userimg" alt=""></div>
          <div class="userimg fl" v-if="item.sendFrom == 'T'"></div>
          <div class="message_box fr" :class="{'fl':item.sendFrom == 'T','fr':item.sendFrom == 'P'}">{{item.content}}</div>
        </div>
      </div>
      <h4>--历史消息--</h4>
      <div class="message clearfix" v-for="(item,index) in messagenewlist" :key="index">
        <div class="messagebox fr">
          <div class="userimg fr"><img :src="userimg" alt=""></div>
          <div class="message_box fr">{{item}}</div>
        </div>
      </div>
      </mt-loadmore>
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
import { Loadmore } from 'mint-ui'
import {getParentMessage,sendParentMessage} from '@/api/api'
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
      messagenewlist:[],
      messagetext:'',
      userimg:'',
      pageindex:1,
      pagesize:10,
      allLoaded:false,
      pageshow:false
    };
  },
  mounted() {
    this.teacher = this.$store.state.teacher
    this.userimg = JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).headimgurl:''
    this.getdata()
  },
  methods:{
    btn(){
      sendParentMessage(this.teacher.id,this.teacher.name,this.messagetext).then(res=>{
      //   console.log(res)
        if(res.data.code == '0010'){
          this.messagenewlist.push(this.messagetext)
          this.messagetext = ''
        }
      })
    },
    getdata(){
      getParentMessage(this.teacher.id,this.pageindex,this.pagesize).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          this.messagelist.push(...res.data.data.list)
          if(res.data.data.list == ''){
            this.pageshow = true
          }
        }
      })
    },
    loadTop(){
      if(this.pageshow){
        this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
      }else {
        this.pageindex++
        this.getdata()
        this.$refs.loadmore.onTopLoaded()
      }
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
      margin-bottom: 30px;
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
          img {
            width: 105%;
            height: 105%;
            margin-top: -4px;
            margin-left: -4px;
          }
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
      margin-bottom: 30px;
      .userimg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        vertical-align: middle;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .message_box {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1px;
        margin-right: 20px;
        padding: 20px 30px;
        border: 2px solid #2a8cf7;
        border-radius: 30px;
      }
    }
    h4 {
      text-align: center;
      margin: 10px auto;
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
    #content {
      overflow: scroll;
    }
}
</style>
