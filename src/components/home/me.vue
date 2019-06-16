<template>
    <div class="container">
        <van-nav-bar title="我" :border='true' :fixed='true'/>
        <div class="imgbox">
          <img :src="logo"/>
          <p>{{name}}</p>
          <span>{{mobile}}</span>
        </div>
        <div class="left">
          <van-cell title="个人信息" icon="comment-o" is-link @click="goto('/permsg')"/>
          <van-cell title="账户密码" icon="comment-o" is-link @click="Notdeveloped"/>
          <van-cell title="关于海阁人" icon="info-o" is-link @click="Notdeveloped"/>
          <van-cell title="退出登录" icon="close" @click="Notdeveloped"/><br>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      name:'',
      mobile:'',
      logo:''
    };
  },
  created(){
    this.getMsg();
  },
  methods: {
    // 尚未开发
    Notdeveloped(){
      this.$toast('该功能尚未开发！');
    },
    //跳转页面
    goto(path){
      console.log('path')
      this.$router.push({path:path});
    },
    getMsg(){
      if(localStorage.isLogin==undefined||localStorage.isLogin=='0'){
        this.$toast('请先登录！！');
        setTimeout(() => {
            this.$router.push({path:'/login'});
        }, 3000);
      }else if(localStorage.isLogin=='1'){
        // this.$toast('你已经登录！');
        this.$axios.queryData(this.$url.user+'/?where=',{objectId:localStorage.uid}).then(
          (result)=>{
            console.log(result);
            if(result.data.results[0].nick==''){
              this.name='用户'+result.data.results[0].objectId;
            }else{
              this.name=result.data.results[0].nick;
            }
            this.logo=result.data.results[0].logo;
            this.mobile=result.data.results[0].mobile;
          },
          (result)=>{
            console.log(result);
          }
        );
      }
    }
  }
  
}
</script>

<style scoped>
.imgbox{
  padding: 40px 0 30px 0;
}
span{
  font-size: 14px;
  color: gray;
}
img{
  width: 110px;
  height: 110px;
  border-radius: 50%;
  padding: 1px;
  border: solid 1px skyblue;
  overflow: hidden;
}
.left{
  text-align: left;
  margin: 0 8px 50px 8px;
  padding-left: 5px;
}
.btn{
  font-size: 15px;
  width:95%;
  height: 40px;
  line-height: 40px;
  margin:30px auto 0 auto;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: rgb(0, 125, 184);
  border:solid 1px rgb(0, 125, 184);
}
</style>
