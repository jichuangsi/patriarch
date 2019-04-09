import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top'
import foot from '@/components/foot'
import index from '@/initial/index'
import message from '@/initial/message'
import education from '@/initial/education'
import overview from '@/initial/overview'
import my from '@/initial/my'
import announcement from '@/initial/page/announcement'
import leaveWord from '@/initial/page/leaveWord'
import Contact_us from '@/initial/page/Contact_us'
import evaluation from '@/initial/page/evaluation'
import library from '@/initial/page/library'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/education',
      name: 'education',
      component: education
    },
    {
      path: '/overview',
      name: 'overview',
      component: overview
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/top',
      name: 'top',
      component: top
    },
    {
      path: '/foot',
      name: 'foot',
      component: foot
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: announcement
    },
    {
      path: '/leaveWord',
      name: 'leaveWord',
      component: leaveWord
    },
    {
      path: '/Contact_us',
      name: 'Contact_us',
      component: Contact_us
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: evaluation
    },{
      path: '/library',
      name: 'library',
      component: library
    }

  ]
})
