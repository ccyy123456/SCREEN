import axios from 'axios'
// import router from '../router'
// import { Message } from 'element-ui'
// import store from '../../../vuex'
// import crypto from '../../../function/crypto'
// import pclog from '../../../function/log'
// import qs from 'qs'
// let basePath = process.env.NODE_ENV == 'development'? '/': '/'
var xhr = axios.create({
  // baseURL: basePath,
  timeout: 200000,
  headers: {'Content-Type':'application/x-www-form-urlencoded'}
});

// // 请求拦截器
// xhr.interceptors.request.use(
//   config => {
//     let uuid = crypto.getUuid()
//     let key = crypto.getKey(uuid)
//     let pubKey = localStorage.getItem('tzkey');
//     let token = Base64.decode(localStorage.getItem('token'))||'';
//     let jmkey = crypto.getRsaCode(pubKey,uuid)
//     config.headers['tzkey'] = jmkey
//     config.headers['xytoken'] = token
//     config.key = key
//     let tzdata = crypto.Encrypt(key,config.data)
//     pclog(config,config.data,qs.stringify(config.data),tzdata)
//     if(config.data != null && JSON.stringify(config.data) != '{}'){
//       config.data = qs.stringify({'tzrequestdata': tzdata})
//     }else{ //请求本地json，无参数请求
//       config.data = config.data
//     }
//     return config;
//   },
//   error => {
//     return Promise.error(error);
//   })
// // 响应拦截器
// xhr.interceptors.response.use(
//   // 请求成功
//   res => {
//     let key = res.config.key
//     pclog(res)
//     if(res.data.result == 'notlogin'){
//       sessionStorage.removeItem('Pc_V_Yes_login');
//       localStorage.removeItem('token');
//       localStorage.removeItem('tzkey');
//       window.location.href = store.state.currenturl;
//     }
//     if(res.status === 200){
//       if(res.config.url.indexOf('getAccountPublicKey')>-1 || res.config.url.indexOf('developmentTime.json')>-1 ||res.config.url.indexOf('sevenday.json')>-1){
//       }else if(typeof(res.data) == 'string' || res.data.data == undefined){
//       }else if(crypto.Decrypt(key,res.data.data)){
//         res.data.data = JSON.parse(crypto.Decrypt(key,res.data.data))
//       }else{
//       }
//       return res
//     }else{
//       return Promise.reject('error')
//     }
//   },
//   // 请求失败
//   error => {
//     const { response } = error;
//     if (response) {
//       return Promise.reject(response);
//     } else {
//     }
//   });



export default xhr

