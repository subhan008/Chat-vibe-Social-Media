const schema = require('../dbSchema/userSchema')
const  collection = require("../config/collection") ;
var mongoose = require('mongoose'); 


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
          const user = await schema.postData.findOne({$and:[{_id:data.postId},{likedUsers:data.likedUserId}]} )
          if(user){
           schema.postData.updateOne({_id:data.postId},
            {
              $inc:{like:-1},
              $pull:{likedUsers:data.likedUserId}
            }).then((data)=>{
             resolve(false)
            })
          }
          else{
          schema.postData.updateOne({_id:data.postId},
          {
            $inc:{like:1},
            $push:{likedUsers:data.likedUserId}
          }).then(()=>{
            console.log('okokko');
            resolve(true)
          })
        }
        })
       },
       addComment:(data)=>{
        console.log(data,'jhjhjhjjhj');
          return new Promise((resolve,reject)=>{
            schema.postData.updateOne({_id:data.postId},{
              $push:{comment:{user:data.user,text:data.comment,profileImg:data.profileImg,date:data.date}}
            }).then(()=>{
              console.log('777777777');    
              resolve()   
            })
          })
       },
       getAllPosts:()=>{
        return new Promise(async (resolve,reject)=>{
        let posts = await schema.postData.find().sort({_id:-1})
          console.log(posts._id,'1111111');
        let data = []
        for(i=0 ; i<posts.length ; i++){
                                                                                                               
           var temp = {
             _id:"",
             date: new Date(),
             userId:"",
             caption:"",
             image:"",
             like:1,
             likedUsers:[],
             comment:[],
             profileImg:"",
             userName:""
           }  
                          
           const user = await schema.userData.findOne({_id:posts[i].userId})
            
            temp._id = posts[i]._id
            temp.date = posts[i].date
            temp.userId = posts[i].userId
            temp.caption = posts[i].caption
            temp.image = posts[i].image    
            temp.like = posts[i].like
            temp.likedUsers = posts[i].likedUsers
            temp.comment = posts[i].comment
            temp.profileImg = user.profileImg
            temp.userName = user.fname
            posts[i] = temp
        }
        resolve(posts)                           
        })        
       }  
}

  