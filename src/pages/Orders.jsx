import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const {products,currency,token,backendUrl} = useContext(ShopContext);
  const [orderData,setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return <div>Please log in to view your orders</div>;
      }
  
      const response = await axios.post(
        `${backendUrl}/order/userorders`,
        {},
        {
          headers: token,
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        const allOrdersItem = response.data.orders.reduce((acc, order) => {
          order.items.forEach(item => {
            const uniqueKey = `${item.productId}-${item.size}`;
            if (acc[uniqueKey]) {
              acc[uniqueKey].quantity += item.quantity;
            } else {
              acc[uniqueKey] = {
                ...item,
                status: order.status,
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                date: order.date,
              };
            }
          });
          return acc;
        }, {});
  
        // Convert the map back to an array and reverse for latest first
        setOrderData(Object.values(allOrdersItem).reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError('Failed to load orders');
    }
  };
  
  useEffect(()=>{
     loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />

      </div>
      <div>
        {
          orderData.map((item,index)=>(
            <div className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index} >
               <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} alt='product' className='w-16 sm:w-20' />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency} {item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1'>Payment :<span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
              </div>
          ))
        }
      </div>
      </div>
  )
}

export default Orders