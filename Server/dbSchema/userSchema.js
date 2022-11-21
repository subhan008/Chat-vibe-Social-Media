const  collection = require("../config/collection") ;
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
   fname:String,
   lname:String,
   email:String,
   phone:String,
   password:String
}); 

const postShema = new mongoose.Schema({
   date:Date,
   userId:String,
   caption:String,
   image:String,
   comment:{type:String},
   like:{ type: Number, default: 0 },
   likedUsers:[String],
   report:Boolean         
})

const userData = mongoose.model(collection.USER_COLLECTION, userSchema);
const postData = mongoose.model(collection.POST_COLLECTION, postShema);

module.exports = {userData,postData};        