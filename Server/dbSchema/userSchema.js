const  collection = require("../config/collection") ;
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
   fname:String,
   lname:String,
   email:String,
   phone:String,
   profileImg:String,
   password:String,
   bio:String,
}); 

const postShema = new mongoose.Schema({
   date:Date,
   userId:String,
   caption:String,
   image:String,
   comment:[{user:String,text:String,profileImg:String,date:Date}],
   like:{ type: Number, default: 0 },
   likedUsers:[String],
   report:Boolean         
})

const ConnectionShema = new mongoose.Schema({
   userId:String,
   followers:[String],
   following:[String],
})    
  
const NotificationShema = new mongoose.Schema({
   userId:String,
   notifications:[{date:Date,user:String,text:String,seen:Boolean}],
})     

const ChatSchema = new mongoose.Schema({
   chaterIds:[String],
   chat:[
      {
         messagerId:String,
         message:String,
         timeStamp:Date
      }
   ]
})

const chatData = mongoose.model(collection.CHAT_COLLECTION, ChatSchema);
const notfiData = mongoose.model(collection.NOTIFICATION_COLLECTION, NotificationShema);
const connectionData = mongoose.model(collection.CONNECTION_COLLECTION, ConnectionShema)
const userData = mongoose.model(collection.USER_COLLECTION, userSchema);
const postData = mongoose.model(collection.POST_COLLECTION, postShema);

module.exports = {userData,postData,connectionData,notfiData,chatData};              