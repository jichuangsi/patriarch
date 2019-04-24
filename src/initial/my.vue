<template>
  <div class="my">
    <top :msg ="msg" :back="back"></top>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="data_box swiper-slide" v-for="(item,index) in studentlist" :key="index">
          <div class="left"></div>
          <div class="right">
            <div class="name">关联学生：{{item.studentName}}</div>
            <div class="school">在读学校：{{item.schoolName}}</div>
            <div class="class">所在班级：{{item.className}}</div>
            <div class="follow" v-if="index!= 0" @click="setshow = true,id = item.studentId">更换关注</div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="div1"></div>
      <div class="div2"></div>
      <div class="div3"></div>
      <div class="div4"></div>
      <router-link to="set"><div class="div5"></div></router-link>
      <router-link to="Growth"><div class="div6"></div></router-link>
      <div class="div7"></div>
      <router-link to="Contact_us"><div class="div8"></div></router-link>
    </div>
    <!-- <div class="setbox" v-if="setshow">
      <div class="set_box">
        <div class="none" @click="setshow = false">x</div>
          <div>
            <span>学生账户：</span><input type="text" placeholder="请输入绑定学生账户" v-model="studentAccount">
          </div>
          <div class="confirm" @click="confirm">确认</div>
      </div>
    </div> -->
    <div class="setbox" v-if="setshow">
        <div class="set_box">
        <div class="none" @click="setshow = false">x</div>
        <h3>是否更换关注此学生</h3>
          <div class="empty" @click="setshow = false">取消</div>
          <div class="confirm" @click="confirm">确认</div>
        </div>
    </div>
    <foot :current="current"></foot>
  </div>
</template>

<script>
import top from '@/components/top'
import foot from '@/components/foot'
import Swiper from 'swiper';
import {Toast} from 'mint-ui'
import {updateAttention} from '@/api/api'
export default {
  name: 'my',
  components: {
    top,foot
  },
  data () {
    return {
      msg:'我的',
      back:false,
      current:4,
      setshow:false,
      studentlist:[],
      id:''
    }
  },
  mounted(){
    new Swiper ('.swiper-container', {
      loop:true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,//修改swiper的父元素时，自动初始化swiper
    }) 
    this.studentlist = JSON.parse(localStorage.getItem('student'))
  },
  methods:{
    confirm(){
      updateAttention(this.id).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          this.setshow = false
          Toast('更换成功')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my {
  width: 100%;
  margin-top: 118px;
  .data_box {
    width: 100% !important;
    height: 260px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
    margin-bottom: 20px;
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
    padding: 0px 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div {
      margin: 0px;
      width: 174px;
      height: 174px;
      // margin-bottom: 50px;
    }
    div:active {
      width: 160px;
      height: 160px;
      margin: 7px;
    }
    .div1{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -2817px;
      background-size: 1920px 8000px;
    }
    .div1:active{
      background-position: -1069px -2817px;
    }
    .div2{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -4540px;
      background-size: 1920px 8000px;
    }
    .div2:active{
      background-position: -1069px -4540px;
    }
    .div3{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -4109px;
      background-size: 1920px 8000px;
    }
    .div3:active{
      background-position: -1069px -4109px;
    }
    .div4{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -3678px;
      background-size: 1920px 8000px;
    }
    .div4:active{
      background-position: -1069px -3678px;
    }
    .div5{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -4970px;
      background-size: 1920px 8000px;
    }
    .div5:active{
      background-position: -1069px -4970px;
    }
    .div6{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -5401px;
      background-size: 1920px 8000px;
    }
    .div6:active{
      background-position: -1069px -5401px;
    }
    .div7{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -5832px;
      background-size: 1920px 8000px;
    }
    .div7:active{
      background-position: -1069px -5832px;
    }
    .div8{
      background: url('../assets/img/按钮.png') no-repeat;
      background-position: -277px -3248px;  
      background-size: 1920px 8000px;
    }
    .div8:active{
      background-position: -1069px -3248px;
    }
  }
  
  
  .setbox {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 100;
      .set_box {
          width: 400px;
          height: 200px;
          padding: 50px 50px;
          position: absolute;
          left: 50%;
          top: 50%;
          background-color: #fff;
          transform: translate(-50%,-50%);
          h3 {
              text-align: center;
              font-size: 30px;
              font-weight: 700;
              letter-spacing: 3px;
          }
            .none {
                margin: -10px;
                padding: 5px 20px;
                font-size: 28px;
                position: absolute;
                top: 5px;
                right: 10px;
            }
        .empty {
            margin: 0px;
            display: inline-block;
            color: #fff; 
            padding: 10px 30px;
            border-radius: 10px;
            background-color: #3d72fe;
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-125%);
        }
        .confirm {
            margin: 0px;
            display: inline-block;
            color: #fff; 
            padding: 10px 30px;
            border-radius: 10px;
            background-color: #3d72fe;
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(25%);
        }
      }
  }
}
</style>
