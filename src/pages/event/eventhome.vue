<!--  -->
<template>
  <div class="flexbetween">
    <div class="event-left">
      <div class="left-top mb16rem flexbetween">
        <div class="top-left">
          <module moudletitle='赛事状态'>
            <div class="events-status">
              <div class="disflex">
                <div class="eventsall-left mr1rem">
                  <div class="deed rem14">进行中</div>
                  <div class="fff000 rem36 text-center tailfont">{{conductprojectgamenum}}</div>
                  <div class="rem14 fff">项目数: {{conductprojectnum}}个</div>
                </div>
                <ul class="eventsall-right">
                  <li class="flexcenter">
                    <div class="rem14 deed">校赛：</div>
                    <div class="rem18 fff000"> {{conductschoolprojectgamenum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="rem14 deed">院赛：</div>
                    <div class="rem18 fff000">{{conductcollegeprojectgamenum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="rem14 deed">课赛：</div>
                    <div class="rem18 fff000">{{conductteacherprojectgamenum}}</div>
                  </li>
                </ul>
              </div>
              <div class="disflex">
                <div class="eventsall-left mr1rem">
                  <div class="deed rem14">已完成</div>
                  <div class="fff000 rem36 text-center tailfont">{{endprojectgamenum}}</div>
                  <div class="rem14 fff">项目数: {{endprojectnum}}个</div>
                </div>
                <ul class="eventsall-right">
                  <li class="flexcenter">
                    <div class="rem14 deed">校赛： </div>
                    <div class="rem18 fff000">{{endschoolprojectgamenum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="rem14 deed">院赛： </div>
                    <div class="rem18 fff000">{{endcollegeprojectgamenum}}</div>
                  </li>
                  <li class="flexcenter">
                    <div class="rem14 deed">课赛：</div>
                    <div class="rem18 fff000">{{endteacherprojectgamenum}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </module>
        </div>
        <div class="top-right">
          <module moudletitle='赛事总览'>
            <div class="wh100-per">
              <div class="right-top flexbetween">
                <div class="boxbgc">
                  <div class="sonbgc rem16 deed text-center mb12rem">校赛</div>
                  <div class="disflex">
                    <div class="flex1 text-center">
                      <div class="rem16 deed">校赛数量</div>
                      <div class="rem24 fff000">{{schoolprojectgamenum}}</div>
                    </div>
                    <div class="flex1 text-center">
                      <div class="rem16 deed">参赛项目</div>
                      <div class="rem24 fff000">{{schoolprojectnum}}</div>
                    </div>
                  </div>
                </div>
                <div class="boxbgc">
                  <div class="sonbgc rem16 deed text-center mb12rem">院赛</div>
                  <div class="disflex">
                    <div class="flex1 text-center">
                      <div class="rem16 deed">院赛数量</div>
                      <div class="rem24 fff000">{{collegeprojectgamenum}}</div>
                    </div>
                    <div class="flex1 text-center">
                      <div class="rem16 deed">参赛项目</div>
                      <div class="rem24 fff000">{{collegeprojectnum}}</div>
                    </div>
                  </div>
                </div>
                <div class="boxbgc">
                  <div class="sonbgc rem16 deed text-center mb12rem">课赛</div>
                  <div class="disflex">
                    <div class="flex1 text-center">
                      <div class="rem16 deed">课赛数量</div>
                      <div class="rem24 fff000">{{teacherprojectgamenum}}</div>
                    </div>
                    <div class="flex1 text-center">
                      <div class="rem16 deed">参赛项目</div>
                      <div class="rem24 fff000">{{teacherprojectnum}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-bottom disflex w100-per">
                <div class="sonsize" v-for='(item,index) in yearlist' :key='item.id'>
                  <echartspie :idname='"index"+Number(index+1)' :xdata='xyearlistdata' :ydata='item.projectgamelist' :year='item.year' :resize="resize" ></echartspie>
                </div>
               <!-- <div class="sonsize">
                  <echartspie idname='index2' :xdata='xdata' :ydata='ydata' :year='2017' :resize="resize"></echartspie>
                </div>
                <div class="sonsize">
                  <echartspie idname='index3' :xdata='xdata' :ydata='ydata' :year='2018' :resize="resize"></echartspie>
                </div>-->
              </div>
            </div>
          </module>
        </div>
      </div>
      <div class="left-bottom flexbetween">
        <div class="left-bottom-left">
          <module moudletitle='各类赛事占比'>
            <div id="homePie" style="width: 100%;height:100%;"></div>
          </module>
        </div>
        <div class="left-bottom-right">
          <module moudletitle='各赛事参赛项目数'>
            <div class="wh100-per">
              <table class="mrauto mt26rem">
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
                      <div>{{item.projectgamename}}</div>
                    </td>
                    <td>
                      <div>{{item.sysgamename}}</div>
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
               <div class="bignodata" v-if="tabledata.length == 0">暂无数据</div>
            </div>
            <pagesort :allpage="allPage" :currentpage="currentPage" @newpage='getNew'></pagesort>
          </module>
        </div>
      </div>
    </div>
    <div class="event-right">
      <module moudletitle='评委'>
        <div class="wh100-per flexmiddle flexdirection">
          <div class="right-top">
            <ul>
              <li class="flexend flexmiddle">
                <div class="fff">
                  <div>评委</div>
                  <div>数量</div>
                </div>
                <div class="small-moudle">{{allraternum[4]}}</div>
                <div class="small-moudle">{{allraternum[3]}}</div>
                <div class="small-moudle">{{allraternum[2]}}</div>
                <div class="small-moudle">{{allraternum[1]}}</div>
                <div class="small-moudle">{{allraternum[0]}}</div>
                <div class="ml06rem rem12 deed">
                  人
                </div>
              </li>
            </ul>
          </div>
          <div class="right-center relative">
            <div class="top-name rem16 fff">企业评委</div>
            <div class="center-name rem16 fff">教师评委</div>
            <div class="bottom-name rem16 fff">学生评委</div>
            <div class="center-top rem36 fff000 tailfont5">{{enterpriseraternum}}</div>
            <div class="center-center rem36 fff000 tailfont5">{{teacherraternum}}</div>
            <div class="center-bottom rem36 fff000 tailfont5">{{studentraternum}}</div>
          </div>
          <div class="right-bottom text-center">
            <div class="rem16 deed mb20rem">评委头像</div>
            <ul class="flexcenteraround">
              <li class="flex1" v-for='(item,index) in raterlist' :key='item.id'>
                <div class="judgeimg">
                  <img :src='item.userimage' alt="">
                </div>
                <div class="rem16 deed">{{item.ratername}}</div>
              </li>
            </ul>
          </div>
        </div>
      </module>
    </div>
    
  </div>
</template>

<script>
import echarts from "echarts";
import module from '../../components/module.vue';
import pagesort from '../../components/pagesort.vue'
import echartspie from '../../components/echartspie.vue';
export default {
  data () {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      year:0,
      collegeid:0,
      starttime:'',
      endtime:'',
      sysgameid:0,
      allraternum:[0,0,0,0,0],//评委数量
      xdata:[/*'校赛','院赛','课赛'*/],
      ydata:[
        /*{name:'校赛',value:1},
        {name:'院赛',value:100000},
        {name:'课赛',value:10000}*/
      ],
      xyearlistdata:['校赛','院赛','课赛'],
      yyearlistdata:[],
      raternum:0,
      enterpriseraternum:0,
      teacherraternum:0,
      studentraternum:0,
      raterlist:[],
      resize:false,
      allPage: 10, //总页数
      currentPage: 1, //当前页数
      titlelist:[],
      cols:[
            {prop: 'projectgamename', label: '赛事名称'},
            {prop: 'sysgamename', label:'基础赛事类别'},
            {prop: 'projectnum', label:'参赛项目数'},
            {prop: 'collegename', label:'参赛最多学院'}],
      tabledata:[],
      conductprojectgamenum:0,//正在进行的赛事数
      conductprojectnum:0,//正在进行项目数
      conductschoolprojectgamenum:0,//正在进行的校赛
      conductcollegeprojectgamenum:0,//正在进行的院赛
      conductteacherprojectgamenum:0,//正在进行的课赛
      endprojectgamenum:0,//已经结束的赛事数
      endprojectnum:0,//已经结束的项目数
      endschoolprojectgamenum:0,//已经结束的校赛赛事数
      endcollegeprojectgamenum:0,//已经结束的院赛赛事数
      endteacherprojectgamenum:0,//已经结束的课赛赛事数
      collegeprojectgamenum:0,//院赛数
      collegeprojectnum:0,//院赛项目数
      schoolprojectgamenum:0,//校赛数
      schoolprojectnum:0,//校赛项目数
      teacherprojectgamenum:0,//课赛数
      teacherprojectnum:0,//课赛项目数
      yearlist:[],
      htmlfont:0
    };
  },

  components: {
    echartspie,
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
      this.sysgameid = bigDataQuery.gameId;
      this.getDataAnalysisProjectGameChartPieList(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
      this.getDataAnalysisProjectGameState(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
      this.getDataAnalysisProjectGameOverview(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
      this.getDataAnalysisProjectGameProjectReview(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid,1);
      this.getDataAnalysisProjectGameRaterList(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
    },
    changepage(n,o){
      let bigDataPage = n;
      let tableSort = bigDataPage.tableSort;
      let currentPage = bigDataPage.currentPage;
      this.$nextTick(()=>{
        if(tableSort == 'eventhome_projectgametable'){ //赛事-赛事列表
          this.getDataAnalysisProjectGameProjectReview(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid,currentPage);
        };
      });
    }
  },
  mounted(){
    var htmlfont = document.documentElement.style.fontSize;
    this.$nextTick(()=>{
      this.indexEchart()
    });
    window.onresize = ()=>{
      this.resize = !this.resize;
      var chartLine = echarts.init(document.getElementById('homePie'));
      chartLine.resize();
      this.indexEchart(); // 重置echarts字体
    };
    this.indexEchart();
    this.getDataAnalysisProjectGameChartPieList(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
    this.getDataAnalysisProjectGameState(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
    this.getDataAnalysisProjectGameOverview(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
    this.getDataAnalysisProjectGameProjectReview(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid,1);
    this.getDataAnalysisProjectGameRaterList(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid);
  },

  methods: {
    //获取子组件传来的值
    getNew(e){
       this.getDataAnalysisProjectGameProjectReview(this.year,this.collegeid,this.starttime,this.endtime,this.sysgameid,e);
    },
    // 赛事分析总览页-进行中赛事分析（赛事数量，项目数量，校赛数、院赛数、课赛数）、已结束赛事分析（赛事数量，项目数量，校赛数、院赛数、课赛数）
    getDataAnalysisProjectGameState(year,collegeid,starttime,endtime,sysgameid){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectGameState({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    sysgameid:sysgameid,
			    starttime:starttime,
			    endtime:endtime
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	   this.conductprojectgamenum=response.data.data.conductprojectgamenum;
	        	   this.conductprojectnum=response.data.data.conductprojectnum;
	        	   this.conductschoolprojectgamenum=response.data.data.conductschoolprojectgamenum;
	        	   this.conductcollegeprojectgamenum=response.data.data.conductcollegeprojectgamenum;
	        	   this.conductteacherprojectgamenum=response.data.data.conductteacherprojectgamenum;
	        	   this.endprojectgamenum=response.data.data.endprojectgamenum;
	        	   this.endprojectnum=response.data.data.endprojectnum;
	        	   this.endschoolprojectgamenum=response.data.data.endschoolprojectgamenum;
	        	   this.endcollegeprojectgamenum=response.data.data.endcollegeprojectgamenum;
	        	   this.endteacherprojectgamenum=response.data.data.endteacherprojectgamenum
	         }
      	});
    },
    //赛事分析总览页-赛事总览区域数据(校/院/课赛数，参赛项目数以及每年的校/院/课数量)
     getDataAnalysisProjectGameOverview(year,collegeid,starttime,endtime,sysgameid){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectGameOverview({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    sysgameid:sysgameid,
			    starttime:starttime,
			    endtime:endtime
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	   this.yearlist=[];
	        	   this.collegeprojectgamenum=response.data.data.collegeprojectgamenum;
	        	   this.collegeprojectnum=response.data.data.collegeprojectnum;
	        	   this.schoolprojectgamenum=response.data.data.schoolprojectgamenum
	        	   this.schoolprojectnum=response.data.data.schoolprojectnum;
	        	   this.teacherprojectgamenum=response.data.data.teacherprojectgamenum;
	        	   this.teacherprojectnum=response.data.data.teacherprojectnum;
	        	   this.yearlist=response.data.data.yearlist;
	         }
      	});
    },
    //各类基础赛赛事数统计
    getDataAnalysisProjectGameChartPieList(year,collegeid,starttime,endtime,sysgameid){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectGameChartPieList({
			    orgid:orgId,
			    year:year,
			    collegeid:collegeid,
			    sysgameid:sysgameid,
			    starttime:starttime,
			    endtime:endtime
		      }).then(response => {
	        if(response.data.result == 'success'){
    	       var projectgamelist=response.data.data;
    	       this.xdata=[];
    	       this.ydata=[];
	        	   for(let i in projectgamelist){
	        	   	   var gamename=projectgamelist[i].gamename;
	        	   	   if(gamename.length>6){
	        	   	   	  gamename=gamename.substring(0,6)+"...";
	        	   	   }
	        	   	   this.xdata.push(gamename);
				           this.ydata.push({name:gamename,value:projectgamelist[i].num});
	        	   }
    	        this.$nextTick(()=>{
              this.indexEchart()
              });
	         }
      	});
    },
    //赛事分析总览页-返回各赛事参赛项目一览表
    getDataAnalysisProjectGameProjectReview(year,collegeid,starttime,endtime,sysgameid,page){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectGameProjectReview({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    sysgameid:sysgameid,
			    page:page,
			    starttime:starttime,
			    endtime:endtime
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	   this.tabledata=[];
	        	   this.currentPage=response.data.data.page;
	        	   this.allPage=response.data.data.totalpage;
	        	   var projectgamelist=response.data.data.projectgamelist;
	        	   this.tabledata=projectgamelist;
	         }
      	});
    },
    //赛事评委分析
    getDataAnalysisProjectGameRaterList(year,collegeid,starttime,endtime,sysgameid){
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		  this.$api.getDataAnalysisProjectGameRaterList({
			    orgid:orgId,
			    year: year,
			    collegeid:collegeid,
			    sysgameid:sysgameid,
			    starttime:starttime,
			    endtime:endtime
		      }).then(response => {
	        if(response.data.result == 'success'){
	        	   this.raterlist=[];
	        	   this.enterpriseraternum=response.data.data.enterpriseraternum;
	        	   this.raternum=response.data.data.raternum;
	        	   this.studentraternum=response.data.data.studentraternum;
	        	   this.teacherraternum=response.data.data.teacherraternum;
	        	   this.raterlist=response.data.data.raterlist;
	        	   this.allraternum =[];
	        	   for(var i = 1;i<= 5;i++){
									var denominator = Math.pow(10,i);
									var denominator2 = Math.pow(10,i-1);
									this.allraternum.push( parseInt((response.data.data.raternum % denominator)/denominator2));
				       }
	         }
      	});
    },
    // 饼图
    indexEchart(){
      var chartLine = echarts.init(document.getElementById('homePie'));
      var data = this.ydata;
      var htmlfont = document.documentElement.style.fontSize;
      this.htmlfont = htmlfont.slice(0,htmlfont.indexOf('p'))/100;
      var fontbig = this.htmlfont*18;
      var fontsmall = this.htmlfont*14;
      var option = {
          title: [
            {
              show:false,
              text: "",
              x: "20%",
              textStyle:{//标题内容的样式
                color:'#28deed',//京东红
                fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
                fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                fontFamily:"san-serif",//主题文字字体，默认微软雅黑
                fontSize:14//主题文字字体大小，默认为18px
              },
            },
          ],
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: ({d}%)"
          },
          legend: {
            orient:'vertical',
            x:'60%',
            y:'center',
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
                    '{b|'+name+':}',
                    '{a|'+target+'}',
                ]
                // return name + ' ' + ((target/total)*100).toFixed(2) + '%';
                return arr.join()
            },
            textStyle:{
                rich:{  // 富文本设置
                    a:{
                        fontSize:fontbig,
                        align:'center',
                        color:'#fff000' ,
                        padding:[0,0,0,0]
                    },
                    b:{
                        fontSize:fontsmall,
                        align:'center',
                        color:'#28deed' ,
                        padding:[0,5,0,0],
                        lineHeight:20
                    }
                }
            }
          },
          graphic: [{　　　//环形图中间添加文字
            type: 'text',　//通过不同top值可以设置上下显示
            left: '12%',　　　　　　　　　　
            top: 'center',
            style: {
              text: '',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 16,
            },
                  
          }
        ],
        series: [
            {
                name:'',
                type:'pie',
                radius: ['40%', '60%'], // 饼图大小
                center: ['30%', '50%'], // 饼图位置
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
  }
}

</script>
<style lang='less' scoped>
  .event-left{
    width: 9.28rem;
    height: 3.08rem;
    .left-top{
      .top-left{
        width: 2.99rem;
        height: 3.08rem;
        .events-status{
          >div:nth-child(1){
            margin-bottom: .36rem
          }
        }
      }
      .top-right{
        width: 6.16rem;
        height: 3.08rem;
        .right-top{
          padding: .32rem .2rem .2rem;
          .boxbgc{
            width: 1.86rem;
            height:1.42rem;
            background: url('../../assets/background_game.png') no-repeat center;
            background-size:100% 100%; 
            .sonbgc{
              width: 100%;
              height:.51rem;
              line-height: .51rem;
              background: url('../../assets/triangle_left.png') no-repeat 20%  center,
                          url('../../assets/triangle_right.png') no-repeat 80% center;
            }
          }
        }
        .sonsize{
          width: 33.33%;
          height:1.1rem
        }
      }
    }
    .left-bottom{
      .left-bottom-left{
        width:3.82rem;
        height: 3.08rem;
      }
      .left-bottom-right{
        width:5.36rem;
        height: 3.08rem;
      }
    }
  }
  .event-right{
    width:3.12rem;
    height: 6.32rem;
    .right-top{
      .small-moudle{
          background: url('../../assets/shape.png') no-repeat center;
          background-size: 100% 100%;
          width: .29rem;
          height: .45rem;
          line-height: .45rem;
          margin-left: .06rem;
          color: #fff000;
          font-size: .39rem;
          font-weight: bold;
          text-align: center
        }
    }
    .right-center{
      width: 1.84rem;
      height:2.62rem;
      background: url('../../assets/pingwei.png') no-repeat center;
      background-size:100% 100%; 
      margin: .32rem auto;
      .top-name{
        position: absolute;
        top: .6rem;
        left: .4rem;
      }
      .center-name{
        position: absolute;
        top: 1.4rem;
        left: .85rem;
      }
      .bottom-name{
        position: absolute;
        bottom: .2rem;
        left: .4rem;
      }
      .center-top{
        position: absolute;
        left: 1.4rem;
        top: .2rem;
      }
      .center-center{
        position: absolute;
        right: 1.3rem;
        top: .92rem;
      }
      .center-bottom{
        position: absolute;
        left: 1.4rem;
        bottom: .2rem;
      }
    }
    .right-bottom{
      .judgeimg{
        width: .76rem;
        height: .76rem;
        border-radius: 50%;
        margin: auto;
        img{
          border-radius: 50%;
        }
      }
    }
    
  }
</style>