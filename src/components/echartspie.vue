<!--  -->
<template>
  <div :id="idname" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data () {
    return {
      htmlfont:0
    };
  },
  props:[
    'idname','xdata','ydata','year','resize'
  ],
  components: {
  },

  computed: {},

  watch:{
    resize(n,o){
      var chartLine = echarts.init(document.getElementById(this.idname));
      chartLine.resize();
      this.indexEchart(); // 重置echarts字体
    }
  },

  mounted(){
    this.indexEchart()
  },

  methods: {
    // 饼图
    indexEchart(){
      var chartLine = echarts.init(document.getElementById(this.idname));
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
            x:'40%',
            y:'center',
            data:this.xdata,
            itemWidth:10,
            itemHeight:10,
            formatter:  function(name){
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
                        padding:[0,0,0,0],
                        // lineHeight:25
                    }
                }
            }
          },
          graphic: [{　　　//环形图中间添加文字
            type: 'text',　//通过不同top值可以设置上下显示
            left: '12%',　　　　　　　　　　
            top: 'center',
            style: {
              text: this.year,
              textAlign: 'center',
              fill: '#fff',
              fontSize: fontsmall,
            },
                  
          }
        ],
        series: [
            {
                name:'',
                type:'pie',
                radius: ['40%', '55%'], // 饼图大小
                center: ['20%', '50%'], // 饼图位置
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
</style>