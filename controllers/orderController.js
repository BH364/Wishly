import orderModel from "../models/orderModel.js";


const placeOrder = async (req,res)=>{
     try{
       const {userId,items,amount,address}=req.body;
       const orderData = {
        userId,
        items,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now(),
        address,
       }
       const newOrder=new orderModel(orderData);
       await newOrder.save()
       await orderModel.findByIdAndUpdate(userId,{cartData:{}});
       res.json({success:true,message:"Order Placed"})
     }
     catch(err){
       console.log(err);
       res.status(400).json({success:false,message:err.message});
     } 
}

const placeOrderStripe = async (req,res)=>{
    
}
const placeOrderRazorpay = async (req,res)=>{
    
}


const allOrders = async (req,res)=>{
     try {
      const orders=await orderModel.find({});
      res.json({success:true,orders});
     } catch (error) {
      console.log(error);
      res.status(400).json({success:false,message:error.message});
     }  
}

const userOrders = async (req,res)=>{
    try {
      const {userId}=req.body;
      const orders =await orderModel.find({userId});
      res.json({success:true,orders});
    } catch (error) {
      console.log(error);
      res.status(400).json({success:false,message:error.message});
    }
}


const updateStatus= async (req,res)=>{

}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus};

