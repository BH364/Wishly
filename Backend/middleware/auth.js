import jwt from 'jsonwebtoken';



const authUser = async (req,res,next)=>{
    const {token} =  req.headers || req.cookies;
    if(!token ){
        return res.json({success:false,message:'Not Authorized Login Again'})
    } 
    try{
       const token_decode=jwt.verify(token,process.env.JWT_SECRET);
       console.log(token_decode);
       req.body.userId=token_decode.id;
       next();
    }  
    catch(err){
        console.log(err.message);
        res.status(400).json({success:false,message:err.message});
    }
}

export {authUser}