import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: (resolve) => require(['@/view/home/home'], resolve)
    },
    {
      path: '/addchange',
      name: 'Addchange',
      component: (resolve) => require(['@/view/addChange/addChange'], resolve)
    },
    {
      path:'/listTable',
      name:'listTable',
      component: (resolve) => require(['@/view/listTable/listTable'], resolve)
    },
    {
      path:'/addChange',
      name:'addChange',
      component: (resolve) => require(['@/view/addChange/addChange'], resolve)
    }
  ]
})
