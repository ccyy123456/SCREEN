<template>
	<div>
    <div class="overview-top mb16rem">
      <div class="top-left">
        <div class="demand mb16rem">
          <module moudletitle='需求'>
            <ul class="transcenter demand-ul">
              <li class="clearfloat mb3rem">
                <div class="fl linenomal">
                  <div>校内</div>
                  <div>需求</div>
                </div>
                <div class="small-moudle fl">{{thisorgreleaserequirementnum[4]}}</div>
                <div class="small-moudle fl">{{thisorgreleaserequirementnum[3]}}</div>
                <div class="small-moudle fl">{{thisorgreleaserequirementnum[2]}}</div>
                <div class="small-moudle fl">{{thisorgreleaserequirementnum[1]}}</div>
                <div class="small-moudle fl">{{thisorgreleaserequirementnum[0]}}</div>
                <div class="fl ml06rem">
                  <div class="linenomal rem12 deed">个</div>
                </div>
              </li>
              <li class="clearfloat">
                <div class="fl linenomal">
                  <div>校外</div>
                  <div>需求</div>
                </div>
                <div class="small-moudle fl">{{thisorgreceiverequirementnum[4]}}</div>
                <div class="small-moudle fl">{{thisorgreceiverequirementnum[3]}}</div>
                <div class="small-moudle fl">{{thisorgreceiverequirementnum[2]}}</div>
                <div class="small-moudle fl">{{thisorgreceiverequirementnum[1]}}</div>
                <div class="small-moudle fl">{{thisorgreceiverequirementnum[0]}}</div>
                <div class="fl ml06rem">
                  <div class="linenomal rem12 deed">个</div>
                </div>
              </li>
            </ul>
          </module>
        </div>
        <div class="clearfloat">
          <div class="fl people">
            <module moudletitle='学生'>
              <div class="distabcell">
                <div class="rem14 deed">学生</div>
                <div class="rem30 fff000">{{studentnum}}</div>
                <div class="people-bgc student"></div>
              </div>
            </module>
          </div>
          <div class="fr people">
            <module moudletitle='企业专家'>
              <div class="distabcell people-ul">
                <div class="rem14 deed">企业专家</div>
                <div class="rem30 fff000">{{companywismannum}}</div>
                <div class="people-bgc enterpriser"></div>
              </div>
            </module>
          </div>
        </div>
      </div>
      <div class="top-center">
        <module moudletitle='项目'>
          <div class="plr36 flexcenter text-center">
            <div class="project-left">
              <div class="rem14 deed">项目总数</div>
              <div class="rem36 fff000">{{allprojectnum}}</div>
            </div>
            <div class="project-right">
              <div class="right-top clearfloat distabcell">
                <div class="fr mr4rem">
                  <div class="rem14 deed">最近项目</div>
                  <div class="rem22 fff000">{{latelyprojectnum}}</div>
                </div>
                <div class="fr mr4rem">
                  <div class="rem14 deed">历史项目</div>
                  <div class="rem22 fff000">{{historyprojectnum}}</div>
                </div>
              </div>
              <div class="right-bottom">
                <div id="homeLine" style="width: 100%;height:100%;"></div>
              </div>
            </div>
          </div>
          </module>
      </div>
      <div class="top-right">
        <div class="demand mb16rem">
          <module moudletitle='赛事'>
            <ul class="transcenter demand-ul">
              <li class="clearfloat mb12rem">
                <div class="fl">校赛</div>
                <div class="small-moudle fl">{{orgprojedtgamenum[4]}}</div>
                <div class="small-moudle fl">{{orgprojedtgamenum[3]}}</div>
                <div class="small-moudle fl">{{orgprojedtgamenum[2]}}</div>
                <div class="small-moudle fl">{{orgprojedtgamenum[1]}}</div>
                <div class="small-moudle fl">{{orgprojedtgamenum[0]}}</div>
                <div class="fl ml06rem">
                  <div class="linenomal rem12 deed">个</div>
                </div>
              </li>
              <li class="clearfloat mb12rem">
                <div class="fl">院赛</div>
                <div class="small-moudle fl">{{collegeprojectgamenum[4]}}</div>
                <div class="small-moudle fl">{{collegeprojectgamenum[3]}}</div>
                <div class="small-moudle fl">{{collegeprojectgamenum[2]}}</div>
                <div class="small-moudle fl">{{collegeprojectgamenum[1]}}</div>
                <div class="small-moudle fl">{{collegeprojectgamenum[0]}}</div>
                <div class="fl ml06rem">
                  <div class="linenomal rem12 deed">个</div>
                </div>
              </li>
              <li class="clearfloat">
                <div class="fl">课赛</div>
                <div class="small-moudle fl">{{classprojectgamenum[4]}}</div>
                <div class="small-moudle fl">{{classprojectgamenum[3]}}</div>
                <div class="small-moudle fl">{{classprojectgamenum[2]}}</div>
                <div class="small-moudle fl">{{classprojectgamenum[1]}}</div>
                <div class="small-moudle fl">{{classprojectgamenum[0]}}</div>
                <div class="fl ml06rem">
                  <div class="linenomal rem12 deed">个</div>
                </div>
              </li>
            </ul>
          </module>
        </div>
        <div class="clearfloat">
          <div class="fl people">
            <module moudletitle='评委'>
              <div class="transcenmid">
                <div class="rem14 deed">评委</div>
                <div class="rem30 fff000">{{raternum}}</div>
                <div class="people-bgc judge"></div>
              </div>
            </module>
          </div>
          <div class="fr people">
            <module moudletitle='老师'>
              <div class="transcenmid people-ul">
                <div class="rem14 deed">老师</div>
                <div class="rem30 fff000">{{wismannum}}</div>
                <div class="people-bgc teacher"></div>
              </div>
            </module>
          </div>
        </div>
      </div>
    </div>
    <div class="overview-bottom">
      <div class="rank">
        <module moudletitle='前三排名'>
          <ul class="one-box">
            <li class="one-rank" v-for='topdata in topthreedata' :key='topdata.id'>
              <div class="one-left mr1rem rem12 fff">{{topdata.name}}</div>
              <div class="one-right" >
                <div ref='rank' class="rankbgc mr1rem transition"></div>
                <div class="deed rem14">{{topdata.value}}</div>
              </div>
            </li>
          </ul>
        </module>
      </div>
      <div class="space">
        <module moudletitle='孵化空间'>
          <div class="one-box">
              <div class="space-left">
                <div id="homeLine2" style="width: 100%;height:100%;"></div>
              </div>
              <div class="space-right">
                <ul>
                  <li class="space-bgc">
                    <div class="right-top fff rem12">孵化楼数</div>
                    <div class="right-bottom rem14 deed">{{buildingnum}}幢</div>
                  </li>
                  <li class="space-bgc">
                    <div class="right-top fff rem12">孵化房间数</div>
                    <div class="right-bottom rem14 deed">{{roomnum}}间</div>
                  </li>
                  <li class="space-bgc">
                    <div class="right-top fff rem12">孵化工位数</div>
                    <div class="right-bottom rem14 deed">{{workstationnum}}个</div>
                  </li>
                </ul>
              </div>
          </div>
        </module>
      </div>
      <div class="teach">
        <module moudletitle='教学'>
          <div class="one-box">
            <div class="left-name">在线课</div>
            <div class="teach-left rem22 fff000">{{coursenum}}</div>
            <div class="right-name">实践课</div>
            <div class="teach-right rem22 fff000">{{basiccourselivenum}}</div>
            <div class="bottom-name">授课数</div>
            <div class="teach-bottom rem22 fff000">{{courselivenum}}</div>
          </div>
        </module>
      </div>
    </div>
	</div>
</template>

<script>
import module from '../../components/module.vue'
import echarts from "echarts";
export default {
  data() {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      xdata: [],
      yAdata: [],
      thisorgreleaserequirementnum:[0,0,0,0,0],//校内需求数量
      thisorgreceiverequirementnum:[0,0,0,0,0],//校外需求数量
      studentnum:0,//学生数量
      companywismannum:0,//企业专家数量
      allprojectnum:0,//项目总数
      historyprojectnum:0,//历史项目数量
      latelyprojectnum:0,//最近项目数量
      orgprojedtgamenum:[0,0,0,0,0],//校赛数量
      collegeprojectgamenum:[0,0,0,0,0],//院赛数量
      classprojectgamenum:[0,0,0,0,0],//课赛数量
      raternum:0,//评委数量
      wismannum:0,//老师数量
      buildingnum:0,//孵化楼数
      allarea:300,//孵化总面积
      usedarea:0,//使用的面积数
      roomnum:0,//房间数
      workstationnum:0,//工位数
      coursenum:0,//在线课数量
      basiccourselivenum:0,//实践课数量
      courselivenum:0,//授课数
      utilizationrate:0,//孵化空间使用率
      topthreedata:[]
    };
  },
  components:{
    module,
  },
  mounted() {
    this.getProjectTrendStatistics();
    this.getOverviewData();
    this.getTopThreeData()
    var chartLine = echarts.init(document.getElementById("homeLine"));
    var chartLine2 = echarts.init(document.getElementById("homeLine2"));
    window.onresize = ()=>{
      chartLine.resize();
      chartLine2.resize();
    }
  },
  watch: {
    
  },
  methods: {
    // 项目趋势图
    indexEchart() {
      var chartLine = echarts.init(document.getElementById("homeLine"));
      var option = {
        title: {
          text: "项目增长趋势图",
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
          top: 30,
          bottom: 50,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
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
                    fontSize:12,
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
            data: this.yAdata
          },
        ]
      };
      chartLine.setOption(option);
    },
    // 趋势图
    indexEchart2() {
      var allarea = 100;
      var ur = this.utilizationrate;
      if(0 != this.allarea){
      	allarea = this.allarea;
      }
      var chartLine = echarts.init(document.getElementById("homeLine2"));
      var colors = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          offset: 0,
          color: '#d6a614'
      },{
          offset: 1,
          color: '#24c8d6'
      }]);
      var usedarea = this.usedarea;
      // //console.log(allarea,usedarea)
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
                radius: "100%", //仪表大小
                center: ["50%", "60%"], //仪表位置
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
                          offsetCenter: [0, "70%"],
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
    //获取项目趋势图信息
    getProjectTrendStatistics() {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getProjectTrendStatistics({
			orgid:orgId}).then(response => {
	        if(response.data.result == 'success'){
	          	this.xdata = []
	            this.yAdata = []
	            for (let i in response.data.data.projectlist) {
	              this.xdata.push(response.data.data.projectlist[i].date);
	              this.yAdata.push(response.data.data.projectlist[i].projectnum);
	            };
	            this.$nextTick(()=>{
	              this.indexEchart();
//	              this.indexEchart2()
	            })
	        }
      	});
    },
    //获取大屏数据
    getOverviewData() {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getOverviewData({
			orgid:orgId}).then(response => {
	        if(response.data.result == 'success'){
	        	
	        	//console.log(response.data.data);
	        	
	          	this.thisorgreleaserequirementnum =[];
	          	this.thisorgreceiverequirementnum = [];
	          	this.orgprojedtgamenum = [];
	          	this.collegeprojectgamenum = [];
	          	this.classprojectgamenum = [];
				for(var i = 1;i<= 5;i++){
					var denominator = Math.pow(10,i);
					var denominator2 = Math.pow(10,i-1);
					this.thisorgreleaserequirementnum.push( parseInt((response.data.data.thisorgreleaserequirementnum % denominator)/denominator2));
					this.thisorgreceiverequirementnum.push( parseInt((response.data.data.thisorgreceiverequirementnum % denominator)/denominator2));
					
					this.orgprojedtgamenum.push( parseInt((response.data.data.orgprojedtgamenum % denominator)/denominator2));
					this.collegeprojectgamenum.push( parseInt((response.data.data.collegeprojectgamenum % denominator)/denominator2));
					this.classprojectgamenum.push( parseInt((response.data.data.classprojectgamenum % denominator)/denominator2));
				}
	          	this.studentnum = response.data.data.studentnum
	          	this.companywismannum = response.data.data.companywismannum
	          	this.allprojectnum = response.data.data.allprojectnum
	          	this.historyprojectnum = response.data.data.historyprojectnum
	          	this.latelyprojectnum = response.data.data.latelyprojectnum
	          	this.raternum = response.data.data.raternum
	          	this.wismannum = response.data.data.wismannum
	          	this.buildingnum = response.data.data.buildingnum
	          	this.allarea = response.data.data.allarea
	          	this.usedarea = response.data.data.usedarea
	          	this.roomnum = response.data.data.roomnum
	          	this.workstationnum = response.data.data.workstationnum
	          	this.coursenum = response.data.data.coursenum
	          	this.basiccourselivenum = response.data.data.basiccourselivenum
	          	this.courselivenum = response.data.data.courselivenum
	          	if(0 != this.allarea){
	          		this.utilizationrate = (this.usedarea/this.allarea).toFixed(2);
	          	}
	          	
//	          	this.$nextTick(()=>{
	              this.indexEchart2()
//	            })
	          }
      	});
    },
    //获取学院项目数前三的数据
    getTopThreeData() {
    	let orgId = Base64.decode(localStorage.getItem("tzq_org_orgid"));
		this.$api.getTopThreeData({
			orgid:orgId,
          	year:0,
          	collegeid:0,
          	tradeid:0,
          	page:1,
          	starttime:"",
          	endtime:""}).then(response => {
	        if(response.data.result == 'success'){
            
	          	this.topthreedata = [];
	          	var denominator = 100;
	          	if(response.data.data.collegelist.length >=1){
	          		denominator = response.data.data.collegelist[0].num;
	          	}
	          	if(response.data.data.collegelist.length > 3){
	          		for(var i = 0;i < 3; i++){
	          			var dataWidth = (response.data.data.collegelist[i].num/denominator).toFixed(2)*100;
                  var s = dataWidth+"%";
                  
	          			this.topthreedata.push(
			                {name: response.data.data.collegelist[i].collegename, value: response.data.data.collegelist[i].num,datawidth:s}		                
			              )
	          		}
	          	}else if(response.data.data.collegelist.length >=1){
	          		for(var i = 0;i < response.data.data.collegelist.length; i++){
	          			var dataWidth = (response.data.data.collegelist[i].num/denominator).toFixed(2)*100;
	          			var s = dataWidth+"%";
	          			this.topthreedata.push(
			                {name: response.data.data.collegelist[i].collegename, value: response.data.data.collegelist[i].num,datawidth:s}		                
			              )
	          		}
              };
              //加载动画
              this.$nextTick(()=>{
                for(let i=0;i<this.$refs.rank.length;i++){
                  this.$refs.rank[i].style.width = '0%';
                  setTimeout(()=>{
                    this.$refs.rank[i].style.width = this.topthreedata[i].datawidth
                  },10)
                }
              });
	          }
      	});
    },
  }
};
</script>

<style lang='less' scoped>
  .overview-top{
    display: flex;
    justify-content: space-between;
    .top-left,.top-right{
      .demand{
        width: 2.75rem;
        height: 2rem;
        color: #fff;
        font-size: .14rem;
        .small-moudle{
          background: url('../../assets/shape.png') no-repeat center;
          background-size: 100% 100%;
          width: .29rem;
          height: .45rem;
          margin-left: .06rem;
          color: #fff000;
          font-size: .39rem;
          font-weight: bold;
          text-align: center
        }
        .demand-ul{
          padding-left: .2rem;
          li{
            line-height: .45rem;
          }
        }
      }
      .people{
        width: 1.31rem;
        height: 1.7rem;
        text-align: center;
        .people-bgc{
          width: .46rem;
          height: .46rem;
          background-size: 100% 100%;
          border-radius: 50%;
          margin: auto
        }
        .student{
          background: url('../../assets/icon_student.png') no-repeat center;
        }
        .enterpriser{
          background: url('../../assets/icon_enterpriseexpert.png') no-repeat center;
        }
        .judge{
          background: url('../../assets/icon_judges.png') no-repeat center;
        }
        .teacher{
          background: url('../../assets/icon_teacher.png') no-repeat center;
        }
      }
    }
    .top-center{
      width: 6.74rem;
      height: 3.86rem;
      .project-left{
        width: 2.59rem;
        height: 2.33rem;
        background: url('../../assets/xiangmu.png') no-repeat center;
        background-size: 100% 100%;
      }
      .project-right{
        .right-top{
          width: 3.06rem;
          height: .84rem;
          margin-left: .32rem;
          background: url('../../assets/xiangmu2.png') no-repeat center;
          background-size: 100% 100%;
        }
        .right-bottom{
          width: 3.06rem;
          height: 1.65rem;
        }
      }
    }
  }
  .overview-bottom{
    display: flex;
    justify-content: space-between;
    >div{
      width: 4.08rem;
      height:2.28rem; 
    }
    .rank{
      .one-box{
        padding: .14rem;
        .one-rank{
          display: flex;
          margin-bottom: .26rem;
          .one-left{
            width: .93rem;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .one-right{
            display: flex;
            width: 2.11rem;
            height: .28rem;
            .rankbgc{
              background-image: linear-gradient(to right,#1ca9b5,#57198a);
            }
          }
        };
        .one-rank:nth-last-child(1){
          margin-bottom: 0
        };
      }
    }
    .space{
      .one-box{
         display: flex;
        .space-left{
          width: 1.65rem;
          height: 1.45rem;
          margin-right: .52rem;
        }
        .space-right{
          .space-bgc{
            width: 1.1rem;
            height: .43rem;
            background: url('../../assets/incubation.png') no-repeat center;
            background-size: 100% 100%;
            margin-bottom: .12rem;
            text-align: center
          }
        }
      }
    }
    .teach{
      .one-box{
        width: 2.85rem;
        height:1.8rem;
        background: url('../../assets/background_teach.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        .left-name{
          position: absolute;
          top: .58rem;
          left: .75rem;
          color: #fff;
          font-size: .14rem;
        }
        .teach-left{
          position: absolute;
          top: 0.3rem;
          right: 2.7rem;
          &:after{
            content: ' 门';
            font-size: .13rem;
            position: absolute;
            bottom: .05rem;
            margin-left: .03rem;
            color: #28deed
          }
        }
        .right-name{
          position: absolute;
          top: .58rem;
          left: 1.65rem;
          color: #fff;
          font-size: .14rem;
        }
        .teach-right{
          position: absolute;
          top: .3rem;
          left: 2.7rem;
          &:after{
            content: ' 门';
            font-size: .13rem;
            position: absolute;
            bottom: .05rem;
            margin-left: .03rem;
            color: #28deed
          }
        }
        .bottom-name{
          position: absolute;
          top: 1.32rem;
          left: 1.22rem;
          color: #fff;
          font-size: .14rem;
        }
        .teach-bottom{
          position: absolute;
          bottom: .3rem;
          left: 2.3rem;
          &:after{
            content: ' 门';
            font-size: .13rem;
            position: absolute;
            bottom: .05rem;
            margin-left: .03rem;
            color: #28deed
          }
        }
      }
    }
  }
</style>