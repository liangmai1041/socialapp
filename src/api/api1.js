import axios from './http.js'

export default {
    check:(tbname,search)=>{
        console.log(search);
        return new Promise((resolve,reject)=>{
            axios.get('/1/classes/tb_user/?where='+encodeURI(JSON.stringify(search))).then(
                (result)=>{
                    resolve(result);
                },
                (result)=>{
                    reject(result);
                }
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            })
        });   
    },
    //连接接口：提交数据注册
    reg(data){
        return new Promise((resolve,reject)=>{
            axios.post('/1/classes/tb_user',JSON.stringify(data)).then(
                (result)=>{
                    resolve(result);
                },
                (result)=>{
                    console.log('失败了');
                    reject(result);
                }
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            });
        });
    },
    //查询多条数据
    complexquery(data){
        // console.log('{"mobile":{"$in":["15801234567","15813402941"]}}');
        // console.log('{"mobile":{"$in":'+JSON.stringify(data.search)+'}}');
        return new Promise((resolve,reject)=>{
            // axios.get('/1/classes/tb_user/?where='+encodeURI('{"mobile":{"$in":["15801234567","15813402941"]}}')).then(
            axios.get('/1/classes/tb_user/?where='+encodeURI('{'+JSON.stringify(data.name)+':{"$in":'+JSON.stringify(data.search)+'}}')).then(
                (result)=>{
                    resolve(result);
                },
                (result)=>{
                    reject(result);
                }
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            })
        });
    },
    //指定列查询
    checkList(listname){
        return new Promise((resolve,reject)=>{
            axios.get('/1/classes/tb_dynamic/?keys='+listname).then(
                (result)=>{
                    resolve(result);
                },
                (result)=>{
                    reject(result);
                }
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            });
        });
    }
}

