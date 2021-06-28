<template>
	<div>
    <div class="project-top flexbetween mb16rem">
      <div class="top-left">
        <module moudletitle='院校排行'>
          <ul>
            <li v-for='(item,index) in rankcollegelist' :key='item.id' class="flexcenter mb20rem">
              <div class="bgc-all rank-number fff mr1rem text-center rem14">{{item.ranknum}}</div>
              <div class="mr1rem">
                <div class="rem14 fff ">{{item.name}}</div>
                <div class="bgc-gray rank-out mr1rem">
                  <div class="bgc-inner rank-inner"></div>
                </div>
              </div>
              <div class="fff000 rem18">
                {{item.number}}
              </div>
            </li>
          </ul>
          <pagesort :allpage="allPage2" :currentpage="currentPage2" @newpage='getNew'></pagesort>
        </module>
      </div>
      <div class="top-center">
        <module moudletitle='项目'>
           <div class="center-left text-center flexcenterall relative">
             <div class="fff000 rem30">{{projectSum}}</div>
             <div class="rem14 fff project-total">项目总数</div>
           </div>
           <div class="center-right text-center">
             <div class="right-top">
              <div class="rem14 fff flexcenterall" :class='"bgc"+Number(index+1)' v-for='(item,index) in tradelist' :key='item.id'>
                <div>
                  <div>{{item.projectnum}}</div>
                  <div>{{item.tradename}}</div>
                </div>
              </div>
             </div>
             <div class="right-bottom">
               <div id="homeBar" style="width: 100%;height:100%;"></div>
             </div>
           </div>
        </module>
      </div>
      <div class="top-right">
        <module moudletitle='专利数量'>
           <div class="text-center">
             <div class="patent-top flexcenterall flexwrap mrauto">
              <div class="fff text-center w50-per" v-for='(item,index) in projectpatentlist' :key='item.id'>
                <div class="rem12">{{item.projectpatenttypename}}</div>
                <div class="rem16">{{item.projectpatentnum}}</div>
              </div>
             </div>
             <div class="patent-bottom">
               <div id="homeBar2" style="width: 100%;height:100%;"></div>
             </div>
           </div>
        </module>
      </div>
    </div>
    <div class="project-bottom flexbetween">
      <div class="bottom-left">
        <module moudletitle='参赛率'>
          <div v-for='(item,index) in competitionRate' :key='item.id'> 
            <div class="text-center">
              <div class="rem14 deed">{{item.title}}</div>
              <div class="rem24 fff000 tailfont">{{item.projectnum}}</div>
            </div>
            <div class="project-join">
              <echartsgauge :idname='"index"+Number(index+1)' :resize='resize' :max='item.max' :value='item.value'></echartsgauge> 
            </div>
          </div>
          <!--<div>
            <div class="text-center">
              <div class="rem14 deed">校赛</div>
              <div class="rem24 fff000 tailfont">124</div>
            </div>
            <div class="project-join">
              <echartsgauge idname='index2' :resize='resize'></echartsgauge> 
            </div>
          </div>
          <div>
            <div class="text-center">
              <div class="rem14 deed">省/市赛</div>
              <div class="rem24 fff000 tailfont">124</div>
            </div>
            <div class="project-join">
              <echartsgauge idname='index3' :resize='resize' :max='max' :value='value'></echartsgauge> 
            </div>
          </div>-->
        </module>
      </div>
      <div class='bottom-center'>
        <module moudletitle='融资情况'>
          <div class='finance-left text-center'>
            <div class='mb40rem'>
              <div class="rem14 deed">融资项目数</div>
              <div class="rem24 fff000 tailfont">{{investmentprojectnum}}</div>
            </div>
            <div>
              <div class="rem14 deed">资质总金额</div>
              <div class="rem24 fff000 tailfont2">{{allinvestmentvalue}}</div>
            </div>
          </div>
          <div class='finance-right'>
            <div id="homePie" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
      <div class='bottom-center'>
        <module moudletitle='商业化运营'>
          <div class='finance-left text-center'>
            <div class='mb40rem'>
              <div class="rem14 deed">成立公司</div>
              <div class="rem24 fff000 tailfont">{{projectbusinessprojectsum}}</div>
            </div>
            <div>
              <div class="rem14 deed">注册资金</div>
              <div class="rem24 fff000 tailfont2">{{projectbusinessmoneysum}}</div>
            </div>
          </div>
          <div class='finance-right'>
            <div id="homePie2" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
      <div class='bottom-right'>
        <module moudletitle='新技术应用'>
          <ul>
            <li v-for='(item) in technologylist' :key='item.id' class="flexcenter mb02rem">
              <div>
                <div class="rem14 fff ">{{item.technologyname}}</div>
                <div class="bgc-gray rank-out">
                  <div class="bgc-inner rank-inner"></div>
                </div>
              </div>
              <div class="fff000 rem18 tailfont">
                {{item.projectnum}}
              </div>
            </li>
          </ul>
        </module>
      </div> 
    </div>
	</div>
</template>

<script>
import module from '../../components/module.vue'
import echartsgauge from '../../components/echartsgauge.vue'
import pagesort from '../../components/pagesort.vue'
import echarts from "echarts";
export default {
  data() {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      year:0,
      collegeid:0,
      starttime:'',
      endtime:'',
      tradeid:0,
      xdata: [],
      ydata: [],
      xdata2: [],
      ydata2: [],
      ydata3: [],
      xbusinessData: [],
      ybusinessData1: [],
      ybusinessData2: [],
      xpatentData: [],
      ypatentData: [],
      competitionRate:[],
      allinvestmentvalue:0,
      investmentprojectnum:0,
      projectbusinessprojectsum:0,
      projectbusinessmoneysum:0,
      technologylist:[],
      allPage2: 10, //总页数
      currentPage2: 1, //当前页数
      projectSum:0,
      tradelist:[
      ],
      projectpatentlist:[
      ],
      rankcollegelist:[
      ],
      resize:false,
    };
  },
  components:{
    module,
    echartsgauge,
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
      let bigDataQuery = n;
      this.starttime = bigDataQuery.starTime;
      this.endtime = bigDataQuery.endTime;
      this.collegeid = bigDataQuery.collegeId;
      this.getTopThreeData(1,this.year,this.collegeid,this.tradeid,this.starttime,this.endtime);
  	  this.getDataAnalysisProjectCompetitionRate(this.year,this.collegeid,this.starttime,this.endtime);
  	  this.getOrgTradeProjectNum(this.year,this.collegeid,this.starttime,this.endtime);
  	  this.getDataAnalysisProjectPatentPieChartList(this.year,this.collegeid,this.starttime,this.endtime);
  	  this.getDataAnalysisProjectBusinessCompanyCount(this.year,this.collegeid,this.starttime,this.endtime);
  	  this.geDataAnalysisProjectTechnologyCount(this.year,this.collegeid,this.starttime,this.endtime);
  	  this.geDataAnalysisTradeProjectBusinessCompanyMoney(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataPie(this.year,this.collegeid,this.starttime,this.endtime);
    },
    changepage(n,o){
      let bigDataPage = n;
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'projecthome_collegetablle'){ //项目总览-学院列表
          this.getTopThreeData(currentPage,this.year,this.collegeid,this.tradeid,this.starttime,this.endtime);
        };
      })
    }
  },
  mounted() {
  	this.getTopThreeData(1,this.year,this.collegeid,this.tradeid,this.starttime,this.endtime);
  	this.getDataAnalysisProjectCompetitionRate(this.year,this.collegeid,this.starttime,this.endtime);
  	this.getOrgTradeProjectNum(this.year,this.collegeid,this.starttime,this.endtime);
  	this.getDataAnalysisProjectPatentPieChartList(this.year,this.collegeid,this.starttime,this.endtime);
  	this.getDataAnalysisProjectBusinessCompanyCount(this.year,this.collegeid,this.starttime,this.endtime);
  	this.geDataAnalysisProjectTechnologyCount(this.year,this.collegeid,this.starttime,this.endtime);
  	this.geDataAnalysisTradeProjectBusinessCompanyMoney(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataPie(this.year,this.collegeid,this.starttime,this.endtime);
    var chartLine = echarts.init(document.getElementById("homeBar"));
    var chartLine2 = echarts.init(document.getElementById("homeBar2"));
    var chartLine3 = echarts.init(document.getElementById("homePie"));
    var chartLine4 = echarts.init(document.getElementById("homePie2"));
    window.onresize = ()=>{
      this.resize = !this.resize;
      chartLine.resize();
      chartLine2.resize();
      chartLine3.resize();
      chartLine4.resize();
    }
  },
  methods: {
    //获取子组件传来的值
    getNew(e){
      ////console.log(e)
      this.getTopThreeData(e,this.year,this.collegeid,this.tradeid,this.starttime,this.endtime);
    },
    //获取学院项目数的数据
    getTopThreeData(page,year,collegeid,tradeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getTopThreeData({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	tradeid:tradeid,
          	page:page,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	          	this.rankcollegelist = [];
	          	var collegelist=response.data.data.collegelist;
	          	this.allPage2=response.data.data.totalpage;
              this.currentPage2=response.data.data.page;
	          	if(collegelist.length > 0){
	          		for(var i = 0;i <collegelist.length; i++){
	          			this.rankcollegelist.push(
			                {name:collegelist[i].collegename,number:collegelist[i].num,ranknum:collegelist[i].ranknum}		                
			              )
	          		}
	          	}
	          }
      	});
    },
    //获取行业项目数的数据
    getOrgTradeProjectNum(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getOrgTradeProjectNum({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	        	this.projectSum=response.data.data.projectsum;
	        	var allTrade=response.data.data.tradelist;
	        	this.tradelist=[];
	        	this.xdata = [];
                this.ydata = [];
	        	for(var i = 0;i <allTrade.length; i++){
	        		this.xdata.push(allTrade[i].tradename);
                    this.ydata.push(allTrade[i].projectnum);
	          		this.tradelist.push(
			            {tradename:allTrade[i].tradename,projectnum:allTrade[i].projectnum}		                
			        )
	          	}
		        	this.$nextTick(()=>{
	                this.indexEchart();
	                this.indexEchart2()
	              })
	          }
      	});
    },
     //获取各项专利项目数量
    getDataAnalysisProjectPatentPieChartList(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getDataAnalysisProjectPatentPieChartList({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	        	var allprojectpatent=response.data.data.projectpatentlist;
	        	this.projectpatentlist=[];
	        	this.xpatentData=[];
	            this.ypatentData=[];
	        	for(var i = 0;i <allprojectpatent.length; i++){
	          		this.projectpatentlist.push(
			            {projectpatenttypename:allprojectpatent[i].projectpatenttypename,projectpatentnum:allprojectpatent[i].projectpatentnum}		                
			        )
	          		this.xpatentData.push(allprojectpatent[i].projectpatenttypename);
                    this.ypatentData.push(allprojectpatent[i].projectpatentnum);
	          	}
	        	 this.$nextTick(()=>{
                 this.indexEchart2();
              })
	          }
      	});
    },
     //组织项目参加院赛、校赛、省赛参赛率分析
    getDataAnalysisProjectCompetitionRate(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getDataAnalysisProjectCompetitionRate({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	        	var projectgamelist=response.data.data.projectgamelist;
	        	this.competitionRate=[];
	        	for(var i = 0;i <projectgamelist.length; i++){
	          		this.competitionRate.push(
			            {title:projectgamelist[i].title,value:projectgamelist[i].proportion,projectnum:projectgamelist[i].projectnum,max:100}		                
			        )
	          	}
	        	
	          }
      	});
    },
    //项目商业化运营  各注册资金区间公司数量分析
    getDataAnalysisProjectBusinessCompanyCount(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getDataAnalysisProjectBusinessCompanyCount({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	        	this.projectbusinessprojectsum=response.data.data.projectbusinessprojectsum;
	        	this.projectbusinessmoneysum=response.data.data.projectbusinessmoneysum;
	        	// 清空
		        this.xbusinessData =[];
	            this.ybusinessData1 = [];
	            this.ybusinessData2 = [];
	           /* var ary = [];
	            var ary2 = [];*/
	           var projectbusinesspiechartlist=response.data.data.projectbusinesspiechartlist;
	           for (let i in projectbusinesspiechartlist) {
	              this.ybusinessData1.push(
	                {value:projectbusinesspiechartlist[i].projectbusinessprojectnum,name:projectbusinesspiechartlist[i].projectbusinesstitle})
	            }
	           var tradelist=response.data.data.trade.tradelist;
	            for (let i in tradelist) {
	              this.ybusinessData2.push(
	                {value:tradelist[i].money,name:tradelist[i].tradename})
	            }
	            this.xbusinessData = this.ybusinessData1.concat(this.ybusinessData2);
	            this.$nextTick(()=>{
	              this.indexEchart4()
	            })
	       }
      	});
    },
    //项目商业化运营  获取组织各行业项目成立公司注册总金额分析
    geDataAnalysisTradeProjectBusinessCompanyMoney(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.geDataAnalysisTradeProjectBusinessCompanyMoney({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	        	var moneysum=response.data.data.moneysum;
	        	var tradelist=response.data.data.tradelist;
	       }
      	});
    },
    //各新技术应用项目数量分析
    geDataAnalysisProjectTechnologyCount(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.geDataAnalysisProjectTechnologyCount({
			orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	        	var projectsum=response.data.data.projectsum;
	        	var alltechnology=response.data.data.technologylist;
	        	this.technologylist=[];
	            for (let i in alltechnology) {
	              this.technologylist.push(
	                {projectnum:alltechnology[i].projectnum,technologyname:alltechnology[i].technologyname})
	            }
	       }
      	});
    },
    // 行业项目图
    indexEchart() {
        var chartLine = echarts.init(document.getElementById("homeBar"));
        var option = {
              title: {
                text: "行业柱状图",
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
                  trigger: 'axis',
                  // axisPointer: {
                  //     type: 'cross',
                  //     label: {
                  //         backgroundColor: '#283b56'
                  //     }
                  // }
              },
              grid: { //位置
                // left:0,
                // right:0,
                top: 35,
                bottom: 60,
                textStyle: {
                  color: "#fff"
                }
              },
              xAxis: {
                  type: "category",
                  show: true,
                  data: this.xdata,
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
              },
              yAxis: {
                type: "value",
                minInterval: 1,
                splitLine: {
                  show: false
                },
                splitArea: {
                  show: false
                },
                axisLine: { // 
                    lineStyle: {
                        type: 'solid',
                        color: '#28deed',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
              },
              series: [{
                  name: '总数',
                  type: 'bar',
                  itemStyle: {
                    normal: {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{ 
                          offset: 0,
                          color: '#01b4ff'
                      }, {
                          offset: 1,
                          color: '#28deed'
                      }]),
                      barBorderRadius: 0,
                      lineStyle:{  
                          color:'#28deed' // 画线颜色
                      },
                      label: {
                        show: true,
                        color:'#28deed',
                        position: "top",
                      }
                    }
                },
                  data: this.ydata
              }]
          };
        chartLine.setOption(option);
    },
    // 行业项目图
    indexEchart2() {
        var chartLine = echarts.init(document.getElementById("homeBar2"));
        var option = {
              title: {
                //text: "专利项目柱状图",
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
                  trigger: 'axis',
                  // axisPointer: {
                  //     type: 'cross',
                  //     label: {
                  //         backgroundColor: '#283b56'
                  //     }
                  // }
              },
              grid: { //位置
                left:80,
                right:20,
                top: 10,
                bottom: 20,
                textStyle: {
                  color: "#fff"
                }
              },
              xAxis: {
                  type: "value",
                  show: true,
                  
                  splitLine: {show: false},
                  splitArea : {show : false},//保留网格区域
                  // axisLabel: { // x轴旋转
                  //   interval:0,
                  //   rotate:40,
                  // },
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
              },
              yAxis: {
                type: "category",
                minInterval: 1,
                data: this.xpatentData,
                splitLine: {
                  show: false
                },
                splitArea: {
                  show: false
                },
                axisLine: { // 
                    lineStyle: {
                        type: 'solid',
                        color: '#28deed',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
              },
              series: [{
                  name: '总数',
                  type: 'bar',
                  itemStyle: {
                    normal: {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ 
                          offset: 0,
                          color: '#57198a'
                      }, {
                          offset: 1,
                          color: '#1ca9b5'
                      }]),
                      barBorderRadius: 0,
                      lineStyle:{  
                          color:'#28deed' // 画线颜色
                      },
                      label: {
                        show: true,
                        color:'#28deed',
                        position: "right",
                      }
                    }
                },
                  data: this.ypatentData
              }]
          };
        chartLine.setOption(option);
    },
     // 融资情况饼图
    indexEchart3(){
      var chartLine = echarts.init(document.getElementById("homePie"));
      var length = Math.floor(this.xdata2.length/2)-1;
      var ary = [];
      var y=0;
      var y2=90;
      this.xdata2.map((item,index)=>{
        if(index<=length){
          if(index%2 == 0){
            item.x='1%';
            item.y=y+'%';
          }else{
            item.x='40%';
            item.y=(y-5)+'%';
          };
          y+=5;
          item.orient='horizontal';
          item.data=item.name;
          item.itemWidth=10;
          item.itemHeight=10;
          item.textStyle={
            fontSize: 12,  
            color:'#28deed' 
          };
        }else{
          if(index%2 == 0){
            item.x='1%';
            item.y=y2+'%';
          }else{
            item.x='40%';
            item.y=(y2+5)+'%';
          };
          y2-=5;
          item.orient='horizontal';
          item.data=item.name;
          item.itemWidth=10;
          item.itemHeight=10;
          item.textStyle={
            fontSize: 12,  
            color:'#28deed' 
          }
        };
      })
      this.xdata2.map((item,index)=>{
        ary.push({
          orient:item.orient,
          x:item.x,
          y:item.y,
          data:item.name.split(),
          itemWidth:10,
          itemHeight:10,
          textStyle:{
            fontSize: 12,  
            color:'#28deed' 
          }
        })
      })
      var option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c}({d}%)"
          },
          legend: ary,
          series: [
              {
                  name:'金额占比',
                  type:'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],
                  label: {
                      normal: {
                          show:false,
                          // position: 'inner',
                          formatter: "{b}: {c}",
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:this.ydata2
              },
              {
                  name:'金额占比',
                  type:'pie',
                  radius: ['40%', '50%'],
                  label: {
                      normal: {
                          show:false,
                          formatter: "{b}: {c}",
                      }
                  },
                  data:this.ydata3
              }
          ]
      }
      chartLine.setOption(option);
    },
    // 商业化情况饼图
    indexEchart4(){
      var chartLine2 = echarts.init(document.getElementById("homePie2"));
      var length = Math.floor(this.xbusinessData.length/2)-1;
      var ary = [];
      var y=0;
      var y2=90;
      this.xbusinessData.map((item,index)=>{
        if(index<=length){
          if(index%2 == 0){
            item.x='1%';
            item.y=y+'%';
          }else{
            item.x='40%';
            item.y=(y-5)+'%';
          };
          y+=5;
          item.orient='horizontal';
          item.data=item.name;
          item.itemWidth=10;
          item.itemHeight=10;
          item.textStyle={
            fontSize: 12,  
            color:'#28deed' 
          };
        }else{
          if(index%2 == 0){
            item.x='1%';
            item.y=y2+'%';
          }else{
            item.x='40%';
            item.y=(y2+5)+'%';
          };
          y2-=5;
          item.orient='horizontal';
          item.data=item.name;
          item.itemWidth=10;
          item.itemHeight=10;
          item.textStyle={
            fontSize: 12,  
            color:'#28deed' 
          }
        };
      })
      this.xbusinessData.map((item,index)=>{
        ary.push({
          orient:item.orient,
          x:item.x,
          y:item.y,
          data:item.name.split(),
          itemWidth:10,
          itemHeight:10,
          textStyle:{
            fontSize: 12,  
            color:'#28deed' 
          }
        })
      })
      var option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c}({d}%)"
          },
          legend: ary,
          series: [
              {
                  name:'金额占比',
                  type:'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],
                  label: {
                      normal: {
                          show:false,
                          // position: 'inner',
                          formatter: "{b}: {c}",
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data:this.ybusinessData1
              },
              {
                  name:'金额占比',
                  type:'pie',
                  radius: ['40%', '50%'],
                  label: {
                      normal: {
                          show:false,
                          formatter: "{b}: {c}",
                      }
                  },
                  data:this.ybusinessData2
              }
          ]
      }
      chartLine2.setOption(option);
    },
    // 获取饼图内容
    getDataPie(year,collegeid,starttime,endtime){       
      this.$http
        .post(
          this.$store.state.url + "pc/project/getProjectInvestmentAnalysis",
          { orgid:this.orgid, year:year,collegeid:collegeid,starttime:starttime,endtime:endtime},
          { emulateJSON: true, headers: { xytoken: this.token } }
        )
        .then(response => {
          this.info = JSON.stringify(response.data, null, 4);
          if(response.data.result = 'success') {
            // 清空
            this.ydata2 = [];
            this.ydata3 = [];
            var ary = [];
            var ary2 = [];
            this.ydata2 = [
              {value: response.data.data.num010,name:response.data.data.lessthaninvestmenttitle},
              {value: response.data.data.num1020,name:response.data.data.intervalinvestmenttitle},
              {value: response.data.data.num20,name:response.data.data.greaterthaninvestmenttitle},
            ];
            this.investmentprojectnum=response.data.data.investmentprojectnum;
            this.allinvestmentvalue=response.data.data.allinvestmentvalue;
            for (let i in response.data.data.tradelist) {
              this.ydata3.push(
                {value:response.data.data.tradelist[i].tradeinvestmentvalue,name:response.data.data.tradelist[i].tradename})
            }
            this.xdata2 = this.ydata2.concat(this.ydata3);
            this.$nextTick(()=>{
              this.indexEchart3()
            })
          }
        })
    },
  }
};
</script>

<style lang='less' scoped>
  .rank-out{
    width: 1.37rem;
    height: .07rem;
    .rank-inner{
      width: 1rem;
      height: .07rem;
    }
  }
  .project-top{
    .top-left{
      width: 2.75rem;
      height: 3.86rem;
      .rank-number{
        width: .22rem;
        height: .22rem;
      }
    }
    .top-center{
      width: 6.74rem;
      height: 3.86rem;
      .center-left{
        width: 2.58rem;
        height: 2.58rem;
        background: url('../../assets/backkground_num.png') no-repeat center;
        background-size:100% 100%; 
        .project-total{
          border: 1px solid #0090ff;
          background: #1b225b;
          border-radius: 10px;
          position: absolute;
          bottom: .6rem;
          width: .82rem;
          height: .22rem;
          line-height: .22rem;
        }
      }
      .center-right{
        width: 3.28rem;
        height: 3.36rem;
        .right-bottom{
          width: 3.5rem;
          height: 1.4rem;
        }
        .right-top{
          width: 3.28rem;
          height: 2rem;
        }
        .bgc1{
          width: .74rem;
          height: .74rem;
          background: url('../../assets/green_small.png') no-repeat center;
          background-size:100% 100%; 
          position: absolute;
          top: .6rem;
        }
        .bgc2{
          width: .87rem;
          height: .87rem;
          background: url('../../assets/yellow_big.png') no-repeat center;
          background-size:100% 100%;
          position: absolute;
          top: 1.05rem;
          right: 2.2rem; 
        }
        .bgc3{
          width: .87rem;
          height: .87rem;
          background: url('../../assets/blue_big.png') no-repeat center;
          background-size:100% 100%;
          position: absolute;
          top: .36rem;
          right: 1.6rem; 
        }
        .bgc4{
          width: .74rem;
          height: .74rem;
          background: url('../../assets/green_small.png') no-repeat center;
          background-size:100% 100%; 
          position: absolute;
          top: 1rem;
          right: 1.05rem;
        }
        .bgc5{
          width: .87rem;
          height: .87rem;
          background: url('../../assets/red_big.png') no-repeat center;
          background-size:100% 100%; 
          position: absolute;
          top: .18rem;
          right: .6rem;
        }

        .bgc6{
          width: .74rem;
          height: .74rem;
          background: url('../../assets/yellow_big.png') no-repeat center;
          background-size:100% 100%; 
          position: absolute;
          top: 1.4rem;
          right: .38rem;
        }
      }
    }
    .top-right{
      width: 2.75rem;
      height:3.86rem;
      .patent-top{
        width: 1.54rem;
        height: 1.54rem;
        background: url('../../assets/fllow.png') no-repeat center;
        background-size:100% 100%; 
      }
      .patent-bottom{
        width: 2.5rem;
        height: 1.56rem;
      }
    }
  }
  .project-bottom{
    .bottom-left{
      width: 3.27rem;
      height: 2.28rem;
      .project-join{
        width: .91rem;
        height: .83rem;
      }
    }
    .bottom-center{
      width:3.06rem;
      height:2.28rem;
      .finance-right{
        width:2rem;
        height:80%
      }
    }
    .bottom-right{
      width:2.65rem;
      height:2.28rem;
    }
  }
</style>