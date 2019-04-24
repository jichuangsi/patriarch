import axios from 'axios';
import Vue from 'vue'
// let api = 'http://192.168.31.154:7979'
let api = 'http://api.jichuangsi.com/PARENTSERVICE'



// 获取token，openid
export function getWxToken(code) {
    return axios({
        method: 'GET',
        url: api+`/parent/getWxToken/${code}`,
        headers: {'accessToken': '123456789'}
    });
}


// 获取用户信息
export function getParentInfo(access_token,openid,code) {
    return axios({
        method: 'GET',
        url: api+`/parent/getParentInfo/${access_token}/${openid}/${code}`,
        headers: {'accessToken': '123456789'}
    });
}

// 获取用户信息
export function loginParentService(userName,openId,phone) {
    return axios({
        method: 'POST',
        url: api+`/parent/loginParentService`,
        data:{
            userName,openId,phone
        },
        headers: {'accessToken': '123456789'}
    });
}

//查看家长是否绑定学生
export function getParentBindInfo() {
    return axios({
        method: 'GET',
        url: api+`/parent/getParentBindInfo`,
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

// 更换关注的学生
export function updateAttention(studentId) {
    return axios({
        method: 'GET',
        url: api+`/studentInfo/updateAttention/${studentId}`,
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

//家长发送留言
export function leaveParentMessageBoard(content) {
    return axios({
        method: 'GET',
        url: api+`/parent/leaveParentMessageBoard`,
        data:{
            content
        },
        headers: {'accessToken': localStorage.getItem('token')}
    });
}

// 新闻列表
export function data(status,pageindex,pagesize) {
    return axios({
        method: 'post',
        url: 'http://192.168.31.123/parentjournalism/getlist.php?status='+status+'&pageindex='+pageindex+'&pagesize='+pagesize,
        // headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 新闻详情
export function details(infoid) {
    return axios({
        method: 'post',
        url: 'http://192.168.31.123/parentjournalism/getinfo.php?infoid='+infoid,
        // headers: {'accessToken': localStorage.getItem('token')}
    });
}
// 新闻查询
export function query(title,pageindex,pagesize) {
    return axios({
        method: 'post',
        url: 'http://192.168.31.123/parentjournalism/getlookup.php?title='+title+'&pageindex='+pageindex+'&pagesize='+pagesize,
        // headers: {'accessToken': localStorage.getItem('token')}
    });
}


let ajax = axios.create({
    baseURL:'http://192.168.31.154:8888/PARENTSERVICE',
    headers: {
      "Content-Type": "multipart/form-data",
      'accessToken': localStorage.getItem('token') ,
    },
  })
  
  Vue.prototype.$ajax = ajax;