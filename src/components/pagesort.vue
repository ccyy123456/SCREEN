<template>
  <div class="page-sort">
    <button class="page-left" @click='changePage(0)' :disabled='disabled'></button>
    <button class="page-right" @click='changePage(1)' :disabled='disabled'></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled:false,
      newpage:this.currentpage  //props单线数据流传递
    };
  },
  props:[
    'allpage',
    'currentpage'
  ],
  components: {},

  computed: {},

  mounted(){
    // //console.log(this.allpage,this.currentpage)
  },
  watch:{
    //监听当前页
    currentpage(n,o){
      this.newpage = n;
      // //console.log(this.allpage,this.currentpage)
    }
  },
  methods: {
    // 切换页码
    changePage(flag){
      // 避免双击
      this.disabled = true;
      setTimeout(()=>{
        this.disabled = false;
      },200);
      if(flag == 0){
        if(this.newpage>1&&this.newpage<=this.allpage){
          this.newpage -= 1;
        }else{
          return;
        };
      }else{
        if(this.newpage>=1&&this.newpage<this.allpage){
          this.newpage += 1;
        }else{
          return;
        };
      };
      // //console.log(this.newpage);
      this.$emit('newpage',this.newpage)
    }
  }
}

</script>
<style lang='less' scoped>
</style>