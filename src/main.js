// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible'
import '@/assets/style/index.scss'
import 'swiper/dist/css/swiper.css'
import store from '@/store/store.js'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})

router.afterEach((to,from,next) => {

  window.scrollTo(0,0);

})

// 判断token是否失效
axios.interceptors.response.use(response => {
  if (response) {
      switch (response.data.code) {

          case '0031': //与后台约定登录失效的返回码,根据实际情况处理
          localStorage.removeItem('token')
          if(localStorage.getItem('position')){
            router.replace({
              path: '/Longwait'
            })
          }else{
            router.replace({
              path: '/'
            })
          }
      }
  }
  return response;
}, error => {

  return Promise.reject(error.response.data) //返回接口返回的错误信息
})