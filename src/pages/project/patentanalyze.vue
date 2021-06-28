<!--  -->
<template>
  <div class='flexbetween'>
    <div class="patent-left">
      <div class="left-top mb16rem">
        <module moudletitle='专利统计'>
          <div class="patent-total">
            <div id="homeBar2" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
      <div class='left-bottom'>
        <module moudletitle='专利分析'>
          <div class='w100-per h100-per flexdirection flexcenter'>
            <div class='bottom-top mrauto'>
              <div id="homeLine" style="width: 100%;height:100%;"></div>
            </div>
            <div class="bottom-top mrauto">
              <div id="homeLine2" style="width: 100%;height:100%;"></div>
            </div>
          </div>
        </module>
      </div>
    </div>
    <div class='patent-right'>
      <div class='right-top mb16rem'>
        <module moudletitle='学院专利统计'>
          <div class='wh100-per flexcenter flexdirection'>
            <table class='mt26rem'>
              <thead>
                <tr>
                  <th v-for='item in cols' :key='item.id'>
                    <div>{{item.label}}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='item in tabledata' :key='item.id'>
                  <td>
                    <div>{{item.collegename}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum0}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum1}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum2}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum3}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum4}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentsum}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="bignodata" v-if="tabledata.length == 0">暂无数据</div>
          </div>
          <pagesort :allpage="allPage2" :currentpage="currentPage2" @newpage='getNew'></pagesort>
        </module>
      </div>
      <div class='right-top'>
        <module moudletitle='行业专利分布'>
          <div class='w100-per h100-per flexcenter flexdirection'>
            <table class='mt26rem'>
              <thead>
                <tr>
                  <th v-for='item in cols1' :key='item.id'>
                    <div>{{item.label}}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='item in tabledata1' :key='item.id'>
                  <td>
                    <div>{{item.tradename}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum0}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum1}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum2}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum3}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentnum4}}</div>
                  </td>
                  <td>
                    <div>{{item.projectpatentsum}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="bignodata" v-if="tabledata1.length == 0">暂无数据</div>
          </div>
          <pagesort :allpage="allPage3" :currentpage="currentPage3" @newpage='getNew1'></pagesort>
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
      year:0,
      collegeid:0,
      starttime:'',
      endtime:'',
      xdata: [],
      ydata: [],
      xdata2: [],
      ydata2: [],
      xdata3: [],
      ydata3: [],
      ydata4: [],
      allPage2: 10, //总页数
      currentPage2: 1, //当前页数
      allPage3: 10, //总页数
      currentPage3: 1, //当前页数
      titlelist:[],
      cols:[],
      tabledata:[],
      tabledata1:[],
      cols1:[]
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
      let bigDataQuery = n;
      this.starttime = bigDataQuery.starTime;
      this.endtime = bigDataQuery.endTime;
      this.collegeid = bigDataQuery.collegeId;
      this.getDataIndustry(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataAnalysisProjectPatentTrendStatisticsCount(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataScale(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataAnalysisTitleList();
      this.getDataAnalysisProjectPatentList(this.year,this.collegeid,this.starttime,this.endtime,1);
      this.getDataAnalysisProjectPatentTradeList(this.year,this.collegeid,this.starttime,this.endtime,1);
    },
    changepage(n,o){
      let bigDataPage = n;
      // //console.log(n)
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'patentanalyze_collegetable'){ //专利-学院列表
          this.getDataAnalysisProjectPatentList(this.year,this.collegeid,this.starttime,this.endtime,currentPage);
        };
        if(tableSort == 'patentanalyze_tradetable'){ //专利-行业列表
          this.getDataAnalysisProjectPatentTradeList(this.year,this.collegeid,this.starttime,this.endtime,currentPage);
        };
      })
    }
  },
  mounted(){
    this.getDataIndustry(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataAnalysisProjectPatentTrendStatisticsCount(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataScale(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataAnalysisTitleList();
    this.getDataAnalysisProjectPatentList(this.year,this.collegeid,this.starttime,this.endtime,1);
    this.getDataAnalysisProjectPatentTradeList(this.year,this.collegeid,this.starttime,this.endtime,1);
    var chartLine2 = echarts.init(document.getElementById("homeBar2"));
    var chartLine3 = echarts.init(document.getElementById("homeLine"));
    var chartLine4 = echarts.init(document.getElementById("homeLine2"));
    window.onresize = ()=>{
      chartLine2.resize();
      chartLine3.resize();
      chartLine4.resize();
    }
  },

  methods: {
    //获取子组件传来的值
    getNew(e){
      ////console.log(e)
      this.getDataAnalysisProjectPatentList(this.year,this.collegeid,this.starttime,this.endtime,e);
    },
    //获取子组件传来的值
    getNew1(e){
      ////console.log(e)
      this.getDataAnalysisProjectPatentTradeList(this.year,this.collegeid,this.starttime,this.endtime,e);
    },
    // 行业项目图
    indexEchart() {
        var chartLine = echarts.init(document.getElementById("homeBar2"));
        var option = {
              title: {
                // text: "项目增长趋势图",
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
                data: this.xdata,
                splitLine: {
                  show: false
                },
                splitArea: {
                  show: false
                },
                axisLine: { // 
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
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
                        fontSize:18,
                        color:'#fff000',
                        position: "right",
                      }
                    }
                },
                  data: this.ydata
              }]
          };
        chartLine.setOption(option);
    },
    // 获取行业分布情况
    getDataIndustry(year,collegeid,starttime,endtime){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectPatentPieChartList({
			      orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime,
		        }).then(response => {
	        if(response.data.result == 'success'){
	            var projectpatentlist=response.data.data.projectpatentlist;
              this.xdata = [];
              this.ydata = [];
              for (let i in projectpatentlist) {
                this.xdata.push(projectpatentlist[i].projectpatenttypename);
                this.ydata.push(projectpatentlist[i].projectpatentnum);
              };
              this.$nextTick(()=>{
                this.indexEchart()
              })
	       }
      	});
    },
    // 项目趋势图
    indexEchart2() {
      var chartLine = echarts.init(document.getElementById("homeLine"));
      var option = {
        title: {
          text: "专利分析趋势图",
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
            data: this.xdata2,
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
            smooth: true, // 平滑曲线
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
            data: this.ydata2
          },
        ]
      };
      chartLine.setOption(option);
    },
    //获取项目专利趋势图信息
    getDataAnalysisProjectPatentTrendStatisticsCount(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectPatentTrendStatisticsCount({
			      orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	           this.xdata2 = [];
            this.ydata2 = [];
            for (let i in response.data.data.projectpatentlist) {
              this.xdata2.push(response.data.data.projectpatentlist[i].date);
              this.ydata2.push(response.data.data.projectpatentlist[i].projectpatentsum);
            };
            this.$nextTick(()=>{
              this.indexEchart2()
            })
	       }
      	});
    },
    // 项目趋势图
    indexEchart3() {
      var chartLine = echarts.init(document.getElementById("homeLine2"));
      var option = {
        title: {
          text: "院校专利数量占比与全国专利数量占比(%)",
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
          bottom: 55,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            show: true,
            data: this.xdata3,
            // boundaryGap : false, //x轴对齐
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
            name:'院校专利数量占比',
            type: "line",
            smooth: true, // 平滑曲线
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
            data: this.ydata3
          },
          {
            name:'全国专利数量占比',
            type: "line",
            smooth: true, // 平滑曲线
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
            data: this.ydata4
          },
        ]
      };
      chartLine.setOption(option);
    },
    // 获取获取全校、全省、全国占比
    getDataScale(year,collegeid,starttime,endtime){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getProjectPatentProportion({
			      orgid:orgId,
          	year:year,
          	collegeid:collegeid,
          	starttime:starttime,
          	endtime:endtime}).then(response => {
	        if(response.data.result == 'success'){
	            this.xdata3 = [];
              this.ydata3 = [];
              this.ydata4 = [];
              response.data.data.map((item)=>{
                if(item.patenttypename.length>6){
                  item.patenttypename = item.patenttypename.slice(0,6)+'...'
                };
                this.xdata3.push(item.patenttypename);
                this.ydata3.push(item.orgproportion);
                this.ydata4.push(item.countryproportion)
              });
              this.$nextTick(()=>{
                this.indexEchart3()
              })
	       }
      	});
    },
    //获取专利表格标题
    getDataAnalysisTitleList() {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisTitleList({
			     pageflag:4
		      }).then(response => {
	        if(response.data.result == 'success'){
	           this.titlelist = response.data.data;
	           this.cols=[];
	           this.cols1=[];
            this.cols.push(
              {prop: 'collegename', label: this.titlelist.collegename},
              );
            for(let i in this.titlelist.titlelist){
              this.cols.push({prop: 'projectpatentnum'+[i], label: this.titlelist.titlelist[i].title});
            };
            this.cols.push({prop: 'projectpatentsum', label: this.titlelist.sum});
            this.cols1.push(
              {prop: 'tradename', label:'所在行业'},
              );
            for(let i in this.titlelist.titlelist){
              this.cols1.push({prop: 'projectpatentnum'+[i], label: this.titlelist.titlelist[i].title});
            };
            this.cols1.push({prop: 'projectpatentsum', label: this.titlelist.sum});
	       }
      	});
    },
    // 获取组织学院的专利情况分析
    getDataAnalysisProjectPatentList(year,collegeid,starttime,endtime,page) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectPatentList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
			    page:page
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	 this.tabledata =[];
	           this.tabledata = response.data.data.collegelist;
             this.allPage2=response.data.data.totalpage;
             this.currentPage2=response.data.data.page;
	       }
      	});
    },
    // 项目专利总览页-专利与行业的分布情况表格
    getDataAnalysisProjectPatentTradeList(year,collegeid,starttime,endtime,page) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectPatentTradeList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
			    page:page
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	this.tabledata1 =[];
	          this.tabledata1 = response.data.data.tradelist;
            this.allPage3=response.data.data.totalpage;
            this.currentPage3=response.data.data.page;
	       }
      	});
    },
  }
}

</script>
<style lang='less' scoped>
  .patent-left{
    .left-top{
      width:4.68rem;
      height:2.26rem;
      .patent-total{
        width:80%;
        height:80%;
      }
    }
    .left-bottom{
      width:4.68rem;
      height:3.92rem;
      .bottom-top{
        width:80%;
        height:42%
      }
    }
  }
  .patent-right{
    .right-top{
      width:7.75rem;
      height:3.09rem
    }
  }
  
</style>