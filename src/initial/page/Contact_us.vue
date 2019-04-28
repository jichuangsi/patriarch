<template>
  <div class="index">
    <top :msg="msg" :back="back"></top>
    <div class="center">
      <div class="title">{{title}}</div>
      <div class="content">
        <textarea class="texts" v-model="content"></textarea>
      </div>
      <div class="btn_nav">
        <div class="btn" @click="btn">确认留言</div>
      </div>
      <div class="text_box">
        <div class="other">其他联系方式：</div>
        <div class="phone">电话：020-81977869</div>
        <div class="toUrl">网址：WWW.GCHARMS.COM</div>
      </div>
    </div>
  </div>
</template>
<script>
import top from "@/components/top";
import {Toast} from 'mint-ui'
import {leaveParentMessageBoard} from '@/api/api'
export default {
  name: "announcement",
  components: {
    top
  },
  data() {
    return {
      msg: "联系我们",
      title: "给我们留言：",
      back:true,
      content:''
    };
  },
  mounted:{
    btn(){
      leaveParentMessageBoard(this.content).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          Toast('发送成功')
          this.content = ''
        }
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
    padding: 30px;
    .title {
      padding-left: 100px;
      padding-bottom: 15px;
      font-size: 30px;
      line-height: 24px;
    }
    .content {
      width: 100%;
      padding: 0px 105px 25px 105px;
      .texts {
        width: 100%;
        height: 265px;
        border: 4px #69d4c4 solid;
        text-indent: 1em;
      }
    }
    .btn_nav {
      padding: 0px 305px 25px 305px;
      .btn {
        width: 140px;
        height: 50px;
        text-align: center;
        font-size: 24px;
        line-height: 50px;
        background-color: #3d72fe;
        color: white;
        border-radius: 20px;
      }
    }
    .text_box{
        padding-left: 105px;
        .other{
            font-size: 30px;
            padding-bottom: 20px;
            font-weight: 500;
        }
        .phone{
            font-size: 24px;
             padding-bottom: 15px;
        }
        .toUrl{
            font-size: 24px;
             padding-bottom: 15px;
        }
    }
  }
}
</style>

