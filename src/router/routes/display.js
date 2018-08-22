/* 新闻展示 */
import Layout from '@/components/layout/Index'

const List = resolve => require(['@/pages/display/List'], resolve)
const Detail = resolve => require(['@/pages/display/Detail'], resolve)

const routes = [
  {
    path: '/display',
    component: Layout,
    children: [
      {
        path: '',
        component: List
      },
      {
        path: 'detail',
        component: Detail
      }
    ]
  }
]

export default routes
