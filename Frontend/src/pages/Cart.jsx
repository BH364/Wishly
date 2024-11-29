import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);


    
        useEffect(() => {
            const tempData = cartItems.flatMap(({ itemId, sizes }) =>
              sizes.map((sizeObj) => ({
                itemId,
                size: sizeObj.size,
                quantity: sizeObj.quantity,
              }))
            );
            setCartData(tempData);
          }, [cartItems]);
      
       

    
    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'Your'} text2={'CART'} />
            </div>
            <div>
                {
                    cartData.map((item) => {
                        const productData = products.find((product) => product._id === item.itemId);
                        if (!productData) {
                          console.log(`Product not found for ID: ${item.itemId}`);
                          return null; 
                      }                       
                       const uniqueKey = `${item.itemId}-${item.size}`;


                        return (
                            <div key={uniqueKey} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>{currency} {productData.price}</p>
                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input 
                                    onChange={(e) => 
                                        e.target.value === '' || e.target.value === '0' 
                                            ? 0
                                            : 
                                            updateQuantity(item.itemId, item.size, Number(e.target.value))
                                             
                                    } 
                                    type="number" 
                                    min={1} 
                                    value={item.quantity}  
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                />
                                <img 
                                    className='w-4 mr-4 sm:w-5 cursor-pointer' 
                                    src={assets.bin_icon} 
                                    onClick={() => updateQuantity(item.itemId, item.size, Number(0))} 
                                    alt="Remove item" 
                                />
                            </div>
                        );
                    })
                }
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end'>
                        <button className='bg-black text-white text-sm my-8 px-8 py-3' onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;