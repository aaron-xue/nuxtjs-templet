import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`
}

let request = axios.create(options)
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // openLoading();
  //请求参数序列化
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  // config.headers['access_token'] = getCookie('shenzhoubb_token')
  // config.headers['USER_ROLE'] = getCookie('USER_ROLE')
  return config;
}, function (error) {
  // 对请求错误做些什么
  // closeLoading();
  console.log(error);
  return Promise.reject(error);
});
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // closeLoading();
  console.log(response);
  if (response.status !== 200) {
    // toast(response.data.message)
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  // closeLoading();
  if (error === undefined || error.code === 'ECONNABORTED') {
    // toast('服务请求超时')
    return Promise.reject(error)
  }
  let status = error.response.status
  switch (status) {
    case 400:
    case 404:
    case 406:
    case 410:
    case 422:
      // toast('发出的请求有错误!')
      break;
    case 401:
    case 403:
      // window.synopsis.onApiError(status)
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      // toast('服务器发生错误!')
      break;
    default:
      break;
  }
  console.log(error);
  return Promise.reject(error);
});
const get = (url, param = {}) => {
  // console.log(param)
  param.v = +new Date
  return request.get(url, { params: param })
}
const post = (url, param = {}) => {
  return request.post(url, param)
}
export {
  get,
  post
}
