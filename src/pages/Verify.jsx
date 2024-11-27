import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import {useSearchParams} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { useContext } from 'react';
const Verify = () => {
    const {navigate,token,setCartItems,backendUrl} =useContext(ShopContext);
    const [searchParams,setSearchParams]=useSearchParams();
    const success= searchParams.get('success');
    const orderId=searchParams.get('orderId')
    const verifyPayment = async ()=>{
        try {
           if(!token){
            return null;
           } 
           const response = await axios.post(`${backendUrl}/order/verifyStripe`,{success,orderId},{
            headers:token,
            withCredentials:true
           })
           if(response.data.success){
              setCartItems([]);
              navigate('/orders');
           }
           else{
            navigate('/cart');
           }
        } catch (error) {
           console.log(error);
           toast.error(error.message);
        }
    }
    useEffect(()=>{
     verifyPayment();
    },[token]);
  return (
    <div>
        
    </div>
  )
}

export default Verify