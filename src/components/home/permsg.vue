<template>
    <div class="container">
        <van-nav-bar title="修改信息" left-arrow @click-left="onClickLeft" :fixed='true'/>  
        <div class="imgbox">
          <img :src="logo" @click='upload()'/>
          <input type="file" @change='uploadImg()' ref='load' hidden/>
        </div>
        <van-cell-group class="left">
          <van-field :value="name" label="姓名" left-icon="contact" v-model='name'/>
          <van-field :value="mobile" label="手机" left-icon="phone-o" disabled/>
          <van-field :value="email" label="Email" left-icon="envelop-o" v-model='email'/>
          <van-field :value="address" label="地址" left-icon="location-o" v-model='address'/>
        </van-cell-group>
        <van-button type="primary" :block='true' class="btn" @click='saveMsg()'>保存</van-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id:'',
      name:'',
      logo:'',
      mobile:'',
      address:'',
      email:''
    };
  },
  created(){
    this.getMsg();
  },
  methods: {
    onClickLeft() {
      this.$router.push({path:'/me'});
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
            this.id=result.data.results[0].id;
            this.logo=result.data.results[0].logo;
            this.mobile=result.data.results[0].mobile;
            this.email=result.data.results[0].email;
            this.address=result.data.results[0].address;
          },
          (result)=>{
            console.log(result);
          }
        );
      }
    },
    //保存按钮：提交信息
    saveMsg(){
      var name=this.name;         //存用户昵称
      if(this.name=='用户'+localStorage.uid){
        name='';
      }
      this.$axios.changeData(this.$url.user+'/'+localStorage.uid,{nick:name,email:this.email,address:this.address,mobile:this.mobile,logo:this.logo}).then(
        (result) => {
          this.$toast('保存成功！');
        },
        (result) => {
          console.log(result);
        }
      );
    },
    //修改图像
    upload(){
      console.log('hello');
      this.$refs.load.click();
    },
    uploadImg(){
      var file=this.$refs.load.files[0];
      if(file.name.indexOf('.jpg')==-1){
        this.$toast('请上传jpg格式的头像！');
        return;
      }
      this.$axios.postImg(this.$url.img+file.name,file).then(
        (result) => {
          console.log(result);
          if(result.status==200){
            this.logo=result.data.url;
          }
        },
        (result) => {
          console.log(result);
        }
      );
    }
  }
}
</script>

<style scoped>
.imgbox{
  padding: 40px 0 30px 0;
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
}
.btn{
  letter-spacing: 8px;
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
