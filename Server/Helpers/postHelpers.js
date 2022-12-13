const schema = require('../dbSchema/userSchema')


module.exports = {
    uploadPost:(post)=>{
        console.log('klo');
        return new Promise((resolve,reject)=>{
          schema.postData(post).save() 
          resolve()
         }) 
       },  
       getPosts:(userId)=>{
        return new Promise((resolve,reject)=>{
          schema.postData.find({userId:userId}).sort({_id:-1}).then((posts)=>{
            console.log(posts,'pppppp');
            resolve(posts)
          })  
        })
       },
       postLike_Unlike:(data)=>{
        console.log('55555555');
        return new Promise(async (resolve,reject)=>{
          const user = await schema.postData.findOne({$and:[{_id:data.postId},{likedUsers:data.userId}]} )
          console.log(user,'---------');
          if(user){
           schema.postData.updateOne({_id:data.postId},
            {
              $inc:{like:-1},
              $pull:{likedUsers:data.userId}
            }).then((data)=>{
             console.log(data,'kkkkkkk');
             resolve()
            })
          }
          else{
          schema.postData.updateOne({_id:data.postId},
          {
            $inc:{like:1},
            $push:{likedUsers:data.userId}
          }).then(()=>{
            console.log('okokko');
            resolve()
          })
        }
        })
       },
       addComment:(data)=>{
          return new Promise((resolve,reject)=>{
            schema.postData.updateOne({_id:data.postId},{
              $push:{comment:{user:data.user,text:data.comment}}
            }).then(()=>{
              console.log('777777777');
              resolve()
            })
          })
       },
       getAllPosts:()=>{
        return new Promise(async (resolve,reject)=>{
        let posts = await  schema.postData.find().sort({_id:-1})

        for(i=0 ; i<posts.length ; i++){
          
            let temp = posts[i]

           const user = await schema.userData.findOne({_id:posts[i].userId})

            temp.userId = user.fname
          posts[i] = temp
           console.log(temp,'*********');      
        }
        console.log(posts,'1111111');
      
        resolve(posts)     
        })
       }
}