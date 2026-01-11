const jwt=require('jsonwebtoken')

//middleware 
const jwtAuthMiddleware=(req,res,next)=>{

  //extract jwt token from req headers 
  const token = req.headers.authorization?.split(' ')[1];
  if(!token){
    return res.status(401).json({message:'Authorization token missing'})
  }
  try{
    //verify token
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    
    //Attach user info to req object
    req.user=decoded;     // use info in other routes
    next();

  }catch(err){
    console.error('JWT verification failed:',err);
    res.status(401).json({message:'Invalid authorization token'})

  }
}


//generate JWT token
const generateJwt=(userData)=>{
  return jwt.sign(userData,process.env.JWT_SECRET)
}

module.exports={jwtAuthMiddleware, generateJwt};
