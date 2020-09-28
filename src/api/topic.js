import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/topics',
    method: 'get',
    params: query
  })
}

export function store({ name }) {
  return request({
    url: '/topics',
    method: 'post',
    params: { name }
  })
}

export function destroy({ id }) {
  return request({
    url: '/topics/' + id,
    method: 'delete'
  })
}
