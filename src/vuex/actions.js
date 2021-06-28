import Vue from 'vue'
export default {
  //获取省.
  getShareOrgData(context) {
    var getShareOrgList = [];
    Vue.http.post(context.state.url+'system/getProvinceInfo', {existall:1},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getShareOrgList.push(...response.data.data)
    })
    context.commit('getorgData',getShareOrgList);
  },
  // 市.
  getShareCityData(context, data){
    var getShareCityList = [];
    Vue.http.post(context.state.url+'system/getCityInfo', {provinceid:data.provinceid},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getShareCityList.push(...response.data.data)
    })
    context.commit('getcityData',getShareCityList);
  },
  //市学校
  getSchoolList(context, data) {
    var getSchoolList = [];
    Vue.http.post(context.state.url + 'system/getOrgInfo', { cityid: data.citycode},{emulateJSON: true }).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      // console.log(response.data)
      getSchoolList.push(...response.data.data)
    })
    context.commit('getSchoolData', getSchoolList);
  },
  //学校里头的分院
  getCollegeList(context, data) {
    var getCollegeList = [];
    Vue.http.post(context.state.url + 'system/getCollegeListByOrgId', { orgid: data.orgid }, { emulateJSON:  true }).then((response) => {
    Vue.info  = JSON.stringify(response.data,  null,  4);
      getCollegeList.push(...response.data.data)
    })
    context.commit('getCollegeData', getCollegeList);
  },
  //获取阶段
  getStage(context) {
    var getStage = [];
    Vue.http.post(context.state.url+'system/getProjectProcessClass', {existall:1},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getStage.push(...response.data.data)
    })
    context.commit('getStageData',getStage);
  },
  //获取行业
  getTrade(context) {
    var getTrade = [];
    Vue.http.post(context.state.url+'system/getTrade', {existall:1},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getTrade.push(...response.data.data);
    })
    context.commit('getTradeData', getTrade);
  },
  //子行业
  getSubTrade(context, data) {
    var getSubTradeList = [];
    Vue.http.post(context.state.url + 'system/getSubTrade', { tradeid: data.tradeid }, { emulateJSON: true }).then((response) => {
      Vue.info = JSON.stringify(response.data, null, 4);
      getSubTradeList.push(...response.data.data)
    })
    context.commit('getSubTradeData', getSubTradeList);
  },
  //获取类别列表
  getCommonQuestionList(context) {
    var questionT = [];
    let token = Base64.decode(localStorage.getItem('token'));
    Vue.http.post(context.state.url + 'pc/questionnaire/getCommonQuestionNaireClassList', {}, { emulateJSON: true, headers: { 'xytoken': token}}).then((response)=>{
    Vue.info  =  JSON.stringify(response.data,  null,  4);
      questionT.push(...response.data.data);
    })
    context.commit('questionType', questionT);
  },
  //判断token是否过期
  checkXyToken(context,data) {    
    Vue.http.post(context.state.url + 'pc/login/checkXyToken', {}, { emulateJSON: true, headers: { 'xytoken': data.token } }).then((response) => {
      Vue.info = JSON.stringify(response.data, null, 4);
      if (response.data.result == "notlogin"){
        Vue.cookie.delete('Pc_V_Save_token');
        Vue.cookie.delete('Pc_V_Save_roleid');
        Vue.cookie.delete('Pc_V_Save_accountid');
        Vue.cookie.delete('Pc_V_Yes_login');
        sessionStorage.removeItem('Pc_V_Yes_login');
        localStorage.removeItem('token');
        localStorage.removeItem('tzkey');
        window.location.href = context.state.currenturl;
      }
    })
  },
}
