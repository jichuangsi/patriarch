<template>
  <div class="index">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
      <div class="text">{{student.className}}</div>
      <div class="nav">
        <div class="nav_box" @click="jump(item)" v-for="(item,index) in teacherlist" :key="index">
          <div class="left">
            <img src="../assets/img/男老师.png" alt="">
          </div>
          <div class="right">
            <div class="name">老师姓名：{{item.name}}</div>
            <div class="subject">任教科目：{{item.subject}}</div>
            <div class="label" v-if="item.headMaster == '班主任'">班主任</div>
            <div class="message">给老师留言 ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="setbox" v-if="setshow">
      <div class="set_box">
        <div class="none" @click="setshow = false">x</div>
        <h3>绑定学生</h3>
        <h4>请输入学生账户</h4>
          <div>
            <input type="text" placeholder="请输入绑定学生账户" v-model="studentAccount">
          </div>
          <div class="empty" @click="studentAccount=''">清空</div>
          <div class="confirm" @click="confirm">确认</div>
      </div>
    </div>
    <!-- <button @click="btn1">czcz</button> -->
    <!-- <div class="login" v-if="loginshow">
        <div class="text">集创思  申请使用</div>
        <div class="text1">以下信息</div>
        <div class="text2"><span>✔</span>你的账号信息（昵称、头像、地区与性别）</div>
        <div class="login_confirm" @click="login">确认</div>
        <div class="login_cancel" @click="cancel">取消</div>
    </div> -->
    <foot :current="current"></foot>
  </div>
</template>

<script>
import top from '@/components/top'
import foot from '@/components/foot'
import { Toast } from 'mint-ui'
import {getWxToken,getParentInfo,loginParentService,getBindStudentInfo,parentBindStudent,getStudentTeachers,getAttentions} from '@/api/api'
export default {
  name: 'index',
  components: {
    top,foot
  },
  data () {
    return {
      msg:'家校通',
      back:false,
      current: 0,
      setshow: false,
      studentAccount:'',
      student:'',
      teacherlist:[],
      loginshow:false
    }
  },
  mounted(){
    // window.location='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6242cfcc7e43e927&redirect_uri=http://127.0.0.1&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
    this.getdata()
  },
  methods:{
    jump(item){
      this.$store.commit('TEACHER',item)
      this.$router.push({
        path:'/leaveWord'
      })
    },
    getdata(){
      let token = localStorage.getItem('token')?localStorage.getItem('token'):''
      let student = JSON.parse(localStorage.getItem('student'))?JSON.parse(localStorage.getItem('student')):''
      let user = JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):''
      if(token&&student&&user){
        getStudentTeachers(student[0].studentId).then(res=>{  //查询绑定学生老师信息
          if(res.data.code == '0010'){
          this.teacherlist = res.data.data
          }
        })
      }else if(!token&&student){
        loginParentService(user.nickname,user.openid,user.headimgurl).then(res=>{
          if(res.data.code == "0010") {   //刷新token
        localStorage.setItem('token',res.data.data)
        getStudentTeachers(student[0].studentId).then(res=>{  //查询绑定学生老师信息
          if(res.data.code == '0010'){
          this.teacherlist = res.data.data
          }
        })
          }
        })
      }
      else if(!token&&!student&&!user) {
        this.login()
      }
    },
    login(){
      let code = window.location.href
      code = code.split('?')[1].split('&')[0].split('=')[1]
      getWxToken(code).then(res=>{  //获取wxtoken和openid
        if(res.data.code == '0010') {
          getParentInfo(res.data.data.access_token,res.data.data.openid).then(res=>{
            if(res.data.code == '0010'){   //获取wx用户信息
            localStorage.setItem('user',JSON.stringify(res.data.data))
              loginParentService(res.data.data.nickname,res.data.data.openid,res.data.data.headimgurl).then(res=>{
                if(res.data.code == "0010") {   //获取应用token
                  localStorage.setItem('token',res.data.data)
                  getBindStudentInfo().then(res=>{   //查询是否绑定学生
                    if(res.data.code=='0010'){
                      this.setshow = false 
                      getAttentions().then(res=>{  //查询绑定学生信息
                      if(res.data.code == '0010') {
                        this.student = res.data.data
                        localStorage.setItem('student',JSON.stringify(res.data.data))
                        getStudentTeachers(this.student[0].studentId).then(res=>{  //查询绑定学生老师信息
                        if(res.data.code == '0010'){
                          this.teacherlist = res.data.data
                        }
                      })
                      }
                    })
                    }else {
                      this.setshow = true
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    confirm() {
      parentBindStudent(this.studentAccount).then(res=>{
        if(res.data.code == '0010') {
          Toast('绑定成功')
          this.setshow = false
                      getAttentions().then(res=>{  //查询绑定学生信息
                      if(res.data.code == '0010') {
                        this.student = res.data.data
                        localStorage.setItem('student',JSON.stringify(res.data.data))
                        getStudentTeachers(this.student[0].studentId).then(res=>{  //查询绑定学生老师信息
                        if(res.data.code == '0010'){
                          this.teacherlist = res.data.data
                        }
                      })
                      }
                    })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  width: 100%;
  margin-top: 88px;
  .center {
    padding: 30px 45px 120px 45px;
    .text{
      text-align: center;
      font-size: 30px;
      color: #333333;
      font-weight: 700;
    }
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
  }
  .setbox {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    .set_box {
      width: 80%;
      border-radius: 20px;
      padding: 20px;
      padding-bottom: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      transform: translate(-50%,-50%);
      overflow: hidden;
        h3 {
          text-align: center;
          margin-top: 40px;
          margin-bottom: 15px;
          font-size: 34px;
          line-height: 38px;
          font-weight: 700;
          letter-spacing:5px
        }
        h4 {
          text-align: center;
          font-size: 18px;
          line-height: 26px;
        }
      div {
        margin: 30px auto;
        margin-bottom: 90px;
        span {
          font-size: 28px;
        }
        input {
          width: 60%;
          display: block;
          border: 2px solid #3d72fe;
          height: 34px;
          line-height: 34px;
          text-indent: 20px;
          margin: 0 auto;
          background-color: #ecf1ff;
          border-radius: 5px;
          text-align: center;
        }
      }
      .none {
        margin: -10px;
        float: right;
        padding: 5px 20px;
        font-size: 36px;
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
  .login {
    width: 100%;
    height: 100%;
    padding: 195px 59px;
    letter-spacing: 2px;
    color: #333;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #fff;
    z-index: 111;
    .text {
      font-size: 24px;
      line-height: 28px;
    }
    .text1 {
      font-size: 46px;
      line-height: 50px;
      margin-top: 50px;
    }
    .text2 {
      margin-top: 70px;
      font-size: 24px;
      line-height: 28px;
      span {
        padding: 0px 4px;
        border-radius: 50%;
        border: 1px solid #999;
        margin-right: 20px;
      }
    }
    .login_confirm{
      width: 352px;
      height: 77px;
      text-align: center;
      line-height: 77px;
      color: #fff;
      border-radius: 10px;
      background-color: #07c160;
      position: absolute;
      left: 50%;
      bottom: 350px;
      transform: translateX(-50%);
      margin-bottom: 24px;
    }
    .login_cancel {
      width: 352px;
      height: 77px;
      color: #07c160;
      text-align: center;
      border-radius: 10px;
      background-color: #f2f2f2;
      line-height: 77px;
      position: absolute;
      left: 50%;
      bottom: 250px;
      transform: translateX(-50%);
    }
  }
}
</style>
