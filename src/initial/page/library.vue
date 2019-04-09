<template>
  <div class="index">
    <top :msg="msg"></top>
    <div class="center">
      <div class="search">搜索</div>
      <div class="nav_tj">推荐专区</div>
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
      <div class="all">全部书籍</div>
      <div class="nav_all">
        <div class="all_box" v-for="(item,index) in nav" :key="index">
          <div class="all_img">
            <!-- <img :src="item.img" alt> -->
          </div>
          <div class="name">穷爸爸富爸爸</div>
          <div class="author">作者：罗伯特·清崎</div>
          <div class="price">免费</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import top from "@/components/top";
export default {
  name: "index",
  components: {
    top
  },
  data() {
    return {
      msg: "家长图书馆",
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
.index {
  width: 100%;
  .center {
    padding: 30px 60px 30px 60px;
    .search {
      font-size: 24px;
      text-indent: 1em;
      line-height: 40px;
      width: 100%;
      height: 40px;
      border-radius: 20px 20px 20px 20px;
      border: black 2px solid;
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
        //   padding-right: 30px;
        .box_img {
          width: 180px;
          height: 230px;
          border: 2px #3d72fe solid;
          border-radius: 10px 10px 10px 10px;
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
          border: #3d72fe 1px solid;
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 15px 15px 15px 15px;
          margin: 10px auto 10px auto;
        }
      }
    }
    .all {
      font-size: 24px;
      padding-top: 55px;
    }
    .nav_all {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .all_box {
        .all_img {
          width: 180px;
          height: 230px;
          border: 2px #3d72fe solid;
          border-radius: 10px 10px 10px 10px;
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
          border: #3d72fe 1px solid;
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 15px 15px 15px 15px;
          margin: 10px auto 10px auto;
        }
      }
    }
  }
}
</style>
