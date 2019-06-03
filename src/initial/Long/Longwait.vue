<template>
  <div class="Longwait">
      <img src="../../assets/img/合成-1.gif" alt="">
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {getWxToken,getParentInfo,loginParentService,getBindStudentInfo,getAttentions} from '@/api/api'
export default {
  name: 'Longwait',
  components: {
  },
  data () {
    return {
    }
  },
  mounted(){
      localStorage.setItem('position','长图')
      this.getdata()
  },
  methods:{
      getdata(){
      let token = localStorage.getItem('token')?localStorage.getItem('token'):''
      let student = JSON.parse(localStorage.getItem('student'))?JSON.parse(localStorage.getItem('student')):''
      let user = JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):''
      if(token&&student&&user){
        this.$router.push({
        path:'/LongIndex'
      })
      }else if(!token&&student){
        loginParentService(user.nickname,user.openid,user.headimgurl).then(res=>{
          if(res.data.code == "0010") {   //刷新token
            localStorage.setItem('token',res.data.data)
            this.$router.push({
                path:'/LongIndex'
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
                      getAttentions().then(res=>{  //查询绑定学生信息
                      if(res.data.code == '0010') {
                        this.student = res.data.data
                        localStorage.setItem('student',JSON.stringify(res.data.data))
                        this.$router.push({
                            path:'/LongIndex'
                        })
                      }
                    })
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
  },
  destroyed: function () { 
      localStorage.removeItem('position')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Longwait {
    width: 100%;
    height: 100%;
    background: url('../../assets/img/背景.png') no-repeat;
    img {
        width: 400px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>
