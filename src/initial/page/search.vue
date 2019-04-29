<template>
  <div class="search">
    <top :msg ="msg" :back="back"></top>
    <div class="center">
        <div class="searchbox">
            <input type="text" v-model="searchtext">
            <div class="iconfont icon-sousuo" @click="search"></div>
        </div>
            <div class="messagebox">
                <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <div class="down" v-for="(item,index) in nav" :key="index" @click="jump(item)">
                    <div class="left">
                        <img :src="item.picurl.indexOf(',')!=-1?item.picurl.split(',')[0]:item.picurl" alt="">
                    </div>
                    <div class="right">
                        <div class="title" v-html="item.title"></div>
                        <div class="status blue" v-if="item.status=='1'">教育头条</div>
                        <div class="status green" v-if="item.status=='2'">家长课堂</div>
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
</template>

<script>
import top from '@/components/top'
import {query} from '@/api/api'
import { Loadmore } from 'mint-ui'
export default {
  name: 'search',
  components: {
    top,
  },
  data () {
    return {
      msg:'搜索',
      back:true,
      searchtext:'',
      nav:[],
      pageindex:0,
      pagesize:10,
      allLoaded:false,
      pageshow:false
    }
  },
  mounted(){
  },
  methods:{
      search(){
          this.nav = []
          this.getdata()
      },
      getdata(){
          query(this.searchtext,this.pageindex,this.pagesize).then(res=>{
              this.nav.push(...res.data)
              if(res.data == ''){
                  this.pageshow = true
              }
          })
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
.search {
  width: 100%;
  margin-top: 118px;
  margin-bottom: 118px;
  position: relative;
  .center {
    padding: 0px 60px;
    .searchbox {
        width: 100%;
        height: 60px;
        border-radius: 10px;
        border: 3px solid #3d72fe;
        display: flex;
        overflow: hidden;
        input {
            flex: 1;
            background-color: #f2f2f2;
            text-indent: 20px;
        }
        div {
            width: 80px;
            height: 56px;
            line-height: 56px;
            text-align: center;
            font-size: 34px;
            background-color: #3d72fe;
            color: #fff;
        }
    }
    .messagebox{
        overflow: scroll;
            .down {
                width: 100%;
                height: 233px;
                padding: 30px 10px;
                margin: 10px 0px;
                border-radius: 10px;
                border-bottom: 3px solid #999;
                border:3px solid #3d72fe;
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
                    .status {
                        padding: 10px 20px;
                        color: #fff;
                        font-size: 20px;
                        border-radius: 10px;
                        position: absolute;
                        right: 20px;
                        top: 30px;
                    }
                    .blue {
                        background-color: #4e9ef5;
                    }
                    .green {
                        background-color: #63d4c0;
                    }
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
}
</style>
