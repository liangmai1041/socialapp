<template>
    <div class="contain">
        <van-nav-bar title="登录" left-arrow @click-left="onClickLeft"/>
        <div class="regpic">
        </div>
        <div class="regmsg">
            <van-field type='number' placeholder="手机" left-icon="phone-o" v-model='mobile' />
            <van-field type='password' placeholder="密码" left-icon="passed" v-model='psw' /><br>
        </div>
        <van-button type="primary" :block='true' class="btn" @click="gologin('/login')">登录</van-button>
        <div class="goto">
            <router-link to='/reg' class="toreg">立即注册>></router-link>
            <!-- <router-link to='/reg' class="forget">忘记密码？</router-link> -->
            <span @click="() => {this.$toast('该功能尚未开发！')}" class="forget">忘记密码？</span>
        </div>       
    </div>
</template>

<script>
export default {
    data() {
        return {
            // mobile:'15813402941',
            // psw:'123456a',
            mobile:'',
            psw:''
        };
    },
    methods: {
        onClickLeft() {
            this.$router.push({path:'/'})
        },
        //连接接口
        gologin(){
            let pattern1 = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            let pattern2 = /^[0-9A-Za-z]{6,20}$/;
            if(!pattern1.test(this.mobile)){
                this.$toast('请输入有效的手机号！');
                return;
            }else if(!pattern2.test(this.psw)){
                this.$toast('请输入6-20位字符的密码！');
                return;
            }
            this.$axios.queryData(this.$url.user+'/?where=',{mobile:this.mobile}).then(
                (result)=>{
                    if(result.data.results.length===0){
                        this.$toast('该账号未注册！');
                    }else{
                        this.$axios.queryData(this.$url.user+'/?where=',{mobile:this.mobile,psw:this.psw}).then(
                            (result) => {
                                if(result.data.results.length===0){
                                    this.$toast('密码输入错误！！！');
                                }else{
                                    this.$toast('登录成功！！');
                                    localStorage.uid=result.data.results[0].objectId;
                                    localStorage.isLogin='1';         //已登录
                                    setTimeout(() => {
                                        this.$router.push({path:'/index'});
                                    }, 2000);
                                }
                            },
                            (rusult) => {
                                console.log(result);
                            }
                        );
                    }
                },
                (result) => {
                    console.log(result);
                }
            )
        },
    }
};
</script>

<style scoped>
.regpic{
    width: 80px;
    height: 80px;
    border: solid 2px #ccc;
    border-radius: 8px;
    overflow: hidden;
    background-image: url('../assets/bgw.jpg');
    background-size: 100%;
    margin:50px auto 30px auto;
}
.regmsg{
    margin-top: 20px;
    margin:0 10px;
    padding-right: 15px;
}
.btn{
    letter-spacing: 8px;
    font-size: 15px;
    width:90%;
    height: 40px;
    line-height: 40px;
    margin:30px auto 0 auto;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: rgb(0, 161, 234);
    border:solid 1px rgb(0, 161, 234);
}
.goto{
    position: relative;
    font-size: 14px;
}
.toreg{
    color: rgb(56, 149, 255);
    position: absolute;
    left: 25px;
}
.forget{
    color: rgb(133, 133, 133);
    position: absolute;
    right: 25px;
}
</style>
