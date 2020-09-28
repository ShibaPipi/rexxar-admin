import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin_permissions',
    method: 'get',
    params: query
  })
}

export function store({ name, description }) {
  return request({
    url: '/admin_permissions',
    method: 'post',
    params: { name, description }
  })
}
