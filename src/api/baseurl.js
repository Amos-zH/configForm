// 配置不同的环境访问不同的后端服务
const config = {
  // 通过跨域代理来调用接口
  // localhost: {
  //   baseurl: '/'
  // }
  // 调用easy-mock的接口
  localhost: {
    baseurl: 'http://127.0.0.1:4523/m1/838823-0-default',
  },
}

const hostname = config[window.location.hostname]
let baseUrl = null
if (hostname) {
  baseUrl = hostname.baseurl
}

export default baseUrl
