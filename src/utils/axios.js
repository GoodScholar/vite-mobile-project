import axios from 'axios' // 引入axios
import store from '@/store/index'
import { Toast } from 'vant'

// 环境切换
switch (import.meta.env.MODE) {
  case 'development':
    axios.defaults.baseURL = 'https://www.baidu.com'
    break
  case 'production':
    axios.defaults.baseURL = 'https://www.production.com'
    break
}

// 设置请求超时
axios.defaults.timeout = 10000
// 请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },

  (error) => {
    return Promise.error(error)
  },
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          axios.replace({
            path: '/login',
            query: {
              redirect: axios.currentRoute.fullPath,
            },
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true,
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            axios.replace({
              path: '/login',
              query: {
                redirect: axios.currentRoute.fullPath,
              },
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true,
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true,
          })
      }
      return Promise.reject(error.response)
    }
  },
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
