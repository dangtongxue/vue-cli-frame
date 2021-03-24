import Vue from 'vue'
import App from './App.vue'
import ElementUI, { Message, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import api from './api' // 接口
import pulic from '@/utils/pulic.js' // 公共js方法
import components from './components/index.js' // 公用组件
import './assets/scss/reset.scss'
Vue.config.productionTip = false
let messageInstance = null
const overrideMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  // 这个是Message 距离窗口顶部的偏移量 不需要设置就不加
  // options.offset = (document.documentElement.clientHeight || document.body.clientHeight) / 2
  // CDN 需要最后注释
  // messageInstance = ELEMENT.Message(options)
  messageInstance = Message(options)
}
['error', 'success', 'info', 'warning'].forEach(type => {
  overrideMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return overrideMessage(options)
  }
})
Vue.prototype.$message = overrideMessage
Vue.prototype.msgSuccess = function (msg) {
  // ELEMENT.Message({ showClose: true, message: msg, type: 'success' })
  // CDN 需要最后注释
  overrideMessage({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function (msg) {
  // ELEMENT.Message({ showClose: true, message: msg, type: 'error' })
  // CDN 需要最后注释
  overrideMessage({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function (msg) {
  // ELEMENT.Message.info(msg)
  // CDN 需要最后注释
  overrideMessage.info(msg)
}
Vue.prototype.Loading = ''
// 显示loading
Vue.prototype.showLoading = function () {
  // Vue.prototype.Loading = ELEMENT.Loading.service({})
  // CDN 需要最后注释
  Vue.prototype.Loading = Loading.service({})
}
// 关闭 loading
Vue.prototype.closeLoading = function () {
  setTimeout(() => {
    if (Vue.prototype.Loading) {
      Vue.prototype.Loading.close()
    }
  }, 200)
}
Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.prototype.$pulic = pulic
Vue.use(components)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
