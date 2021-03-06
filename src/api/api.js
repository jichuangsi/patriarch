import axios from 'axios';
import Vue from 'vue'
// let api = 'http://192.168.31.154:7979'
let api = 'http://api.jichuangsi.com/PARENTSERVICE'
// let api = 'http://192.168.31.154:8888/PARENTSERVICE'
// let host = 'http://192.168.31.56:7979'



// 获取token，openid
export function getWxToken(code) {
    return axios({
        method: 'GET',
        url: api+`/parent/getWxToken/${code}`
    });
}


// 获取用户信息
export function getParentInfo(access_token,openid) {
    return axios({
        method: 'GET',
        url: api+`/parent/getParentInfo/${access_token}/${openid}`
    });
}

// 获取token
export function loginParentService(userName,openId,headimgurl) {
    return axios({
        method: 'POST',
        url: api+`/parent/loginParentService`,
        data:{
            userName,openId,headimgurl
        }
    });
}

//查看家长绑定信息
export function getParentBindInfo() {
    return axios({
        method: 'GET',
        url: api+`/parent/getParentBindInfo`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
//家长绑定门户账号密码
export function setParentAccount(account,pwd) {
    return axios({
        method: 'POST',
        url: api+`/parent/setParentAccount`,
        data:{
            account,pwd
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//家长门户账号修改密码
export function setParentNewPwd(pwd) {
    return axios({
        method: 'POST',
        url: api+`/parent/setParentNewPwd`,
        data:{
            pwd
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//家长绑定手机号
export function bindParentPhone(phone) {
    return axios({
        method: 'POST',
        url: api+`/parent/bindParentPhone`,
        data:{
            phone
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//查看家长是否绑定学生
export function getBindStudentInfo() {
    return axios({
        method: 'GET',
        url: api+`/parent/getBindStudentInfo`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 家长绑定学生
export function parentBindStudent(studentAccount) {
    return axios({
        method: 'GET',
        url: api+`/parent/parentBindStudent/${studentAccount}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 家长绑定学生
export function deleteBindStudent(studentId) {
    return axios({
        method: 'DELETE',
        url: api+`/parent/deleteBindStudent/${studentId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 查看关注的学生信息
export function getAttentions() {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/getAttentions`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 查看关注的学生老师的信息
export function getStudentTeachers(studentId) {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/getStudentTeachers/${studentId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 查看关注的学生成长动态
export function getGrowths(studentId) {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/getGrowths/${studentId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 删除关注的学生成长动态
export function deleteGrowth(studentId,growthId) {
    return axios({
        method: 'DELETE',
        url: api+`/studentInfo/deleteGrowth/${studentId}/${growthId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 查看关注的学生课程表
export function getStudentTimeTable(studentId) {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/getStudentTimeTable/${studentId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 查看关注的学生当天作业
export function getStudentHomeWork(studentId) {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/getStudentHomeWork/${studentId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 查看学生的各科课堂成绩
export function getStudentCourseScore(studentId,statisticsTimes,subjectName) {
    return axios({
        method: 'POST',
        url: api+`/studentInfo/getStudentCourseScore`,
        data:{
            studentId,statisticsTimes,subjectName
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 查看学生的各科课后作业成绩
export function getStudentHomeworkScore(studentId,statisticsTimes,subjectName) {
    return axios({
        method: 'POST',
        url: api+`/studentInfo/getStudentHomeworkScore`,
        data:{
            studentId,statisticsTimes,subjectName
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 查看学生的各科考试成绩
export function getStudentTestScore(studentId,statisticsTimes,subjectName) {
    return axios({
        method: 'POST',
        url: api+`/studentInfo/getStudentTestScore`,
        data:{
            studentId,statisticsTimes,subjectName
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 查看学生的各科上课点赞
export function getCourseCommendTime(studentId,statisticsTimes) {
    return axios({
        method: 'POST',
        url: api+`/SchoolPerformance/getCourseCommendTime?studentId=`+studentId+'&statisticsTimes='+statisticsTimes,
        // data:{
        //     studentId,statisticsTimes,subjectName
        // },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 更换关注的学生
export function updateAttention(studentId) {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/updateAttention/${studentId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
//查看学生在校情况（考试）
export function getTestHistory(studentId,pageIndex,pageSize,status) {
    return axios({
        method: 'POST',
        url: api+`/SchoolPerformance/getTestHistory`,
        data:{
            studentId,pageIndex,pageSize,status
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//查看学生在校情况（课堂）
export function getCourseHistory(studentId,pageNum,pageSize) {
    return axios({
        method: 'POST',
        url: api+`/SchoolPerformance/getCourseHistory`,
        data:{
            studentId,pageNum,pageSize
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//查看学生在校情况（点赞）
export function getCourseCommend(studentId,pageSize,pageNum) {
    return axios({
        method: 'POST',
        url: api+`/SchoolPerformance/getCourseCommend?studentId=`+studentId+'&pageSize='+pageSize+'&pageNum='+pageNum,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 获取校园通知
export function parentGetNewNotices() {
    return axios({
        method: 'GET',
        url: api+`/parent/parentGetNewNotices`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
//校园通知详情
export function getNoticeByNoticeId(noticeId) {
    return axios({
        method: 'GET',
        url: api+`/parent/getNoticeByNoticeId/${noticeId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 删除校园通知
export function deleteParentNotice(noticeId) {
    return axios({
        method: 'DELETE',
        url: api+`/parent/deleteParentNotice/${noticeId}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//家长留言板
export function leaveParentMessageBoard(content) {
    return axios({
        method: 'POST',
        url: api+`/parent/leaveParentMessageBoard`,
        data:{
            content
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

//查询家长端留言聊天记录
export function getParentMessage(techerId,pageIndex,pageSize) {
    return axios({
        method: 'GET',
        url: api+`/parent/getParentMessage/${techerId}/${pageIndex}/${pageSize}`,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
//家长端发送留言
export function sendParentMessage(teacherId,teacherName,content) {
    return axios({
        method: 'POST',
        url: api+`/parent/sendParentMessage`,
        data:{
            teacherId,teacherName,content
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 新闻列表
export function data(status,pageindex,pagesize) {
    return axios({
        method: 'GET',
        url: api+'/news/getNewsList?status='+status+'&pageindex='+pageindex+'&pagesize='+pagesize,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 新闻详情
export function details(infoid) {
    return axios({
        method: 'GET',
        url: api+'/news/getNewsDetail?infoid='+infoid,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 新闻查询
export function query(title,pageindex,pagesize) {
    return axios({
        method: 'GET',
        url: api+'/news/queryNews?title='+title+'&pageindex='+pageindex+'&pagesize='+pagesize,
        headers: {'accessToken': localStorage.getItem('token')}
    });
}


let ajax = axios.create({
    baseURL:api,
    headers: {
      "Content-Type": "multipart/form-data",
      'accessToken': localStorage.getItem('token') ,
    },
  })
  
  Vue.prototype.$ajax = ajax;