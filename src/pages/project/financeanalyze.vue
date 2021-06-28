<!--  -->
<template>
  <div>
    <div class="finance-top flexbetween mb16rem">
      <div class="top-left">
        <module moudletitle='融资分布'>
          <div class="finance-distribution">
            <ul>
              <li v-for='item in headlist' :key='item.id' class="flexbetween rem14 deed ptb05">
                <div class="flex1 lineover">{{item.name}}</div>
                <div class="flex1 text-center lineover">{{item.money}}</div>
                <div class="flex1 text-center lineover">{{item.number}}</div>
              </li>
            </ul>
            <ul class="tableborder rem14 fff">
              <li v-for='item2 in tablelist' :key='item2.id' class="flexbetween">
                <div class="flex1 lineover">{{item2.tradename}}</div>
                <div class="flex1 rem18 fff000 text-center lineover tailfont3">{{item2.tradeinvestmentvalue}}</div>
                <div class="flex1 rem18 fff000 text-center lineover">{{item2.projectnum}}</div>
              </li>
            </ul>
          </div>
        </module>
      </div>
      <div class="top-center relative">
        <div class="center-left">
          <div class="rem24 fff000 tailfont">{{investmentprojectnum}}</div>
          <div class="rem14 fff">融资项目数</div>
        </div>
        <div class="center-center transcenmid text-center">
          <div class="rem36 fff000 tailfont2">{{allinvestmentvalue}}</div>
          <div class="rem14 fff">融资总额</div>
        </div>
        <div class="center-right">
          <div class="rem24 fff000">{{proportion}}</div>
          <div class="rem14 fff">项目占比</div>
        </div>
      </div>
      <div class="top-right">
        <module moudletitle='融资区间'>
          <div class="finance-space">
            <div id="homePie" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
    </div>
    <div class="finance-bottom flexbetween">
      <div class="bottom-left">
        <module moudletitle='融资项目增长趋势'>
          <div class="finance-project">
            <div id="homeLine" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
      <div class="bottom-center">
        <module moudletitle='各学院融资分布'>
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
                    <div>{{item.smallprojectinvestmentprojectnum}}</div>
                  </td>
                  <td>
                    <div>{{item.middleprojectinvestmentprojectnum}}</div>
                  </td>
                  <td>
                    <div>{{item.largeprojectinvestmentprojectnum}}</div>
                  </td>
                  <td>
                    <div>{{item.projectinvestmentprojectnum}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
             <div class="bignodata" v-if="tabledata.length == 0">暂无数据</div>
          </div>
          <pagesort :allpage="allPage" :currentpage="currentPage" @newpage='getNew'></pagesort>
        </module>
      </div>
      <div class="bottom-right">
        <module moudletitle='融资金额增长趋势'>
          <div class="finance-money">
            <div id="homeLine2" style="width: 100%;height:100%;"></div>
          </div>
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
      year:0,
      collegeid:0,
      starttime:'',
      endtime:'',
      allPage: 10, //总页数
      currentPage: 1, //当前页数
      titlelist:[],
      cols:[],
      tabledata:[],
      headlist:[
       {name:'行业',money:'融资金额',number:'项目数'}
      ],
      tablelist:[
      ],
      allinvestmentvalue:0,
      investmentprojectnum:0,
      proportion:0,
      xdata:[],
      ydata:[
      ],
      xdata2: [],
      ydata2: [],
      ydata3: [],
      xdata3: [],
      ydata4: []
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
      this.collegeid = bigDataQuery.collegeId;
      this.getProjectInvestmentTradeAnalysisList(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataAnalysisProjectInvestmentTrendStatisticsCount(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataAnalysisTitleList();
      this.getDataAnalysisProjectInvestmentList(this.year,this.collegeid,this.starttime,this.endtime,1);
    },
    changepage(n,o){
      let bigDataPage = n;
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'financeanalyze_collegetable'){ //融资-学院列表
          this.getDataAnalysisProjectInvestmentList(this.year,this.collegeid,this.starttime,this.endtime,currentPage);
        };
      })
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.indexEchart()
    });
    var chartLine2 = echarts.init(document.getElementById("homePie"));
    var chartLine3 = echarts.init(document.getElementById("homeLine"));
    var chartLine4 = echarts.init(document.getElementById("homeLine2"));
    window.onresize = ()=>{
      chartLine2.resize();
      chartLine3.resize();
      chartLine4.resize();
    };
    this.getProjectInvestmentTradeAnalysisList(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataAnalysisProjectInvestmentTrendStatisticsCount(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataAnalysisTitleList();
    this.getDataAnalysisProjectInvestmentList(this.year,this.collegeid,this.starttime,this.endtime,1);
  },

  methods: {
    //获取子组件传来的值
    getNew(e){
      ////console.log(e);
      this.getDataAnalysisProjectInvestmentList(this.year,this.collegeid,this.starttime,this.endtime,e);
    },
     // 饼图
    indexEchart(){
      var chartLine = echarts.init(document.getElementById("homePie"));
      var option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: ({d}%)"
          },
          legend: {
            orient:'horizontal',
            y:'bottom',
            data:this.xdata,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              fontSize: 12,  
              color:'#28deed' 
            }
          },
          series: [
              {
                  name:'金额占比',
                  type:'pie',
                  radius: ['40%', '60%'],
                  label: {
                      normal: {
                          show:false,
                          formatter: "{b}: {c}",
                      }
                  },
                  data:this.ydata
              }
          ]
      }
      chartLine.setOption(option);
    },
    // 项目趋势图
    indexEchart2() {
      var chartLine = echarts.init(document.getElementById("homeLine"));
      var option = {
        title: {
          show:false,
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
          top: 40,
          bottom: 55,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            show: true,
            data: this.xdata2,
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
            data: this.ydata3
          },
        ]
      };
      chartLine.setOption(option);
    },
    // 项目趋势图
    indexEchart3() {
      var chartLine = echarts.init(document.getElementById("homeLine2"));
      var option = {
        title: {
          show:false,
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
          left:50,
          right:0,
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
            data: this.xdata3,
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
            name:'金额',
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
            data: this.ydata4
          },
        ]
      };
      chartLine.setOption(option);
    },
    // 获取行业融资金额    项目数
    getProjectInvestmentTradeAnalysisList(year,collegeid,starttime,endtime){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getProjectInvestmentTradeAnalysisList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	this.tablelist=[];
	           this.tablelist=response.data.data.tradelist;
	           this.allinvestmentvalue=response.data.data.allinvestmentvalue;
	           this.investmentprojectnum=response.data.data.investmentprojectnum;
	           this.proportion=response.data.data.proportion;
	         }
      	});
    },
    // 获取组织 融资区间
    getDataAnalysisProjectInvestmentTrendStatisticsCount(year,collegeid,starttime,endtime){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectInvestmentTrendStatisticsCount({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
		      }).then(response => {
	        if(response.data.result == 'success'){
	            var projectinvestmentpiechartlist=response.data.data.projectinvestmentpiechartlist;
	            var projectinvestmentlist=response.data.data.projectinvestmentlist;
	            this.xdata=[];
	            this.ydata=[];
	            this.xdata2 = [];
              this.ydata2 = [];
              this.xdata3 = []
		          this.ydata4 = []
	             projectinvestmentpiechartlist.map((item)=>{
                this.xdata.push(item.projectinvestmenttitle);
              });
               projectinvestmentlist.map((item)=>{
                this.xdata2.push(item.date);
              });
	            for (let i in projectinvestmentpiechartlist) {
	              this.ydata.push({name:projectinvestmentpiechartlist[i].projectinvestmenttitle,value:projectinvestmentpiechartlist[i].projectinvestmentprojectnum})
	            }
	            for (let i in projectinvestmentlist) {
	               this.ydata2.push(projectinvestmentlist[i].projectinvestmentprojectnum);
	               this.xdata3.push(projectinvestmentlist[i].date);
		             this.ydata4.push(projectinvestmentlist[i].projectinvestmentvalue);
	            }
	            this.$nextTick(()=>{
                 this.indexEchart();
                 this.indexEchart2();
                 this.indexEchart3();
              })
	        }
      	});
    },
    // 获取学院融资表格标题
    getDataAnalysisTitleList() {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisTitleList({
			    pageflag:3
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	  this.cols=[];
	            this.cols.push({prop: 'collegename', label:response.data.data.collegename});
              this.cols.push({prop: 'lessthaninvestmentvalueprojectnum', label:response.data.data.lessthaninvestmentvalueprojectnum});
		          this.cols.push({prop: 'intervalinvestmentvalueprojectnum', label:response.data.data.intervalinvestmentvalueprojectnum});
		          this.cols.push({prop: 'greaterthaninvestmentvalueprojectnum', label:response.data.data.greaterthaninvestmentvalueprojectnum});
		          this.cols.push({prop: 'projectnum', label:response.data.data.projectnum});
	         }
      	});
    },
    // 获取组织相关学院的融资情况分析
    getDataAnalysisProjectInvestmentList(year,collegeid,starttime,endtime,page) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectInvestmentList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
			    page:page
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	this.tabledata=[];
	        	 this.tabledata=response.data.data.collegelist;
	        	 this.allPage=response.data.data.totalpage;
	           this.currentPage=response.data.data.page;
	         }
      	});
    },
  }
}

</script>
<style lang='less' scoped>
  .finance-top{
    .top-left{
      width: 3.68rem;
      height: 3.08rem;
      .finance-distribution{
        width: 80%;
        height: 90%;
      }
      .tableborder{
        li{
          border-top: 1px dashed #28deed;
          padding: .05rem 0;
        }
      }
    }
    .top-center{
      width: 4.44rem;
      height: 3.03rem;
      background: url('../../assets/bg.png') no-repeat center;
      background-size: 100% 100%;
      .center-left{
        position: absolute;
        left: .5rem;
        top: .85rem;
      }
      .center-right{
        position: absolute;
        right: .5rem;
        top: .85rem;
      }
    }
    .top-right{
      width: 3.68rem;
      height: 3.08rem;
      .finance-space{
        width: 90%;
        height: 90%;
      }
    }
  }
  .finance-bottom{
    .bottom-left{
      width: 2.86rem;
      height: 3.06rem;
      .finance-project{
        width: 90%;
        height: 80%;
      }
    }
    .bottom-center{
      width:6.65rem;
      height: 3.06rem;
    }
    .bottom-right{
      width: 2.84rem;
      height: 3.06rem;
      .finance-money{
        width: 90%;
        height: 80%;
      }
    }
    
  }
  
</style>