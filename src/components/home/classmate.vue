<template>
  <div class="container">
    <van-nav-bar title="海阁人" :border='true' :fixed='true'/>
    <div class="picbox">
      <div class="box" v-for='val in list' :key='val.id' @click='goinfo(val.id)'>
        <img :src="val.logo"/>
        <p>{{val.name}}</p>
      </div>
    </div>
    <br><br><br><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[]
    };
  },
  created(){
    this.getMsg();
  },
  methods: {
    getMsg(){
      if(localStorage.isLogin==undefined||localStorage.isLogin=='0'){
        this.$toast('请先登录！！');
        setTimeout(() => {
            this.$router.push({path:'/login'});
        }, 3000);
      }else if(localStorage.isLogin=='1'){
        // this.$toast('你已经登录！');
        this.$axios.queryData(this.$url.user+'/?keys=logo,nick').then(
          (result) => {
            console.log(result);
            var name='';
            for(var i=0;i<result.data.results.length;i++){
              if(result.data.results[i].nick==''){
                name=result.data.results[i].objectId.substring(0,8)+'…';
              }else{
                if(/^[a-zA-Z\d]+$/.test(result.data.results[i].nick)){
                  if(result.data.results[i].nick.length>8){
                    name=result.data.results[i].nick.substring(0,7)+'…';
                  }else{
                    name=result.data.results[i].nick;
                  }
                }else{
                  if(result.data.results[i].nick.length>3){
                    name=result.data.results[i].nick.substring(0,4)+'…';
                  }else{
                    name=result.data.results[i].nick;
                  }
                }
              }
              this.list.push({
                id:result.data.results[i].objectId,
                name:name,
                logo:result.data.results[i].logo
              })
            }
          },
          (result) => {
            console.log(result);
          }
        )
      }
    },
    goinfo(id){
      this.$router.push({path:'/classmateinfor/'+id})
    }
  }
}
</script>

<style scoped>
.picbox{
  margin:10px 5px;
  text-align: left;
  padding-top: 10px;
  /* display: flex;
  justify-content: flex-start;
  flex-wrap: wrap; */
}
.box{
  display: inline-block;
  width: 75px;
  font-size: 14px;
  margin:0 8px 15px 8px;
  text-align: center;
}
img{
  width: 75px;
  height: 75px;
  border-radius: 5px;
}
.box p {
  line-height: 20px;
}
/* .cmlogo{
  display: flex;
  justify-content: space-around;
} */
</style>
