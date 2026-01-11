const mongoose=require('mongoose');
require('dotenv').config();

// Connection URL
const url=process.env.MONGODB_URI

mongoose.connect(url);

const db=mongoose.connection;

//event listeners
db.on('connected',()=>{
  console.log('MongoDB connected successfully');
})
db.on('error',(err)=>{
  console.log('MongoDB connection error:',err);
});
db.on('disconnected',()=>{
  console.log('MongoDB disconnected');
});

//export the connection
module.exports=db;

