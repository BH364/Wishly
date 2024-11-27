import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const ShopContext = createContext();
const ShopContextProvider =(props)=>{
   const currency='₹';
   const delivery_fee=10;
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const [search,setSearch]=useState('');
   const [showSearch,setShowSearch]=useState(false);
   const [cartItems,setCartItems] = useState([]);
   const [products,setProducts]=useState([]);
   const [token,setToken] = useState('');
   const navigate = useNavigate();
   
   const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
  
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const itemIndex = updatedItems.findIndex((item) => item.itemId === itemId);
  
      if (itemIndex !== -1) {
        const sizeIndex = updatedItems[itemIndex].sizes.findIndex((s) => s.size === size);
  
        if (sizeIndex !== -1) {
          // Update quantity
          updatedItems[itemIndex].sizes[sizeIndex].quantity += 1;
        } else {
          // Add new size
          updatedItems[itemIndex].sizes.push({ size, quantity: 1 });
        }
      } else {
        // Add new product with size
        updatedItems.push({ itemId, sizes: [{ size, quantity: 1 }] });
      }
  
      return updatedItems;
    });
  
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
      } catch (err) {
        console.error(err.message);
        toast.error(err.message);
      }
    }
  };
  

   const getCartCount = () => {
    let totalCount = 0;
    for (const item of cartItems) {
      if (item.sizes) {
        for (const size of item.sizes) {
          if (size.quantity > 0) {
            totalCount += size.quantity;
          }
        }
      }
    }
    return totalCount;
  };
  
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      const itemInfo = products.find((product) => product._id === item.itemId);
      if (!itemInfo) continue; // Skip if product is not found
      for (const size of item.sizes) {
        if (size.quantity > 0) {
          totalAmount += itemInfo.price * size.quantity;
        }
      }
    }
    return totalAmount;
  };
  
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/product/list`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  
   const getUserCart = async (token) =>{
    try{
        const response = await axios.post(`${backendUrl}/cart/get`,{},{
            headers:token,
            withCredentials:true
        })
        if(response.data.success){
            setCartItems(response.data.cartData);
        }   
        else{
            toast.error(response.data.message);
        }
        
    }
    catch(err){
        console.log(err);
        toast.error(err.message);
    }
   }
   useEffect(()=>{
   getProductsData();
   },[]);

   useEffect(()=>{
    if(!token && localStorage.getItem('token')){
              setToken(localStorage.getItem('token'))
              getUserCart(localStorage.getItem('token'));
    }
   },[])
   const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.itemId === itemId) {
        const updatedSizes = item.sizes.map((s) => {
          if (s.size === size) {
            return { ...s, quantity };
          }
          return s;
        }).filter(s => s.quantity > 0); // Remove sizes with quantity 0
  
        return updatedSizes.length > 0
          ? { ...item, sizes: updatedSizes }
          : null; // Remove item if no sizes remain
      }
      return item;
    }).filter(Boolean); // Remove null entries
  
    setCartItems(updatedCart);
  
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/update`,
          { itemId, size, quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error(err.message);
        toast.error(err.message);
      }
    }
  };
  
    const value={
       products,currency,delivery_fee,
       search,setSearch,showSearch,setShowSearch,backendUrl,
       cartItems,setCartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,setToken,token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;