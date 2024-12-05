 import userModel from "../models/userModel.js";
 import validator from 'validator'
 import bcrypt from 'bcrypt'
 import jwt from 'jsonwebtoken'
 const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
 }
 const loginUser = async (req,res) =>{
      try{
         const {email,password} =req.body;
         const user= await userModel.findOne({email});
         if(!user){
            return  res.json({
                success:false,
                message:"User doesn't exists"
            })
         }
         const isMatch=await bcrypt.compare(password,user.password);
         if(isMatch){
            const token=createToken(user._id);
            res.cookie('token',token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true ,
              secure: true, // Ensure cookies are sent only over HTTPS
              sameSite: 'Strict', 
              secure: process.env.NODE_ENV === 'production',
              
            });
            
            res.json({
                success:true,
                user,
                token
            })
         }
         else{
            res.json({
                success:false,
                message:"Invalid credentials"
            })
         }
      }
      catch(err){
    
            res.status(400).send(err.message);
        
      }
 }


 const registerUser = async (req,res) =>{
      try{
          const {name,email,password} =req.body;
          const exists =await userModel.findOne({email});
          if(exists){
            return  res.json({
                success:false,
                message:"User already exists"
            })
          }
          if(!validator.isEmail(email)){
            return  res.json({
                success:false,
                message:"Please enter a valid email"
            })
          }
          if(password.length<8){
            return  res.json({
                success:false,
                message:"Please enter a strong password"
            })
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword =await bcrypt.hash(password,salt);
          const newUser= new userModel({name,email,password:hashedPassword});
          const user=await newUser.save();
          const token = createToken(user._id);
          res.cookie('token',token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true,
            secure: true, // Ensure cookies are sent only over HTTPS
            secure: process.env.NODE_ENV === 'production', // Ensure the cookie is sent only over HTTPS in production
            sameSite: 'Strict', // Prevents CSRF
           });
          res.json({
            success:true,
            user,
            token
          })

      }
      catch(err){
        res.status(400).send(err.message);
      }
 }

 const adminLogin = async (req,res) =>{
    try{
       const {email,password} = req.body;
       if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET);
        res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true ,
          secure: true, // Ensure cookies are sent only over HTTPS
          sameSite: 'Strict', 
        });
        
        res.json({success:true,token});
        
       }
       else{
        res.status(400).json({
            success:false,
            message:"Invalid credentials"
        })
       }
    }
    catch(err){
        res.status(400).send(err.message);
     
    }
 }

 const logoutUser= async (req,res) =>{
  try{
  res.cookie('token',null,{
    expires : new Date(Date.now())
   });
   res.send("Logout successful");
 }
 catch(err){
  res.status(400).send(err.message);

 }
  }


 export {loginUser,registerUser,adminLogin,logoutUser};