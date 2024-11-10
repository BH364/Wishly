import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full h-full my-auto md:max-w-[450px]' alt="about" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Welcome to our store! We’re passionate about providing high-quality products that bring style, comfort, and value to your life. Our team carefully curates each collection to offer a unique selection that meets your everyday needs and special moments. We believe in making shopping enjoyable and effortless, whether you're exploring the latest trends or looking for timeless classics.</p>
            <p>Customer satisfaction is at the heart of what we do, and we’re committed to providing a seamless shopping experience with exceptional service. Thank you for choosing us as your go-to destination—we’re excited to be part of your journey!</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is to inspire and empower individuals by providing high-quality, stylish products that elevate everyday living. We’re dedicated to delivering exceptional value, fostering a seamless shopping experience, and creating lasting connections with our customers.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'} />

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b> 
          <p className='text-gray-600'>We’re committed to quality in every product we offer, ensuring durability, style, and satisfaction. Each item is carefully selected and tested to meet our high standards, so you can shop with confidence every time.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :</b> 
          <p className='text-gray-600'>We prioritize your convenience with an easy-to-navigate platform, secure payments, and fast delivery, making shopping seamless from start to finish</p>
        </div> 
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customre Service :</b> 
          <p className='text-gray-600'>We pride ourselves on exceptional customer service, ensuring every question is answered and every need is met. Your satisfaction is our priority!</p>
        </div> 

      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About