import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: (resolve) => require(['@/view/home/home'], resolve)
    },
    {
      path: '/home',
      name: 'Home',
      component: (resolve) => require(['@/view/home/home'], resolve)
    },
  ]
})
