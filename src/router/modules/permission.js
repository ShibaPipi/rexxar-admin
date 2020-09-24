const componentMap = {
  layout: () => import('@/layout'),
  admin_users: () => import('@/views/system/admin-users'),
  admin_roles: () => import('@/views/system/admin-roles'),
  admin_permissions: () => import('@/views/system/admin-permissions'),
  users: () => import('@/views/users'),
  posts: () => import('@/views/posts'),
  topics: () => import('@/views/topics'),
  notices: () => import('@/views/notices')
}

const permissionRouter = [
  {
    path: '/system',
    component: 'layout',
    meta: { title: 'system', icon: 'el-icon-setting' },
    children: [
      {
        path: 'admin_users',
        component: 'admin_users',
        name: 'admin_users',
        meta: { title: 'admin_users', icon: 'user', roles: ['sys-manager'] }
      },
      {
        path: 'admin_roles',
        component: 'admin_roles',
        name: 'admin_roles',
        meta: { title: 'admin_roles', icon: 'peoples', roles: ['sys-manager'] }
      },
      {
        path: 'admin_permissions',
        component: 'admin_permissions',
        name: 'admin_permissions',
        meta: { title: 'admin_permissions', icon: 'eye-open', roles: ['sys-manager'] }
      }
    ]
  },

  {
    path: '/users',
    component: 'layout',
    children: [
      {
        path: 'index',
        component: 'users',
        name: 'users',
        meta: { title: 'users', icon: 'people', roles: ['editor', 'sys-manager'] }
      }
    ]
  },

  {
    path: '/posts',
    component: 'layout',
    children: [
      {
        path: 'index',
        component: 'posts',
        name: 'posts',
        meta: { title: 'posts', icon: 'edit', roles: ['sys-manager'] }
      }
    ]
  },

  {
    path: '/topics',
    component: 'layout',
    children: [
      {
        path: 'index',
        component: 'topics',
        name: 'topics',
        meta: { title: 'topics', icon: 'el-icon-paperclip', roles: ['sys-manager'] }
      }
    ]
  },

  {
    path: '/notices',
    component: 'layout',
    children: [
      {
        path: 'index',
        component: 'notices',
        name: 'notices',
        meta: { title: 'notices', icon: 'el-icon-bell', roles: ['sys-manager'] }
      }
    ]
  }
]

const mapRouterToSetComponent = router =>
  router.map(item => {
    item.component = componentMap[item.component]
    item.children && mapRouterToSetComponent(item.children)
  })

mapRouterToSetComponent(permissionRouter)

export default permissionRouter
