<template>
  <div class="education">
    <top :msg ="msg"></top>
    <div class="search iconfont icon-sousuo"></div>
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
                <div class="left" @click="current = 1" :class="{left_top:current==1}">教育头条</div>
                <div class="right" @click="current = 2" :class="{right_top:current==2}">家长课堂</div>
            </div>
            <div class="down">
                <div class="left"></div>
                <div class="right">
                    <div class="title">资讯标题一</div>
                    <div class="text">
                        资讯简要内容资讯简要内容资讯简要内容资
                        讯简要内容资讯简要内容资讯
                    </div>
                    <div class="nav">
                            <div><i class="iconfont icon-liulan"></i><span>666</span></div>
                            <div><i class="iconfont icon-dianzan"></i><span>666</span></div>
                            <div><i class="iconfont icon-pinglun"></i><span>666</span></div>
                            <div><i class="iconfont icon-shoucang"></i><span>666</span></div>
                    </div>
                    <div class="details">查看详情 ></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  name: 'education',
  components: {
    top,
    Swipe,
    SwipeItem
  },
  data () {
    return {
      msg:'教育头条',
      current:1,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.education {
  width: 100%;
  position: relative;
  .search {
      position: absolute;
      top: 23px;
      right: 50px;
      font-size: 44px;
      color: #fff;
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
                }
                .right {
                    flex: 1;
                    margin-left: 29px;
                    .title {
                        font-size: 28px;
                        font-weight: 700;
                        color: #333;
                        margin-top: 30px;
                    }
                    .text {
                        font-size: 20px;
                        font-weight: 700;
                        color: #808080;
                        margin: 18px 0px;
                    }
                    .nav {
                        div {
                            display: inline-block;
                            i {
                                vertical-align: middle;
                                font-size: 22px;
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
        }
    }
}
</style>
