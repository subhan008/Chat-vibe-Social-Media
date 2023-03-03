const schema = require('../../dbSchema/userSchema')
const jwt = require('jsonwebtoken')



const  Admin = {
    email:"admin@gmail.com",     
    password:process.env.SECRET_KEY      
  }


const login = (async (req,res)=>{
    console.log(req.body,'******');

    try {
        if(req.body.email == Admin.email && req.body.password == Admin.password){
      console.log('hi');
      const token = await jwt.sign({admin:Admin.email},process.env.SECRET_KEY,{expiresIn:"1d"})
      console.log(token,'212121');
      res.send({valid:true,token: token,Admin});  
    }    
    else res.send({valid:false,message:'Invalid email or password'})
    } catch (error) {
      res.send({err:true,message:"Internal Server Error"})

    }
    
})

  

const getReportedUsers = (async (req,res)=>{
   console.log('1000000');
   try {
    const users = await schema.userData.find({report:true})
    console.log(users,'nbnbnb');
    res.send({message:'succesfull',users})

   } catch (error) {
    res.send({err:true,message:"Internal Server Error"})
   }
})

const block_unBlock = (async(req,res)=>{
  try {
     if (req.body.action == "block") {
      console.log('212121');
      await schema.userData.updateOne({_id:req.body.userId},{
        $set:{
            blocked:true
        }
      })
      res.send({message:'succesfull'})
   }else{
    console.log('212121');
      await schema.userData.updateOne({_id:req.body.userId},{
        $set:{
            blocked:false
        }
      })
      res.send({message:'succesfull'})
   }
  } catch (error) {
    res.send({err:true,message:"Internal Server Error"})
  }
})

const getReportedPosts  = (async (req,res)=>{
   try {    
    

    console.log('mmmm2m');
  const posts = await schema.postData.find({reported:true})
  
  
        for(i=0 ; i<posts.length ; i++){
                                                                                                               
           var temp = {
             _id:"",
             date: new Date(),
             email:"",
             reportCount:"",
             image:"",
             like:1,
             reportReasons:[],
             profileImg:"",
             userName:"",

           }  
                          
           const user = await schema.userData.findOne({_id:posts[i].userId})
            
            temp._id = posts[i]._id
            temp.date = posts[i].date
            temp.email = user.email
            temp.reportCount = posts[i].reportReasons.length
            temp.image = posts[i].image    
            temp.like = posts[i].like
            temp.likedUsers = posts[i].likedUsers
            temp.reportReasons = posts[i].reportReasons
            temp.profileImg = user.profileImg
            temp.userName = user.fname
            posts[i] = temp
        }
   console.log(posts,'gggg');
   res.send({message:'succesfull',posts:posts})
   } catch (error) {
    res.send({err:true,message:"Internal Server Error"})
   
   }
})

const deleteReportedPost = (async (req,res)=>{
  try {
    console.log(req.body,'zzzzz');
    await schema.postData.deleteOne({_id:req.body.postId})
    res.send({message:'succesfull'})
  } catch (error) {
    res.send({err:true,message:"Internal Server Error"})
  }
})



module.exports = {login,getReportedUsers,block_unBlock,getReportedPosts,deleteReportedPost}