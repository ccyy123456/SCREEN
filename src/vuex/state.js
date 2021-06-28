// import data from '../../static/datas/sevenday.json';
// import Vue from 'vue'

export default{
  //多重配置，不要随意乱删除并提交SVN。如果增加新地址，三个全加。
  
  //后台请求地址
  // url: 'http://192.168.1.202:8080/tzq/',
  // url: 'http://192.168.1.232:8080/tzq/',
  // url: 'http://192.168.1.50:8080/tzq/',
  // url: 'https://www.xytzq.cn:9443/tzq/',
  // url: 'http://services.xytzq.cn:9443/tzq/',
  url: 'http://test.xytzq.cn:9443/tzq/', 
  
  //########### 后台数据配置区域#################################
// webSockentUrl: 'wss://www.xytzq.cn:9443/tzq/webSocketServer',
webSockentUrl: 'ws://test.xytzq.cn:9443/tzq/webSocketServer',
// webSockentUrl: 'ws://192.168.1.131:9199/tzq/webSocketServer',
addUrl: 'pc/person/addBatchImportRegisterStudentInfo',
upLogoUrl:'pc/courselive/addcourselivelogo',
updataUrl:'pc/courselive/resources/UploadCourseLiveResource',
updataperson:'pc/person/uploadRequirementResourceFile',
updatasite:'pc/sitecompanay/resources/uploadSiteCompanayImage',
updatasitelogo: 'pc/sitecompanay/resources/uploadSiteCompanayResource',
updatahatch: 'pc/project/hatch/uploadProjectHatchResource',
updataequip: 'pc/project/hatch/addProjectHatchEquipments',
updatapro:'pc/project/addProjectInfos',
 //#######################################################################################################

  //注意上文：LYC 20180410
  studentUrl: 'student/index/index.html#home?',
  studentUrlGo: 'student/index/index.html#home',
  adminUrl: 'orgmanage/index.html',
  scoreUrl: 'pcproject.html#/home',
  MapUrl: 'mapsystem.html#/',
  currenturl: 'index.html#/',
  projectRoomUrl: 'student/projectroom/index-tzr.html',
  personrequirementUrl: 'student/index/index.html#demand_under?',
  viewUrl: 'orgmanage',  //预览的地址
  teachingUrl: 'teaching.html#/', //教学的地址
  goTeachingUrl: 'teaching.html#/home', //教学的地址
  demandUrl: 'demand.html#/home', //需求管理
  LocalsdemandUrl: 'demand.html#/', //需求管理
  projectUrl: 'project.html#/home', //项目管理
  goprojectUrl: 'project.html#/', //项目管理
  forumUrl: 'login.html#/forum',
  goprojectUrl: 'project.html#/',
  bigscreen: 'project.html#/bigscreen',
  bigDataAnalyzeUrl: 'bigDataAnalyze.html#/home', //大数据分析
  gobigDataAnalyzeUrl: 'bigDataAnalyze.html#/', //大数据分析
  goSystemSettingUrl: 'systemSetting.html#/', //用户管理
  systemSettingUrl: 'systemSetting.html#/organisation', //用户管理
  oldIndex: 'oldindex.html#/', //投智圈
  loginPage: 'login.html#/', //投智圈登录
  szindex: '', //投智圈
  teachdevelopUrl: 'teachdevelop.html#/', //教学研发的地址
  teachmanage: 'teachmanage.html#/', //教学管理的地址
  hatchmanage: 'hatchmanage.html#/', //项目孵化的地址
  bigDataScreen: 'bigDataScreen.html#/home', //大数据大屏 

  // url: 'http://192.168.1.229:8080/tzq/',
  // url: 'http://192.168.1.103:8080/tzq/',
  // webSockentUrl: 'wss://192.168.1.133:8080/tzq/webSocketServer',
  // addUrl: 'http://192.168.1.133::9199/tzq/pc/person/addBatchImportRegisterStudentInfo',
  // upLogoUrl: 'http://192.168.1.133:9199/tzq/pc/courselive/addcourselivelogo',
  // updataUrl: 'http://192.168.1.133:9199/tzq/pc/courselive/resources/UploadCourseLiveResource',
  // updataperson: 'http://192.168.1.133:9199/tzq/pc/person/uploadRequirementResourceFile',
  // updatasite: 'http://192.168.1.133:9199/tzq/pc/sitecompanay/resources/ uploadSiteCompanayImage',
  // updatasitelogo: 'http://192.168.1.133:9199/tzq/pc/sitecompanay/resources/uploadSiteCompanayResource',
  


  // url: 'http://test.xytzq.cn:9199/tzq/', //深职
  // url: 'http://test.xytzq.cn:9443/tzq/',  //test




//  url: 'https://www.xytzq.cn:9443/tzq/',
// webSockentUrl: 'wss://www.xytzq.cn:9443/tzq/webSocketServer',
//  addUrl: 'https://www.xytzq.cn:9443/tzq/pc/person/addBatchImportRegisterStudentInfo',
//   
// upLogoUrl:'https://www.xytzq.cn:9443/tzq/pc/courselive/addcourselivelogo',
//      updataUrl:'https://www.xytzq.cn:9443/tzq/pc/courselive/resources/UploadCourseLiveResource',
//  updataperson:'https://www.xytzq.cn:9443/tzq/pc/person/uploadRequirementResourceFile',
//	updatasite:'https://www.xytzq.cn/tzq/pc/sitecompanay/resources/uploadSiteCompanayImage' ,
//updatasitelogo: 'https://www.xytzq.cn/tzq/pc/sitecompanay/resources/uploadSiteCompanayResource',

  checked:'',
  nochecked:'',
  PauseChecked:'',
  yearvalue:'',
  statevalue:'',
  organizavalue:'',
  accountname:'',
  aftersure:'',
  getorgData:'',
  getcityData:'',
  getSchoolData:'',
  getCollegeData:'',
  getStageData:'',
  getTradeData:'',
  getSubTradeData:'',
  indextosapienstradid:'',
  indextosapienstradname:'',
  indextohotprojectstageid:'',
  indextohotprojectstagename:'',
  pcprojectTeachingHeight:'',
  questionTitle: '',
  questionClassList: '',
  questionText: '',
  questionType:'',
  CommonHeight:'',
  orgid: '',
  website: '',
  bigDataQuery:{
    starTime: '',
    endTime: '',
    collegeId:0,
    gameId: 0
  },
  bigDataPage:{
    tableSort:'',
    currentPage:1
  },
  scrollTop:0,
  keep:false
}
