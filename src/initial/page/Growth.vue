<template>
  <div class="Growth">
    <top :msg ="msg" :back="back"></top>
    <div class="data_box">
      <div class="left"></div>
      <div class="right">
        <div class="name">关联学生：{{student.studentName}}</div>
        <div class="school">在读学校：{{student.schoolName}}</div>
        <div class="class">所在班级：{{student.className}}</div>
        <div class="change">查看</div>
        <div class="setbtn" @click="setshow=true,title='',newimg='',imgshow=false">修改</div>
        <div class="setbtn" v-if="setshow" @click="set">完成</div>
        <div class="change" v-if="setshow" @click="addshow = true">添加</div>
      </div>
    </div>
    <div class="center">
        <div class="img_box" v-for="(item,index) in nav" :key="index">
            <div class="circular" :class="{circularcolor:setshow}" @click="del(item)">
                <div class="small_circular" v-if="!setshow"></div>
                <div class="del" v-if="setshow">x</div>
            </div>
            <div class="leftbox">
                <div class="text">{{item.nian}}</div>
                <div class="text">{{item.createdTime}}</div>
            </div>
            <div class="rightbox">
                <img :src="'data:image/png;base64,'+item.parentFile.content" alt="">
                <div class="text">{{item.title}}</div>
            </div>
        </div>
    </div>
    <div class="addbox" v-if="addshow">
        <div class="add_box">
        <div class="none" @click="addshow = false">x</div>
            <div class="imgtext">添加图片：</div>
            <div class="imgbox">
                <img :src="newimg" alt="" v-if="imgshow">
                <div v-if="!imgshow">
                    <input type="file" name="fileUpload" id="fileUp" @change="fileChange($event)" ref="inputFile" >
                    <div>+</div>
                    <span>添加图片</span>
                </div>
            </div>
            <div class="ipt">
                <span>成长记录:</span>
                <textarea name="ipttext" id="ipttext" cols="30" rows="10" v-model="title"></textarea>
            </div>
          <div class="empty" @click="title='',newimg='',imgshow=false">清空</div>
          <div class="confirm" @click="confirm">确认</div>
        </div>
    </div>
    <div class="delbox" v-if="delshow">
        <div class="del_box">
        <div class="none" @click="delshow = false">x</div>
        <h3>是否删除此记录</h3>
          <div class="empty" @click="delshow = false">取消</div>
          <div class="confirm" @click="delconfirm">确认</div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
import {MessageBox,Toast} from 'mint-ui'
import {getGrowths,insertGrowth,deleteGrowth} from '@/api/api'
export default {
  name: 'Growth',
  components: {
    top
  },
  data () {
    return {
      msg:'成长记录',
      back:true,
      nav:[],
      setshow:false,
      newimg: '',
      imgList: '',
      imgshow: false,
      id:'',
      student:'',
      addshow:false,
      title:'',
      delshow:false,
      delid:''
    }
  },
  mounted() {
      this.getdata()
  },
  methods:{
      set(){
          this.setshow = false
      },
      del(item){
          this.delid = item.id
          this.delshow = true
      },
      getdata() {
          this.student = JSON.parse(localStorage.getItem('student'))[0]
          this.id = JSON.parse(localStorage.getItem('student'))[0].studentId
          getGrowths(this.id).then(res=>{
              console.log(res)
              if(res.data.code == '0010') {
                  this.nav = res.data.data
                  for (let i = 0; i<this.nav.length;i++){
                      this.nav[i].nian = this.getLocalTime(this.nav[i].createdTime/1000).split(' ')[0].split('/')[0]+'年'
                      this.nav[i].createdTime = this.getLocalTime(this.nav[i].createdTime/1000).split(' ')[0].split('/')[1]+'月'+this.getLocalTime(this.nav[i].createdTime/1000).split(' ')[0].split('/')[2]+'日'
                  }
                  console.log(this.nav)
              }
          })
      },
      confirm() {
           let formdata = new FormData();
           formdata.append('studentId',this.id)
           formdata.append('file',this.imgList)
           formdata.append('title',this.title)
            this.$ajax.post('/studentInfo/insertGrowth',formdata).then(res=>{
                console.log(res)
                if(res.data.code == '0010') {
                    Toast('添加成功')
                    this.getdata()
                    this.addshow = false
                }else{
                    Toast('添加失败')
                }
            })
      },
      delconfirm() {
          deleteGrowth(this.id,this.delid).then(res=>{
              console.log(res)
              if(res.data.code == '0010') {
                    Toast('删除成功')
                    this.getdata()
                    this.delshow = false
              }
          })
      },
    // 上传图片
    fileChange (el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target)
      el.target.value = ''
    },
    fileList (fileList) {
      let files = fileList.files
      for (let i = 0; i < files.length; i++) {
        // 判断是否为文件夹
        if (files[i].type != '') {
          this.fileAdd(files[i])
        } else {
          // 文件夹处理
          this.folders(fileList.items[i])
        }
      }
    },
    // 文件夹处理
    folders (files) {
      let _this = this
      // 判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry()
      }
      files.createReader().readEntries(function (file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i])
          } else {
            _this.folders(file[i])
          }
        }
      })
    },
    foldersAdd (entry) {
      let _this = this
      entry.file(function (file) {
        _this.fileAdd(file)
      })
    },
    fileAdd (file) {
      if (this.limit !== undefined) this.limit--
      if (this.limit !== undefined && this.limit < 0) return
      // 总大小
      this.size = this.size + file.size
      // 判断是否为图片文件
      if (file.type.indexOf('image') == -1) {
        Toast('请选择图片文件')
      } else {
        let reader = new FileReader()
        let image = new Image()
        let _this = this
        reader.readAsDataURL(file)
        console.log(file)
        reader.onload = function () {
          file.src = this.result
          image.onload = function () {
            let width = image.width
            let height = image.height
            file.width = width
            file.height = height
            _this.imgList = file
            _this.newimg = _this.imgList.src
            _this.imgshow = true
            // let imgsrc = 'multipart/form data' + _this.imgList.src.split(',')[1]
            // console.log(imgsrc)
            // console.log(_this.newimg)
          }
          image.src = file.src
        }
      }
    },
    getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Growth {
  width: 100%;
  margin-top: 118px;
  .data_box {
    width: 100%;
    height: 260px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
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
      .change {
        padding: 11px 28px;
        background-color: #3d72fe;
        color: #fff;
        font-size: 28px;
        border-radius: 15px;
        position: absolute;
        right: 30px;
        bottom: 70px;
      }
      .setbtn {
        padding: 11px 28px;
        background-color: #69d4c4;
        color: #fff;
        font-size: 28px;
        border-radius: 15px;
        position: absolute;
        right: 30px;
        top: 40px;
      }
    }
  }
  .center {
      padding: 50px 45px;
      .img_box {
          width: 100%;
          height: 426px;
          position: relative;
          .circular {
              width: 30px;
              height: 30px;
              text-align: center;
              line-height: 10px;
              padding: 5px;
              border-radius: 50%;
              border: 2px solid #69d4c4;
              background-color: #fff;
              position: absolute;
              left: 77px;
              top: 11px;
              z-index: 5;
              .small_circular {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  background-color: #69d4c4;
              }
              .del {
                  font-size: 28px;
                  color:#fff;
              }
          }
          .circularcolor {
              background-color: red;
              border: 2px solid red;
          }
          .leftbox {
              width: 90px;
              height: 100%;
              border: 4px solid #69d4c4;
              border-left-color: transparent;
              border-bottom-color: transparent;
              position: absolute;
              top: 22px;
              left: 0px;
              .text {
                  font-size: 20px;
                  line-height: 28px;
                  font-weight: 600;
                  margin-left: -18px;
                  text-align: center;
              }
              .text:first-child {
                  margin-top: -28px;
              }
          }
          .rightbox {
              width: 556px;
              height: 298px;
              border: 4px solid #69d4c4;
              position: absolute;
              top: 22px;
              left: 96px;
              img {
                  width: 100%;
                  height: 100%;
              }
              .text {
                  font-size: 20px;
                  line-height: 28px;
                  font-weight: 600;
                //   margin-top: 300px;
              }
          }
      }
  }
  .addbox {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 10;
      .add_box {
          width: 680px;
          height: 620px;
          padding: 19px 62px 37px 62px;
          position: absolute;
          left: 50%;
          top: 50%;
          background-color: #fff;
          transform: translate(-50%,-50%);
            .none {
                margin: -10px;
                padding: 5px 20px;
                font-size: 36px;
                position: absolute;
                top: 5px;
                right: 10px;
            }
            .imgtext {
                font-size: 24px;
                margin-bottom: 19px;
            }
          .imgbox {
            display: inline-block;
            width: 100%;
            height: 298px;
            text-align: center;
            color: #cfb3b3;
            background-color: #f2f2f2;
            vertical-align: top;
            position: relative;
            border: 4px solid #69d4c4;
            img {
                width: 100%;
                height: 100%;
            }
            input {
                width: 100%;
                height: 100%;
                position: absolute;
                top:0px;
                left: 0px;
                opacity: 0;
            }
            div {
                font-size: 120px;
                margin-top: 50px;
            }
            span {
                display: block;
                font-size: 30px;
            }
          }
        .ipt {
            span {
                display: block;
                margin-top: 20px;
                font-size: 24px;
                line-height: 34px;
                margin-bottom: 10px;
            }
            #ipttext {
                outline: none;
                width: 100%;
                height: 80px;
                border: 4px solid #69d4c4;
                background-color: #f2f2f2;
            }
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
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.3);
      .del_box {
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
              font-size: 38px;
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
