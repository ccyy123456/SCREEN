<template lang="html">
	<header>
		<nav>
      <div>
        <div class='headerbgc'>大数据管理平台</div> 
        <div class='fr headschool'>
          <a>{{username}}</a>
        </div>
      </div>
      <!--<div class="expirationtime" v-if='showExpirationtime'>注：{{expirationtime}}
        <a href="about/contact_pc.html">联系我们</a>
      </div>-->
		</nav>
	</header>
</template>

<script>
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      token: Base64.decode(localStorage.getItem("token")),
      accountid: Base64.decode(localStorage.getItem("accountid")),
      orgid: Base64.decode(localStorage.getItem("tzq_org_orgid")),
      username: "",
      userimg: "",
      detailData: "",
      showExpirationtime:false,
    };
  },
  methods: {
    getUserInformation() {
      this.$http
        .post(
          this.$store.state.url + "pc/person/getMyBrieflyInfo",
          { accountid: this.accountid },
          { emulateJSON: true, headers: { xytoken: this.token } }
        )
        .then(response => {
          this.info = JSON.stringify(response.data, null, 4);
          this.username = response.data.data.username;
          this.userimg = response.data.data.userimage;
          this.detailData = response.data.data;
          if (this.detailData.layer == 2) {
            this.detailData["layerselectone"] = true;
            this.detailData["layerselecttwo"] = false;
          }
          if (this.detailData.layer == 3) {
            this.detailData["layerselectone"] = false;
            this.detailData["layerselecttwo"] = true;
          }
        });
    },
    getOrgInformations() {
      this.$http
        .post(
          this.$store.state.url + "system/getOrgInfoByOrgId",
          { orgid: this.orgid },
          { emulateJSON: true, headers: { xytoken: this.token } }
        )
        .then(response => {
          this.info = JSON.stringify(response.data, null, 4);
          this.username = response.data.data.orgname;
          this.userimg = response.data.data.logourl;
          localStorage.setItem('username', Base64.encode(this.username))
        });
    },
    getAccount() {
			if(this.orgid==undefined||this.orgid=='undefined') //默认到某个组织上。
				this.orgid=1471;
        this.$http
        .post(
          this.$store.state.url + "system/getAccountPowerList",
          { orgid: this.orgid },
          { emulateJSON: true, headers: { xytoken: this.token } }
        )
        .then(response => {
          this.info = JSON.stringify(response.data, null, 4);
          this.powerList = response.data.data;
          for(let i in this.powerList){
            if(this.powerList[i].usestatus === true){
              this.$confirm('为避免影响您的系统使用，请联系工作人员，进行续期。', '您所在的院校账号已经到期！', {
                confirmButtonText: '联系我们',
                cancelButtonText: '退出系统',
                type: 'warning'
              }).then(() => {
                window.location.href = 'about/contact_pc.html';
              }).catch(() => {
                this.signOut();
              });
            }
            else
            {
            	if(this.powerList[i].useflag<2)
            	{
            		this.showExpirationtime=true;
	            	this.expirationtime="系统将在"+this.powerList[i].expirationtime+"到期。";
	            	break;            		
            	}

            }
          }
        });
    },
  },
  //跳转到课程框架，隐藏顶部
  mounted() {
    this.getAccount();
    this.getOrgInformations();
    if(localStorage.getItem('token') != null){
      this.$store.dispatch({
        type: 'checkXyToken',
        token: this.token
      });
    }else{
      window.location.href = this.$store.state.currenturl;
    };
  },
  watch: {
    $route() {
      var watchToken = Base64.decode(localStorage.getItem('token'));
      this.$store.dispatch({
        type: 'checkXyToken',
        token: watchToken
      });
      if(localStorage.getItem('token') == null){
        window.location.href = this.$store.state.currenturl;
      }
    }
  }
};
</script>
<style lang='less' scoped>
  .headerbgc{
    width: 5.64rem;
    height: .45rem;
    line-height: .45rem;
    margin:0 auto;
    font-size:.24rem;
    color:#fdfdfd;
    text-align: center;
    background: url('../assets/bancground_top.png') no-repeat center;
    background-size:cover; 
  }
  .headschool{
    margin: -.25rem .94rem 0 0;
    a{
      font-size:.16rem;
      color:#28deed
    }
  }
  .expirationtime {
    font-size: 14px;
    color: #ECF0F1;
    text-align: center;
    margin-top: 44px;
    margin-left: 20px;
    a{
      font-size: 14px;
      color:#FEAB3A;
      text-decoration:underline;
    }
  }
</style>
