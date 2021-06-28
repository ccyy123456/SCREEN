<template>
  <div class="module">
    <div class="top"></div>
    <div class="right"></div>
    <div class="bottom"></div>
    <div class="left"></div>
    <div class="top-center">{{moudletitle}}</div>
    <slot></slot>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
    };
  },
  props:['moudletitle'],
  mounted() {
    
  },
  watch: {
    
  },
  methods: {
    
  }
};
</script>

<style lang='less' scoped>
  .module{
    width: 100%;
    height: 100%;
    background: url('../assets/backgroung_2.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .top-center{
      background: url('../assets/background2.png') no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      color: #28dedede;
      font-size: .14rem;
      min-width:1rem;
      padding:0 .2rem;
      white-space: nowrap;
      position: absolute;
      top: -.11rem;
      left: 50%;
      transform: translate(-50%);
      -moz-transform:translate(-50%); 	/* Firefox */
      -webkit-transform:translate(-50%); /* Safari 和 Chrome */
      -o-transform:translate(-50%); 	/* Opera */
    }
    .top{
      background: url('../assets/line.png') no-repeat center;
      background-size: cover;
      width: .16rem;
      height: .12rem;
      position: absolute;
      top: 0;
      left:0;
    }
    .right{
      background: url('../assets/line.png') no-repeat center;
      background-size: cover;
      width: .16rem;
      height: .12rem;
      position: absolute;
      top: 0;
      right:0;
      transform: rotateY(-180deg);
      -webkit-transform: rotateY(180deg);	/* Safari 和 Chrome */
      -moz-transform: rotateY(180deg);	/* Firefox */
    }
    .bottom{
      background: url('../assets/line.png') no-repeat center;
      background-size: cover;
      width: .16rem;
      height: .12rem;
      position: absolute;
      bottom: 0;
      right:0;
      transform: rotateY(-180deg) rotateX(-180deg);
      -webkit-transform: rotateY(-180deg) rotateX(-180deg);	/* Safari 和 Chrome */
      -moz-transform: rotateY(-180deg) rotateX(-180deg);	/* Firefox */
    }
    .left{
      background: url('../assets/line.png') no-repeat center;
      background-size: cover;
      width: .16rem;
      height: .12rem;
      position: absolute;
      bottom: 0;
      left:0;
      transform: rotateX(-180deg);
      -webkit-transform: rotateX(-180deg);	/* Safari 和 Chrome */
      -moz-transform: rotateX(-180deg);	/* Firefox */
    }

  }
</style>