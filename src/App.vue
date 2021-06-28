<template>
	<div id="app">
		<v-headtop></v-headtop>
    <keep-alive>
		  <router-view v-if='$route.meta.keep'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keep'></router-view>
	</div>
</template>

<script>
	import headtop from './components/mainHeader.vue';

	export default {
		components: {
			'v-headtop': headtop,
		},
		data() {
			return {
			}
		},
		//跳转到课程框架，隐藏顶部
		mounted() {
			
		},
		watch: {
			
		}
	}
</script>
<style lang="less" scoped>
  #app{
    width:100%;
    height: 100%;
    position: absolute;
    background: url('./assets/background.png') no-repeat center;
    background-size: 100% 100%
  }
  
</style>