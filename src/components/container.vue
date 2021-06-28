<template>
	<div>
    <!-- 主体 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 左导航 -->
    <aside class="left-aside">
      <div class="query" v-if='queryboxshow'>
        <transition 
          enter-active-class="animated bounceIn" 
          leave-active-class="animated bounceOut" 
          :duration="{ enter: 200, leave: 200 }" tag="div">
          <div class="flexcenterall flexdirection query-box" v-if='queryshow'>
            <div class="query-data ">
              <div class="mb20rem">
                <span class="rem12 deed">时间：</span>
                <el-date-picker
                  v-model="starttime"
                  type="date"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
                -
                <el-date-picker
                  v-model="endtime"
                  type="date"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
              </div>
              <div class="flexcenteraround">
                <label class="rem12 deed" v-if='!eventshow && !teachshow'>学院：</label>
                <el-select v-model="collegevalue" placeholder="选择学院" v-if='!eventshow && !teachshow'>
                  <el-option
                    v-for="college in collegelist"
                    :key="college.collegeid"
                    :label="college.collegename"
                    :value="college.collegeid">
                  </el-option>
                </el-select>
                <label class="rem12 deed" v-if='eventshow'>赛事：</label>
                <el-select v-model="gamevalue" placeholder="选择赛事" v-if='eventshow'>
                  <el-option
                    v-for="game in gamelist"
                    :key="game.gameid"
                    :label="game.gamename"
                    :value="game.gameid">
                  </el-option>
                </el-select>
                <el-button @click="getQueryData(0)">查询</el-button>
              </div>
            </div>
          </div>
        </transition>
        <div class="query-menu  cursor" @click='changeQuery(0)'></div>
      </div>
      <div class="clearfloat" v-if='sonboxshow'>
        <div class="son-menu fl cursor" :class="sonshow?'rotate':''" @click='sonMenu(0)'></div>
        <transition 
          enter-active-class="animated bounceIn" 
          leave-active-class="animated bounceOut" 
          :duration="{ enter: 200, leave: 200 }" tag="ul">
          <div class="fr son-menu-right" v-if='sonshow'>
            <ul class="clearfloat chosebgc">
              <li v-for='(item,index) in menulist2' :key='item.name' class="fl cursor" @click='choseSon(item,index)' :class="sonindex==index?'chosecolor':''" >
                  <div>{{item.name}}</div>
                </li>
            </ul>
          </div>
        </transition>
      </div>
    </aside>
    <!-- 右导航 -->
    <aside class="right-aside">
      <div class="clearfloat" v-if='queryboxshow'>
        <transition 
          enter-active-class="animated bounceIn" 
          leave-active-class="animated bounceOut" 
          :duration="{ enter: 200, leave: 200 }" tag="div">
          <div class="flexcenterall flexdirection query-box2" v-if='queryshow2'>
            <div class="query-data">
              <div class="mb20rem">
                <span class="rem12 deed">时间：</span>
                <el-date-picker
                  v-model="starttime"
                  type="date"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
                -
                <el-date-picker
                  v-model="endtime"
                  type="date"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
              </div>
              <div>
                <label class="rem12 deed" v-if='!eventshow && !teachshow'>学院：</label>
                <el-select class='select-trade' v-model="collegevalue" placeholder="选择学院" v-if='!eventshow && !teachshow'>
                  <el-option
                    v-for="college in collegelist"
                    :key="college.collegeid"
                    :label="college.collegename"
                    :value="college.collegeid">
                  </el-option>
                </el-select>
                <label class="rem12 deed" v-if='eventshow'>赛事：</label>
                <el-select v-model="gamevalue" placeholder="选择赛事" v-if='eventshow'>
                  <el-option
                    v-for="game in gamelist"
                    :key="game.gameid"
                    :label="game.gamename"
                    :value="game.gameid">
                  </el-option>
                </el-select>
                <el-button @click="getQueryData(1)">查询</el-button>
              </div>
            </div>
          </div>
        </transition>
        <div class="query-menu cursor fr" @click='changeQuery(1)'></div>
      </div>
      <div class="clearfloat" v-if='sonboxshow'> 
        <div class="son-menu2 fr cursor" :class="sonshow2?'rotate':''" @click='sonMenu(1)'></div>
        <transition 
          enter-active-class="animated bounceIn" 
          leave-active-class="animated bounceOut" 
          :duration="{ enter: 200, leave: 200 }" tag="ul">
          <div class="fr son-menu-right" v-if='sonshow2'>
            <ul class="clearfloat chosebgc">
              <li v-for='(item,index) in menulist2' :key='item.name' class="fr cursor" @click='choseSon(item,index)' :class="sonindex==index?'chosecolor':''" >
                  <div>{{item.name}}</div>
                </li>
            </ul>
          </div>
        </transition>
      </div>
    </aside>
    <!-- 底部导航 -->
    <div class="footer w100-per">
      <ul class="w100-per footer-menu">
        <li class="distabcell first cursor" @click='choseShow'>
          <div class="footer-img">
            <img src="../assets/icon_back.png" alt="" :class="choseshow?'rotate':''">
          </div>
        </li>
        <li>
          <transition-group 
          enter-active-class="animated bounceIn" 
          leave-active-class="animated bounceOut" 
          :duration="{ enter: 200, leave: 200 }" tag="ul">
              <li v-for='(item,index) in menulist' :key='item.name' class="distabcell cursor" @click='chose(item,index)' v-show='choseshow' :class="choseindex==index?'chosebgc':''" >
                <div >{{item.name}}</div>
              </li>
          </transition-group>
        </li>
        <li class="distabcell cursor end"  @click='choseShow'>
          <div class="footer-img">
            <img src="../assets/icon_back.png" alt="" :class="choseshow?'rotate':''">
          </div>
        </li>
      </ul>
    </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      select: "",
      roleid:this.$cookie.get("Pc_V_Yes_login"),
      accountid: Base64.decode(localStorage.getItem("accountid")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      token: Base64.decode(localStorage.getItem("token")),
      powerList:[],
      menulist:[   
        {name:'总览',route:'/home'},
        {name:'项目总览',route:'/projecthome'},
        {name:'教学分析',route:'/teachanalyze'},
        {name:'赛事分析',route:'/eventhome'},
        {name:'孵化管理',route:'/hatchome'},
      ], 
      menulist2:[
        {name:'专利分析',route:'/patentanalyze'},
        {name:'融资分析',route:'/financeanalyze'},
        {name:'项目商业化运营',route:'/businessanalyze'},
      ],
      collegelist:[],
      collegevalue:'',
      gamelist:[],
      gamevalue:'',
      eventshow:false,
      choseindex:'', //一级选中
      choseshow:false,
      sonindex:'',  // 二级选中
      sonshow:false, // 左侧菜单
      sonshow2:false,
      queryshow:false, // 左侧查询
      queryshow2:false,
      queryboxshow:false,
      sonboxshow:false,
      starttime:'',
      endtime:'',
      teachshow:false,
      num:-1, //父菜单计数
      num2:-1, // 子菜单计数
      lockReconnect:false,//避免ws重复连接
      wx:null  //websocket
    };
  },
  methods:{
    // 选中
    show(){
      let curRoute = this.$route.path;
      // 二级，查询显示影藏
      if(curRoute == '/projecthome'){
        this.sonboxshow = true;
      }else{
        this.sonboxshow = false;
      };
      if(curRoute == '/eventhome'){
        this.eventshow = true;
      }else{
        this.eventshow = false;
      };
      if(curRoute == '/projecthome' || curRoute == '/home' || curRoute == '/hatchome'){
        this.queryboxshow = false;
      }else{
        this.queryboxshow = true;
      };
      if(curRoute == '/teachanalyze'){
        this.teachshow = true;
      }else{
        this.teachshow = false;
      };
      this.menulist.map((item,index)=>{
        // 一级选中
        if(curRoute == item.route){
          this.choseindex = index;
          this.sonindex = -1;
        };
        if(curRoute == '/patentanalyze' || curRoute == '/financeanalyze' || curRoute == '/businessanalyze'){
          this.choseindex = 1;
          this.menulist2.map((item2,index2)=>{
            // 二级选中
            if(curRoute == item2.route){
              this.sonindex = index2;
            };
          });
          this.queryboxshow = true; // 查询,二级显示影藏
          this.sonboxshow = true; 
        }
      });
      
    },
    // 获取学院
    getCollegeListByOrgId() {
      this.$store.dispatch({
        type: "getCollegeList",
        orgid: this.orgid
      });
      this.collegelist = this.$store.state.getCollegeData; 
      const collegeAdd = {collegeid:0,collegename:'全部'};
      this.collegelist.unshift(collegeAdd);
    },
    // 获取赛事列表
    getMonitorProjectEventList() {
      this.$http
      .post(
        this.$store.state.url + "pc/project/manage/getSystemGameListByOrgid",
        { orgid: this.orgid},
        { emulateJSON: true, headers: { xytoken: this.token } }
      )
      .then(response => {
        this.info = JSON.stringify(response.data, null, 4);
        if (response.data.result == "success") {
          this.gamelist = response.data.data;
          const gameAdd = {gameid:0,gamename:'全部'};
          this.gamelist.unshift(gameAdd);
        }
      });
    },
    //切换菜单
    chose(item,index){
      this.choseindex = index;
      if(this.num == index){
        return;
      };
      this.starttime = '';
      this.endtime = '';
      this.collegevalue = 0;
      this.gamevalue = 0;
      this.$store.state.bigDataQuery = {
        starTime: '',
        endTime: '',
        collegeId:0,
        gameId:0
      };
      if(item.route == '/projecthome'){
        this.sonboxshow = true;
      }else{
        this.sonboxshow = false;
      };
      if(item.route == '/eventhome'){
        this.eventshow = true;
      }else{
        this.eventshow = false;
      };
      if(item.route == '/projecthome' || item.route == '/home' ||item.route == '/hatchome'){
        this.queryboxshow = false;
      }else{
        this.queryboxshow = true;
      };
      if(item.route == '/teachanalyze'){
        this.teachshow = true;
      }else{
        this.teachshow = false;
      };
      this.$router.push(item.route);
      this.num = index;
    },
    //切换子菜单
    choseSon(item,index){
      this.sonindex = index;
      if(this.num2 == index){
        return;
      };
      this.starttime = '';
      this.endtime = '';
      this.collegevalue = 0;
      this.gamevalue = 0;
      this.$store.state.bigDataQuery = {
        starTime: '',
        endTime: '',
        collegeId:0,
        gameId:0
      };
      this.sonboxshow = true;
      this.queryboxshow = true;
      this.$router.push(item.route);
      this.num2 = index;
    },
    //菜单显示影藏
    choseShow(){
      this.choseshow = !this.choseshow
    },
    //子菜单显示影藏
    sonMenu(flag){
      if(flag == 0){ // 只显示一侧
        this.sonshow = !this.sonshow;
        this.sonshow2 = false;
      }
      if(flag == 1){
        this.sonshow2 = !this.sonshow2;
        this.sonshow = false;
      }
    },
    // 查询菜单
    changeQuery(flag){
      if(flag == 0){ // 只显示一侧
        this.queryshow = !this.queryshow;
        this.queryshow2 = false;
      }
      if(flag == 1){
        this.queryshow2 = !this.queryshow2;
        this.queryshow = false;
      }
    },
    // 查询
    getQueryData(flag){
      if(flag == 0){ // 只显示一侧
        this.queryshow = !this.queryshow;
        this.queryshow2 = false;
      }
      if(flag == 1){
        this.queryshow2 = !this.queryshow2;
        this.queryshow = false;
      }
      this.$store.state.bigDataQuery = {
        starTime: this.starttime,
        endTime: this.endtime,
        collegeId:this.collegevalue||0,
        gameId:this.gamevalue||0
      }
    },
    // websocket
    socket(getXyTokensdeKey) {
      var socket = new WebSocket(
        this.$store.state.webSockentUrl +
          ";xytoken=" +
          getXyTokensdeKey +
          ";sockettype=BIGSCREEN"+";orgid="+this.orgid
      );
      socket.onopen = function(evt) {};
      socket.onerror = function(evt) {};
      socket.onmessage = evt => {
        let data = JSON.parse(evt.data);
        let message = data.map;
        //console.log(message)
        if(message){
          this.updateBigScreenShowflag(message.showflag);
          // 查询菜单显示影藏
          if(message.showflag == 'projecthome'){
            this.sonboxshow = true;
          }else{
            this.sonboxshow = false;
          };
          if(message.showflag == 'eventhome'){
            this.eventshow = true;
          }else{
            this.eventshow = false;
          };
          if(message.showflag == 'projecthome' || message.showflag == 'home' ||message.showflag == 'hatchome'){
            this.queryboxshow = false;
          }else{
            this.queryboxshow = true;
          };
          if(message.showflag == 'teachanalyze'){
            this.teachshow = true;
          }else{
            this.teachshow = false;
          };
          this.$router.push(message.showflag);
          if(message.tablename !== ''){
            this.$store.state.bigDataPage = {
              tableSort:message.tablename||'',
              currentPage:message.page||1
            };
          }else{
            this.$store.state.bigDataQuery = {
              starTime: message.starttime||'',
              endTime: message.endtime||'',
              collegeId:message.collegeid||0,
              gameId:message.projectgameid||0
            };
          }
        };
        // socket.close();
      };
      socket.onclose = function(evt) {};
    },
    //修改某页面展示的信息
    updateBigScreenShowflag(showflag){
      this.$http
      .post(
        this.$store.state.url + "system/base/updateBigScreenShowflag",
        { orgid: this.orgid,
          xytoken:this.token,
          showflag:showflag},
        { emulateJSON: true, headers: {} }
      )
      .then(response => {
        this.info = JSON.stringify(response.data, null, 4);
        if (response.data.result == "success") {
        }
      });
    },
    //删除屏幕成员
    closeSocket(){
      this.$http
      .post(
        this.$store.state.url + "system/base/delBigScreenSession",
        { orgid: this.orgid,
          xytoken:this.token},
        { emulateJSON: true, headers: {} }
      )
      .then(response => {
        this.info = JSON.stringify(response.data, null, 4);
        if (response.data.result == "success") {
        }
      });
    },
    checkXyToken(){
      var watchToken = Base64.decode(localStorage.getItem('token'));
      // //console.log(watchToken)
      this.$store.dispatch({
        type: 'checkXyToken',
        token: watchToken
      });
      if(localStorage.getItem('token') == null){
        window.location.href = this.$store.state.currenturl;
      }
    },
    createWebSocket(url) {
      try{
          if('WebSocket' in window){
              this.ws = new WebSocket(url);
          }else if('MozWebSocket' in window){  
              this.ws = new MozWebSocket(url);
          }else{
                this.$alert("您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！", '', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                });
          }
          this.initEventHandle(url);
      }catch(e){
        this.reconnect(url);
        //console.log(e);
      }     
    },
    initEventHandle(wsUrl) {
      var that = this;
      //心跳检测
      var heartCheck = {
          timeout: 85000,        //85秒发一次心跳
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function(){
              clearTimeout(this.timeoutObj);
              clearTimeout(this.serverTimeoutObj);
              return this;
          },
          start: function(){
              var self = this;
              this.timeoutObj = setTimeout(function(){
                  //这里发送一个心跳，后端收到后，返回一个心跳消息，
                  //onmessage拿到返回的心跳就说明连接正常
                  // that.ws.send("ping");
                  // //console.log("ping!")
                  // that.ws.close(); 
                  // self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                  //     that.ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                  // }, self.timeout)
              }, this.timeout)
          }
      }
      this.ws.onclose = ()=> {
          this.reconnect(wsUrl);
          //console.log("llws连接关闭!"+new Date().toUTCString());
      };
      this.ws.onerror = ()=> {
          this.reconnect(wsUrl);
          //console.log("llws连接错误!");
      };
      this.ws.onopen = ()=> {
          heartCheck.reset().start();      //心跳检测重置
          //console.log("llws连接成功!"+new Date().toUTCString());
      };
      this.ws.onmessage = ()=> {    //如果获取到消息，心跳检测重置
          heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
          // //console.log("llws收到消息啦:" +event.data);
          let data = JSON.parse(event.data);
          let message = data.map;
          //console.log(message)
          if(message){
            this.updateBigScreenShowflag(message.showflag);
            // 查询菜单显示影藏
            if(message.showflag == 'projecthome'){
              this.sonboxshow = true;
            }else{
              this.sonboxshow = false;
            };
            if(message.showflag == 'eventhome'){
              this.eventshow = true;
            }else{
              this.eventshow = false;
            };
            if(message.showflag == 'projecthome' || message.showflag == 'home' ||message.showflag == 'hatchome'){
              this.queryboxshow = false;
            }else{
              this.queryboxshow = true;
            };
            if(message.showflag == 'teachanalyze'){
              this.teachshow = true;
            }else{
              this.teachshow = false;
            };
            this.$router.push(message.showflag);
            if(message.tablename !== ''){
              this.$store.state.bigDataPage = {
                tableSort:message.tablename||'',
                currentPage:message.page||1
              };
            }else{
              this.$store.state.bigDataQuery = {
                starTime: message.starttime||'',
                endTime: message.endtime||'',
                collegeId:message.collegeid||0,
                gameId:message.projectgameid||0
              };
            }
          }
      }
    },
    reconnect(url) {
        if(this.lockReconnect) return;
        this.lockReconnect = true;
        setTimeout(()=> {     //没连接上会一直重连，设置延迟避免请求过多
            this.createWebSocket(url);
            this.lockReconnect = false;
        }, 2000);
    }
  },
  mounted() {
    let url = this.$store.state.webSockentUrl + ";xytoken=" + this.token + ";sockettype=BIGSCREEN"+";orgid="+this.orgid;
    this.show();
    this.checkXyToken();
    this.getCollegeListByOrgId();
    this.getMonitorProjectEventList();
    this.createWebSocket(url)
    // this.socket(this.token);
    // 监听浏览器关闭
    window.addEventListener( 'beforeunload', e => this.closeSocket());
  },
  watch: {
    $route() {
      this.show();
      this.checkXyToken();
    }
  }
};
</script>
<style lang="less">
    .query-box{
      width: 3.5rem;
      height: 1.2rem;
      background: #091230;
      border-radius: 5px;
      position: fixed;
      bottom: .32rem;
      left: .32rem;
    }
    .query-box2{
      width: 3.5rem;
      height: 1.2rem;
      background: #091230;
      border-radius: 5px;
      position: fixed;
      bottom: .32rem;
      right: .32rem;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner-editor{
      width: auto;
      .el-input__inner{
        width: 1.34rem;
        height: .34rem;
        padding: 0;
        background: #01335c;
        color: #28deed;
        font-size: .12rem;
        text-align: center;
        border: 1px solid #28deed;
      }
      .el-input__inner::placeholder {
        color: #28deed;
      }
      // 前置图标
      .el-input__prefix{
        display: none
      }
      //删除图标
      .el-input__suffix{
        .el-input__suffix-inner{
          color:#28deed
        }
      }
    }
    .el-picker-panel,.el-date-picker{
      top: auto!important;  
      bottom: 0;
      // left: 3.78rem!important;
      margin-bottom: 0;
      background: #01335c;
      border: 1px solid #28deed;
      .el-date-picker__header{
        .el-picker-panel__icon-btn{
          color: #28deed;
          margin: 0;
        }
        .el-date-picker__header-label{
          color: #28deed;
        }
      }
      .el-picker-panel__content{
        .el-date-table th{
          color: #28deed;
          font-weight: 400;
          background: #01335c;
          border-bottom: none
        }
        .el-date-table__row{
          td{
            background: #01335c;
            span{
              color: #28deed;
            }
          }
          .prev-month{
            span{
              color:#c0c4cc
            }
          }
        }
        
      }
      // 小箭头
      .popper__arrow{
        display: none
      }
    }
    .el-select{
      width: auto;
      .el-input__inner{
        width: 1.88rem;
        height: .34rem;
        padding: 0;
        background: #01335c;
        color: #28deed;
        font-size: .12rem;
        text-align: center;
        border: 1px solid #28deed;
      }
      .el-input__inner::placeholder {
        color: #28deed;
      }
      .el-input__suffix{
        .el-input__suffix-inner{
          .el-select__caret{
            color:#28deed
          }
        }
        
      }
    }
    .el-select-dropdown{
      top: auto!important;
      bottom: 0;
      // left: 3.78rem!important;
      background: #01335c;
      border: 1px solid #28deed;
      .el-select-dropdown__item{
        color: #28deed
      }
      // 小箭头
      .popper__arrow{
        display: none
      }
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
      background: #091230;
    }
    .el-button{
      width: .8rem;
      height: .34rem;
      background: url('../assets/background_navigationbar.png') no-repeat center;
      background-size:100% 100%; 
      border: none!important;
      color: #28deed!important;
      padding: 0!important
    }
</style>
<style lang="less" scoped>
  //旋转样式
  .rotate{
    transform: rotate(180deg);
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
  }
  // 选中样式
  .chosebgc{
    background: url('../assets/navigationbar.png') no-repeat center;
    background-size: cover;
  }
  // 选中样式
  .chosecolor{
    color: #fff;
  }
  .footer-menu{
    display: table;
    background: #091230;
    font-size: .14rem;
    color: #28dedede;
    .footer-img{
      width: .15rem;
      height: .09rem;
      margin: 0 auto;
      img{
        display: block;
        transition: all .5s;
        -moz-transition:  all .5s; /* Firefox 4 */
        -webkit-transition:  all .5s; /* Safari 和 Chrome */
        -o-transition:  all .5s; /* Opera */
      }
    };
    .distabcell{
      text-align: center;
      height:.3rem;
      width: 1%;
    };
    & .first,& .end{
      width: 1.65rem;
    }
    
  }

  .left-aside{
    position: fixed;
    left: 0;
    bottom:.35rem
  }
  .right-aside{
    position: fixed;
    right: 0;
    bottom:.35rem
  }
  .query-menu{
    width: .28rem;
    height: .28rem;
    margin-bottom: .05rem;
    background: url('../assets/screening.png') no-repeat center;
    background-size: cover;
  }
  .son-menu{
    width: .28rem;
    height: .28rem;
    margin-bottom: .05rem;
    transition: all .5s;
    -moz-transition:  all .5s; /* Firefox 4 */
    -webkit-transition:  all .5s; /* Safari 和 Chrome */
    -o-transition:  all .5s; /* Opera */
    background: url('../assets/icon_up2.png') no-repeat center;
    background-size: cover;
  }
  .son-menu2{
    width: .28rem;
    height: .28rem;
    margin-bottom: .05rem;
    transition: all .5s;
    -moz-transition:  all .5s; /* Firefox 4 */
    -webkit-transition:  all .5s; /* Safari 和 Chrome */
    -o-transition:  all .5s; /* Opera */
    background: url('../assets/icon_up.png') no-repeat center;
    background-size: cover;
  }
  .son-menu-right{
    height: .28rem;
    line-height: .28rem;
    color: #ccc;
    font-size: .14rem;
    li{
      padding: 0 .1rem
    }
  }
  .main{
    padding:.3rem .52rem 0
  }
  /deep/.el-date-picker{
    bottom: 0!important;
    left: .3rem;
    margin-bottom: 0;
    background: #01335c;
    border: 1px solid #28deed;
    /deep/.el-date-picker__header{
       /deep/.el-picker-panel__icon-btn{
        color: #28deed;
        font-size: .4rem;
        margin: 0;
      }
       /deep/.el-date-picker__header-label{
        color: #28deed;
        font-size: .4rem;
      }
    }
    /deep/.el-picker-panel__content{
      /deep/.el-date-table th{
        color: #28deed;
        font-weight: 400;
        background: #01335c;
      }
      /deep/.el-date-table__row span{
        color: #28deed;
        font-size: 0.12rem;
      }
    }
  }
</style>