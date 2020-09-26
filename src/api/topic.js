import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/topics',
    method: 'get',
    params: query
  })
}

export function storeTopic({ name }) {
  return request({
    url: '/topics',
    method: 'post',
    params: { name }
  })
}

export function deleteTopic({ id }) {
  return request({
    url: '/topics/' + id,
    method: 'delete'
  })
}
