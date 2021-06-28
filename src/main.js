// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'

// import '../../../static/style/bootstrap.css'
// import '../../../static/style/flat-ui.css'
// import '../../../static/style/font-awesome.min.css'
import './style/element-variables.scss'
import './style/style.css'
import Common from './function/Common'
//引用vue-resource
import vueResource from 'vue-resource'
import axios from 'axios'
import api from './function/api.js'
import remSize from './function/remSize'
import animated from 'animate.css'
// import crypto from '../../function/crypto'
// import pclog from '../../function/log'
import qs from 'qs'


var VueCookie = require('vue-cookie');
Vue.prototype.$api = api;
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(ElementUI)
Vue.use(vueResource)
Vue.config.productionTip = false
Vue.use(Common)
Vue.use(remSize)
Vue.use(animated)
// Vue.http.interceptors.push(function(request, next) {
//   let uuid = crypto.getUuid()
//   let key = crypto.getKey(uuid)
//   let pubKey = localStorage.getItem('tzkey');
//   let token = Base64.decode(localStorage.getItem('token'))||'';
//   let jmkey = crypto.getRsaCode(pubKey,uuid)
//   request.headers.set('tzkey', jmkey);
//   request.headers.set('xytoken', token);
//   let tzdata = crypto.Encrypt(key,qs.stringify(request.body))
//   pclog(pubKey,request.body,qs.stringify(request.body),tzdata)
//   if(request.body != null && JSON.stringify(request.body) != '{}'){
//     request.body = {'tzrequestdata': tzdata}
//   }else{ //请求本地json，无参数请求
//     request.body = request.body
//   }
// // ...
// // 请求发送前的处理逻辑
// // ...
// next(function(response) {
//   pclog(key,response,response.data.data)
//   if(response.url.indexOf('getAccountPublicKey')>-1 || response.url.indexOf('developmentTime.json')>-1 ||response.url.indexOf('sevenday.json')>-1){
//   }else if(typeof(response.data) == 'string' || response.data.data == undefined){
//   }else if(crypto.Decrypt(key,response.data.data)){
//     response.data.data = JSON.parse(crypto.Decrypt(key,response.data.data))
//   }else{
//   }
// if(response.body.result == 'notlogin'){
//   sessionStorage.removeItem('Pc_V_Yes_login');
//   localStorage.removeItem('token');
//   localStorage.removeItem('tzkey');
//   window.location.href = store.state.currenturl;
// }
// // ...
// // 请求发送后的处理逻辑
// // ...
// // 根据请求的状态，response参数会返回给successCallback或errorCallback
// return response
// })
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// Vue.http.interceptors.push(function(request, next) {
//   // ...
//   // 请求发送前的处理逻辑
//   // ...
//   next(function(response) {
//   if(response.body.result == 'notlogin'){
//   window.location.href = store.state.currenturl;
//   }
//   // ...
//   // 请求发送后的处理逻辑
//   // ...
//   // 根据请求的状态，response参数会返回给successCallback或errorCallback
//   return response
//   })
//   })
