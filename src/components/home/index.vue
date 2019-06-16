<template>
    <div class="contain">
        <router-view/>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/classmate">同窗</van-tabbar-item>
            <van-tabbar-item icon="edit" @click='show=true'>发布</van-tabbar-item>
            <van-tabbar-item icon="award-o" to="/achieve">成就</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/me">我</van-tabbar-item>
        </van-tabbar>
        <van-popup v-model="show" position="bottom">
          <van-nav-bar title="发布" :border='true'>
            <van-icon name="passed" slot="right" @click='putIn()'/>
            <van-icon name="close" slot="left" @click="close()"/>
          </van-nav-bar>
          <van-field v-model="message" type="textarea" placeholder="请输入内容，最长不得超过141个字！" rows="6"/>
        </van-popup>
        <div style="display:none;">{{nav}}</div>       
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      show: false,
      message:'',
    };
  },
  computed:{
    nav(){
      if(this.$route.path=='/home'){
        this.active=0;
      }else if(this.$route.path=='/classmate'){
        this.active=1;
      }else if(this.$route.path=='/achieve'){
        this.active=3;
      }else if(this.$route.path=='/me'){
        this.active=4;
      }
    }
  },
  created(){
    // this.isLogin();
  },
  methods: {
    // isLogin(){
    //   if(localStorage.isLogin==undefined||localStorage.isLogin=='0'){
    //     this.$toast('请先登录！！');
    //     setTimeout(() => {
    //         this.$router.push({path:'/login'});
    //     }, 3000);
    //   }else if(localStorage.isLogin=='1'){
    //     this.$toast('你已经登录！');
    //   }
    // },
    putIn(){
      if(this.message==''){
        this.$toast('请输入信息！！');
        return;
      }
      this.$axios.addData(this.$url.list,{goodcount:'',good:0,user_id:localStorage.uid,content:this.message,city:'广州'}).then(
        (result)=>{
          console.log(result);
          if(result.status==201){
            this.$toast('发布成功');
            this.close();
            this.$router.push({path:'/home'});
            if(this.active!==0) this.active=0;
          }
        },
        (result)=>{
          console.log(result);
        }
      );
    },
    //关闭弹窗
    close(){
      this.message='';
      this.show=false;
    }
  }
}
</script>

<style scoped>

</style>
