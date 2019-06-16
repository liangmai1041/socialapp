<template>
    <div class="contain">
        <van-nav-bar title="注册" left-arrow @click-left="onClickLeft"/>
        <div class="regpic">
        </div>
        <div class="regmsg">
            <van-field type='tel' placeholder="请输入您常用的手机号码" label="手机号码" left-icon="phone-o" v-model="mobile" @blur="checkPhone"/>
            <van-field type='password' placeholder="输入6-20位字符" label="设置密码" left-icon="passed" v-model="psw" @blur="checkPsw"/>
            <van-field type='password' placeholder="再次输入设置的密码" label="确认密码" left-icon="passed" v-model='confirmp' @blur="checkConfirm"/><br>
        </div>
        <div class="agree">
            <van-checkbox v-model="checked" checked-color="#07c160" class="ckb"></van-checkbox>
            <span>我已阅读，并同意<a href="#">《用户服务协议》</a></span>
        </div>
        <van-button type="primary" :block='true' class="btn" @click="goreg()" :disabled="!checked">注册</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        checked: false,
        // mobile:'15813402941',
        // psw:'123456a',
        // confirmp:'123456a',
        mobile:'',
        psw:'',
        confirmp:'',
        };
    },
    methods: {
    onClickLeft() {
      this.$router.push({path:'/'});
    },
    // 检查手机格式是否正确
    checkPhone(){
        let pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        if(!pattern.test(this.mobile)){
            this.$toast('请输入有效的手机号！');
        }
    },
    // 检查密码是否为6-20位
    checkPsw(){
        let pattern = /^[0-9A-Za-z]{6,20}$/;
        if(!pattern.test(this.psw)){
            this.$toast('请输入6-20位字符的密码！');
            return;
        }
        if(this.confirmp){
            this.checkConfirm();
        }
    },
    checkConfirm(){
        if(this.confirmp!==this.psw){
            this.$toast('两次密码输入不一致！');
        }
    },
    // 连接接口：
    goreg(){
        if(!this.mobile||!this.psw||!this.confirmp){
            this.$toast('请输入完整的信息！');
            return;
        }
        this.$axios.queryData(this.$url.user+'/?where=',{mobile:this.mobile}).then(
            (result) => {
                if(result.data.results.length===1){
                    this.$toast('该号码已注册！！');
                }else if(result.data.results.length===0){
                    this.$axios.addData(this.$url.user,{mobile:this.mobile,psw:this.psw}).then(
                        (result) => {
                            if(result.status===201){
                                this.$toast('注册成功！');
                                setTimeout(() => {
                                    this.$router.push({path:'/login'});
                                }, 2000);
                            }
                        },
                        (result) =>{
                            console.log(result);
                        }
                    );
                }
            },
            (result) => {
                console.log(result);
            }
        );
    }
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
    background-image: url('../assets/logo02.png');
    background-size: 100%;
    margin:50px auto 30px auto;
}
.regmsg{
    margin-top: 20px;
    margin:0 10px;
    padding-right: 15px;
}
.agree{
    position: relative;
    font-size: 12px;
}
.agree span{
    position: relative;
    top:-5px;
    color: gray;
}
.ckb{
    display: inline-block;
}
.agree a{
    color:rgb(56, 149, 255);
    text-decoration: none;
}
.agree a:visited{
    color: rgb(56, 149, 255);
}
.btn{
    letter-spacing: 8px;
    font-size: 15px;
    width:90%;
    height: 40px;
    line-height: 40px;
    margin:50px auto 0 auto;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: rgb(0, 125, 184);
    border:solid 1px rgb(0, 125, 184);
}
</style>
