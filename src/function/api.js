import xhr from './axios'
import qs from 'qs'
import store from '../vuex/state.js'
let basePath = store.url
let token = Base64.decode(localStorage.getItem("token"))

const api = {
  // 获取组织信息
  getOrgInformations(params) {
    return new Promise((resolve, reject) => {
      xhr.post(basePath + 'system/getOrgInfoByOrgId', qs.stringify(params), { headers: { 'xytoken': token } }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  // 获取用户信息
  getUserInformation(params) {
    return new Promise((resolve, reject) => {
      xhr.post(basePath + 'pc/person/getMyBrieflyInfo', qs.stringify(params), { headers: { 'xytoken': token } }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  // 获取账号权限
  getAccount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'system/getAccountPowerList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    }) 
  },
  // 获取左侧菜单
  getFunction(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'system/getFunction', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 获取总览大屏数据
  getOverviewData(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/getOverviewData', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //获取项目趋势图信息
  getProjectTrendStatistics(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getProjectTrendStatisticsCountByOrgId', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 获取学院项目数
  getTopThreeData(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getRankingProjectNumCollegeList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
   // 获取行业项目数
  getOrgTradeProjectNum(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getOrgTradeProjectNum', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 获取各项专利项目数量
  getDataAnalysisProjectPatentPieChartList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getDataAnalysisProjectPatentPieChartList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 组织项目参加院赛、校赛、省赛参赛率分析
  getDataAnalysisProjectCompetitionRate(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getDataAnalysisProjectCompetitionRate', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 项目商业化运营  各注册资金区间公司数量分析
  getDataAnalysisProjectBusinessCompanyCount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getDataAnalysisProjectBusinessCompanyCount', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 项目商业化运营  获取组织各行业项目成立公司注册总金额分析
  geDataAnalysisTradeProjectBusinessCompanyMoney(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/geDataAnalysisTradeProjectBusinessCompanyMoney', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 各新技术应用项目数量分析
  geDataAnalysisProjectTechnologyCount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/geDataAnalysisProjectTechnologyCount', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 项目专利总览页-专利与行业的分布情况表格
  getDataAnalysisProjectPatentTradeList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getDataAnalysisProjectPatentTradeList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 融资总览页-返回融资行业融资额以及项目数分布数据
  getProjectInvestmentTradeAnalysisList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getProjectInvestmentTradeAnalysisList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 项目商业化运营总览页-各行业项目成立公司的数量
  geDataAnalysisTradeProjectBusinessCompanyCount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/geDataAnalysisTradeProjectBusinessCompanyCount', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 商业化运营总览页-返回商业化项目参与投资轮次的项目数
  getProjectBusinessInvestmentProcessAnalysisList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getProjectBusinessInvestmentProcessAnalysisList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 赛事分析总览页-进行中赛事分析（赛事数量，项目数量，校赛数、院赛数、课赛数）、已结束赛事分析（赛事数量，项目数量，校赛数、院赛数、课赛数）
  getDataAnalysisProjectGameState(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projectgame/getDataAnalysisProjectGameState', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 赛事分析总览页-赛事总览区域数据(校/院/课赛数，参赛项目数以及每年的校/院/课数量)
  getDataAnalysisProjectGameOverview(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projectgame/getDataAnalysisProjectGameOverview', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 赛事分析总览页-返回各赛事参赛一览表
  getDataAnalysisProjectGameProjectReview(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projectgame/getDataAnalysisProjectGameProjectReview', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 赛事分析总览页-返回赛事评委分析
  getDataAnalysisProjectGameRaterList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projectgame/getDataAnalysisProjectGameRaterList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  // 课程的数量，学习人数以及所有人学习的总时长
  getTimeLengthAndScholarNumByOrgId(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/course/getTimeLengthAndScholarNumByOrgId', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //实训课的开课增长趋势 以及在线课学习人数的增长超势
  getOrgCourseLiveDateAnalysis(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/course/getOrgCourseLiveDateAnalysis', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //研发的课程数据，包括表格（分页）
  getOrgCreateCourseData(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/course/getOrgCreateCourseData', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //正在进行中的课程表格数据（有分页）
  getOrgOngoingCourseData(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/course/getOrgOngoingCourseData', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //某学院/所有学院各授课者列表
  getPersonCourseLiveList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/course/getPersonCourseLiveList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
   //各个学院的专利情况分析
  getDataAnalysisProjectPatentList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getDataAnalysisProjectPatentList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
   //获取项目专利趋势图信息
  getDataAnalysisProjectPatentTrendStatisticsCount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getDataAnalysisProjectPatentTrendStatisticsCount', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //获取获取全校、全省、全国占比
  getProjectPatentProportion(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/getProjectPatentProportion', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
   //获取专利表格标题
  getDataAnalysisTitleList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getDataAnalysisTitleList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
   //获取组织 融资区间
  getDataAnalysisProjectInvestmentTrendStatisticsCount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getDataAnalysisProjectInvestmentTrendStatisticsCount', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //组织相关学院的融资情况分析
  getDataAnalysisProjectInvestmentList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getDataAnalysisProjectInvestmentList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //组织各学院商业化化情况分析
  getDataAnalysisProjectBusinessAndProjectProcessList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/project/getDataAnalysisProjectBusinessAndProjectProcessList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
    //商业化化趋势图分析
  getDataAnalysisProjectBusinessAndProjectProcessTrendStatisticsCount(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getDataAnalysisProjectBusinessAndProjectProcessTrendStatisticsCount', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //各类基础赛赛事数统计
  getDataAnalysisProjectGameChartPieList(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/project/manage/getDataAnalysisProjectGameChartPieList', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //总空间入驻率以及各楼的入驻面程比率
  getOrgProjecthatchEntryInfo(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projecthatch/getOrgProjecthatchEntryInfo', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //空间面程数据，包括哪个层，有几层，有多少房间，总面积，工位数等。并形成柱形图
  getOrgProjecthatchAreaInfo(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projecthatch/getOrgProjecthatchAreaInfo', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //总费用划拔的数量及表格数据（分页）
  getOrgProjecthatchCostInfo(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projecthatch/getOrgProjecthatchCostInfo', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //过去N年的入驻趋势（从有记录开始）
  getOrgProjecthatchTrend(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projecthatch/getOrgProjecthatchTrend', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //立项审核数量及与行业相关数据（柱形）
  getOrgProjecthatchPassingInfo(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projecthatch/getOrgProjecthatchPassingInfo', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
  //商业化运营的数据返回商业化运营的数据
  getOrgProjecthatchBusinessInfo(params) {
    return new Promise((resolve,reject)=>{
      xhr.post(basePath + 'pc/largedata/projecthatch/getOrgProjecthatchBusinessInfo', qs.stringify(params), { headers: { 'xytoken': token } }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    })
  },
}
export default api

