import axios from './http.js'

export default {
    //获取/查询数据
    queryData:(url,data='')=>{
        if(data==''){
            return new Promise((resolve,reject)=>{
                axios.get(url).then(
                    result => resolve(result),
                    result => reject(result)
                ).catch((reason)=>{
                    console.log('rejected');
                    console.log(reason);
                });
            });   
        }else{
            return new Promise((resolve,reject)=>{
                axios.get(url+encodeURI(JSON.stringify(data))).then(
                    result => resolve(result),
                    result => reject(result)
                ).catch((reason)=>{
                    console.log('rejected');
                    console.log(reason);
                });
            });   
        }
    },
  
    //添加数据
    addData(url,data){
        return new Promise((resolve,reject)=>{
            axios.post(url,JSON.stringify(data)).then(
                result => resolve(result),
                result => reject(result)
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            });
        });
    },

    //修改数据
    changeData(url,data){
        return new Promise((resolve,rejected)=>{
            axios.put(url,data).then(
                result => resolve(result),
                result => reject(result)
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            })
        });
    },

    //上传头像
    postImg(url,data){
        console.log('postImg',url);
        return new Promise((resolve,rejected)=>{
            axios.post(url,data).then(
                result => resolve(result),
                result => reject(result)
            ).catch((reason)=>{
                console.log('rejected');
                console.log(reason);
            })
        });
    }
}

