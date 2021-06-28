<!-- -->
<template>
  <div>
    <div class="teach-top mb16rem flexbetween">
      <div class="top-left">
        <module moudletitle='课程'>
          <div>
            <div class="top-left-top disflex">
              <div class="courseleft flexcenterall">
                <div>
                  <div class="coursebgc mrauto"></div>
                  <div class="flexcenter">
                    <div class="rem12 fff">在线课：</div>
                    <div class="rem18 fff000">{{coursenum}}</div>
                  </div>
                </div>
              </div>
              <div class="courseright flexcenterall">
                <ul>
                  <li class="flexcenter">
                    <div class="smallcoursebgc"></div>
                    <div class="rem12 deed">学习人数：</div>
                    <div class='rem16 fff'>{{allcoursescholarnum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="smallcoursebgc"></div>
                    <div class="rem12 deed">总时长：</div>
                    <div class='rem16 fff'>{{allcoursetimetoltal}}</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="top-left-top disflex">
              <div class="courseleft flexcenterall">
                <div>
                  <div class="coursebgc2 mrauto"></div>
                  <div class="flexcenter">
                    <div class="rem12 fff">实训课：</div>
                    <div class="rem18 fff000">{{courselivenum}}</div>
                  </div>
                </div>
              </div>
              <div class="courseright flexcenterall">
                <ul>
                  <li class="flexcenter">
                    <div class="smallcoursebgc"></div>
                    <div class="rem12 deed">学习人数：</div>
                    <div class='rem16 fff'>{{allcourselivescholarnum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="smallcoursebgc"></div>
                    <div class="rem12 deed">项目数：</div>
                    <div class='rem16 fff'>{{allcourseliveprojectnum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="smallcoursebgc"></div>
                    <div class="rem12 deed">总时长：</div>
                    <div class='rem16 fff'>{{allcourselivetimetotal}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </module>
      </div>
      <div class="top-center">
        <module moudletitle='开课增长趋势'>
          <div class="center-left">
            <div id="homeLine" style="width: 100%;height:100%;"></div>
          </div>
          <div class="center-right">
            <div id="homeLine2" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
      <div class="top-right">
        <module moudletitle='研发'>
          <div class="wh100-per">
            <div class="right-top mt1rem">
              <ul>
                <li class="flexcenterall">
                  <div class="devbgc flexcenterall">
                    <div class="rem14 deed">在线课: </div>
                    <div class="rem18 fff000">{{researchcoursenum}}</div>
                  </div>
                  <ul class="dev-right">
                    <li class='flexcenteraround text-center'>
                      <div>
                        <div class="rem18 fff000">{{researchcourseresourcenum}}</div>
                        <div class="rem14 deed">资源数</div>
                      </div>
                      <div>
                        <div class="rem18 fff000">{{researchcoursescholarnum}}</div>
                        <div class="rem14 deed">学习人数</div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="flexcenterall">
                  <div class="devbgc flexcenterall">
                    <div class="rem14 deed">实践课: </div>
                    <div class="rem18 fff000">{{researchcourselivenum}}</div>
                  </div>
                  <ul class="dev-right">
                    <li class='flexcenteraround text-center'>
                      <div>
                        <div class="rem18 fff000">{{researchcourseliveresourcenum}}</div>
                        <div class="rem14 deed">资源数</div>
                      </div>
                      <div>
                        <div class="rem18 fff000">{{researchcourselivescholarnum}}</div>
                        <div class="rem14 deed">学习人数</div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="right-bottom w100-per mb12rem">
              <table class="mrauto">
                <thead>
                  <tr>
                    <th v-for='item in researchcols' :key='item.id'>
                      <div>{{item}}</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='item in researchcourselist' :key='item.id'>
                    <td>
                      <div>{{item.coursename}}</div>
                    </td>
                    <td>
                      <div>{{item.username}}</div>
                    </td>
                    <td>
                      <div>{{item.resourcenum}}</div>
                    </td>
                    <td>
                      <div>{{item.createtime}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="bignodata" v-if="researchcourselist.length == 0">暂无数据</div>
            </div>
          </div>
          <pagesort :allpage="researchtotalpage" :currentpage="researchpage" @newpage='getResearchPage' v-if="researchtotalpage >= 2"></pagesort>
        </module>
      </div>
    </div>
    <div class="teach-bottom flexbetween">
      <div class="bottom-left">
        <module moudletitle='各学院开课老师'>
          <div class='wh100-per flexcenter flexdirection'>
            <table class='mt26rem'>
              <thead>
                <tr>
                  <th v-for='item in collegecols' :key='item.id'>
                    <div>{{item}}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='item in collegecourselivelist' :key='item.id'>
                  <td>
                    <div>{{item.username}}</div>
                  </td>
                  <td>
                    <div>{{item.courselivenum}}</div>
                  </td>
                  <td>
                    <div>{{item.projectnum}}</div>
                  </td>
                  <td>
                    <div>{{item.collegename}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
             <div class="bignodata" v-if="collegecourselivelist.length == 0">暂无数据</div>
          </div>
          <pagesort :allpage="collegetotalpage" :currentpage="collegepage" @newpage='getCollegePage' v-if="collegetotalpage >= 2"></pagesort>
        </module>
      </div>
      <div class="bottom-right">
        <module moudletitle='正在进行中课程'>
          <div class='wh100-per'>
            <table class='mt26rem mrauto'>
              <thead>
                <tr>
                  <th v-for='item in ongoingcols' :key='item.id'>
                    <div>{{item}}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='item in ongoingcourselivelist' :key='item.id'>
                  <td>
                    <div>{{item.teachingcoursename}}</div>
                  </td>
                  <td>
                    <div>{{item.projectnum}}</div>
                  </td>
                  <td>
                    <div>{{item.accountnum}}</div>
                  </td>
                  <td>
                    <div>{{item.username}}</div>
                  </td>
                  <td>
                    <div>{{item.starttime}}</div>
                  </td>
                  <td>
                    <div>{{item.endtime}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="bignodata" v-if="ongoingcourselivelist.length == 0">暂无数据</div>
          </div>
          <pagesort :allpage="ongoingtotalpage" :currentpage="ongoingpage" @newpage='getOngoingPage' v-if="ongoingtotalpage >= 2"></pagesort>
        </module>
      </div>
    </div> 
  </div>
</template>

<script>
import module from '../../components/module.vue';
import pagesort from '../../components/pagesort.vue'
import echarts from "echarts";
export default {
  data () {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      coursenum:0,//在线课程数量
      allcoursetimetoltal:0,//总课时
      allcoursescholarnum:0,//学习人数
      courselivenum:0,//实训课数量
      allcourselivetimetotal:0,//总时长
      allcourselivescholarnum:0,//参与人数
      allcourseliveprojectnum:0,//参与项目数
      coursexdata:[],//在线课X轴数据
      courseydata:[],//在线课Y轴数据
      courselivexdata:[],//实训课X轴数据
      courseliveydata:[],//实训课Y轴数据
      researchcoursenum:0,//研发的在线课数量
      researchcourseresourcenum:0,//资源数量
      researchcoursescholarnum:0,//学习人数
      researchcourselivenum:0,//研发实训课数量
      researchcourseliveresourcenum:0,//资源数量
      researchcourselivescholarnum:0,//参与人数
      researchtotalresult:0,//研发课程总条数
      researchshowcount:0,//展示条数
      researchtotalpage:10,//总页码
      researchpage:1,//页码
      researchcourselist:[],//课程列表
      ongoingtotalresult:0,//正在进行中的课程总条数
      ongoingshowcount:0,//展示条数
      ongoingtotalpage:10,//总页码
      ongoingpage:1,//页码
      ongoingcourselivelist:[],//课程列表
      collegetotalresult:0,//学院课程列表总条数
      collegeshowcount:0,//展示条数
      collegetotalpage:10,//总页码
      collegecourselivelist:[],//课程列表
      collegepage:1,//页码
      researchcols:["课程名称","开发负责人","资源","时间"],//研发表表头
      ongoingcols:["课程名称","项目数","参与人数","开课老师","开始时间","结束时间"],//正在进行中的课程列表表头
      collegecols:["老师姓名","开课数量","参与项目","所属学院"],//学院课程列表表头
      starttime:"",
      endtime:""
    };
  },

  components: {
    module,
    pagesort
  },

  computed: {
  	changequery(){
      return this.$store.state.bigDataQuery
    },
    changepage(){
      return this.$store.state.bigDataPage
    }
  },
	watch:{
    changequery(n,o){
      // //console.log(n)
      let bigDataQuery = n;
      this.starttime = bigDataQuery.starTime;
      this.endtime = bigDataQuery.endTime;
      this.getTimeLengthAndScholarNumByOrgId();
	    this.getOrgCourseLiveDateAnalysis();
	    this.getOrgCreateCourseData(1);
	    this.getOrgOngoingCourseData(1);
	    this.getPersonCourseLiveList(1);
    },
    changepage(n,o){
      let bigDataPage = n;
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'teachanalyze_coursetable'){ //教学-课程列表
          this.getOrgCreateCourseData(currentPage);
        };
        if(tableSort == 'teachanalyze_collegetable'){ //教学-学院列表
          this.getPersonCourseLiveList(currentPage);
        };
        if(tableSort == 'teachanalyze_goingcoursetable'){ //教学-进行中课程列表
          this.getOrgOngoingCourseData(currentPage);
        }
      })
    }
  },
  mounted(){
    this.getTimeLengthAndScholarNumByOrgId();
    this.getOrgCourseLiveDateAnalysis();
    this.getOrgCreateCourseData(1);
    this.getOrgOngoingCourseData(1);
    this.getPersonCourseLiveList(1);
  },

  methods: {
    //获取研发列表页码变动
    getResearchPage(e){
      this.getOrgCreateCourseData(e);
    },
    //获取正在进行的课程列表页码变动
    getOngoingPage(e){
      this.getOrgOngoingCourseData(e);
    },
    //获取学院课程列表页码变动
    getCollegePage(e){
      this.getPersonCourseLiveList(e);
    },
    // 项目趋势图
    indexEchart() {
      var chartLine = echarts.init(document.getElementById("homeLine"));
      var option = {
        title: {
          text: "在线课增长趋势",
          x: "center",
          textStyle:{//标题内容的样式
            color:'#28deed',//京东红
            fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            fontFamily:"san-serif",//主题文字字体，默认微软雅黑
            fontSize:14//主题文字字体大小，默认为18px
          },
        },
        tooltip: {
          trigger: "axis",
          // formatter: "{b}：{c}次"
        },
        grid: { //位置
          // left:0,
          // right:0,
          top: 50,
          bottom: 50,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            show: true,
            data: this.coursexdata,
            splitLine: {show: false},
            splitArea : {show : false},//保留网格区域
            axisLabel: { // x轴旋转
              interval:0,
              rotate:40,
            },
            axisLine: { // x轴颜色
                lineStyle: {
                    type: 'solid',
                    color: '#28deed',//左边线的颜色
                    width:'2'//坐标线的宽度
                }
            },
            axisTick: {
              alignWithLabel: true
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: '',
            splitLine:{ //网格线颜色
              show: true,
              lineStyle:{
                color:'#0b166a'
              }
            },//去除网格线
            splitArea: {show: false},
            axisLine: { // x轴旋转
                lineStyle: {
                    type: 'solid',
                    color: '#28deed',//左边线的颜色
                    width:'2'//坐标线的宽度
                }
            },
          }
        ],
        series: [
          {
            name:'数量',
            type: "line",
            smooth: true,
            areaStyle: {normal: {}},
            itemStyle: {
              normal: {
                color: "#28deed", //头部颜色
                barBorderRadius: 0,
                lineStyle:{  
                    color:'#28deed' // 画线颜色
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: function(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.courseydata
          },
        ]
      };
      chartLine.setOption(option);
    },
    // 项目趋势图
    indexEchart2() {
      var chartLine = echarts.init(document.getElementById("homeLine2"));
      var option = {
        title: {
          text: "实训课增长趋势",
          x: "center",
          textStyle:{//标题内容的样式
            color:'#28deed',//京东红
            fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            fontFamily:"san-serif",//主题文字字体，默认微软雅黑
            fontSize:14//主题文字字体大小，默认为18px
          },
        },
        tooltip: {
          trigger: "axis",
          // formatter: "{b}：{c}次"
        },
        grid: { //位置
          // left:0,
          // right:0,
          top: 50,
          bottom: 50,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            show: true,
            data: this.courselivexdata,
            splitLine: {show: false},
            splitArea : {show : false},//保留网格区域
            axisLabel: { // x轴旋转
              interval:0,
              rotate:40,
            },
            axisLine: { // x轴颜色
                lineStyle: {
                    type: 'solid',
                    color: '#28deed',//左边线的颜色
                    width:'2'//坐标线的宽度
                }
            },
            axisTick: {
              alignWithLabel: true
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: '',
            splitLine:{ //网格线颜色
              show: true,
              lineStyle:{
                color:'#0b166a'
              }
            },//去除网格线
            splitArea: {show: false},
            axisLine: { // x轴颜色
                lineStyle: {
                    type: 'solid',
                    color: '#28deed',//左边线的颜色
                    width:'2'//坐标线的宽度
                }
            },
          }
        ],
        series: [
          {
            name:'数量',
            type: "line",
            smooth: true,
            areaStyle: {normal: {}},
            itemStyle: {
              normal: {
                color: "#9822b2", //头部颜色
                barBorderRadius: 0,
                lineStyle:{  
                    color:'#9822b2' // 画线颜色
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: function(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.courseliveydata
          },
        ]
      };
      chartLine.setOption(option);
    },
    //课程的数量，学习人数以及所有人学习的总时长
    getTimeLengthAndScholarNumByOrgId() {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getTimeLengthAndScholarNumByOrgId({
			orgid:orgId,
          	starttime:this.starttime,
          	endtime:this.endtime}).then(response => {
	        if(response.data.result == 'success'){
	          	this.coursenum = response.data.data.coursenum;
	          	this.allcoursetimetoltal = response.data.data.allcoursetimetoltal;
	          	this.allcoursescholarnum = response.data.data.allcoursescholarnum;
	          	this.courselivenum = response.data.data.courselivenum;
	          	this.allcourselivetimetotal = response.data.data.allcourselivetimetotal;
	          	this.allcourselivescholarnum = response.data.data.allcourselivescholarnum;
	          	this.allcourseliveprojectnum = response.data.data.allcourseliveprojectnum;
	          }
      	});
    },
    //实训课的开课增长趋势 以及在线课学习人数的增长超势
    getOrgCourseLiveDateAnalysis() {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgCourseLiveDateAnalysis({
			orgid:orgId,
          	starttime:this.starttime,
          	endtime:this.endtime}).then(response => {
	        if(response.data.result == 'success'){
	          	this.coursexdata =[];
	          	this.courseydata =[];
	          	this.courselivexdata =[];
	          	this.courseliveydata =[];
	          	for(var i=0;i<response.data.data.length;i++){
	          		this.coursexdata.push(response.data.data[i].date);
	          		this.courselivexdata.push(response.data.data[i].date);
	          		
	          		this.courseydata.push(response.data.data[i].coursescholarnum);
	          		this.courseliveydata.push(response.data.data[i].courselivenum);
	          	}
	          	this.indexEchart();
  						this.indexEchart2();
	          }
      	});
    },
    //研发的课程数据，包括表格（分页）
    getOrgCreateCourseData(page) {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgCreateCourseData({
			orgid:orgId,
						page:page,
          	starttime:this.starttime,
          	endtime:this.endtime}).then(response => {
	        if(response.data.result == 'success'){
	        		this.researchcourselist = [];
	          	this.researchcoursenum = response.data.data.coursenum;
	          	this.researchcourseresourcenum = response.data.data.courseresourcenum;
	          	this.researchcoursescholarnum = response.data.data.coursescholarnum;
	          	this.researchcourselivenum = response.data.data.courselivenum;
	          	this.researchcourseliveresourcenum = response.data.data.courseliveresourcenum;
	          	this.researchcourselivescholarnum = response.data.data.courselivescholarnum;
	          	this.researchtotalpage = response.data.data.totalpage;
	          	this.researchpage = response.data.data.page;
	          	for(var i=0;i<response.data.data.courselist.length;i++){
	          		this.researchcourselist.push(
			                {	
			                	coursename: response.data.data.courselist[i].coursename,
			                	username: response.data.data.courselist[i].username,
			                	createtime:response.data.data.courselist[i].createtime,
			                	resourcenum:response.data.data.courselist[i].resourcenum
			                }
			              )
	          	}
	          }
      	});
    },
    //正在进行中的课程表格数据（有分页）
    getOrgOngoingCourseData(page) {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgOngoingCourseData({
			orgid:orgId,
						page:page,
          	starttime:this.starttime,
          	endtime:this.endtime}).then(response => {
	        if(response.data.result == 'success'){
	        		this.ongoingcourselivelist = [];
	          	this.ongoingtotalpage = response.data.data.totalpage;
	          	this.ongoingpage = response.data.data.page;
	          	for(var i=0;i<response.data.data.courselivelist.length;i++){
	          		this.ongoingcourselivelist.push(
			                {	
			                	teachingcoursename: response.data.data.courselivelist[i].teachingcoursename,
			                	starttime: response.data.data.courselivelist[i].starttime,
			                	endtime:response.data.data.courselivelist[i].endtime,
			                	username:response.data.data.courselivelist[i].username,
			                	accountnum:response.data.data.courselivelist[i].accountnum,
			                	projectnum:response.data.data.courselivelist[i].projectnum
			                }
			              )
	          	}
	          }
      	});
    },
    //某学院/所有学院各授课者列表
    getPersonCourseLiveList(page) {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getPersonCourseLiveList({
			orgid:orgId,
						page:page,
          	starttime:this.starttime,
          	endtime:this.endtime}).then(response => {
	        if(response.data.result == 'success'){
	        		this.collegecourselivelist = [];
	          	this.collegetotalpage = response.data.data.collegetotalpage;
	          	this.collegepage = response.data.data.collegepage;
	          	for(var i=0;i<response.data.data.courselivelist.length;i++){
	          		this.collegecourselivelist.push(
			                {	
			                	username: response.data.data.courselivelist[i].username,
			                	projectnum: response.data.data.courselivelist[i].projectnum,
			                	collegename:response.data.data.courselivelist[i].collegename,
			                	courselivenum:response.data.data.courselivelist[i].courselivenum
			                }
			              )
	          	}
	          }
      	});
    },
  }
}

</script>
<style lang='less' scoped>
  .teach-top{
    .top-left{
      width: 2.75rem;
      height:3.08rem;
      .top-left-top{
        width: 2.44rem;
        height:1.3rem;
        background: url('../../assets/bg(1).png') no-repeat center;
        background-size:100% 100%; 
        .coursebgc{
          width: .36rem; 
          height:.36rem;
          background: url('../../assets/icon_online.png') no-repeat center;
          background-size:100% 100%; 
        }
        .coursebgc2{
          width: .36rem;
          height:.36rem;
          background: url('../../assets/icon_practice.png') no-repeat center;
          background-size:100% 100%; 
        }
        .courseleft{
          width: 1.4rem;
          height:100%;
        }
        .courseright{
          width: 1.28rem;
          height:100%;
        }
      }
    }
    .top-center{
      width: 6.16rem;
      height: 3.08rem;
      .center-left,.center-right{
        width: 45%;
        height: 80%;
      }
    }
    .top-right{
      width:3.36rem;
      height:3.08rem;
      /deep/.page-sort{
        bottom: .08rem;
        .page-left,.page-right{
          width: .18rem;
          height:.18rem;
        }
      }
      .devbgc{
        width: 1.16rem;
        height:.4rem;
        background: url('../../assets/rectangular.png') no-repeat center;
        background-size:100% 100%; 
      }
      .dev-right{
        width: 1.76rem;
      }
      .right-bottom{
        table th,table td{
          height: .3rem;
          font-size: .12rem;
        }
      }
    }
  }
  .teach-bottom{
    .bottom-left{
      width: 5.2rem;
      height: 3.08rem;
    }
    .bottom-right{
      width: 7.21rem;
      height: 3.08rem;
    }
    
  }

  
</style>