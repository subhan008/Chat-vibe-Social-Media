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
         schema.userData(data).save();
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
 application:(formData)=>{
  console.log(formData);
   return new Promise((resolve,reject)=>{
      schema.application(formData).save()
      console.log('form inserted succesfuly');
      resolve()
   })
 }
}


