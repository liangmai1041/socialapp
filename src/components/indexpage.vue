<template>
  <div class="contain">
    <div class="vague">
    </div>
    <div class="slogan">
      <h1>海阁人</h1>
      <p>成就更出色的自己！</p>
    </div>
    <div class="button">
      <van-button type="primary" :block='true' class="btn btn-c2" @click="goto('/login')">登录</van-button>
      <van-button type="primary" :block='true' class="btn btn-c1" @click="goto('/reg')">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  methods:{
    goto(path){
      this.$router.push({path:path});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vague{
  height: 100%;
  background-size:100%;
  background-image: url('../assets/bg003.jpg');
  filter: blur(1.5px);
}
.slogan{
  position: fixed;
  width: 100%;
  top: 150px;
}
.slogan h1{
  letter-spacing: 8px;
  margin-bottom: 3px;
  font-size:40px;
  color: rgb(59,91,153);
}
.slogan p{
  font-weight:700;
  font-size: 14px;
}
.button{
  position: fixed;
  width: 100%;
  bottom: 20px;
}
.btn{
  letter-spacing: 8px;
  font-size: 15px;
  width:90%;
  height: 40px;
  line-height: 40px;
  margin:0 auto;
  border-radius: 8px;
  margin-bottom: 15px;
}
.btn-c1{
  background-color: rgb(0, 125, 184);
  border:solid 1px rgb(0, 125, 184);
}
.btn-c2{
  background-color: rgb(0, 161, 234);
  border:solid 1px rgb(0, 161, 234);
}
</style>
