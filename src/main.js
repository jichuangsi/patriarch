// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
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
