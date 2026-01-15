const express=require('express');
const router=express.Router();
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const Prescription=require('../models/prescription');
const upload = require('../middleware/upload');
const s3 = require('../config/s3');


// Create a new prescription

router.post('/add',upload.single('image'), async(req,res)=>{
  try{

    const userId=req.user.id

    if (!req.file){
      return res.status(400).json({message:'Image file is required'});
    }


    const fileKey = `prescriptions/${userId}/${Date.now()}-${req.file.originalname}`;


     //s3 upload parameters
    const uploadParams={
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }

    //upload image to s3
    await s3.send(new PutObjectCommand(uploadParams));

    //build image url
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    //save prescription to db
    const prescription=new Prescription({
      userId:userId,
      imageUrl:imageUrl,
      status:'image_uploaded'
    })

    const savedPrescription=await prescription.save();

    //response 
    res.status(201).json({
      message:'Prescription created successfully',
      prescriptionId:savedPrescription._id,
      imageUrl:imageUrl
    });


  }catch(err){
    console.error('Error creating prescription:',err);
    res.status(500).json({ message: 'Internal server error' });

  }
})

router.get('/',async(req,res)=>{
  try{
    const userId=req.user.id;
    const prescriptions= await Prescription.find({userId:userId, isDeleted:false}).sort({createdAt:-1});

    res.status(200).json({prescriptions});

  }catch(err){
    console.error('Error fetching prescriptions:',err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
