import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/posts',
    method: 'get',
    params: query
  })
}

export function toggleStatus(id, status) {
  return request({
    url: '/posts/' + id,
    method: 'put',
    params: { status }
  })
}
