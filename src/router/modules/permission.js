import Layout from '@/layout'

const componentMap = {
  users: () => import('@/views/users/index')
}

const permissionRouter = [
  {
    path: '/users',
    component: Layout,
    meta: { roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        component: 'users',
        name: 'Users',
        meta: { title: 'users', icon: 'people' }
      }
    ]
  }
]

permissionRouter.map((item) => {
  return item.children.map((child) => {
    child.component = componentMap[child.component]
  })
})

export default permissionRouter
