import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/posts',
    method: 'get',
    params: query
  })
}

export function togglePostStatus(id, status) {
  return request({
    url: '/posts/' + id,
    method: 'put',
    params: { status }
  })
}
