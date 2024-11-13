import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { items, totalQuantity, totalPrice } = useSelector(state => state.cart);
  const navigate = useNavigate();

  console.log(product)
  return (
    <div 
      onClick={() => { navigate(`${product?._id}`); }} 
      className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm cursor-pointer"
    >
      <img 
        src={product?.image || 'https://via.placeholder.com/150'} 
        alt={product?.name || 'Product Image'} 
        className="h-48 w-full object-cover rounded-t-lg" 
      />
      
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800">
          {product?.brand || 'Unknown Brand'} - {product?.name || 'Unknown Product'}
        </h2>
        <p className="text-gray-600 text-sm">{product?.category || 'No category'}</p>
        
        {/* <p className="mt-2 text-gray-700">{product?.description || 'No description available.'}</p> */}

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-green-800">
            ₹{product?.pricePerUnit || '0.00'} / {product?.measuringUnit || 'unit'}
          </p>
          <p className="text-gray-500">Quantity: {product?.quantity || '0'}</p>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Farmer: {product?.sellerId?.name || 'Unknown Seller'}
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Date Added: {product?.date ? new Date(product.date).toLocaleDateString() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
