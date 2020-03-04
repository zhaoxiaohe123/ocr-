import request from '@/utils/request'
export function List (data) {
  return request({
    url: '/ocrapi/v1/list',
    method: 'POST',
    params: data,
  })
}
export function DelList (data) {
  return request({
    url: '/ocrapi/v1/delete',
    method: 'POST',
    params: data,
  })
}
export function AddList (data) {
  return request({
    url: '/api/ocrapi/v1/addList',
    method: 'POST',
    params: data,
  })
}
export function UpdateList (data) {
  return request({
    url: '/ocrapi/v1/update',
    method: 'POST',
    params: data,
  })
}