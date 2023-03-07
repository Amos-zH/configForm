import request from '../fetch'

export const getApi = (data) => {
  return request({
    url: '/api/getInfo',
    method: 'get',
    params: data,
  })
}

export const getIdrBsAutoRenderPageApi = (data) => {
  return request({
    url: '/getIdrBsAutoRenderPage',
    method: 'post',
    data,
  })
}
