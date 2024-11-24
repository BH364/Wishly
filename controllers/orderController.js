import orderModel from "../models/orderModel";


const placeOrder = async (req,res)=>{
     try{
       const {userId,items,amount,address}=req.body;
       const orderData = {
        userId,
        items,
        amount,
        paymentMethod:"COD",
        payment:false,
        data:Date.now(),
        address,
       }
       const newOrder=new orderModel(orderData);
       await newOrder.save()
       await userModel.findByIdAndUpdate(userId,{cartData:{}});
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
    
}

const userOrders = async (req,res)=>{
    
}


const updateStatus= async (req,res)=>{

}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus};

