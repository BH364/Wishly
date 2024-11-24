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
   
   const addToCart =async (itemId,size)=>{
        if(!size){
            toast.error('Select Product Size');
            return;
        }
        console.log(itemId,size);
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={[size]:1};
        }
        setCartItems(cartData);
        if(token){
            try{
              const response= await axios.post(`${backendUrl}/cart/add`,{itemId,size},{headers:token,withCredentials:true});
              
               console.log(response)
            }
            catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }
   }

   const getCartCount = () =>{
       let totalCount=0;
       for(const items of cartItems){
           for(const item of items.sizes){
              try{
                 if(item.quantity > 0){
                    totalCount+=item.quantity;
                 }
              }
              catch(err){

              }
           }
       }
       return totalCount;
   }
   const getCartAmount = ()  =>{
  
    let totalAmount=0;
    for(const item of cartItems){
        
        let itemInfo=products.find((product)=>product._id===item.itemId);
        for(const size of item.sizes){
            try{
                if(size.quantity>0){
                    totalAmount+=itemInfo.price * size.quantity;
                }
              
            }
            catch(err){
                    
            }
        }
    }
    return totalAmount;
   }
   const getProductsData = async ()=>{
    try{
       const response = await axios.get(`${backendUrl}/product/list`,{},{
         withCredentials:true
       })
       if(response.data.success){
       setProducts(response.data.products);
       console.log(products)

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
   const getUserCart = async (token) =>{
    try{
        const response = await axios.post(`${backendUrl}/cart/get`,{},{
            headers:token,
            withCredentials:true
        })
        if(response.data.success){
            setCartItems(response.data.cartData);
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
   const updateQuantity = async (itemId,size,quantity) =>{
    const itemIndex = cartItems.findIndex(item=>item.itemId===itemId);
    if(itemIndex===-1){
        console.error(`Item with ID ${itemId} not found in cart.`);
        return; // Exit if item is not found
    }
   const sizes=cartItems[itemIndex].sizes;
   const sizeIndex = sizes.findIndex(s=>s.size===size);
   
   if(sizeIndex===-1){

        console.error(`Size ${size} not found for item with ID ${itemId}.`);
        return;
    }
       let cartData = structuredClone(cartItems);

      if(quantity===0){
        sizes.splice(sizeIndex,1);
        if(sizes.length===0){
            cartData.splice(itemIndex,1);
        }
      }
      else{
        sizes[sizeIndex].quantity=quantity;
      }
      

       setCartItems(cartItems.map(item=>{
        if(item.itemId===itemId){
            return {
                ...item,
                sizes:item.sizes.map(s=>{
                    if(s.size===size){
                        return {
                            ...s,quantity
                        }
                    }
                    return s;
                })
            };

        }
        return item;
       }));
       if(token){
        try{
            await axios.post(`${backendUrl}/cart/update`,{itemId,size,quantity},{headers:token,withCredentials:true})
        }
        catch(err){
            console.log(err.message);
            toast.error(err.message);
        }
       }
   }
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