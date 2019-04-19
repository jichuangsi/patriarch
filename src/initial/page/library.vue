<template>
  <div class="library">
    <top :msg="msg" :back="back"></top>
    <div class="center">
      <div class="search"><input type="text" v-model="searchtext" placeholder="搜索"></div>
      <div class="nav_tj">推荐专区</div>
      <div class="nav">
        <div class="nav_box" v-for="(item,index) in nav" :key="index" @click="jump">
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
  name: "library",
  components: {
    top
  },
  data() {
    return {
      msg: "家长图书馆",
      back:true,
      searchtext:'',
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
  },
  methods:{
    jump(){
      this.$router.push({path:'/bookdetails'})
    }
  }
};
</script>
<style lang="scss" scoped>
.library {
  width: 100%;
  margin-top: 88px;
  .center {
    padding: 30px 60px;
    .search {
      font-size: 24px;
      padding: 0px 20px;
      line-height: 40px;
      width: 100%;
      height: 40px;
      border-radius: 20px;
      border: black 2px solid;
      overflow: hidden;
      input {
        width: 100%;
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
    .all {
      font-size: 24px;
      padding-top: 55px;
    }
    .nav_all {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 100px;
      .all_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction:column;
        margin-bottom: 30px;
        .all_img {
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
