<!--  -->
<template>
  <div>
    <div class="business-top flexbetween mb16rem">
      <div class="top-left">
        <module moudletitle='项目阶段分布'>
          <ul>
            <li v-for='(item) in ranklist2' :key='item.id' class="flexcenter mb1rem">
              <div class="rem14 deed lineover w1rem">{{item.processclassname}}</div>
              <div class="bgc-gray rank-out">
                <div class="bgc-inner rank-inner"></div>
              </div>
              <div class="fff000 rem18">
                {{item.projectnum}}
              </div>
            </li>
          </ul>
        </module>
      </div>
      <div class="top-center relative fff flexmiddle whitenowrap">
        <div class="center-left flexcenter mr24rem">
          <div>
            <div  v-for='(item) in ranklist2_1' :key='item.id' class="business-bgc flexcenterall flexdirection mb12rem" >
              <div class="rem16">{{item.projectnum}}</div>
              <div class="rem12">{{item.tradename}}</div>
            </div>
           <!-- <div class="business-bgc flexcenterall flexdirection mb12rem">
              <div class="rem16">12</div>
              <div class="rem12">社会服务</div>
            </div>
            <div class="business-bgc flexcenterall flexdirection mb12rem">
              <div class="rem16">12</div>
              <div class="rem12">社会服务</div>
            </div>-->
          </div>
        </div>
        <div class="center-center text-center flexcenterall relative mr24rem">
          <div class="fff000 rem42 tailfont4">{{projectsum}}</div>
          <div class="rem14 fff business-total">成立公司</div>
        </div>
        <div class="center-left flexcenter">
          <div>
            <div v-for='(item) in ranklist2_2' :key='item.id' class="business-bgc flexcenterall flexdirection mb12rem">
              <div class="rem16">{{item.projectnum}}</div>
              <div class="rem12">{{item.tradename}}</div>
            </div>
           <!-- <div class="business-bgc flexcenterall flexdirection mb12rem">
              <div class="rem16">12</div>
              <div class="rem12">社会服务</div>
            </div>
            <div class="business-bgc flexcenterall flexdirection mb12rem">
              <div class="rem16">12</div>
              <div class="rem12">社会服务</div>
            </div>-->
          </div>
        </div>
      </div>
      <div class="top-right">
        <module moudletitle='注册资本分布'>
          <div class="business-space">
            <div class="flexcenter transmiddle">
              <div class="rem14 deed whitenowrap">总注册资本：</div>
              <div class="rem24 fff000 tailfont2">{{projectbusinessmoneysum}}</div>
            </div>
            <div id="homePie" style="width: 100%;height:100%;"></div>
          </div>
        </module>
      </div>
    </div>
    <div class="business-bottom flexbetween">
      <div class="bottom-left">
        <module moudletitle='各学院项目商业化情况'>
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
                    <div>{{item.projectnum}}</div>
                  </td>
                  <td>
                    <div>{{item.projectbunessnum}}</div>
                  </td>
                  <td>
                    <div>{{item.projectbunessproportion}}</div>
                  </td>
                  <td>
                    <div>{{item.projectprocessnum0}}</div>
                  </td>
                  <td>
                    <div>{{item.projectprocessnum1}}</div>
                  </td>
                  <td>
                    <div>{{item.projectprocessnum2}}</div>
                  </td>
                  <td>
                    <div>{{item.projectprocessnum3}}</div>
                  </td>
                  <td>
                    <div>{{item.projectprocessnum4}}</div>
                  </td>
                  <td>
                    <div>{{item.projectprocessnum5}}</div>
                  </td>
                   <td>
                    <div>{{item.projectprocessnum6}}</div>
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
        <module moudletitle='项目商业化趋势'>
          <div class="business-money">
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
       /* {name:'公益创业',money:'326',number:'90'},
        {name:'公益创业',money:'326',number:'90'},
        {name:'公益创业',money:'326',number:'90'},
        {name:'公益创业',money:'326',number:'90'},
        {name:'公益创业',money:'326',number:'90'},
        {name:'公益创业',money:'326',number:'90'}*/
      ],
      ranklist2:[
       /* {processclassname:'移动互联网',projectnum:127},
        {processclassname:'云计算',projectnum:127},
        {processclassname:'大数据',projectnum:127},
        {processclassname:'人工智能',projectnum:127},
        {processclassname:'物联网',projectnum:127},
        {processclassname:'物联网',projectnum:127}*/
      ],
      ranklist2_1:[],
      ranklist2_2:[],
      projectsum:0,
      projectbusinessmoneysum:0,
      xdata:[/*'<1万','1万<x<10万','>10万'*/],
      ydata:[
      ],
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
      this.getProjectBusinessInvestmentProcessAnalysisList(this.year,this.collegeid,this.starttime,this.endtime);
      this.geDataAnalysisTradeProjectBusinessCompanyCount(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataAnalysisProjectBusinessAndProjectProcessList(this.year,this.collegeid,this.starttime,this.endtime,1);
      this.getDataAnalysisBusinessTitleList();
      this.getDataAnalysisProjectBusinessCompanyCount(this.year,this.collegeid,this.starttime,this.endtime);
      this.getDataAnalysisProjectBusinessAndProjectProcessTrendStatisticsCount(this.year,this.collegeid,this.starttime,this.endtime);
    },
    changepage(n,o){
      let bigDataPage = n;
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'businessanalyze_collegetable'){ //商业化-学院列表
          this.getDataAnalysisProjectBusinessAndProjectProcessList(this.year,this.collegeid,this.starttime,this.endtime,currentPage);
        };
      })
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.indexEchart()
    });
    var chartLine2 = echarts.init(document.getElementById("homePie"));
    var chartLine4 = echarts.init(document.getElementById("homeLine2"));
    window.onresize = ()=>{
      chartLine2.resize();
      chartLine4.resize();
    };
    this.getProjectBusinessInvestmentProcessAnalysisList(this.year,this.collegeid,this.starttime,this.endtime);
    this.geDataAnalysisTradeProjectBusinessCompanyCount(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataAnalysisProjectBusinessAndProjectProcessList(this.year,this.collegeid,this.starttime,this.endtime,1);
    this.getDataAnalysisBusinessTitleList();
    this.getDataAnalysisProjectBusinessCompanyCount(this.year,this.collegeid,this.starttime,this.endtime);
    this.getDataAnalysisProjectBusinessAndProjectProcessTrendStatisticsCount(this.year,this.collegeid,this.starttime,this.endtime);
  },

  methods: {
    //获取子组件传来的值
    getNew(e){
       this.getDataAnalysisProjectBusinessAndProjectProcessList(this.year,this.collegeid,this.starttime,this.endtime,e);
    },
     // 饼图
    indexEchart(){
      var chartLine = echarts.init(document.getElementById("homePie"));
      var data = this.xdata;
      var option = {
          title: [
          {
            show:false,
            text: "总注册资本: ",
            x: "20%",
            textStyle:{//标题内容的样式
              color:'#28deed',//京东红
              fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
              fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
              fontFamily:"san-serif",//主题文字字体，默认微软雅黑
              fontSize:14//主题文字字体大小，默认为18px
            },
          },
          {
            show:false,
            text: "196",
            x: "45%",
            textStyle:{//标题内容的样式
              color:'#fff000',//京东红
              fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
              fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
              fontFamily:"san-serif",//主题文字字体，默认微软雅黑
              fontSize:24//主题文字字体大小，默认为18px
            },
          },
        ],
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
            formatter:  function(name,value){
                var total = 0;
                var target;
                for (var i = 0, l = data.length; i < l; i++) {
                     total += data[i].value;
                if (data[i].name == name) {
                    target = data[i].value;
                    }
                }
                var arr = [
                    '{a|'+target+'个}',
                    '{b|'+name+'}',
                ]
                // return name + ' ' + ((target/total)*100).toFixed(2) + '%';
                return arr.join('\n')
            },
            textStyle:{
                rich:{  // 富文本设置
                    a:{
                        fontSize:14,
                        verticalAlign:'top',
                        align:'center',
                        color:'#fff' ,
                        padding:[0,0,8,0]
                    },
                    b:{
                        fontSize:12,
                        align:'center',
                        color:'#28deed' ,
                        padding:[0,10,0,0],
                        lineHeight:25
                    }
                }
            }
          },
          series: [
              {
                  name:'金额占比',
                  type:'pie',
                  radius: ['40%', '60%'], // 饼图大小
                  center: ['50%', '50%'], // 饼图位置
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
            data: this.ydata4
          },
        ]
      };
      chartLine.setOption(option);
    },
    // 获取各行业商业化项目数量
    geDataAnalysisTradeProjectBusinessCompanyCount(year,collegeid,starttime,endtime) {
     let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.geDataAnalysisTradeProjectBusinessCompanyCount({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	 this.ranklist2_1=[];
	        	 this.ranklist2_2=[];
	           var tradelist=response.data.data.tradelist;
	           this.projectsum=response.data.data.projectsum;
	           this.ranklist2_1=tradelist.slice(0,3);
	           this.ranklist2_2=tradelist.slice(3,6);
	         }
      	});
    },
    // 获取商业化各融资阶段项目数量
    getProjectBusinessInvestmentProcessAnalysisList(year,collegeid,starttime,endtime) {
     let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getProjectBusinessInvestmentProcessAnalysisList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	 this.ranklist2=[];
	           this.ranklist2=response.data.data.processclasslist;
	         }
      	});
    },
    // 获取组织各学院商业化化情况分析
    getDataAnalysisProjectBusinessAndProjectProcessList(year,collegeid,starttime,endtime,page) {
      let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectBusinessAndProjectProcessList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime,
			    page:page
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	this.tabledata=[];
	        	  var collegelist=response.data.data.collegelist;
	           this.totalpage=response.data.data.totalpage;
	           this.currentpage=response.data.data.page;
	           this.tabledata=collegelist;
	         }
      	});
    },
    // 获取项目商业化表格标题
    getDataAnalysisBusinessTitleList() {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisTitleList({
			     pageflag:6
			    }).then(response => {
	        if(response.data.result == 'success'){
	            this.titlelist = response.data.data.titlelist;
	            this.cols=[];
	            this.cols.push(
	              {prop: 'collegename', label: response.data.data.collegename},
	              );
	            this.cols.push(
	              {prop: 'projectsum', label: response.data.data.projectsum},
	              ); 
	            this.cols.push(
	              {prop: 'businessnum', label: response.data.data.businessnum},
	              ); 
	            this.cols.push(
	              {prop: 'businessproportion', label:response.data.data.businessproportion},
	              );
	              for(let i in this.titlelist){
	              this.cols.push({prop: 'projectprocessnum'+[i], label: this.titlelist[i].title});
	            };
	         }
      	});
    },
    // 获取项目商业化注册资金区间分析
    getDataAnalysisProjectBusinessCompanyCount(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectBusinessCompanyCount({
			     orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime
			    }).then(response => {
	        if(response.data.result == 'success'){
	        	this.xdata=[];
	        	this.ydata=[];
	        	var titlelist = response.data.data.projectbusinesspiechartlist;
	        	this.projectbusinessmoneysum= response.data.data.projectbusinessmoneysum;
	        	for(let i in titlelist){
	              this.xdata.push({name:titlelist[i].projectbusinesstitle,value:titlelist[i].projectbusinessprojectnum})
	              this.ydata.push({name:titlelist[i].projectbusinesstitle,value:titlelist[i].projectbusinessprojectnum})
	            };
	           this.$nextTick(()=>{
	              this.indexEchart()
	            })
	         }
      	});
    },
    //获取项目商业化趋势图信息
    getDataAnalysisProjectBusinessAndProjectProcessTrendStatisticsCount(year,collegeid,starttime,endtime) {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectBusinessAndProjectProcessTrendStatisticsCount({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    starttime:starttime,
			    endtime:endtime
			    }).then(response => {
	        if(response.data.result == 'success'){
	             this.xdata3 = [];
               this.ydata4 = [];
	            for (let i in response.data.data.projectlist) {
	              this.xdata3.push(response.data.data.projectlist[i].date);
	              this.ydata4.push(response.data.data.projectlist[i].projectbunessnum);
	            };
	            this.$nextTick(()=>{
	              this.indexEchart3()
	            })
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
  .business-top{
    .top-left{
      width: 3.3rem;
      height: 3.08rem;
      .business-distribution{
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
      .center-center{
        width: 2.95rem;
        height: 2.95rem;
        background: url('../../assets/backkground_num.png') no-repeat center;
        background-size:100% 100%; 
        .business-total{
          border: 1px solid #0090ff;
          background: #1b225b;
          border-radius: 10px;
          position: absolute;
          bottom: .6rem;
          width: .93rem;
          height: .26rem;
          line-height: .26rem;
        }
      }
      .business-bgc{
        width: .63rem;
        height: .64rem;
        background: url('../../assets/business.png') no-repeat center;
        background-size:100% 100%;
      }
    }
    .top-right{
      width: 3.68rem;
      height: 3.08rem;
      .business-space{
        width: 90%;
        height: 90%;
      }
    }
  }
  .business-bottom{
    .bottom-left{
      width: 7.14rem;
      height: 3.06rem;
    }
    .bottom-right{
      width: 5.3rem;
      height: 3.06rem;
      .business-money{
        width: 90%;
        height: 80%;
      }
    }
    
  }
</style>