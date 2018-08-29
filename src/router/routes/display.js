/* 新闻展示 */
import Layout from '@/components/layout/Index'

const List = resolve => require(['@/pages/display/List'], resolve)
const Detail = resolve => require(['@/pages/display/Detail'], resolve)
const Category = resolve => require(['@/pages/display/Category'], resolve)

const routes = [
  {
    path: '/display',
    component: Layout,
    children: [
      {
        path: 'list',
        component: List
      },
      {
        path: 'detail',
        component: Detail
      },
      {
        path: 'category',
        component: Category
      }
    ]
  }
]

export default routes
