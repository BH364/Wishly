import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
const Login = () => {
  const [currentState,setCurrentState] =useState('Login');
  const {token,setToken,navigate,backendUrl} =useContext(ShopContext);
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  const onSubmitHandler = async (event)=>{
        event.preventDefault();
        try{
            if(currentState==='Sign Up'){
               const response=await axios.post(`${backendUrl}/user/register`,{name,email,password},{
                withCredentials:true
               });
               if(response.data.success){
                console.log(response.data);
                setToken(response.data.token);
               }
            }

            else{

            }
        }
        catch(err){

        }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800'>
       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>


       </div>
     {currentState==='Login' ? '' :  <input type='text' className='w-full my-2 px-3 py-2 border border-gray-800' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} value={name} required/>}
       <input type='email' className='w-full px-3 my-2 py-2 border border-gray-800' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
       <input type='password' className='w-full px-3 my-2 py-2 border border-gray-800' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
       <div className='w-full flex justify-between text-sm mt-[8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState==='Login' ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
                             : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
         } </div>
         <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState=== 'Login'? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login