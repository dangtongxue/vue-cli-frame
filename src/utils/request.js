import axios from 'axios'
import store from '@/store/index.js' // 储存
import QS from 'qs'
import router from '../router/index.js'
// CDN 需要最后注释
import { Message } from 'element-ui'
import Vue from 'vue'

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
Vue.prototype.msgError = function (msg) {
  // ELEMENT.Message({ showClose: true, message: msg, type: 'error' })
  // CDN 需要最后注释
  overrideMessage({ showClose: true, message: msg, type: 'error' })
}

axios.defaults.withCredentials = true
// axios.defaults.responseType="json"

// //http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    config.headers = {
      // 'Content-Type':'application/x-www-form-urlencoded'
      //   //   'Content-Type':'multipart/form-data',
      //     'Content-Type':'application/json'
      //
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// //http response 拦截器
axios.interceptors.response.use(
  response => {
    // if(response.data.errCode ==2){
    //   router.push({
    //     path:"/login",
    //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }
    // if (response.data.httpCode !== 200) {
    if (response.status !== 200) {
      // ELEMENT.Message.error(response.data.msg)
      // CDN 需要最后注释
      Vue.prototype.msgError(response.data.msg)
    }
    return response
  },
  error => {
    if (error.request) {
      if (error.request.status === 504) {
        Vue.prototype.msgError('网络请求超时')
      } else if (error.request.status === 0 || error.request.status === 401) {
        if (Vue.prototype.Loading) {
          Vue.prototype.Loading.close()
        }
        window.sessionStorage.clear()
        store.commit('clearState', '')
        if (store.state.loseEfficacy.indexOf('http') !== -1) {
          window.location.href = store.state.loseEfficacy
        } else {
          router.push({
            path: store.state.loseEfficacy
          })
        }
      }
    } else if (error.response) {}
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 * 普通post请求使用application/x-www-form-urlencoded格式
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(data), {
      transformRequest: [function (postData, headers) {
        headers['content-type'] = 'application/x-www-form-urlencoded;'
        return postData
      }]
    })
      .then(response => {
        resolve(response.data)
        // if (Vue.prototype.Loading) {
        //   Vue.prototype.closeLoading()
        // }
      }, err => {
        reject(err)
      })
  })
}

// post1请求使用application/json; charset=UTF-8格式
export function postJson (url, _data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url,
      _data,
      {
        headers: {
        },
        transformRequest: [function (postData, headers) {
          headers['content-type'] = 'application/json;'
          return JSON.stringify(postData)
        }]

      }
    )
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function postFormData (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      transformRequest: [function (postData, headers) {
        headers['content-type'] = 'multipart/form-data'
        return postData
      }]
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data) {
  return new Promise((resolve, reject) => {
    axios.patch(url, QS.stringify(data))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data) {
  return new Promise((resolve, reject) => {
    // axios.put(url,QS.stringify(data))
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
