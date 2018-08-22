import Vue from 'vue'
import Router from 'vue-router'
import display from './routes/display'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...display,
    {
      path: '/*',
      redirect: to => {
        return '/display'
      }
    }
  ]
})
