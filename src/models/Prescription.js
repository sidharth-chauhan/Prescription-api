const mongoose=require('mongoose');

//define prescription schema
const prescriptionSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  imageUrl:{
    type:String,
    default:''
  },
  status :{
    type:String,
    enum:['created','image_uploaded','extracted'],
    default:'created'
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }

})

module.exports=mongoose.model('Prescription',prescriptionSchema);