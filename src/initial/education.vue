<template>
  <div class="education">
    <top :msg ="msg" :back="back"></top>
    <router-link to="search"><div class="search iconfont icon-sousuo"></div></router-link>
        <div class="swipe">
        <mt-swipe :auto="4000">
        <mt-swipe-item><div class="swipe-img1"><img src="../assets/img/nav1.jpg" alt=""></div></mt-swipe-item>
        <mt-swipe-item><div class="swipe-img2"><img src="../assets/img/nav2.jpg" alt=""></div></mt-swipe-item>
        <mt-swipe-item><div class="swipe-img3"><img src="../assets/img/nav3.jpg" alt=""></div></mt-swipe-item>
        </mt-swipe>
        </div>  
    <div class="center">
        <div class="center_box">
            <div class="top">
                <div class="left" @click="educationbtn" :class="{left_top:btn==1}">教育头条</div>
                <div class="right" @click="Parentbtn" :class="{right_top:btn==2}">家长课堂</div>
            </div>
            <div id="content">
                <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <div class="down" v-for="(item,index) in nav" :key="index" @click="jump(item)">
                        <div class="left">
                            <img :src="item.picurl.indexOf(',')!=-1?item.picurl.split(',')[0]:item.picurl" alt="">
                        </div>
                        <div class="right">
                            <div class="title" v-html="item.title"></div>
                            <!-- <div class="text" v-html="item.content">
                            </div> -->
                            <div class="nav">
                                    <div><i class="iconfont icon-liulan"></i><span>{{item.view}}</span></div>
                                    <div><i class="iconfont icon-dianzan"></i><span>{{item.agree}}</span></div>
                                    <div><i class="iconfont icon-pinglun"></i><span>{{item.replynum}}</span></div>
                                    <div><i class="iconfont icon-shoucang"></i><span>0</span></div>
                            </div>
                            <div class="details">查看详情 ></div>
                        </div>
                    </div>
                    <div class="more" v-if="!pageshow">---上拉加载更多---</div>
                    <div class="more" v-if="pageshow">---没有更多---</div>
                </mt-loadmore>
            </div>
        </div>
    </div>
    <foot :current="current"></foot>
  </div>
</template>

<script>
import top from '@/components/top'
import foot from '@/components/foot'
import { Swipe, SwipeItem, Loadmore } from 'mint-ui'
import {data} from '@/api/api'
export default {
  name: 'education',
  components: {
    top,
    Swipe,
    SwipeItem,foot
  },
  data () {
    return {
      msg:'教育头条',
      back:false,
      current:2,
      btn:1,
      pageindex:0,
      pagesize:10,
      nav:[],
      allLoaded:false,
      pageshow:false
    }
  },
  mounted(){
      this.getdata()
  },
  methods:{
      getdata() {
          data(this.btn,this.pageindex,this.pagesize).then(res=>{
              this.nav.push(...res.data)
              if(res.data == ''){
                  this.pageshow = true
                  
              }
          })
      },
      educationbtn(){
          this.btn = 1
          this.nav = []
          this.pageshow = false
          this.allLoaded = false
          this.getdata()
      },
      Parentbtn(){
          this.btn = 2
          this.nav = []
          this.pageshow = false
          this.allLoaded = false
          this.getdata()
      },
      jump(item){
          this.$router.push({path:'/News',query:{id:item.id}})
      },
    loadBottom () {
        if(this.pageshow) {
            this.allLoaded = true
            this.$refs.loadmore.onBottomLoaded()
        }else{
            this.pageindex++
            this.getdata()
            this.$refs.loadmore.onBottomLoaded()
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.education {
  width: 100%;
  margin-top: 118px;
  margin-bottom: 118px;
  position: relative;
  .search {
      position: fixed;
      top: 23px;
      right: 50px;
      font-size: 44px;
      color: #fff;
      z-index: 100;
  }  
    .swipe {
        height: 240px;
        margin: 30px 0px;
        box-shadow: 0px 0px 16px rgba(0,0,0,0.3);
        .swipe-img1 {
            height: 100%;
            img {
            width: 100%;
            height: 100%;
            }
        }
        .swipe-img2 {
            height: 100%;
            img {
            width: 100%;
            height: 100%;
            }
        }
        .swipe-img3 {
            height: 100%;
            img {
            width: 100%;
            height: 100%;
            }
        }
        .mint-swipe-indicators {
            .mint-swipe-indicator {
                background-color: #fff !important;
            }
            .is-active {
                background-color: #333;
            }
        }
    }
    .center {
        padding: 0px 45px;
        margin-top: 110px;
        .center_box {
            width: 100%;
            border: 3px solid #4e9ef5;
            border-radius: 20px;
            padding: 0px 25px;
            padding-bottom: 30px;
            position: relative;
            .top {
                width: 600px;
                display: flex;
                position: absolute;
                top: -63px;
                div {
                    width: 50%;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    color: #fff;
                    font-size: 28px;
                    font-weight: 700;
                }
                .left {
                    background-color: #4e9ef5;
                    border-top-left-radius: 20px;
                }
                .right {
                    background-color: #63d4c0;
                    border-top-right-radius: 20px;
                }
                .left_top {
                    height: 80px;
                    line-height: 80px;
                    margin-top:-20px;
                }
                .right_top {
                    height: 80px;
                    line-height: 80px;
                    margin-top:-20px;
                }
            }
            .down {
                width: 100%;
                height: 233px;
                padding-top: 30px;
                border-bottom: 3px solid #999;
                position: relative;
                display: flex;
                .left {
                    width: 180px;
                    height: 180px;
                    border-radius: 10px;
                    background-color: #333;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    flex: 1;
                    margin-left: 29px;
                    .title {
                        width: 200px;
                        height: 34px;
                        line-height: 34px;
                        font-size: 28px;
                        font-weight: 700;
                        color: #333;
                        margin-top: 30px;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        overflow: hidden; 
                    }
                    .text {
                        width: 400px;
                        height: 50px;
                        font-size: 20px;
                        line-height: 24px;
                        font-weight: 700;
                        color: #808080;
                        margin: 18px 0px;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        overflow: hidden; 
                    }
                    .nav {
                        div {
                            display: inline-block;
                            margin-top: 96px;
                            i {
                                vertical-align: middle;
                                font-size: 26px;
                                margin-right: 5px;
                            }
                            span {
                                font-size: 20px;
                            }
                        }
                    }
                    .details {
                        font-size: 20px;
                        color: #3d72fe;
                        position: absolute;
                        bottom: 17px;
                        right: 0px;
                    }
                }
            }
                .more {
                    margin-top: 20px;
                    text-align: center;
                }
        }
    }
    #content {
        overflow: scroll;   
    }
}
</style>
