<template>
    <div class="container">
        <van-nav-bar title="你的同学" left-arrow @click-left="onClickLeft" :fixed='true'/>  
        <div class="imgbox">
          <img :src="logo"/>
        </div>
        <van-cell-group class="left">
          <van-field :value="name" label="昵称" left-icon="contact" disabled />
          <van-field :value="mobile" label="手机号" left-icon="phone-o" disabled />
          <van-field :value="email" label="Email" left-icon="envelop-o" disabled />
          <van-field :value="address" label="地址" left-icon="location-o" disabled />
        </van-cell-group>
        <van-button type="primary" :block='true' class="btn" @click='callUp()'>打个电话：{{mobile}}</van-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      logo:'',
      address:'',
      mobile:'',
      email:''
    };
  },
  created(){
    this.getMsg(this.$route.params.id);
  },
  methods: {
    onClickLeft() {
      this.$router.push({path:'/classmate'})
    },
    getMsg(id){
      if(localStorage.isLogin==undefined||localStorage.isLogin=='0'){
        this.$toast('请先登录！！');
        setTimeout(() => {
            this.$router.push({path:'/login'});
        }, 3000);
      }else if(localStorage.isLogin=='1'){
        // this.$toast('你已经登录！');
        this.$axios.queryData(this.$url.user+'/?where=',{objectId:id}).then(
          (result) => {
            console.log(result);
            this.name=result.data.results[0].nick=='' ? '用户'+result.data.results[0].objectId : result.data.results[0].nick;
            this.email=result.data.results[0].email;
            this.address=result.data.results[0].address;
            this.mobile=result.data.results[0].mobile;
            this.logo=result.data.results[0].logo;
          },
          (result) => {
            console.log(result);
          }
        );
      }
    },
    callUp(){
      this.$toast('该功能尚未开发！');
    }
  }
}
</script>

<style scoped>
.imgbox{
  padding: 40px 0 30px 0;
}
img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 1px;
  border: solid 1px skyblue;
}
.left{
  text-align: left;
  margin: 0 8px 50px 8px;
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
