<template>
  <div class="set">
    <top :msg ="msg" :back="back"></top>
    <h3>门户账号</h3>
    <div class="userbox clearfix">
      <div class="fl" v-if="!Gateway">未有门户账户</div>
      <div class="fl" v-if="Gateway">门户账户</div>
      <div class="fr" v-if="!Gateway" @click="Gatewayshow = true,GatewayAccount='',Gatewaypsw='',Gatewaypsw_=''">绑定账户</div>
      <div class="fr" v-if="Gateway" @click="Gatewayshow = true,Gatewaypsw='',Gatewaypsw_=''">更换密码</div>
    </div>
    <h3>绑定手机号</h3>
    <div class="userbox clearfix">
      <div class="fl" v-if="!Telephone">未绑定手机号</div>
      <div class="fl" v-if="Telephone">手机号</div>
      <div class="fr" v-if="!Telephone" @click="phoneshow = true">绑定手机号</div>
      <div class="fr" v-if="Telephone" @click="phoneshow = true">更换</div>
    </div>
    <h3>关联管理</h3>
    <div class="data_box" v-for="(item,index) in studentlist" :key="index">
      <div class="left"></div>
      <div class="right">
        <div class="name">关联学生：{{item.studentName}}</div>
        <div class="school">在读学校：{{item.schoolName}}</div>
        <div class="class">所在班级：{{item.className}}</div>
        <div class="follow" @click="delshow = true,id=item.studentId">取消关联</div>
      </div>
    </div>
    <div class="addbtn" @click="setshow = true">添加关联</div>
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
    <div class="Gateway" v-if="Gatewayshow">
      <div class="Gateway_box">
        <div class="none" @click="Gatewayshow = false">x</div>
        <h3 v-if="!Gateway">新建门户账户</h3>
        <h3 v-if="Gateway">更换密码</h3>
          <div v-if="!Gateway">
            <span>新建门户账户：</span>
            <input type="text" v-model="GatewayAccount" placeholder="以字母开头">
          </div>
          <div>
            <span>设置密码：</span><input type="Password" v-model="Gatewaypsw" placeholder="字母数字混合6-12位密码">
          </div>
          <div class="last">
            <span>确认密码：</span><input type="Password" v-model="Gatewaypsw_">
          </div>
          <div class="empty" @click="GatewayAccount='',Gatewaypsw='',Gatewaypsw_=''">清空</div>
          <div class="confirm" @click="Gatewayconfirm">确认</div>
      </div>
    </div>
    <div class="delbox" v-if="delshow">
      <div class="del_box">
        <div class="none" @click="delshow = false">x</div>
        <h3>提示</h3>
        <h4>是否取消该学生关联</h4>
          <div>
            <!-- <input type="text" placeholder="请输入绑定学生账户" v-model="studentAccount"> -->
          </div>
          <div class="empty" @click="delshow = false">取消</div>
          <div class="confirm" @click="delconfirm">确认</div>
      </div>
    </div>
    <div class="phonebox" v-if="phoneshow">
      <div class="phone_box">
        <div class="none" @click="phoneshow = false">x</div>
        <h3>绑定手机</h3>
        <h4>请输入绑定手机号</h4>
          <div>
            <input type="text" placeholder="请输入绑定手机号" v-model="phone">
          </div>
          <div class="empty" @click="phone=''">清空</div>
          <div class="confirm" @click="phoneconfirm">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
import {parentBindStudent,getAttentions,deleteBindStudent,getParentBindInfo,setParentAccount,setParentNewPwd} from '@/api/api'
import { Toast } from 'mint-ui'
export default {
  name: 'set',
  components: {
    top
  },
  data () {
    return {
      msg:'设置',
      back:true,
      setshow:false,            //关联弹窗
      Gateway:false,
      Telephone:false,
      studentAccount:'',      //关联学生账户
      studentlist:[],        //关联学生列表
      Gatewayshow:false,    //门户弹窗
      GatewayAccount:'',
      Gatewaypsw:'',
      Gatewaypsw_:'',
      delshow:false,
      phoneshow:false,
      phone:'',
      id:''
    }
  },
  mounted() {
    this.getdata()
  },
  methods:{
    confirm() {
        if(this.studentAccount) {
          console.log(this.studentAccount)
          parentBindStudent(this.studentAccount).then(res=>{
            if(res.data.code == '0010') {
              this.getdata()
              this.setshow = false
              this.studentAccount = ''
            }
          })
        }else{
          Toast('请输入学生账户')
        }
    },
    getdata() {
      getAttentions().then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          this.studentlist = res.data.data
          localStorage.setItem('student',JSON.stringify(res.data.data))
        }
      })
      getParentBindInfo().then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          this.Gateway = res.data.data.account
          this.Telephone = res.data.data.phone
        }
      })
    },
    Gatewayconfirm(){
      console.log(this.GatewayAccount)
      console.log(this.Gatewaypsw)
      console.log(this.Gatewaypsw_)
      if(this.Gateway){
        if(this.Gatewaypsw == this.Gatewaypsw_){
            setParentNewPwd(this.Gatewaypsw).then(res=>{
              console.log(res)
              if(res.data.code == '0010'){
                  Toast('成功')
                  this.getdata()
                  this.Gatewayshow = false
              }else{
                  Toast('错误')
              }
            })
          }else {
          Toast('两次密码不一致')
        }
      }else{
        if(this.Gatewaypsw == this.Gatewaypsw_){
          setParentAccount(this.GatewayAccount,this.Gatewaypsw).then(res=>{
            if(res.data.code == '0010'){
                Toast('成功')
                this.getdata()
                this.Gatewayshow = false
            }else{
                Toast('错误')
            }
          })
        }else {
          Toast('两次密码不一致')
        }
      }
    },
    delconfirm(){
      deleteBindStudent(this.id).then(res=>{
        console.log(res)
        if(res.data.code == '0010'){
          this.getdata()
          this.delshow = false
        }
      })
    },
    phoneconfirm(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.set {
  width: 100%;
  margin-top: 119px;
  h3 {
      font-size: 30px;
      color: #3d72fe;
      font-weight: 700;
      letter-spacing:2px;
      text-align: center;
      margin: 31px auto;
  }
  .userbox {
    width: 100%;
    border: 1px solid #3d72fe;
    border-left: none;
    border-right: none;
    padding: 15px 60px;
    .fl {
        font-size: 28px;
        font-weight: 700;
        color: #333;
    }
    .fr {
        padding: 8px 22px;
        background-color: #3d72fe;
        color: #fff;
        font-size: 24px;
        border-radius: 15px;
        margin-right: -30px;
    }
  }
  .data_box {
    width: 100%;
    height: 160px;
    border: 2px solid #3d72fe;
    border-left: none;
    border-right: none;
    // box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
    padding: 14px 60px;
    position: relative;
    display: flex;
    .left {
      width: 132px;
      height: 132px;
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
        padding: 8px 22px;
        background-color: #3d72fe;
        color: #fff;
        font-size: 24px;
        border-radius: 15px;
        position: absolute;
        right: 30px;
        top: 70px;
      }
    }
  }
  .addbtn {
      display: inline-block;
      font-size: 30px;
      color: #fff;
      font-weight: 700;
      letter-spacing:2px;
      background-color: #3d72fe;
      padding: 15px 20px;
      border-radius: 15px;
      margin-left: 50%;
      margin-top: 20px;
      transform: translateX(-50%);
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
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
          letter-spacing:5px;
          color: #000;
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
  .Gateway {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    .Gateway_box {
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
          letter-spacing:5px;
          color: #000;
        }
        h4 {
          text-align: center;
          font-size: 18px;
          line-height: 26px;
        }
      div {
        margin: 30px auto;
        span {
          display: inline-block;
          width: 180px;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 1px;
          text-align: right;
        }
        input {
          margin-left: 10px;
          width: 50%;
          border: 2px solid #3d72fe;
          height: 34px;
          line-height: 34px;
          text-indent: 20px;
          background-color: #ecf1ff;
          border-radius: 5px;
          text-align: left; 
        }
        input:first-child{
          margin-left: 0px;
        }
      }
      .last {
        margin-bottom: 90px;
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
  .delbox {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    .del_box {
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
          letter-spacing:5px;
          color: #000;
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
  .phonebox {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    .phone_box {
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
          letter-spacing:5px;
          color: #000;
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
}
</style>
