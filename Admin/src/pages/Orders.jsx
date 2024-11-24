import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useEffect } from 'react'
const Orders = ({token}) => {
  const [orders,setOrders]= useState([]);

  const fetchAllOrders = async () =>{
       if(!token){
        return null;
       }
       try {
        const response =await axios.post(`${backendUrl}/order/list`,{},{headers:token,withCredentials:true});
        console.log(response);
       } catch (error) {
        
       }
  }
  useEffect(()=>{
    fetchAllOrders()
  },[token])
  return (
    <div>Orders</div>
  )
}

export default Orders