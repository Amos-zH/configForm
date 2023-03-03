import request from '../fetch'

export const getApi = (data) => {
  return request({
    url: '/api/getInfo',
    method: 'get',
    params: data,
  })
}

export const postApi = (data) => {
  return request({
    url: '/api/postInfo',
    method: 'post',
    data,
  })
}

export const getMenu = (data) => {
  return request({
    url: '/api/getMenu',
    method: 'get',
    params: data,
  })
}
