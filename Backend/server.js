import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cookieParser from 'cookie-parser'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'
const app= express();
const port = process.env.PORT || 4000
app.use(cookieParser())
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', // Main frontend
  'http://localhost:5174', // Admin frontend
];

// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


connectCloudinary();
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.get('/',(req,res)=>{
     res.send("API working")
})

connectDb().then(()=>{
     
    app.listen(port,()=>{
    console.log("server is running on port : "+port);
      })
    })
    .catch((err)=>{
        console.error("Error encountered")
})
      
