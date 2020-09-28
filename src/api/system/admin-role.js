import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin_roles',
    method: 'get',
    params: query
  })
}

export function store({ name, description }) {
  return request({
    url: '/admin_roles',
    method: 'post',
    params: { name, description }
  })
}

export function fetchPermissionList(id) {
  return request({
    url: '/admin_roles/' + id + '/admin_permissions',
    method: 'get'
  })
}

export function storePermission(id, { formList }) {
  return request({
    url: '/admin_roles/' + id + '/admin_permissions',
    method: 'post',
    params: { adminRolePermissionList: formList }
  })
}
