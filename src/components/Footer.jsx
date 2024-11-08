import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-16 my-10 mt-40 text-sm'>
          <div>
            <img src={assets.logo} className='mb-5 w-32' alt="logo" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Thank you for shopping with us! Follow us on social media for updates, exclusive deals, and new arrivals. Need help? Our support team is here for you. Sign up for our newsletter for discounts and style tips!
            </p>
          </div>
          <div>
             <p className='text-xl font-medium mb-5 mt-10'>COMPANY</p>
             <ul className='flex flex-col gap-1 text-gray-600'>
                 <li>Home</li>
                 <li>About Us</li>
                 <li>Delivery</li>
                 <li>Privacy Policy</li>
             </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5 mt-10'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>+1-213-234-5678</li>
              <li>contact@wishly.com</li>
              </ul>
          </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024© Wishly.com - All Rights Reserved</p>
        </div>
        </div>
  )
}

export default Footer