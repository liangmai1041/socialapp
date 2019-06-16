<template>
    <div class="container">
        <van-nav-bar title="海阁人" :border='true' :fixed='true'/>
        <van-row type="flex" justify="space-between" v-for='val in list' :key='val.id' class="wordsize">
            <van-col span="5"><img :src='val.logo' alt=""/></van-col>
            <van-col span="18">
                <van-row>
                    <van-col span="24" class="username">{{val.name}}</van-col>
                </van-row>
                <van-row>
                    <van-col span="8" class="textstyle">{{val.time}}</van-col>
                    <van-col span="8" class="textstyle">{{val.city}}</van-col>
                    <van-col span="6" class="count">{{val.good}}</van-col>
                    <van-col span="2" class="count"><van-icon :name="val.islike" size='16px' @click='isLike(val.id)'/></van-col>
                </van-row>
                <van-row>
                    <van-col span="24" class="textright">{{val.content}}</van-col>
                </van-row>
            </van-col>
        </van-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[],
            // islike:'like-o'
        };
    },
    created(){
        this.getlist();
    },
    methods: {
        getlist(){
            if(localStorage.isLogin==undefined||localStorage.isLogin=='0'){
                this.$toast('请先登录！！');
                setTimeout(() => {
                    this.$router.push({path:'/login'});
                }, 3000);
            }else if(localStorage.isLogin=='1'){
                // this.$toast('你已经登录！');
                var userid=[];            //查动态表存用户id
                var usermsg=[];           //查用户表存用户的昵称和头像
                this.$axios.queryData(this.$url.list).then(
                    (result) => {
                        // console.log(result.data);
                        var results=result.data.results;
                        for(var i=0;i<result.data.results.length;i++){
                            userid.push(result.data.results[i].user_id)
                        }
                        userid=[...new Set(userid)];
                        this.$axios.queryData(this.$url.user+'/?where=',{objectId:{$in:userid}}).then(
                            (result) => {
                                for(var i=0;i<result.data.results.length;i++){
                                    usermsg[result.data.results[i].objectId]=[result.data.results[i].nick,result.data.results[i].logo];
                                    // usermsg.push([result.data.results[i].nick,result.data.results[i].logo]);
                                }
                                console.log(777777,usermsg);
                                var num=0;
                                for(var i=results.length-1;i>=0;i--){
                                    this.list.push({
                                        id:num,
                                        objectId:results[i].objectId,
                                        city:results[i].city,
                                        content:results[i].content,
                                        good:results[i].good,
                                        time:results[i].createdAt.substring(5,10),
                                        name:usermsg[results[i].user_id][0]=='' ? '用户'+results[i].user_id : usermsg[results[i].user_id][0],
                                        logo:usermsg[results[i].user_id][1],
                                        goodcount:results[i].goodcount,
                                        islike:results[i].goodcount.includes(localStorage.uid) ? 'like' :'like-o' 
                                    });
                                    num=num+1;
                                }
                                // console.log(this.list)
                            },
                            (result) => {
                                console.log(result);
                            }
                        );
                        console.log(6666666,usermsg)
                    },
                    (result) => {
                        console.log(result);
                    }
                )
            }
        },
        isLike(num){
            var count=this.list[num].good;      //当前的点赞数目
            var str=this.list[num].goodcount;
            if(this.list[num].islike=='like'){
                // console.log('点了赞的想要取消点赞');
                count=count-1;
                str=str.replace(localStorage.uid+',',"");
            }else{
                // console.log('没有点赞的想要点赞');
                count=count+1;
                str=str+localStorage.uid+',';
            }
            // this.list[num].good=count;
            // console.log(this.list[num].goodcount,count,555,str);
            //接接口：修改当前的点赞数目和修改
            this.$axios.changeData(this.$url.list+'/'+this.list[num].objectId,{goodcount:str,good:count}).then(
                (result) => {
                    this.list[num].good=count;
                    this.list[num].goodcount=str;
                    this.list[num].islike=this.list[num].goodcount.includes(localStorage.uid) ? 'like' :'like-o' ;
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
.wordsize{
    font-size:14px;
    border-bottom: solid 1px #ccc;
    padding-bottom: 15px;
    margin:10px 10px 0px 5px;
}
img{
    width: 68px;
    height: 68px;
    border-radius: 50%;
}
.username{
    color:rgb(56, 149, 255);
    text-align: left;
}
.textstyle{
    text-align:left;
    padding: 5px 0;
}
.count{
    text-align: right;
    padding: 5px 0;
}
.textright{
    text-align: left;
}
</style>
