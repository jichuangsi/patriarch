import Vue from 'vue'
import Router from 'vue-router'
import top from '@/components/top'
import foot from '@/components/foot'
import index from '@/initial/index'
import LongIndex from '@/initial/Long/LongIndex'
import Longwait from '@/initial/Long/Longwait'
import message from '@/initial/message'
import education from '@/initial/education'
import overview from '@/initial/overview'
import my from '@/initial/my'
import announcement from '@/initial/page/announcement'
import leaveWord from '@/initial/page/leaveWord'
import Contact_us from '@/initial/page/Contact_us'
import evaluation from '@/initial/page/evaluation'
import library from '@/initial/page/library'
import bookdetails from '@/initial/page/bookdetails'
import Growth from '@/initial/page/Growth'
import homework from '@/initial/page/homework'
import Commendation from '@/initial/page/Commendation'
import Situation from '@/initial/page/Situation'
import set from '@/initial/page/set'
import Report from '@/initial/page/Report'
import Schedule from '@/initial/page/Schedule'
import News from '@/initial/page/News'
import search from '@/initial/page/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/LongIndex',
      name: 'LongIndex',
      component: LongIndex
    },
    {
      path: '/Longwait',
      name: 'Longwait',
      component: Longwait
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
    },{
      path: '/bookdetails',
      name: 'bookdetails',
      component: bookdetails
    },{
      path: '/Growth',
      name: 'Growth',
      component: Growth
    },{
      path: '/homework',
      name: 'homework',
      component: homework
    },{
      path: '/Commendation',
      name: 'Commendation',
      component: Commendation
    },{
      path: '/Situation',
      name: 'Situation',
      component: Situation
    },{
      path: '/set',
      name: 'set',
      component: set
    },{
      path: '/Report',
      name: 'Report',
      component: Report
    },{
      path: '/Schedule',
      name: 'Schedule',
      component: Schedule
    },{
      path: '/News',
      name: 'News',
      component: News
    },{
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
