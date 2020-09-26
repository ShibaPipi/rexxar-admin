import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/notices',
    method: 'get',
    params: query
  })
}

export function storeNotice({ title, content }) {
  return request({
    url: '/notices',
    method: 'post',
    params: { title, content }
  })
}

export function deleteNotice({ id }) {
  return request({
    url: '/notices/' + id,
    method: 'delete'
  })
}
