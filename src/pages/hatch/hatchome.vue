<!--  -->
<template>
  <div>
    <div class="hatch-top flexbetween mb16rem">
      <div class="top-left">
        <module moudletitle='空间入驻'>
          <div class="wh100-per">
            <div class="space-top">
              <div id="homeLine" style="width: 100%;height:100%;"></div>
            </div>
            <div class="space-bottom">
              <ul>
                <li class="flexcenter mb1rem" v-for='building in buildinglist' :key='building.id'>
                  <div class="rem16 deed mr4rem">{{building.name}}</div>
                  <div class="rem14 fff">入驻率：</div>
                  <div class="rem18 fff000 tailfont7">{{building.value}}</div>
                </li>
              </ul>
              <div class="bignodata" v-if="buildinglist.length == 0">暂无数据</div>
            </div>
          </div>
          <pagesort :allpage="areatotalpage" :currentpage="areapage" @newpage='getAreaPage' v-if="areatotalpage >= 2"></pagesort>
        </module>
      </div>
      <div class="top-center">
        <module moudletitle='空间面积'>
          <div class="w100-per flexmiddle flexdirection">
            <div class="center-top w100-per">
            <el-carousel :autoplay='false' arrow="always" indicator-position='none' @change="getBuildPage" ref="carousel">
              <el-carousel-item v-for='arebuilding in arebuildinglist' :key='arebuilding.id'>
                <div class="spacebgc disflex">
                  <div class="rem36 fff000 area-left flexcenterall">{{arebuilding.buildingname}}</div>
                  <ul class="rem36 fff000 area-right flexmiddle flexdirection flex1 ml2rem">
                    <li class="disflex flexcenter circlebgc">
                      <div class=" ml1rem rem16 deed">房间：</div>
                      <div class="rem18 fff tailfont">{{arebuilding.roomnum}}</div>
                    </li>
                    <li class="disflex flexcenter circlebgc">
                      <div class=" ml1rem rem16 deed">面积总和：</div>
                      <div class="rem18 fff tailfont6">{{arebuilding.buildarea}}</div>
                    </li>
                    <li class="disflex flexcenter circlebgc">
                      <div class=" ml1rem rem16 deed">工位数：</div>
                      <div class="rem18 fff tailfont">{{arebuilding.workstationnum}}</div>
                    </li>
                  </ul>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="center-bottom">
            <div id="homeBar" style="width: 100%;height:100%;"></div>
          </div>
          </div>
        </module>
      </div>
      <div class="top-right">
        <module moudletitle='费用计划'>
          <div class="wh100-per">
            <div class="flexcenterall mt1rem">
              <div class="rem16 deed">总费用：</div>
              <div class="rem30 fff000 mr10rem tailfont2">{{allcost}}</div>
            </div>
            <div class="flexcenterall">
              <div class="rem16 deed ml10rem">涉及项目：</div>
              <div class="rem30 fff000 tailfont">{{projectnum}}</div>
            </div>
            <table class="mrauto">
              <thead>
                <tr>
                  <th v-for='item in cols' :key='item.id'>
                    <div>{{item}}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='project in projectlist' :key='project.id'>
                  <td>
                    <div>{{project.projectname}}</div>
                  </td>
                  <td>
                    <div>{{project.allcost}}</div>
                  </td>
                  <td>
                    <div>{{project.collegename}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="bignodata" v-if="projectlist.length == 0">暂无数据</div>
          </div>
          <pagesort :allpage="costtotalpage" :currentpage="costpage" @newpage='getCostPage' v-if="costtotalpage >= 2"></pagesort>
        </module>
      </div>
    </div>
    <div class="hatch-bottom flexbetween">
      <div class="bottom-left">
         <module moudletitle='立项审批'>
          <div class="wh100-per">
            <div class="flexcenterall mt1rem">
              <div class="rem16 deed">立项申请数：</div>
              <div class="rem30 fff000 mr32rem tailfont">{{allprojectnum}}</div>
              <div class="rem16 deed">审批数：</div>
              <div class="rem30 fff000 tailfont">{{allsuccessnum}}</div>
            </div>
            <div class="flexcenterall">
              <div class="rem16 deed">审批率：</div>
              <div class="rem30 fff000 tailfont7">{{passingrate}}</div>
            </div>
            <div class="left-bottom">
              <div id="homeBar2" style="width: 100%;height:100%;"></div>
            </div>
          </div>
        </module>
      </div>
      <div class="bottom-center">
         <module moudletitle='过去三年项目入驻趋势'>
          <div class="wh100-per">
            <div id="homeLine2" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
      <div class="bottom-right">
         <module moudletitle='商业化运营'>
          <div class="wh100-per">
            <div class="flexcenterall mt1rem">
              <div class="rem16 deed">资产总额：</div>
              <div class="rem30 fff000 tailfont2">{{allprojectcapital}}</div>
            </div>
            <div class="flexmiddle">
              <ul>
                <li v-for='(item) in processlist' :key='item.id' class="flexcenter ">
                  <div class="rem14 deed lineover w1rem">{{item.processname}}</div>
                  <div class="bgc-gray rank-out">
                    <div class="bgc-inner rank-inner"></div>
                  </div>
                  <div class="fff000 rem16">
                    {{item.projectnum}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </module>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import module from '../../components/module.vue';
import pagesort from '../../components/pagesort.vue'
export default {
  data () {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      allarea:0,//总面积
      usedarea:0,//已使用的面积
      buildinglist:[],//楼列表
      areatotalpage:0,//总页码
      areapage:0,//页码
      arebuildinglist:[],//面积类楼列表
      areaxdata:[],//X轴数据
      areaydata:[],//Y轴数据
      allcost:0,//总金额
      projectnum:0,//总项目数
      costtotalpage:0,//总页码
      costpage:0,//页码
      projectlist:[],//项目列表
      cols:["项目名称","金额","所在学院"],//表头
      allprojectnum:0,//总申请的项目数量
      allsuccessnum:0,//申请成功的项目数量
      tradexdata:[],//行业类x轴数据
      tradeydata:[],//行业类y轴数据
      trendxdata:[],//趋势x轴数据
      trendydata:[],//趋势y轴数据
      allprojectcapital:0,//立项申请成功的项目总资产
      processlist:[],//阶段列表
      utilizationrate:0,//总面积使用率
      passingrate:0,//项目立项通过率
    };
  },

  components: {
    module,
    pagesort
  },

  computed: {
    changepage(){
      return this.$store.state.bigDataPage
    }
  },
  watch:{
    changepage(n,o){
      let bigDataPage = n;
      // //console.log(n)
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'hatchome_buildtable'){ //孵化-楼列表
          this.getOrgProjecthatchEntryInfo(currentPage);
        };
        if(tableSort == 'hatchome_areatable'){ //孵化-面积列表
          this.$refs.carousel.setActiveItem(Number(currentPage)-1);
        };
        if(tableSort == 'hatchome_costtable'){ //孵化-费用列表
          this.getOrgProjecthatchCostInfo(currentPage);
        }
      })
    }
  },
  mounted(){
  	this.getOrgProjecthatchEntryInfo(1);
  	this.getOrgProjecthatchAreaInfo();
  	this.getOrgProjecthatchCostInfo(1);
  	this.getOrgProjecthatchTrend();
  	this.getOrgProjecthatchPassingInfo();
  	this.getOrgProjecthatchBusinessInfo();
  },

  methods: {
    //获取楼面积页码值
    getAreaPage(e){
      this.getOrgProjecthatchEntryInfo(e);
    },
    //获取资金投入页码值
    getCostPage(e){
      this.getOrgProjecthatchCostInfo(e);
    },
    //获取楼层信息页码值
    getBuildPage(e){
    	
    },
    // 趋势图
    indexChartLine() {
      var allarea = 100;
      var ur = this.utilizationrate;
      if(0 != this.allarea){
      	allarea = this.allarea;
      }
      var chartLine = echarts.init(document.getElementById("homeLine"));
      var colors = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          offset: 0,
          color: '#d6a614'
      },{
          offset: 1,
          color: '#24c8d6'
      }]);
      var usedarea = this.usedarea;
      var option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'red' // 0% 处的颜色
            }, {
                offset: 1, color: 'blue' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        },
        series: [
            {
                name: '',                
                type: 'gauge',
                min:0,
                max:allarea,
                startAngle: 200,
                endAngle: -20,
                radius: "90%", //仪表大小
                center: ["50%", "65%"], //仪表位置
                itemStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

                            offset: 0,
                            color: '#63E587'
                        }, {
                            offset: 1,
                            color: '#5FE2E4'
                        }])
                    }},
            axisLine: { //仪表盘轴线(轮廓线),      
                lineStyle: {
                    color: [
                        [ur, colors],
                        [1, "#ccc"]
                    ],
                    width: 30
                    }
            },   
            axisLabel: {  //文字样式
                //show:false
                distance:10,
                formatter:function(v){
                    switch (v) {
                      case 0 : return 0;
                    	case allarea: return allarea;
                    }
                    
                },
                textStyle: {
                        color: "#28deed",
                        fontSize: 14,
                        fontWeight: "bolder"
                    },
            },
            axisTick: {  // 细分割线样式
                // show:true
                length: 0,
            },
            //指针样式
            pointer: { show: false },
            // 分割线样式
            splitLine: {show: false},
            detail: {
                          formatter : "{score|{value}平方米}",
                          offsetCenter: [0, "55%"],
                          height:30,
                        rich : {
                              score : {
                                color : "#fff000",
                                fontFamily : "微软雅黑",
                                    fontSize : 22
                              }
                          }
                      },
              title : { //设置仪表盘中间显示文字样式
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 14,
                        fontStyle: 'normal',
                        color:"#fff"
                    },
                    offsetCenter: [0, '-10%'], 
            },
                      
            data:[{
                          value: allarea,
                          name:'孵化空间'
                          
                      }]
            }
        ]
      };
      chartLine.setOption(option);
    },
    // 楼面积使用情况
    indexEchart() {
      var chartLine = echarts.init(document.getElementById("homeBar"));
      var option = {
            title: {
              text: "",
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
              top: 20,
              bottom: 60,
              textStyle: {
                color: "#fff"
              }
            },
            xAxis: {
                type: "category",
                show: true,
                data: this.areaxdata,
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
              data: this.areaydata
            }]
      };
      chartLine.setOption(option);
    },
    // 立项审批数量
    indexEchart2() {
      var chartLine2 = echarts.init(document.getElementById("homeBar2"));
      var option = {
            title: {
              text: "",
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
              top: 20,
              bottom: 60,
              textStyle: {
                color: "#fff"
              }
            },
            xAxis: {
                type: "category",
                show: true,
                data: this.tradexdata,
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
              data: this.tradeydata
            }]
      };
      chartLine2.setOption(option);
    },
    // 项目趋势图
    indexEchart3() {
      var chartLine = echarts.init(document.getElementById("homeLine2"));
      var option = {
        title: {
          text: "",
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
            data: this.trendxdata,
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
            name:'项目数量',
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
            data: this.trendydata
          },
        ]
      };
      chartLine.setOption(option);
    },
    //总空间入驻率以及各楼的入驻面程比率
    getOrgProjecthatchEntryInfo(page) {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgProjecthatchEntryInfo({
			orgid:orgId,
          	page:page}).then(response => {
	        if(response.data.result == 'success'){
	        		this.buildinglist = [];
	          	this.allarea = response.data.data.allarea;
	          	this.usedarea = response.data.data.usedarea;
	          	this.areatotalpage = response.data.data.totalpage;
	          	this.areapage = response.data.data.page;
	          	for(var i=0;i<response.data.data.buildinglist.length;i++){
	          		var buildur = 0;
	          		if(0 != response.data.data.buildinglist[i].buildarea){
	          			buildur = (response.data.data.buildinglist[i].buildusedarea/response.data.data.buildinglist[i].buildarea).toFixed(2);
	          		}
	          		this.buildinglist.push({name: response.data.data.buildinglist[i].buildingname, value: buildur});
	          	}
	          	this.indexChartLine();
	          }
      	});
    },
    //空间面程数据，包括哪个层，有几层，有多少房间，总面积，工位数等。并形成柱形图
    getOrgProjecthatchAreaInfo() {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgProjecthatchAreaInfo({
			orgid:orgId}).then(response => {
	        if(response.data.result == 'success'){
	        		this.arebuildinglist = [];
	        		for(var i=0;i<response.data.data.length;i++){
	        			this.arebuildinglist.push({
		        			buildingname: response.data.data[i].buildingname,
		        			buildarea: response.data.data[i].buildarea,
		        			roomnum:response.data.data[i].roomnum,
		        			workstationnum:response.data.data[i].workstationnum
                });
		        		this.areaxdata.push(response.data.data[i].buildingname);
		        		this.areaydata.push(response.data.data[i].buildarea);
	        		}
	        		this.indexEchart();
	          }
      	});
    },
    //总费用划拔的数量及表格数据（分页）
    getOrgProjecthatchCostInfo(page) {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgProjecthatchCostInfo({
			orgid:orgId,
			page:page}).then(response => {
	        if(response.data.result == 'success'){	        	
	        		this.projectlist = [];
	        		this.allcost = response.data.data.allcost;
	        		this.projectnum = response.data.data.projectnum;
	        		this.costtotalpage = response.data.data.totalpage;
	        		this.costpage = response.data.data.page;
	        		for(var i=0;i<response.data.data.projectlist.length;i++){
	        			this.projectlist.push({
	        				projectname:response.data.data.projectlist[i].projectname,
	        				allcost:response.data.data.projectlist[i].allcost,
	        				collegename:response.data.data.projectlist[i].collegename
	        			});
	        		}	        		
	          }
      	});
    },
    //过去N年的入驻趋势（从有记录开始）
    getOrgProjecthatchTrend() {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgProjecthatchTrend({
			orgid:orgId}).then(response => {
	        if(response.data.result == 'success'){
	        	this.trendxdata = [];
	        	this.trendydata = [];
	        	for(var i=0;i<response.data.data.length;i++){
	        		this.trendxdata.push(response.data.data[i].date);
	        		this.trendydata.push(response.data.data[i].projectnum)
	        	}
	        	this.indexEchart3();
	        }
      	});
    },
    //立项审核数量及与行业相关数据（柱形）
    getOrgProjecthatchPassingInfo() {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgProjecthatchPassingInfo({
			orgid:orgId}).then(response => {
	        if(response.data.result == 'success'){
	        	this.tradexdata = [];
	        	this.tradeydata = [];
	        	this.allprojectnum = response.data.data.allprojectnum;
	        	this.allsuccessnum = response.data.data.allsuccessnum;
	        	if(0 != response.data.data.allprojectnum){
	      			this.passingrate = (response.data.data.allsuccessnum/response.data.data.allprojectnum).toFixed(2)*100;
	      		}
	        	for(var i=0;i<response.data.data.tradelist.length;i++){
	        		this.tradexdata.push(response.data.data.tradelist[i].tradename);
	        		this.tradeydata.push(response.data.data.tradelist[i].projectnum);
	        	}
	        	this.indexEchart2();
	        }
      	});
    },
    //商业化运营的数据返回商业化运营的数据
    getOrgProjecthatchBusinessInfo() {
	    let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
			this.$api.getOrgProjecthatchBusinessInfo({
			orgid:orgId}).then(response => {
	        if(response.data.result == 'success'){
	        	this.processlist = [];
	        	
	        	this.allprojectcapital = response.data.data.allcapital;
	        	
//	        	//console.log(this.allprojectcapital)
	        	
	        	for(var i=0;i<response.data.data.processlist.length;i++){
	        		this.processlist.push({
	        			processname:response.data.data.processlist[i].processname,
	        			projectnum:response.data.data.processlist[i].projectnum
	        		});
	        	}
	        }
      	});
    },
  }
}

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
  .hatch-top{
    .page-sort{
      bottom: .12rem;
      /deep/ .page-left, /deep/.page-right{
        width: .18rem;
        height: .18rem;
      }
    }
    .top-left{
      width: 2.85rem;
      height: 3.8rem;
      .space-top{
        width: 100%;
        height: 50%;
      }
      .space-bottom{
        padding: 0 .42rem;
      }
      .page-sort{
        bottom: .12rem;
        /deep/ .page-left, /deep/.page-right{
          width: .18rem;
          height: .18rem;
        }
      }
    }
    .top-center{
      width: 5.75rem;
      height: 3.8rem;
      .el-carousel{
        /deep/ .el-carousel__container{
          height:1.82rem;
          /deep/.el-icon-arrow-right:before,/deep/.el-icon-arrow-left:before{
            font-size: .3rem;
            color: #28deed
          }
          /deep/.area-left{
            width: 1.8rem;
          }
          /deep/.spacebgc{
            width: 3.74rem;
            height:1.76rem;
            background: url('../../assets/background_incubation.png') no-repeat center;
            background-size:100% 100%;
            margin: auto; 
          }
        }
      }
      .center-bottom{
        width: 100%;
        height: 1.56rem;
      }
    }
    .top-right{
      width: 3.68rem;
      height: 3.80rem;
    }
  }
  .hatch-bottom{
    .bottom-left{
      width: 4.24rem;
      height: 2.48rem;
      .left-bottom{
        width: 100%;
        height: 1.25rem;
      }
    }
    .bottom-center{
      width: 4.4rem;
      height: 2.48rem;
    }
    .bottom-right{
      width: 3.7rem;
      height: 2.48rem;
    }
  }
</style>