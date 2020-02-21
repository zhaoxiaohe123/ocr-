import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ListTable',
      component: (resolve) => require(['@/view/listTable/listTable'], resolve)
    },
    {
      path: '/addchange',
      name: 'Addchange',
      component: (resolve) => require(['@/view/addChange/addChange'], resolve)
    },
  ]
})
