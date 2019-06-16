<template>
    <div class="container">
        <van-nav-bar title="成就" :border='true' :fixed='true'/>
        <van-row v-for='val in list' :key='val.id' class="cjbox" type="flex" justify="space-between">
          <van-col span="3">{{val.time}}</van-col>
          <van-col span="20">
            <van-row class="title">
              <van-col span="24">{{val.title}}</van-col>
            </van-row>
            <van-row>
              <van-col span="22" class="content">
                {{val.content}}
              </van-col>
              <van-col span="2">
                <van-icon name="arrow" />
              </van-col>
            </van-row>
          </van-col>
        </van-row>
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
    this.getAchi();
  },
  methods: {
    getAchi(){
      if(localStorage.isLogin==undefined||localStorage.isLogin=='0'){
        this.$toast('请先登录！！');
        setTimeout(() => {
            this.$router.push({path:'/login'});
        }, 3000);
      }else if(localStorage.isLogin=='1'){
        // this.$toast('你已经登录！');
        this.$axios.queryData(this.$url.achi+'/?where=',{user_id:localStorage.uid}).then(
          (result) => {
            console.log(result);
            if(result.data.results.length!=0){
              for(var i=0;i<result.data.results.length;i++){
                this.list.push({
                  id:i,
                  time:result.data.results[i].createdAt.substring(5,10),
                  title:result.data.results[i].title,
                  content:result.data.results[i].content
                });
              }
            }
          },
          (result) => {
            console.log(result);
          }
        );
      }
    }
  }
}
</script>

<style scoped>
.cjbox{
  border-bottom: solid 1px #ccc;
  padding:10px 0;
  margin: 0 8px;
  font-size: 14px;
}
.title{
  padding-bottom:8px;
  text-align: left;
  font-size: 16px;
}
.content{
  text-align: left;
}
</style>
