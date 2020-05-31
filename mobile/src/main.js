import Vue from 'vue'
import { Button, Icon } from 'vant'
import 'vant/lib/index.css' // 全局引入vant样式
import axios from 'axios'
import qs from 'qs'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 配置数据请求地址
Vue.prototype.$axios = axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 10000
})
// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true
// http request 拦截器
Vue.prototype.$axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
Vue.prototype.$axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.use(Button)
  .use(Icon)

Vue.prototype.$webApi = process.env.NODE_ENV === 'development' ? '/api' : ''
// 封装get请求
Vue.prototype.$get = (url) => {
  return Vue.prototype.$axios.get(Vue.prototype.$webApi + url)
}
// 封装post请求
Vue.prototype.$post = (url, data) => {
  return Vue.prototype.$axios.post(Vue.prototype.$webApi + url, data)
}
Vue.prototype.$qs = qs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
