// 路由页面

import Vue from 'vue'
import Router from 'vue-router'
import List from '@/pages/display/List'
import Detail from '@/pages/display/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/detail/:title',
      name: 'Detail',
      component: Detail
    }
  ]
})

/**
 * 路由表
 */
/* module.exports = {
  /!**
   * 后台首页
   *!/
  '/admin*': {
    get: 'admin'
  },

  /!**
   * API
   *!/
  '/api': {
    /!**
     * 公用部分
     *!/
    // 当前用户帐号
    /!**
     * 数据
     *!/
    // 内容
    '/contents': {
      '/query': [100200, 'contents.list'],
      '/create': [100201, 'contents.create'],
      '/update': [100201, 'contents.update'],
      '/remove': [100201, 'contents.remove']
    },
    /!**
     * 后台
     *!/

    // 分类管理
    '/categories': {
      get: [110200, 100200, 100201, 100300, 100301, 'categories.query'],
      post: [110201, 'categories.create'],

      '/:_id': {
        get: [110200, 100200, 100300, 'categories.one'],
        put: [110201, 100301, 'categories.update'],
        delete: [110201, 'categories.remove']
      }
    },

    // 模板
    '/views': {
      get: [110100, 110201, 'views']
    }
  },

  /!**
   * 网站前台
   *!/
  // 内容页
  '/:content*': { get: 'content' },

  // 错误页
  '/!*': { get: 'errors.notFound' }
} */



/*
import Vue from 'vue'
import Router from 'vue-router'
import display from './routes/display'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...display,
    {
      path: '/!*',
      redirect: to => {
        return '/display'
      }
    }
  ]
})
*/
