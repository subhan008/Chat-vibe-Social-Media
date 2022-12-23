const schema = require('../dbSchema/userSchema')
const bcrypt = require('bcrypt')
module.exports = {

  doSignup:(data)=>{

    return new Promise( async(resolve,reject)=>{
      let userExist = await schema.userData.findOne({
        email:data.email
      })
      if(userExist){
        console.log('sssss');
        resolve({userAdded:false})
      }else{
        const hashPassword = await bcrypt.hash(data.password,10)
        data.password = hashPassword                           
        console.log(data.password);                               
        console.log(data,'ppppooo');         
        await schema.userData(data).save();  
        const user = await schema.userData.findOne({email:data.email})
        schema.connectionData({userId:user}).save()
        console.log('user added');
        resolve({userAdded:true})
      }            
    })
 },

 doLogin:(data)=>{
   
  return new Promise( async(resolve,reject)=>{
    let response = {}
   let user = await schema.userData.findOne({
     email:data.email
   })
  if(user){
    bcrypt.compare(data.password,user.password).then((status)=>{
      console.log(status,'a');
     if(status){
      console.log('log in success');
        response.user = user
        response.status = true
        resolve(user)
     }
     else {
          resolve() 
          console.log('login failed');
         }
    })
  } else {
    resolve()
    console.log('login failed no user');
  }
 })
},

followUser:(data)=>{

  return new Promise(async (resolve,reject)=>{
     const userExist = await schema.connectionData.findOne({userId:data.userId})
     if(userExist){
      console.log('dsdddfx');
      await schema.connectionData.updateOne({userId:data.userId},{
        $push:{following:data.followedUserId}
       })
       const followedUser = await schema.connectionData.findOne({userId:data.followedUserId})
       if(followedUser){
        console.log(followedUser,';;;;;');
        console.log('8888888855');
       await schema.connectionData.updateOne({userId:data.followedUserId},{
          $push:{followers:data.userId}
         })
         resolve()
      }  
      else{
        console.log('777777755');
        await schema.connectionData({userId:data.followedUserId}).save()
        await schema.connectionData.updateOne({userId:data.followedUserId},{
         $push:{followers:data.userId}
        }) 
        resolve()   
       }
     }
     else{ 

     await schema.connectionData({userId:data.userId}).save()
     await schema.connectionData.updateOne({userId:data.userId},{
      $push:{following:data.followedUserId}
     })
     const followedUser = schema.connectionData.findOne({userId:data.followedUserId})
     if(followedUser){
      console.log(followedUser,'88888888');
      await schema.connectionData.updateOne({userId:data.followedUserId},{
        $push:{followers:data.userId}
       })
       resolve()
    }
    else{
      console.log('7777777');
      await schema.connectionData({userId:data.followedUserId}).save()
      await schema.connectionData.updateOne({userId:data.followedUserId},{
       $push:{followers:data.userId}
      })  
      resolve()  
     }

     }
  })
},
doNotification:(receiverId,userId,notification,userName)=>{
  console.log('lll');  
  return new Promise(async (resolve,reject)=>{

    const user = await schema.notfiData.findOne({userId:receiverId})
    if(user){
      console.log('sasas'); 
      schema.notfiData.updateOne({userId:receiverId},{
        $push:{notifications:{date: new Date(),user:userName,text:notification,seen:false}}
      }).then((res)=>{
        console.log('dsdssds',res);
        resolve()
      })
    }    
    else{
      schema.notfiData({userId:receiverId,notifications:{date:new Date(),user:userName,text:notification,seen:false}}).save()
      console.log('lllll');
      resolve()
    }
  })  
},
getFollowing:(id)=>{
  return new Promise(async (resolve,reject)=>{
    const Data = []
    const user  = await schema.connectionData.findOne({userId:id})

    for( i = 0 ; i<user.following.length ; i++){
       const folUser = await schema.userData.findOne({_id:user.following[i]})
     console.log(folUser,'kmkmmk');
     Data.push({id:user.following[i],user:folUser?.fname})
     console.log(Data,'??????????');
    }
    console.log(Data,'022202022202');
    resolve(Data)
    
    
  })
},
getFollowers:(id)=>{  
  return new Promise(async (resolve,reject)=>{
    const Data = []
    const user  = await schema.connectionData.findOne({userId:id})
  
    for( i = 0 ; i<user.followers.length ; i++){
       const folUser = await schema.userData.findOne({_id:user.followers[i]})
     console.log(folUser,'kmkmmk');   
     Data.push({id:user.followers[i],user:folUser?.fname})
     console.log(Data,'??????????');
    }
    resolve(Data)
    
  })
},
getSuggestion:(userId)=>{
  return new Promise(async(resolve,reject)=>{
    let data = []
    const users = await schema.userData.find().limit(30)
    const followings = await schema.connectionData.findOne({userId:userId})
    for( i = 0 ; i<users.length ; i++){
       if(!followings.following.includes(users[i]._id)){
          data.push(users[i])
         
       } 
       console.log(data.length,'+++++++++++++++++');
    }
  })
},
addMessage:(data)=>{
   return new Promise(async (resolve,reject)=>{
    const chatExist = await schema.chatData.findOne({$and:[{chaterIds:data.messagerId},{chaterIds:data.receiverId}]   })
    if(chatExist){
      schema.chatData.updateOne({_id:chatExist._id},{
        $push:{chat:data}
      }).then(()=>{
        resolve()
      })

    }else{
      console.log('heheheh');
      await schema.chatData({chaterIds:[data.messagerId,data.receiverId],chat:[data]}).save()
      resolve()
    }
   })
},

editProfile:(data)=>{
   return new Promise((resolve,reject)=>{
     schema.userData.updateOne({_id:data._id},{
      $set:{
        fname:data.fname,
        email:data.email,
        bio:data?.bio
      }
     }).then(()=>{
      console.log('cccccc');
      resolve()
     })
   })
}

 
 
} 


