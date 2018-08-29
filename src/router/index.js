// 路由页面
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/display/Main'
import List from '@/pages/display/List'
import Detail from '@/pages/display/Detail'
import Category from '@/pages/display/Category'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/detail/:title',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    }
  ]
})
