<template>
  <div class="bookdetails">
    <top :msg="msg" :back="back"></top>
    <div class="center">
      <div class="details">
        <div class="left">
          <img src="" alt="">
        </div>
        <div class="right">
          <div class="name">穷爸爸富爸爸</div>
          <div class="author">作者：罗伯特·清崎</div>
          <div class="price">免费</div>
          <br>
          <div class="btn">开始阅读</div>
          <div class="btn">添加收藏</div>
        </div>
      </div>
      <div class="introduction">
        <div class="introductiontop">书籍简介：</div>
        <div class="introductiontext">
          罗伯特·清崎有两个爸爸：“穷爸爸”是他的亲生父亲，一个高学历的教育官员；“富爸爸”是他好朋友的父亲，一个高中没毕业却善于投资理财的企业家。清崎遵从“穷爸爸”为他设计的人生道路：上大学，服兵役，参加越战，走过了平凡的人生初期。直到1977年，清崎亲眼目睹一生 辛劳的“穷爸爸”失了业，“富爸爸”则成了夏威夷最富有的人之一。罗伯特·清崎毅然追寻“富爸爸”的脚步，踏入商界，从此登上了致富快车。
        </div>
      </div>
      <div class="nav_tj">相关推荐</div>
       <div class="nav">
        <div class="nav_box" v-for="(item,index) in nav" :key="index">
          <div class="box_img">
            <img :src="item.img" alt>
          </div>
          <div class="name">{{item.name}}</div>
          <div class="author">{{item.author}}</div>
          <div class="price">{{item.price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import top from "@/components/top";
export default {
  name: "bookdetails",
  components: {
    top
  },
  data() {
    return {
      msg: "穷爸爸富爸爸",
      back:true,
      nav: [
        {
          img: "",
          name: "穷爸爸富爸爸",
          author: "作者：罗伯特·清崎",
          price: "免费"
        },
        {
          img: "",
          name: "穷爸爸富爸爸",
          author: "作者：罗伯特·清崎",
          price: "免费"
        },
        {
          img: "",
          name: "穷爸爸富爸爸",
          author: "作者：罗伯特·清崎",
          price: "免费"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.bookdetails {
  width: 100%;
  margin-top: 88px;
  .center {
      padding: 32px 58px;
      margin-bottom: 100px;
      .details {
        width: 100%;
        display: flex;
        margin-bottom: 31px;
        .left {
          width: 180px;
          height: 228px;
          border: 2px solid #3d72fe;
          border-radius: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          margin-left: 31px;
          .name {
            font-size: 30px;
            font-weight: 700;
            margin-top: 19px;
            margin-bottom: 19px;
          }
          .author {
            font-size: 20px;
            color: #666666;
            margin-bottom: 20px;
          }
          .price {
            display: inline-block;
            font-size: 20px;
            padding: 6px 10px;
            border: 2px solid #3d72fe;
            color: #3d72fe;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 24px;
          }
          .btn {
            display: inline-block;
            font-size: 24px;
            border-radius: 10px;
            padding: 18px 23px;
            background-color: #3d72fe;
            color: #fff;
          }
          .btn:last-child{
            margin-left: 20px;
            background-color: #66d3c0;
          }
        }
      }
      .introduction {
        .introductiontop {
          display: inline-block;
          padding: 13px 29px;
          background-color: #3d72fe;
          color:#fff;
          font-size: 24px;
          font-weight: 700;
          border-radius: 20px 20px 0 0;
        }
        .introductiontext {
          padding: 20px 15px;
          text-indent: 40px;
          font-size: 20px;
          line-height: 30px;
          letter-spacing:2px;
          font-weight: 500;
          border: 3px solid #3d72fe;
          border-radius: 0 20px 20px 20px;
        }
      }
    .nav_tj {
      font-size: 24px;
      padding-top: 30px;
    }
    .nav {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .nav_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction:column;
        margin-bottom: 30px;
        .box_img {
          width: 180px;
          height: 230px;
          border: 2px #3d72fe solid;
          border-radius: 10px;
        }
        .name {
          font-size: 20px;
          text-align: center;
          line-height: 40px;
        }
        .author {
          font-size: 20px;
          text-align: center;
        }

        .price {
          border: #3d72fe 2px solid;
          padding: 6px 10px;
          text-align: center;
          line-height: 30px;
          border-radius: 20px;
          margin: 10px 0;
          color: #3d72fe;
        }
      }
    }
  }
}
</style>
