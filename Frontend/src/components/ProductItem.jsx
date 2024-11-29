import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer relative' to={`/products/${id}`}>
      <div className='overflow-hidden'>
        <img src={image[0]} alt={name} className='w-full h-auto hover:scale-110 transition ease-in-out' />
        
        
        {bestseller && (
          <div className='absolute top-1 left-2 bg-cyan-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10'>
            Best Seller
          </div>
        )}
      </div>

      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
}

export default ProductItem;
