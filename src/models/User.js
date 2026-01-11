const mongoose=require('mongoose')

//define user schema
const userSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  passwordHash:{
    type:String,
    required:true
  },
  isDeleted:{
    type:Boolean,
    default:false
  },

})

module.exports=mongoose.model('User',userSchema);