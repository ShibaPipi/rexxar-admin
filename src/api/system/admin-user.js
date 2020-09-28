import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin_users',
    method: 'get',
    params: query
  })
}

export function store({ name, password }) {
  return request({
    url: '/admin_users',
    method: 'post',
    params: { name, password }
  })
}

export function fetchRoleList(id) {
  return request({
    url: '/admin_users/' + id + '/admin_roles',
    method: 'get'
  })
}

export function storeRole(id, { formList }) {
  return request({
    url: '/admin_users/' + id + '/admin_roles',
    method: 'post',
    params: { adminUserRoleList: formList }
  })
}
