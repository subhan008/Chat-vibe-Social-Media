const  collection = require("../config/collection") ;
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
   fname:String,
   lname:String,
   email:String,
   phone:String,
   password:String
});  


const userData = mongoose.model(collection.USER_COLLECTION, userSchema);

module.exports = {userData};     