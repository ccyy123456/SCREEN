
<template>
  <div :id="idname" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data () {
    return {
    };
  },
  props:['idname','resize','max','value'],
  components: {},
  watch:{  //监听
    resize(n,o){
      var chartLine = echarts.init(document.getElementById(this.idname));
      chartLine.resize();
    }
  },
  computed: {},
  mounted(){
  	this.echartsgauge();
    // 子组件监听失效
    // var chartLine = echarts.init(document.getElementById(this.idname));
    // window.onresize = ()=>{
      // chartLine.resize();
    // }
  },

  methods: {
    // 趋势图
    echartsgauge(){
      var chartLine = echarts.init(document.getElementById(this.idname));
      var colors = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          offset: 0,
          color: '#01b4ff'
      },{
          offset: 1,
          color: '#0336ff'
      }]);
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
                max:this.max,
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
                        [0.9, colors],
                        [1, "#262795"]
                    ],
                    width: 8
                    }
            },   
            axisLabel: {  //文字样式
                show:false,
                distance:10,
                formatter:function(v){
                    switch (v + '') {
                        case '0' : return '0';
                        case '700' : return '70000';
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
                          formatter : "{score|{value}%}",
                          offsetCenter: [0, "0%"],
                          height:30,
                        rich : {
                              score : {
                                color : "#fff000",
                                fontFamily : "微软雅黑",
                                fontSize : 20
                              }
                          }
                      },
              title : { //设置仪表盘中间显示文字样式
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 14,
                        fontStyle: 'normal',
                        color:"#28deed",
                        backgroundColor:'#0819a2',
                        padding:5,
                        borderWidth:1,
                        borderColor:'#111eb3',
                        borderRadius:10
                    },
                    offsetCenter: [0, '50%'], 
            },
                      
            data:[{
                          value: this.value,
                          name:'参赛率'
                          
                      }]
            }
        ]
      };
      chartLine.setOption(option);
    }
  }
}

</script>
<style lang='less' scoped>
</style>