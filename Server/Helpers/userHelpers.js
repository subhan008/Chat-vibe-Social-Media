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
doNotification:(data)=>{
  console.log(data,'lll');
  return new Promise(async (resolve,reject)=>{
    const currentMonth = new Date().getMonth()
    console.log(currentMonth);
    const userData  = await schema.userData.findOne({_id:data.userId})
    console.log(userData,'pppppppppp');
    data.text = `started following you`

    const user = await schema.notfiData.findOne({userId:data.followedUserId})
    if(user){
      console.log(userData.fname,'sasas');
      schema.notfiData.updateOne({userId:data.followedUserId},{
        $push:{notifications:{date:currentMonth,user:userData.fname,text:data.text,seen:false}}
      }).then((res)=>{
        console.log('dsdssds',res);
      })
    }    
    else{
      schema.notfiData({userId:data.followedUserId,notifications:{date:currentMonth,user:userData.fname,text:data.text,seen:false}}).save()
      console.log('lllll');
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
    console.log(Data,'022202022202');
    resolve(Data)
    
    
  })
}


 
}


